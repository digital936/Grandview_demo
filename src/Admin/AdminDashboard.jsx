import { Link } from "react-router-dom";
import "../Admin/adminDashboard.css";
import { supabase } from "../lib/supabase";

const rentProperty = async (propertyId, tenantData) => {
  try {
    // 1️⃣ Create tenant auth user
    const { data, error } = await supabase.auth.admin.createUser({
      email: tenantData.email,
      password: tenantData.password,
      email_confirm: true
    });

    if (error) throw error;

    const userId = data.user.id;

    // 2️⃣ Insert into tenants table
    const { data: tenantInsert, error: tenantError } =
      await supabase.from("tenants").insert({
        user_id: userId,
        property_id: propertyId,
        name: tenantData.name,
        email: tenantData.email
      }).select().single();

    if (tenantError) throw tenantError;

    // 3️⃣ Update property
    await supabase.from("properties")
      .update({
        status: "rented",
        tenant_id: tenantInsert.id
      })
      .eq("id", propertyId);

    alert("Property rented successfully");

  } catch (err) {
    console.error(err);
    alert("Error renting property");
  }
};

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside>
        <h2>Grandview Admin</h2>
        <Link to="/admin/properties">Manage Properties</Link>
        <Link to="/admin/tenants">Manage Tenants</Link>
        <Link to="/admin/owners">Manage Owners</Link>
        <Link to="/admin/inquiries">View Inquiries</Link>
        <Link to="/admin/feedback">View Feedback</Link>
        <Link to="/admin/contacts">View ContactUs details</Link>
        <Link to="/admin/issues">View Tenant Issues</Link>
      </aside>

      <div className="admin-content">
        <h1>Welcome Admin</h1>
      </div>
    </div>
  );
}

