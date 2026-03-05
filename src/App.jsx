import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminTenants from "./Admin/AdminTenants";
import AdminOwners from "./Admin/AdminOwners";







function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/inquiries" element={<AdminTourRequests />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/issues" element={<AdminIssues />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/tenants" element={<AdminTenants />} />
        <Route path="/admin/owners" element={<AdminOwners />} />

        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
