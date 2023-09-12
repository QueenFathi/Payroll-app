import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import Layout from './components/Layout'
import StaffLayout from './components/Layout2'
import Error from './components/Error'
import Overview from './admin/Overview'
import Staff from './admin/Staff'
import Payroll from './admin/Payroll'
import Profile from './admin/Profile'
import Timesheet from './admin/Timesheet'
import Dashboard from './staff/Dashboard'
import Payslip from './staff/Payslip'
import StaffProfile from './staff/StaffProfile'
import StaffTimesheet from './staff/StaffTimesheet'
import Login from './components/Login'


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<StaffLayout />} errorElement={<Error />}>
      <Route index element={<Dashboard />} />
      <Route path='payroll' element={<Payslip />} />
      <Route path='profile'element={<StaffProfile/>} />
      <Route path='timesheet' element={<StaffTimesheet />} />
    </Route>
    <Route path="/admin" element={<Layout />}>
      <Route index element={<Overview />} />
      <Route path='staff' element={<Staff />} />
      <Route path='payroll' element={<Payroll />} />
      <Route path='profile'element={<Profile/>} />
      <Route path='timesheet' element={<Timesheet />} />
    </Route>
    <Route path='/login' element={<Login />} />
  </>
))


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
