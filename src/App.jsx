import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientLayout from "./Clients-components/ClientLayout";   


function App() {
  return (
    <Router>
      {/* <Navbar /> Common Navbar Component */}
      <Routes>
        {/* Client Routes */}
        <Route path="/client/*" element={<ClientLayout />} />
        {/* Admin Routes */}
        {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
      </Routes>
    </Router>
  );
}

export default App;