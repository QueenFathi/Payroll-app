import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FaEnvelope, FaHashtag, FaLock } from "react-icons/fa";
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
                name="email"
                required
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                <FaEnvelope /> Email address
              </label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                required
                className="form-control"
                id="floatingPassword"
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
