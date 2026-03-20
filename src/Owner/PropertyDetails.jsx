import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import OwnerLayout from '../layouts/OwnerLayout';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(location.state?.property || null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(!property);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!property) {
      fetchPropertyDetails();
    } else {
      fetchPropertyBookings();
    }
  }, [propertyId]);

  async function fetchPropertyDetails() {
    try {
      setLoading(true);
      setError(null);
      
      // Get authenticated user
      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError || !userData?.user) {
        setError('User not authenticated');
        return;
      }
      
      const userId = userData.user.id;

      // Get owner record for authenticated user
      const { data: owner, error: ownerError } = await supabase
        .from('owners')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (ownerError || !owner) {
        setError('Owner record not found');
        return;
      }

      // Fetch property and verify it belongs to this owner
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .eq('owner_id', owner.id)
        .single();

      if (propertyError || !propertyData) {
        console.error('Property not found or access denied');
        setError('Property not found or you do not have access to it');
        return;
      }

      setProperty(propertyData);
      fetchPropertyBookings();
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('An error occurred while loading the property');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPropertyBookings() {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', propertyId)
        .order('start_date', { ascending: true });

      if (!bookingsError) {
        setBookings(bookingsData || []);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  }

  if (loading) {
    return (
      <OwnerLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading property details...</p>
        </div>
      </OwnerLayout>
    );
  }

  if (error) {
    return (
      <OwnerLayout>
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate('/owner/my-properties')}>Back to Properties</button>
        </div>
      </OwnerLayout>
    );
  }

  if (!property) {
    return (
      <OwnerLayout>
        <div className="error-state">
          <p>Property not found</p>
          <button onClick={() => navigate('/owner/my-properties')}>Back to Properties</button>
        </div>
      </OwnerLayout>
    );
  }

  const statusColors = {
    available: '#10b981',
    booked: '#f59e0b',
    maintenance: '#ef4444',
  };

  const statusBg = {
    available: '#d1fae5',
    booked: '#fef3c7',
    maintenance: '#fee2e2',
  };

  const status = property.status?.toLowerCase() || 'available';

  return (
    <OwnerLayout>
      <div className="property-details">
        <button className="back-btn" onClick={() => navigate('/owner/my-properties')}>
          ← Back to Properties
        </button>

        <div className="property-details-container">
          <div className="property-image-section">
            <img
              src={property.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={property.title}
              className="property-main-image"
            />
            <div
              className="status-badge-large"
              style={{
                backgroundColor: statusBg[status] || statusBg.available,
                color: statusColors[status] || statusColors.available
              }}
            >
              {property.status || 'Available'}
            </div>
          </div>

          <div className="property-info-section">
            <h1>{property.title}</h1>
            <p className="property-address">
              {property.city && property.state ? `${property.city}, ${property.state}` : 'Location TBD'}
            </p>

            <div className="property-meta">
              <div className="meta-item">
                <span className="meta-label">Bedrooms</span>
                <span className="meta-value">{property.bedrooms || 0}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Bathrooms</span>
                <span className="meta-value">{property.bathrooms || 0}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Type</span>
                <span className="meta-value">{property.type || 'Residential'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Monthly Rent</span>
                <span className="meta-value">${property.price || 0}</span>
              </div>
            </div>

            {property.description && (
              <div className="property-description">
                <h3>About This Property</h3>
                <p>{property.description}</p>
              </div>
            )}

            <div className="property-actions">
              <button className="btn-primary">Edit Property</button>
              <button className="btn-secondary">View Analytics</button>
            </div>
          </div>
        </div>

        {bookings.length > 0 && (
          <div className="bookings-section">
            <h2>Bookings ({bookings.length})</h2>
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <p className="booking-tenant">{booking.tenant_name || 'Tenant'}</p>
                    <p className="booking-dates">
                      {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="booking-status">
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}