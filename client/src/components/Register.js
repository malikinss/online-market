import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;
const REGISTER_URL = "/user/register";

const Register = () => {
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postal: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, pwd, matchPwd, phone, address]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInputs = validEmail && validPwd && validMatch;
    if (!validInputs) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password: pwd,
          phone,
          address: {
            country: address.country,
            city: address.city,
            street: address.street,
            building: parseInt(address.building),
            apartment: address.apartment ? parseInt(address.apartment) : null,
            postal: parseInt(address.postal),
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
      setPhone("");
      setAddress({
        country: "",
        city: "",
        street: "",
        building: "",
        apartment: "",
        postal: "",
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/user/login">Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
            />

            <label htmlFor="confirm_pwd">Confirm Password:</label>
            <input
              type="password"
              id="confirm_pwd"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="building">Building:</label>
            <input
              type="number"
              id="building"
              name="building"
              value={address.building}
              onChange={handleAddressChange}
              required
            />

            <label htmlFor="apartment">Apartment:</label>
            <input
              type="number"
              id="apartment"
              name="apartment"
              value={address.apartment}
              onChange={handleAddressChange}
            />

            <label htmlFor="postal">Postal Code:</label>
            <input
              type="text"
              id="postal"
              name="postal"
              value={address.postal}
              onChange={handleAddressChange}
              required
            />

            <button disabled={!validEmail || !validPwd || !validMatch}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?{" "}
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
