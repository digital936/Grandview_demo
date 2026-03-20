
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./OwnerDashboard.css";
import OwnerLayout from "../layouts/OwnerLayout";
import StatsCard from "../components/StatsCard";

export default function OwnerDashboard() {

  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalEarnings: 0,
    occupancyRate: 0
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  async function fetchOwnerData() {
    try {
      setError(null);

      // 1. Get logged-in user
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        setError("User not authenticated");
        return;
      }

      const userId = userData.user.id;

      // 2. Get owner
      const { data: owner } = await supabase
        .from("owners")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!owner) {
        setError("Owner not found");
        return;
      }

      // 3. Get property IDs assigned to owner
      const { data: ownerProps } = await supabase
        .from("owner_properties")
        .select("property_id")
        .eq("owner_id", owner.id);

      const propertyIds = (ownerProps || []).map(p => p.property_id);

      if (propertyIds.length === 0) {
        setProperties([]);
        calculateStats([]);
        return;
      }

      // 4. Fetch actual properties
      const { data: propertiesData } = await supabase
        .from("properties")
        .select("*")
        .in("id", propertyIds);

      setProperties(propertiesData || []);

      calculateStats(propertiesData || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    }
  }

  function calculateStats(properties) {
    const totalProperties = properties.length;

    const rentedProperties = properties.filter(p => p.status === "rented").length;

    const occupancyRate =
      totalProperties > 0
        ? Math.round((rentedProperties / totalProperties) * 100)
        : 0;

    const totalEarnings = properties
      .filter(p => p.status === "rented")
      .reduce((sum, p) => sum + Number(p.price || 0), 0);

    setStats({
      totalProperties,
      totalEarnings,
      occupancyRate
    });
  }

  return (
    <OwnerLayout>
      <div className="owner-dashboard">

        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <p>Performance summary of your properties</p>
        </div>

        {/* KPI CARDS */}
        <div className="stats-grid">

          <StatsCard
            title="Total Properties"
            value={stats.totalProperties}
            icon="🏠"
          />

          <StatsCard
            title="Total Earnings"
            value={`$${stats.totalEarnings}`}
            icon="💰"
          />

          <StatsCard
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            icon="📊"
          />

        </div>

        {/* PROPERTIES */}
        <div className="owner-properties">

          {properties.length === 0 && (
            <p className="no-properties">No properties assigned yet</p>
          )}

          {properties.map((property) => (
            <div className="owner-property-card" key={property.id}>

              <img
                src={property.imageUrl || "/property-placeholder.jpg"}
                alt={property.title}
              />

              <div className="property-info">
                <h3>{property.title}</h3>
                <p>{property.city}</p>
                <p>Rent: ${property.price}</p>

                <p className={property.status}>
                  {property.status}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </OwnerLayout>
  );
}
