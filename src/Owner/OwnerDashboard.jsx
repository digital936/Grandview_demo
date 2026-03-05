

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import "./OwnerDashboard.css";

export default function OwnerDashboard() {

const [properties, setProperties] = useState([]);
const [stats, setStats] = useState({
total: 0,
available: 0,
rented: 0,
revenue: 0
});

useEffect(() => {
fetchOwnerProperties();
}, []);

async function fetchOwnerProperties() {

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user.id;

  console.log("Auth User:", userId);

  const { data: owner, error: ownerError } = await supabase
    .from("owners")
    .select("*")
    .eq("user_id", userId)
    .single();

  console.log("Owner record:", owner);

  if (!owner) {
    console.log("Owner not found");
    return;
  }

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", owner.id);

  console.log("Properties:", data);

  if (error) {
    console.log(error);
    return;
  }

  setProperties(data || []);
  calculateStats(data || []);
}

function calculateStats(data) {

const total = data.length;

const available = data.filter(
  (p) => p.status === "available"
).length;

const rented = data.filter(
  (p) => p.status === "rented"
).length;

const revenue = data
  .filter((p) => p.status === "rented")
  .reduce((sum, p) => sum + Number(p.price), 0);

setStats({
  total,
  available,
  rented,
  revenue
});


}

return ( <div className="owner-dashboard">


  <h1>Owner Dashboard</h1>

  {/* STATS */}
  <div className="stats-grid">

    <div className="stat-card">
      <h3>Total Properties</h3>
      <p>{stats.total}</p>
    </div>

    <div className="stat-card">
      <h3>Available</h3>
      <p>{stats.available}</p>
    </div>

    <div className="stat-card">
      <h3>Rented</h3>
      <p>{stats.rented}</p>
    </div>

    <div className="stat-card revenue">
      <h3>Monthly Revenue</h3>
      <p>${stats.revenue}</p>
    </div>

  </div>

  {/* PROPERTY LIST */}
  <div className="owner-properties">

    {properties.map((property) => (

      <div className="owner-property-card" key={property.id}>

        <img
          src={property.imageUrl}
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

);
}
