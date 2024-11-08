import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const CreateCategory = () => {
  const [name, setName] = useState(""); // State for category name
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();
  const { auth } = useAuth(); // Access auth token

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  const handleCreateItem = async () => {
    // Check if the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to create a category.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/category",
        { name }, // Send the name in the request body
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Include token in header
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsModalOpen(true); // Open modal on success
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      setErrorMessage("Failed to create category. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false); // Close modal
    navigate("/account"); // Redirect to /account
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // Update name state
        placeholder="Enter category name"
      />
      <button onClick={handleCreateItem}>Create Category</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Category created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
