import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaFileContract,
  FaUser,
  FaDoorOpen,
  FaBell,
} from "react-icons/fa";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../config/fireConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function StaffLayout({ loggedin }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const activeStyles = {
    fontWeight: "bold",
    backgroundColor: "rgb(134, 239, 190)",
  };
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  useEffect(() => {
    !loggedin && navigate("/");
  }, [loggedin, navigate]);
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "staffs", auth.currentUser.email);
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
              tabindex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <h3 className="offcanvas-title text-success" id="sidebarMenuLabel">
                  Company Name
                </h3>
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
                <h3 className="text-success p-3 d-none d-md-block">Company Name</h3>
                <ul className="nav flex-column px-3 pt-2 fs-4">
                  <li className="nav-item">
                    <NavLink
                      to="/staff" end
                      className="rounded-end-pill text-secondary nav-link d-flex align-items-center gap-2"
                      aria-current="page"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaHome />
                      Overview
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="payslip"
                      className="rounded-end-pill text-secondary nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaFileContract />
                      Payslip
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="timesheet"
                      className="rounded-end-pill text-secondary nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <BsFillFileSpreadsheetFill />
                      Timesheet
                    </NavLink>
                  </li>
                </ul>

                <hr className="my-3"></hr>

                <ul className="nav flex-column mb-auto ps-3 fs-4">
                  <li className="nav-item">
                    <NavLink
                      to="profile"
                      className="rounded-end-pill text-secondary nav-link d-flex align-items-center gap-2"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      <FaUser />
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <div
                      onClick={handleSignout}
                      className="rounded-end-pill text-secondary nav-link d-flex align-items-center gap-2"
                    >
                      <FaDoorOpen />
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <main className="col-md-9 ms-sm-auto col-lg-10 p-0 m-0 px-md-4">
            <h2 className="d-block text-center p-3 shadow-sm d-block d-md-none">
              <Link
                to="/"
                className="text-success"
              >
                Company Name
              </Link>
            </h2>
            <header
              className="navbar sticky-top flex-md-nowrap mt-2 pb-3 mb-4 border-bottom"
            >
              <ul className="flex-row navbar-nav col-md-3 col-lg-2 me-0 flex-grow-1">
                <li className="nav-item text-nowrap d-md-none">
                  <button
                    className="nav-link fs-5 px-3"
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
                  className="btn position-relative text-success rounded-circle fs-5 p-0"
                >
                  <FaBell />
                  <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary p-1"
                    style={{ fontSize: "6px" }}
                  >
                    0
                  </span>
                </button>
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
                    <div
                      onClick={handleSignout}
                      className="dropdown-item"
                    >
                      <FaDoorOpen /> Sign Out
                    </div>
                  </li>
                </ul>
              </div>
            </header>
            <div className="px-2">
              <Outlet context={{ userData }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
