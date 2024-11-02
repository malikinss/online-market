import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Account = () => {
  const { auth } = useContext(AuthContext);
  if (auth) console.log(auth);
  let userEmail = null;
  let userRole = null;

  const curToken = auth.token;
  console.log(curToken);

  if (curToken) {
    try {
      const decodedToken = jwtDecode(curToken);
      console.log(decodedToken);
      userEmail = decodedToken.email || null;
      userRole = decodedToken.role || null;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  return (
    <div>
      <h1>Personal Account</h1>
      {<p>Welcome, {userEmail}!</p>}

      {userRole === "user" && (
        <>
          <Link to="/account/basket">
            <button>Go to Basket</button>
          </Link>
          <Link to="/account/updateUser">
            <button>Update User</button>
          </Link>
        </>
      )}

      {userRole === "admin" && (
        <Link to="/account/admin_panel">
          <button>Admin Panel</button>
        </Link>
      )}
    </div>
  );
};

export default Account;
