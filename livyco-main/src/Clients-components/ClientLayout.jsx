import { Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Home from "../pages/client/Home";
// import About from "../pages/client/About";
// import Contact from "../pages/client/Contact";
// import NotFound from "../pages/NotFound";
// import PropertyListing from "./PropertyListing"
import Clientmain from "./Clientmain";
import ClientLogin from "./Client-Login/ClientLogin";
import OTPVerification from "./Client-Login/OTPVerification ";
import ClientHomePage from "./Client-Home/ClientHomePage";
import ClientDashboard from "./Client-Dashboard/ClientDashboard";
import TenantRequestTable from "./TenantRequests/TenantRequestTable";
import TenantDetails from "./TenantRequests/TenantDetails";
// import ClientNav from "./Client-Navbar/ClientNav";


const ClientLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/client-main" element={<Clientmain />} />
        
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/client-otpverify" element={<OTPVerification />} />
        <Route path="/home" element={<ClientHomePage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/tenantrequest" element={<TenantRequestTable />} />
        <Route path="/tenant-request-view/:id" element={<TenantDetails />} />



        
      </Routes>
    </div>
  );
};

export default ClientLayout;