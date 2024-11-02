import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
// import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const LOGIN_URL = "/user/login";

const Login = () => {
<<<<<<< Updated upstream
  // const { setAuth } = useAuth();
  const { setAuth } = useContext(AuthContext);
=======
    //   const { setAuth } = useAuth();
    const { setAuth } = useContext(AuthContext);
>>>>>>> Stashed changes

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const { accessToken, role } = response?.data;
            setAuth({ email, password, role, accessToken });

            setEmail("");
            setPwd("");

            navigate(from, { replace: true });
        } catch (err) {
            const status = err?.response?.status;

            const errorMessages = {
                400: "Missing Email or Password",
                401: "Unauthorized",
            };

            const message = errorMessages[status] || "Login Failed";

            setErrMsg(!status ? "No Server Response" : message);
            errRef.current?.focus();
        }
<<<<<<< Updated upstream
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      console.log(role);
=======
    };
>>>>>>> Stashed changes

    return (
        <section>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className="line">
                    <Link to="/registration">Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;
