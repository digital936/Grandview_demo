// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import AboutUs from "./pages/AboutUs";
// import Contact from "./pages/Contact";
// import AdminLogin from "./Admin/AdminLogin";
// import AdminDashboard from "./Admin/AdminDashboard";  
// import Rent from "./pages/Rent";
// import AdminProperties from "./Admin/AdminProperties";
// import Buy from "./pages/Buy";
// import PropertyDetails from "./pages/PropertyDetails";
// import SearchResults from "./components/SearchResults";
// import AdminTourRequests from "./Admin/AdminTourRequests";
// import Feedback from "./pages/Feedback";
// import AdminFeedback from "./Admin/AdminFeedback";
// import AdminContacts from "./Admin/AdminContacts";
// import AdminIssues from "./Admin/AdminIssues";
// import TenantDashboard from "./Tenant/TenantDashboard";
// import OwnerDashboard from "./Owner/OwnerDashboard";
// import MyProperties from "./Owner/MyProperties";
// import OwnerPropertyDetails from "./Owner/PropertyDetails";
// import Earnings from "./Owner/Earnings";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminTenants from "./Admin/AdminTenants";
// import AdminOwners from "./Admin/AdminOwners";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import CityProperties from "./pages/CityProperties";
// import EditOwner from "./Admin/EditOwner";
// import PostProperty from "./pages/PostProperty";
// import PostPropertySection from "./pages/PostPropertySection";
// import AdminPostProperties from "./Admin/adminpostproperty";
// import CommissionPlan from "./pages/CommissionPlan";
// import Agents from "./pages/Agents";
// import AgentProfile from "./pages/AgentProfile";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/rent" element={<Rent />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/contact" element={<Contact />} />
//         {/* <Route path="/admin" element={<Navigate to="/admin/login" replace />} /> */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>} />
//         <Route path="/admin/properties" element={<AdminProperties />} />
//         <Route path="/buy" element={<Buy />} />
//         <Route path="/property/:id" element={<PropertyDetails />} />
//         <Route path="/search" element={<SearchResults />} />
//         <Route path="/admin/inquiries" element={<AdminTourRequests />} />
//         <Route path="/feedback" element={<Feedback />} />
//         <Route path="/admin/feedback" element={<AdminFeedback />} />
//         <Route path="/admin/contacts" element={<AdminContacts />} />
//         <Route path="/admin/issues" element={<AdminIssues />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/admin/tenants" element={<AdminTenants />} />
//         <Route path="/admin/owners" element={<AdminOwners />} />
//         <Route path="/city/:cityName" element={<CityProperties />} />
//         <Route path="/tenant-dashboard" element={<TenantDashboard />} />
//         <Route path="/owner-dashboard" element={<OwnerDashboard />} />
//         <Route path="/owner/dashboard" element={<OwnerDashboard />} />
//         <Route path="/owner/my-properties" element={<MyProperties />} />
//         <Route path="/owner/property/:propertyId" element={<OwnerPropertyDetails />} />
//         <Route path="/owner/earnings" element={<Earnings />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/edit-owner/:id" element={<EditOwner />} />
//         <Route path="/post-property-section" element={<PostPropertySection />} />
//         <Route path="/admin/post-properties" element={<AdminPostProperties />} />
//         <Route path="/post-property" element={<PostProperty />} />
//         <Route path="/commission-plan" element={<CommissionPlan />} />
        
//         <Route path="/agents" element={<Agents />} />
//         <Route path="/agents/:id" element={<AgentProfile />} />
        
//       </Routes>

      
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProperties from "./Admin/AdminProperties";
import AdminTourRequests from "./Admin/AdminTourRequests";
import AdminFeedback from "./Admin/AdminFeedback";
import AdminContacts from "./Admin/AdminContacts";
import AdminIssues from "./Admin/AdminIssues";
import AdminTenants from "./Admin/AdminTenants";
import AdminOwners from "./Admin/AdminOwners";
import AdminPostProperties from "./Admin/adminpostproperty";

import Rent from "./pages/Rent";
import Buy from "./pages/Buy";
import PropertyDetails from "./pages/PropertyDetails";
import SearchResults from "./components/SearchResults";
import Feedback from "./pages/Feedback";
import TenantDashboard from "./Tenant/TenantDashboard";
import OwnerDashboard from "./Owner/OwnerDashboard";
import MyProperties from "./Owner/MyProperties";
import OwnerPropertyDetails from "./Owner/PropertyDetails";
import Earnings from "./Owner/Earnings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CityProperties from "./pages/CityProperties";
import EditOwner from "./Admin/EditOwner";
import PostProperty from "./pages/PostProperty";
import PostPropertySection from "./pages/PostPropertySection";
import CommissionPlan from "./pages/CommissionPlan";
import Agents from "./pages/Agents";
import AgentProfile from "./pages/AgentProfile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
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

        {/* TENANT & OWNER */}
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/my-properties" element={<MyProperties />} />
        <Route path="/owner/property/:propertyId" element={<OwnerPropertyDetails />} />
        <Route path="/owner/earnings" element={<Earnings />} />

        {/* ================= ADMIN ROUTES ================= */}

        {/* Redirect /admin → login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Login */}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;