import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLogin from './AdminLogin/AdminLogin';
import Dashboard from './Dashboard/Dashboard';
// import PropertyDetails from './PropertyListings/PropertyDetails';
// import PropertyListings from './PropertyListings/PropertyListings';


const AdminLayout = () => {
    return (
        <>
         <Routes>
                <Route path="/admin-login" element={<AdminLogin />} />
                {/* Add other admin routes here */}
                <Route path="/dashboard/*" element={<Dashboard />} />
               
                {/* <Route path="/propertylistings" element={<PropertyListings />} /> */}

                {/* <Route path="/admin/users" element={<UsersPage />} /> */}
                {/* <Route path="/admin/reports" element={<ReportsPage />} /> */}
                {/* <Route path="/admin/support" element={<SupportPage />} /> */}
                {/* <Route path="/admin/settings" element={<SettingsPage />} /> */}

         </Routes>
          
        </>
    )
}

export default AdminLayout