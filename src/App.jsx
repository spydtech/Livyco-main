import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientLayout from "./Clients-components/ClientLayout";   
import AdminLayout from "./Admin/AdminLayout";
import HomePage from "./Components/home/HomePage";


function App() {
  return (
    <Router>
      {/* <Navbar /> Common Navbar Component */}
      <Routes>
        {/*User Routes */}
        <Route path="/" element={<HomePage />} />
        {/* Client Routes */}
        <Route path="/client/*" element={<ClientLayout />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;