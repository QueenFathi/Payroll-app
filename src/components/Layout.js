import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBars,
  FaTimes,
  FaHome,
  FaFileContract,
  FaUser,
  FaDoorOpen,
  FaUserFriends,
  FaHashtag,
} from "react-icons/fa";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { auth, db } from "../config/fireConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

export default function Layout({ loggedin }) {
  const activeStyles = {
    fontWeight: "bold",
    backgroundColor: "white",
    borderLeft: "3px solid rgb(25, 135, 84)",
    color: "rgb(25, 135, 84)",
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out");
        navigate("/admin-login");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  useEffect(() => {
    !loggedin && navigate("/admin-login");
  }, [loggedin, navigate]);
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "admin", auth?.currentUser?.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        toast.success("Login Successful");
      } else {
        signOut(auth)
          .then(() => {
            toast.error("Invalid Credentails");
          })
          .catch((err) => toast.error(err.code));
      }
    };
    if (auth?.currentUser) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setImgSrc(userData?.avatar);
    }
  }, [userData]);

  return userData ? (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="mysidebar sidebar col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div
              className="offcanvas-md offcanvas-start bg-body-tertiary"
              tabIndex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <h2 className="offcanvas-title text-success fw-bold" id="sidebarMenuLabel">
                  <FaHashtag /> COMPANY
                </h2>
                <button
                  type="button"
                  className="border-0 bg-white fs-5 px-3 py-2 rounded-circle"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <h2 className="text-success fw-bold p-3 d-none d-md-block"><FaHashtag /> COMPANY</h2>
                <ul className="nav flex-column px-3 pt-2 fs-4">
                  <li className="nav-item mb-1">
                    <NavLink
                      to="/admin"
                      end
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2"
                      aria-current="page"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaHome />
                      Overview
                    </NavLink>
                  </li>
                  <li className="nav-item mb-1">
                    <NavLink
                      to="employee"
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaUserFriends />
                      Employees
                    </NavLink>
                  </li>
                  <li className="nav-item mb-1">
                    <NavLink
                      to="payroll"
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaFileContract />
                      Payroll
                    </NavLink>
                  </li>
                  <li className="nav-item mb-1">
                    <NavLink
                      to="timesheet"
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <BsFillFileSpreadsheetFill />
                      Timesheet
                    </NavLink>
                  </li>
                </ul>

                <hr className="my-3"></hr>

                <ul className="nav flex-column mb-auto ps-3 fs-4">
                  <li className="nav-item mb-1">
                    <NavLink
                      to="profile"
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaUser />
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item mb-1">
                    <div
                      onClick={handleSignout}
                      className="rounded-end-pill nav-link d-flex align-items-center gap-2 nav-signout"
                      style={{color: "rgb(108, 117, 125)"}}
                    >
                      <FaDoorOpen />
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9 ms-sm-auto col-lg-10 p-0">
            <h2 className="d-block text-center p-3 shadow-sm d-block d-md-none">
              <Link
                to="/"
                className="text-success fw-bold"
              >
                <FaHashtag /> COMPANY
              </Link>
            </h2>
            <header
              className="navbar sticky-top flex-md-nowrap p-3 mb-4 bg-light"
            >
              <ul className="flex-row navbar-nav col-md-3 col-lg-2 me-0 flex-grow-1">
                <li className="nav-item text-nowrap d-md-none">
                  <button
                    className="nav-link fs-5 px-3 py-2 bg-white rounded-circle"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <FaBars />
                  </button>
                </li>
              </ul>
              <div className="pe-4">
                <button
                  type="button"
                  className="btn position-relative text-success rounded-circle px-3 py-2 bg-white fs-5"
                >
                  <FaBell />
                  <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary p-1"
                    style={{ fontSize: "6px" }}
                  >
                    0
                  </span>
                </button> <span className="d-none d-lg-inline" style={{cursor: 'pointer'}}>Notifications</span>
              </div>
              <div className="dropdown pe-4 text-end align-self-center">
                <Link
                  className="d-block link-body-emphasis dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={imgSrc}
                    alt="mdo"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                  &nbsp;
                  {`${userData?.firstName} ${userData?.lastName}`}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end bg-light border-0 text-small">
                  <li>
                    <Link to="profile" className="dropdown-item" href="#">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link
                      onClick={handleSignout}
                      className="dropdown-item"
                    >
                      <FaDoorOpen /> Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </header>
            <main className="px-2 mb-4 px-md-4">
              <Outlet context={{ userData }} />
            </main>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-success" style={{width: "3rem", height: "3rem",}} role="status">
        <span className="sr-only">...</span>
      </div>
    </div>
  );
}
