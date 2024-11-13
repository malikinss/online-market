import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const DeleteUser = () => {
  const { auth } = useAuth();
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  // Handle user ID input change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setErrorMessage("");
  };

  // Delete user
  const handleDeleteUser = async () => {
    // Ensure the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to delete users.");
      return;
    }

    try {
      // Fetch the user to check their role
      const userResponse = await axios.get(
        `${process.env.REACT_APP_USERS}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const user = userResponse.data;
      if (user.role === "admin") {
        setErrorMessage("You cannot delete an admin user.");
        return;
      }

      // Proceed to delete the user
      await axios.delete(`${process.env.REACT_APP_DELETEUSER}${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setIsModalOpen(true); // Open modal on successful deletion
      setErrorMessage(""); // Clear any previous error messages
      setUserId(""); // Reset user ID input
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(
        "Failed to delete user. Please check the user ID and try again."
      );
    }
  };

  // Modal click handler
  const handleModalClick = () => {
    setIsModalOpen(false);
    navigate("/account"); // Redirect to admin panel
  };

  return (
    <div>
      <h2>Delete User</h2>

      {/* User ID input */}
      <input
        type="text"
        value={userId}
        onChange={handleUserIdChange}
        placeholder="Enter user ID"
      />

      {/* Delete button */}
      <button onClick={handleDeleteUser}>Delete User</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>User deleted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
