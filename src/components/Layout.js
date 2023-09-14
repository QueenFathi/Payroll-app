import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBars,
  FaTimes,
  FaHome,
  FaFileContract,
  FaUser,
  FaDoorOpen,
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
    backgroundColor: "aliceblue",
    color: "blue",
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
      <header
        className="navbar sticky-top bg-primary flex-md-nowrap px-2 shadow"
        data-bs-theme="dark"
      >
        <ul className="flex-row navbar-nav col-md-3 col-lg-2 me-0 flex-grow-1">
          <li className="nav-item text-nowrap d-md-none">
            <button
              className="nav-link px-3 text-white"
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
          <li className="align-self-center">
            <Link
              to="/"
              className="navbar-brand text-nowrap fs-4 px-md-3 text-white"
            >
              Company name
            </Link>
          </li>
        </ul>
        <div className="pe-4">
          <button
            type="button"
            className="btn position-relative rounded-circle p-0"
          >
            <FaBell />
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger p-1"
              style={{ fontSize: "8px" }}
            >
              0
            </span>
          </button>
        </div>
        <div className="dropdown pe-4 text-end align-self-center d-none d-sm-block">
          <Link
            className="d-block link-body-emphasis dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={imgSrc}
              alt="mdo"
              width="25"
              height="25"
              className="rounded-circle"
            />
            &nbsp;
            {`${userData?.firstName} ${userData?.lastName}`}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end text-small">
            <li>
              <Link to="profile" className="dropdown-item" href="#">
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <div onClick={handleSignout} className="dropdown-item">
                <FaDoorOpen /> Sign Out
              </div>
            </li>
          </ul>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="mysidebar sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div
              className="offcanvas-md offcanvas-start bg-body-tertiary"
              tabindex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                  Company name
                </h5>
                <button
                  type="button"
                  className="border-0 bg-light"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <NavLink
                      to="/admin"
                      end
                      className="nav-link d-flex align-items-center gap-2 active"
                      aria-current="page"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaHome />
                      Overview
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="staff"
                      className="nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaUser />
                      Staffs
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="payroll"
                      className="nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaFileContract />
                      Payroll
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="timesheet"
                      className="nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <BsFillFileSpreadsheetFill />
                      Timesheet
                    </NavLink>
                  </li>
                </ul>

                <hr className="my-3"></hr>

                <ul className="nav flex-column mb-auto">
                  <li className="nav-item">
                    <NavLink
                      to="profile"
                      className="nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaUser />
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <div
                      onClick={handleSignout}
                      className="nav-link d-flex align-items-center gap-2"
                    >
                      <FaDoorOpen />
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet context={{ userData }} />
          </main>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
