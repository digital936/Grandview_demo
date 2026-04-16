
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";  
import Rent from "./pages/Rent";
import AdminProperties from "./Admin/AdminProperties";
import Buy from "./pages/Buy";
import PropertyDetails from "./pages/PropertyDetails";
import SearchResults from "./components/SearchResults";
import AdminTourRequests from "./Admin/AdminTourRequests";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./Admin/AdminFeedback";
import AdminContacts from "./Admin/AdminContacts";
import AdminIssues from "./Admin/AdminIssues";
import TenantDashboard from "./Tenant/TenantDashboard";
import OwnerDashboard from "./Owner/OwnerDashboard";
import MyProperties from "./Owner/MyProperties";
import OwnerPropertyDetails from "./Owner/PropertyDetails";
import Earnings from "./Owner/Earnings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminTenants from "./Admin/AdminTenants";
import AdminOwners from "./Admin/AdminOwners";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CityProperties from "./pages/CityProperties";
import EditOwner from "./Admin/EditOwner";
import PostProperty from "./pages/PostProperty";
import PostPropertySection from "./pages/PostPropertySection";
import AdminPostProperties from "./Admin/adminpostproperty";
import CommissionPlan from "./pages/CommissionPlan";
import Agents from "./pages/Agents";
import AgentProfile from "./pages/AgentProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import FilteredProperties from "./pages/FilteredProperties";
import AdminCommissionLeads from "./Admin/AdminCommissionLeads";
import AdminAgentApplications from "./Admin/AdminAgentApplications";
import RentLeadFlow from "./components/Rentleadflow";
import SellerLeadFlow from "./components/sellerleadflow";
import SellerLeads from "./Admin/adminSellerLeads";
import RentLeads from "./Admin/adminRentLeads";
import AdminScheduledCalls from "./Admin/admincalls";
import MLSListings from "./components/MLSListings";

/* 👇 Wrapper to hide navbar on admin pages */
function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/city/:cityName" element={<CityProperties />} />
        <Route path="/post-property" element={<PostProperty />} />
        <Route path="/post-property-section" element={<PostPropertySection />} />
        <Route path="/commission-plan" element={<CommissionPlan />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="admin/properties/:type" element={<FilteredProperties />} />
        <Route path="/rent-lead" element={<RentLeadFlow />} />
        <Route path="/seller-lead" element={<SellerLeadFlow />} />
        <Route path="/mls-listings" element={<MLSListings />} />
        

        {/* ===== ADMIN ROUTES ===== */}

        {/* Redirect /admin → login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Login (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/properties" element={
          <ProtectedRoute>
            <AdminProperties />
          </ProtectedRoute>
        } />

        <Route path="/admin/inquiries" element={
          <ProtectedRoute>
            <AdminTourRequests />
          </ProtectedRoute>
        } />

        <Route path="/admin/feedback" element={
          <ProtectedRoute>
            <AdminFeedback />
          </ProtectedRoute>
        } />

        <Route path="/admin/contacts" element={
          <ProtectedRoute>
            <AdminContacts />
          </ProtectedRoute>
        } />

        <Route path="/admin/issues" element={
          <ProtectedRoute>
            <AdminIssues />
          </ProtectedRoute>
        } />

        <Route path="/admin/tenants" element={
          <ProtectedRoute>
            <AdminTenants />
          </ProtectedRoute>
        } />

        <Route path="/admin/owners" element={
          <ProtectedRoute>
            <AdminOwners />
          </ProtectedRoute>
        } />

        <Route path="/admin/post-properties" element={
          <ProtectedRoute>
            <AdminPostProperties />
          </ProtectedRoute>
        } />

        <Route path="/edit-owner/:id" element={
          <ProtectedRoute>
            <EditOwner />
          </ProtectedRoute>
        } />

        <Route path="/admin/commission-leads" element={
          <ProtectedRoute>
            <AdminCommissionLeads />
          </ProtectedRoute>
        } />

        <Route path="/admin/agent-applications" element={
          <ProtectedRoute>
            <AdminAgentApplications />
          </ProtectedRoute>
        } />

        <Route path="/admin/rent-leads" element={
          <ProtectedRoute>
            <RentLeads />
          </ProtectedRoute>
        } />

        <Route path="/admin/seller-leads" element={
          <ProtectedRoute>
            <SellerLeads />
          </ProtectedRoute>
        } />

        <Route path="/admin/scheduled-calls" element={
          <ProtectedRoute>
            <AdminScheduledCalls />
          </ProtectedRoute>
        } />


        {/* ===== OWNER ROUTES ===== */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/my-properties" element={<MyProperties />} />
        <Route path="/owner/property/:propertyId" element={<OwnerPropertyDetails />} />
        <Route path="/owner/earnings" element={<Earnings />} />

        {/* ===== TENANT ROUTES ===== */}
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;