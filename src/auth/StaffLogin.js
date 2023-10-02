import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { auth, db } from "../config/fireConfig";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";

export default function Login({ loggedin }) {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    let signInMethods = await fetchSignInMethodsForEmail(
      auth,
      e.target.email.value
    );

    if (signInMethods.length > 0) {
      signInWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      )
        .then(() => {})
        .catch((error) => {
          toast.error(error.code);
        });
    } else {
      const docRef = doc(db, "staffs", e.target.email.value);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        createUserWithEmailAndPassword(
          auth,
          e.target.email.value,
          e.target.password.value
        )
          .then(() => {})
          .catch((error) => {
            toast.error(error.code);
          });
      } else {
        toast.error("Invalid credentials");
      }
    }
  };
  useEffect(() => {
    loggedin && navigate("/staff");
  }, [loggedin, navigate]);
  return (
    <div
      className="container-lg d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleLogin}>
          <h1 className="h3 mb-4">Sign In</h1>
          <div className="form-floating">
            <input
              type="email"
              name="email"
              required
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">
              <FaEnvelope /> Email address
            </label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              required
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">
              <FaLock /> Password
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
