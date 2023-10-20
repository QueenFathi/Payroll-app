import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaHashtag, FaLock } from "react-icons/fa";
import { auth } from "../config/fireConfig";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function AdminLogin({ loggedin }) {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then((userCredential) => {})
      .catch((error) => {
        toast.error(error.code);
      });
  };
  useEffect(() => {
    loggedin && navigate("/admin");
  }, [loggedin, navigate]);
  return (
    <div
      className="row h-100 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <div className="w-100 m-auto bg-light rounded p-4 p-sm-5">
          <form onSubmit={handleLogin}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-success fw-bold"><FaHashtag /> COMPANY</h2>
              <h3 className="fw-bold">Sign In</h3>
            </div>
            <div className="form-floating mb-4">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                required
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <FaEnvelope /> Email address
              </label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                required
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">
                <FaLock /> Password
              </label>
            </div>

            <button className="btn btn-success w-100 py-3" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}