import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

const Account = () => {
  const { auth } = useContext(AuthContext);

  let userEmail = null;
  let userRole = null;

  const curToken = auth?.token;
  console.log("Current token:", curToken);

  if (curToken) {
    try {
      const decodedToken = jwtDecode(curToken);
      console.log("Decoded token:", decodedToken);

      userEmail = decodedToken.email || null;
      userRole = decodedToken.role || null;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  return (
    <div>
      {userRole === "admin" ? <h1>Admin Panel</h1> : <h1>Personal Account</h1>}

      {userEmail && <p>Welcome, {userEmail}!</p>}

      {userRole === "user" && (
        <>
          <div>
            <ul>
              <li>
                <Link to="/account/basket">
                  <button>Cart</button>
                </Link>
              </li>
              <li>
                <Link to="/account/update_user">
                  <button>Update User</button>
                </Link>
              </li>
              <li>
                <Link to="/account/change_password">
                  <button>Change Password</button>
                </Link>
              </li>
              <li>
                <Link to="/account/delete_account">
                  <button>Delete Account</button>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}

      {userRole === "admin" && (
        <div>
          <h2>Admin Actions</h2>
          <ul>
            <li>
              <Link to="/account/create_category">
                <button>Create Category</button>
              </Link>
            </li>
            <li>
              <Link to="/account/update_category">
                <button>Update Category</button>
              </Link>
            </li>
            <li>
              <Link to="/account/delete_category">
                <button>Delete Category</button>
              </Link>
            </li>
            <li>
              <Link to="/account/create_item">
                <button>Create Item</button>
              </Link>
            </li>
            <li>
              <Link to="/account/update_item">
                <button>Update Item</button>
              </Link>
            </li>
            <li>
              <Link to="/account/delete_item">
                <button>Delete Item</button>
              </Link>
            </li>
            <li>
              <Link to="/account/update_user">
                <button>Update User</button>
              </Link>
            </li>
            <li>
              <Link to="/account/delete_user">
                <button>Delete User</button>
              </Link>
            </li>
            <li>
              <Link to="/account/update_order">
                <button>Update Order</button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Account;
