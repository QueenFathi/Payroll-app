import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { auth } from "../config/fireConfig";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Login({ loggedin }) {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value
    )
      .then(() => {})
      .catch((error) => {
        toast.error(error.code);
      });
  };
  useEffect(() => {
    loggedin && navigate("/staff");
  }, [loggedin, navigate]);
  return (
    <div
      className="container-lg d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div class="form-signin w-100 m-auto">
        <form onSubmit={handleLogin}>
          <h1 class="h3 mb-4">Sign In</h1>
          <div class="form-floating">
            <input
              type="email"
              name="email"
              required
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">
              <FaEnvelope /> Email address
            </label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              name="password"
              required
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">
              <FaLock /> Password
            </label>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}