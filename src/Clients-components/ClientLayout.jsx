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
import ServiceRequests from "./ServiceRequest/serviceRequests";
import ApprovalPage from "./ServiceRequest/ApprovalPage";
import CancelRequestPage from "./ServiceRequest/CancelRequestPage";
import TenantCheckoutRequest from "./CheckOutPages/TenantCheckoutRequest";
import ApproveCheckout from "./CheckOutPages/ApproveCheckout";
import FoodMenu from "./Food Menu/FoodMenu";
import TenantProfile from "./TenantList/TenantProfile";
import TenantList from "./TenantList/TenantList";
import AddTenant from "./TenantList/AddTenant";
import ConformBooking from "./TenantList/ConformBooking";
import TanentConfirmbox from "./CheckOutPages/TanentConfirmbox";
// import TenantFilter from "./TenantList/TenantFilter";
// import ClientNav from "./Client-Navbar/ClientNav";
import Main from "./ManageProperties/Main"


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
        <Route path="/servicerequests" element={<ServiceRequests />} />
        <Route path="/servicerequests/cancel/:id" element={<CancelRequestPage />} />
        <Route path="/servicerequests/approval/:id" element={<ApprovalPage />} />
        <Route path="/checkoutrequest" element={<TenantCheckoutRequest />} />
        <Route path="/approvecheckout/:id" element={<ApproveCheckout />} />
        <Route path="/confirm-booking" element={<TanentConfirmbox />} />
        <Route path="/foodmenu" element={<FoodMenu />} />
        <Route path="/tenantlist" element={<TenantList />} />
        <Route path="/confirmbooking" element={<ConformBooking />} />

        <Route path="/addtenant" element={<AddTenant />} />
        <Route path="/tenantprofile/:id" element={<TenantProfile />} />
        <Route path="/properties" element={<Main />} />

        

      </Routes>
    </div>
  );
};

export default ClientLayout;