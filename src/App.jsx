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
import FoodMenu from "./Components/foodMenu/FoodMenu"; // Import FoodMenu component
import VacateRoom from "./Components/myStay/VacateRoom"; // Import VacateRoom component
import Concern from "./Components/raiseConcern/Concern";
import ServiceStatusPage from "./Components/raiseConcern/ServiceStatusPage"; // Import ServiceStatusPage component
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <ChatProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/otp-verification" element={<UserOtpVerfication />} />
          <Route path="/user/pgsearch" element={<PgSearch />} />
          <Route path="/user/view-pg/:id" element={<BookPG />} />
          <Route path="/user/add-proof" element={<AddProof />} />

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
              <Concern />
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
             <FoodMenu />
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