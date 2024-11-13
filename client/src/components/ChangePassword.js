import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import "../index.css";

const ChangePassword = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Decode the token to get userId and role
  const decodedToken = jwtDecode(auth.token);
  const userId = decodedToken.id;
  const userRole = decodedToken.role;

  // Verify the user role is "user"
  if (userRole !== "user") {
    return <p>Access denied. Only users can change their passwords.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_CHANGEPASSWORD}${userId}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setShowModal(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Failed to change password. Please check your credentials.");
    }
  };

  return (
    <div className="form-container">
      <button onClick={() => navigate(-1)} className="button">
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        {error && <p className="message error-message">{error}</p>}
        <button type="submit" className="button">
          Change Password
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <p>Password changed successfully!</p>
          <button onClick={() => setShowModal(false)} className="button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
