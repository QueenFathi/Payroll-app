import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./custom.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import StaffLayout from "./components/Layout2";
import Error from "./components/Error";
import Overview from "./admin/Overview";
import Staff from "./admin/Staff";
import Payroll from "./admin/Payroll";
import Profile from "./admin/Profile";
import Timesheet from "./admin/Timesheet";
import Dashboard from "./staff/Dashboard";
import Payslip from "./staff/Payslip";
import StaffProfile from "./staff/StaffProfile";
import StaffTimesheet from "./staff/StaffTimesheet";
import StaffLogin from "./auth/StaffLogin";
import AdminLogin from "./auth/AdminLogin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/fireConfig";
import { useState } from "react";

function App() {
  const [loggedin, setLoggedin] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  });
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StaffLogin loggedin={loggedin} />} />
          <Route path="/staff" element={<StaffLayout loggedin={loggedin} />}>
            <Route index element={<Dashboard />} />
            <Route path="payroll" element={<Payslip />} />
            <Route path="profile" element={<StaffProfile />} />
            <Route path="timesheet" element={<StaffTimesheet />} />
          </Route>
          <Route
            path="/admin-login"
            element={<AdminLogin loggedin={loggedin} />}
          />
          <Route path="/admin" element={<Layout loggedin={loggedin} />}>
            <Route index element={<Overview />} />
            <Route path="staff" element={<Staff />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="profile" element={<Profile />} />
            <Route path="timesheet" element={<Timesheet />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
