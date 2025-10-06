// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ClientLayout from "./Clients-components/ClientLayout";   
// import AdminLayout from "./Admin/AdminLayout";
// import HomePage from "./Components/home/HomePage";
// import UserLogin from "./Components/userLogin/UserLogin";
// import UserOtpVerfication from "./Components/userLogin/UserOtpVerification";
// import PgSearch from "./Components/pgSearch/PgSearch";
// import UserChat from "./Components/userChats/UserChat";


// function App() {
//   return (
//     <Router>
//       {/* <Navbar /> Common Navbar Component */}
//       <Routes>
//         {/*User Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/user/login" element={<UserLogin />} />
//         <Route path="/user/otp-verification" element={<UserOtpVerfication />} />
//         <Route path="/user/chat" element={<UserChat />} />

        
//         {/* Client Routes */}
//         <Route path="/user/pgsearch" element={<PgSearch />} />

//         {/* Client Routes */}
//         <Route path="/client/*" element={<ClientLayout />} />
//         {/* Admin Routes */}
//         <Route path="/admin/*" element={<AdminLayout />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Add this import
import ProtectedRoute from "./routeProtect/ProtectedRoute"; // Suggested addition
import ClientLayout from "./Clients-components/ClientLayout";   
import AdminLayout from "./Admin/AdminLayout";
import HomePage from "./Components/home/HomePage";
import UserLogin from "./Components/userLogin/UserLogin";
import UserOtpVerfication from "./Components/userLogin/UserOtpVerification";
import PgSearch from "./Components/pgSearch/PgSearch";
import UserChat from "./Components/userChats/UserChat";
import BookPG from "./Components/pgSearch/BookPG";
import AddProof from "./Components/pgSearch/AddProof";
import MyStay_Main from "./Components/myStay/MyStay_Main"; // Updated import
import FoodMenuUser from "./Components/foodMenu/FoodMenu"; // Import FoodMenu component
import VacateRoom from "./Components/myStay/VacateRoom"; // Import VacateRoom component

import ServiceStatusPage from "./Components/raiseConcern/ServiceStatusPage"; // Import ServiceStatusPage component
import { ChatProvider } from './context/ChatContext';
import MyWishList from "./Components/whishList/MyWishList"; // Import MyWishList component
import UserProfile from "./Components/profile/userProfile";
import FigmaDeluxeHostel from "./Components/booking/FigmaDeluxeHostel";
import Cart from "./Components/cart/Cart"; // Import Cart component
import Paymenthistory from "./Components/paymentGateway/Paymenthistory"; // Import Paymenthistory component
import PayRent from "./Components/paymentGateway/PayRent";
import { Cancel } from "./Components/paymentGateway/Cancel";
import RiseConcern from "./Components/raiseConcern/RiseConcern";
import UserRegister from "./Components/userLogin/UserRegister"



function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <ChatProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/otp-verification" element={<UserOtpVerfication />} />
          <Route path="/user/pgsearch" element={<PgSearch />} />
          <Route path="/user/view-pg/:id" element={<BookPG />} />
          <Route path="/user/add-proof" element={<AddProof />} />

          {/* add to whishList */}
          {/* <Route path="/user/wishlist" element={<PgSearch />} /> */}
          <Route path="/user/wishlist" element={<MyWishList />} />
          {/* user profile */}
          <Route path="/user/profile" element={<UserProfile />} />
          {/* bookingng confirmation */}
          <Route path="/user/booking" element={<FigmaDeluxeHostel />} />

          {/* Payment User Routes */}
           {/* cart to pay */}
          <Route path="/user/pay-to-cart" element={<Cart />} />

          <Route path="/user/payment-history" element={<Paymenthistory />} />
          <Route path="/user/booking/conformation" element={<Cancel />} />
          <Route path="/user/pay-rent" element={<PayRent />} />

         
          
         

          {/* User Routes */}

          {/* my stay routes */}
          <Route 
            path="/user/my-stay"
            element={
              // <ProtectedRoute>
                <MyStay_Main />
              // </ProtectedRoute>
            }
          />
          <Route 
            path="/user/vacate-room"
            element={
            <VacateRoom />
            } />

            {/* user concerns */}
          <Route 
            path="/user/raise-concern"
            element={
              <RiseConcern />
            } />
            <Route 
            path="/user/concern/:id"
            element={
              <ServiceStatusPage />
            } />

          {/* food menu */}
          <Route 
            path="/user/food-menu" 
            element={
             <FoodMenuUser />
            } 
          />

          {/* Protected User Routes */}
          
          <Route 
            path="/user/chats" 
            element={
              // <ProtectedRoute>
                <UserChat />
              // </ProtectedRoute>
            } 
          />
       

          {/* Client Routes */}
          <Route path="/client/*" element={
            // <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout />
            // </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            // <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            // </ProtectedRoute>
          } />
        </Routes>
      </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;