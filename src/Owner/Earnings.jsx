import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import OwnerLayout from '../layouts/OwnerLayout';
import StatsCard from '../components/StatsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Earnings.css';

export default function Earnings() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    thisMonthRevenue: 0,
    completedBookings: 0,
    averageBookingValue: 0
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyBreakdown, setMonthlyBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  async function fetchEarningsData() {
    try {
      setLoading(true);
      
      const { data: userData, error: authError } = await supabase.auth.getUser();
      
      if (authError || !userData?.user) {
        setError('User not authenticated');
        return;
      }

      const userId = userData.user.id;

      // Get owner record - ensure it belongs to authenticated user
      const { data: owner, error: ownerError } = await supabase
        .from('owners')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (ownerError || !owner) {
        setError('Owner record not found');
        return;
      }

      // Fetch owner's properties only
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('id')
        .eq('owner_id', owner.id);

      if (propertiesError || !propertiesData) {
        setError('Failed to load properties');
        return;
      }

      const propertyIds = propertiesData.map(p => p.id);

      if (propertyIds.length === 0) {
        setBookings([]);
        setStats({
          totalRevenue: 0,
          thisMonthRevenue: 0,
          completedBookings: 0,
          averageBookingValue: 0
        });
        setLoading(false);
        return;
      }

      // Fetch bookings only for owner's properties
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .in('property_id', propertyIds)
        .order('start_date', { ascending: false });

      if (bookingsError) {
        setError('Failed to load bookings');
        return;
      }

      setBookings(bookingsData || []);
      calculateStats(bookingsData || []);
      processChartData(bookingsData || []);
    } catch (err) {
      console.error('Error fetching earnings:', err);
      setError('An error occurred while loading earnings data');
    } finally {
      setLoading(false);
    }
  }

  function calculateStats(bookings) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalRevenue = 0;
    let thisMonthRevenue = 0;
    let completedBookings = 0;

    bookings.forEach(booking => {
      const amount = Number(booking.total_price || 0);
      totalRevenue += amount;

      const bookingDate = new Date(booking.end_date || booking.start_date);
      if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
        thisMonthRevenue += amount;
      }

      if (booking.status === 'completed') {
        completedBookings += 1;
      }
    });

    const averageBookingValue = bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0;

    setStats({
      totalRevenue,
      thisMonthRevenue,
      completedBookings,
      averageBookingValue
    });
  }

  function processChartData(bookings) {
    const monthlyMap = {};

    bookings.forEach(booking => {
      const date = new Date(booking.end_date || booking.start_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const amount = Number(booking.total_price || 0);

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, revenue: 0, bookingCount: 0 };
      }

      monthlyMap[monthKey].revenue += amount;
      monthlyMap[monthKey].bookingCount += 1;
    });

    const chartData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
    setMonthlyData(chartData);
    setMonthlyBreakdown(chartData.slice(-12)); // Last 12 months
  }

  if (loading) {
    return (
      <OwnerLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading earnings data...</p>
        </div>
      </OwnerLayout>
    );
  }

  return (
    <OwnerLayout>
      <div className="earnings-page">
        <div className="earnings-header">
          <h1>Earnings</h1>
          <p>Comprehensive revenue analytics for your properties</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="earnings-summary-grid">
          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
          />
          <StatsCard
            title="This Month"
            value={`$${stats.thisMonthRevenue.toLocaleString()}`}
            icon="📅"
          />
          <StatsCard
            title="Completed Bookings"
            value={stats.completedBookings}
            icon="✅"
          />
          <StatsCard
            title="Avg Booking Value"
            value={`$${stats.averageBookingValue.toLocaleString()}`}
            icon="📊"
          />
        </div>

        {/* Revenue Chart */}
        <div className="chart-container">
          <div className="chart-card">
            <h2>Revenue Trend</h2>
            <p className="chart-subtitle">Monthly revenue over time</p>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#718096', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#667eea" 
                  strokeWidth={3}
                  dot={{ fill: '#667eea', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Breakdown Table */}
        <div className="breakdown-container">
          <h2>Monthly Breakdown</h2>
          <div className="breakdown-table-wrapper">
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Bookings</th>
                  <th>Avg Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-cell">No earnings data available</td>
                  </tr>
                ) : (
                  monthlyBreakdown.map((month, index) => {
                    const monthDate = new Date(`${month.month}-01`);
                    const monthName = monthDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    });
                    const avgValue = month.bookingCount > 0 ? Math.round(month.revenue / month.bookingCount) : 0;

                    return (
                      <tr key={index}>
                        <td className="month-cell">{monthName}</td>
                        <td className="revenue-cell">${month.revenue.toLocaleString()}</td>
                        <td className="booking-count">{month.bookingCount}</td>
                        <td className="avg-value">${avgValue.toLocaleString()}</td>
                        <td>
                          <span className="status-badge completed">Completed</span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-container">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {bookings.length === 0 ? (
              <p className="no-transactions">No transactions yet</p>
            ) : (
              bookings.slice(0, 10).map((booking, index) => (
                <div key={index} className="transaction-item">
                  <div className="transaction-info">
                    <p className="transaction-title">Booking #{booking.id.slice(0, 8)}</p>
                    <p className="transaction-date">
                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="transaction-amount">
                    <span className="amount">${booking.total_price?.toLocaleString() || 'N/A'}</span>
                    <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}