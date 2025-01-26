import Reception from "./pages/reception/reception";
import StaffForm from "./pages/departmentStaff/department";
import AdminDashboard from "./admin/Admin";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/landingPage/LandingPage";
import Footer from "./pages/Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/reception" element={<Reception />} />
        <Route path="/departmentStaff" element={<StaffForm />} />
          </Routes>
          <Footer />
    </BrowserRouter>

  );
}
