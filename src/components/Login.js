import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
    return(
        <div className="container-lg d-flex align-items-center" style={{minHeight: "100vh"}}>
            <div class="form-signin w-100 m-auto">
                <form>
                    <h1 class="h3 mb-4">Sign In</h1>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput"><FaEnvelope /> Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword"><FaLock /> Password</label>
                    </div>
                    <div class="form-check text-start my-4">
                        <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault"> Remember me</label>
                    </div>
                    <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    )
}