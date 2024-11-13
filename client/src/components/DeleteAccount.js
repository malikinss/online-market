import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import "../index.css";

const DeleteAccount = () => {
  const { auth, setAuth } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Decode token to get user id and role
  const decodedToken = jwtDecode(auth.token);
  const userId = decodedToken.id;
  const role = decodedToken.role;

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_DELETEUSER}${userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      alert("Account deleted successfully");
      setAuth(null); // Clear auth context
      navigate("/registration"); // Redirect to registration page
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was an error deleting your account.");
    }
  };

  // Confirm account deletion
  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="delete-account-container">
      {role === "user" ? (
        <>
          <h2>Delete Account</h2>
          <button onClick={confirmDelete} className="button">
            Delete My Account
          </button>

          {showConfirmation && (
            <div className="modal">
              <p>Are you sure you want to delete your account?</p>
              <button onClick={handleDeleteAccount} className="button">
                Yes
              </button>
              <button onClick={() => navigate("/account")} className="button">
                No
              </button>
            </div>
          )}
        </>
      ) : (
        <p>You do not have permission to delete this account.</p>
      )}
    </div>
  );
};

export default DeleteAccount;
