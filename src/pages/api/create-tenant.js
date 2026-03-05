// /pages/api/create-tenant.js
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // Supabase client with service_role key

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, password, property_id } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1️⃣ Create the user in Supabase Auth using service role key
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false
    });
    if (userError) throw userError;

    const userId = user.id;

    // 2️⃣ Insert into profiles
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({ id: userId, email, role: "tenant" });
    if (profileError) throw profileError;

    // 3️⃣ Insert into tenants
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from("tenants")
      .insert({ user_id: userId, name, email, property_id })
      .select()
      .single();
    if (tenantError) throw tenantError;

    // 4️⃣ Update property if assigned
    if (property_id) {
      const { error: propertyError } = await supabaseAdmin
        .from("properties")
        .update({ status: "rented", tenant_id: tenant.id })
        .eq("id", property_id);
      if (propertyError) throw propertyError;
    }

    res.status(200).json({ tenant });
  } catch (err) {
    console.error("Error creating tenant:", err);
    res.status(400).json({ error: err.message });
  }
}