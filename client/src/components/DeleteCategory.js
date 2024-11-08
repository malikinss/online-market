import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const DeleteCategory = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setErrorMessage("");
  };

  // Delete category
  const handleDeleteCategory = async () => {
    // Check if the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to delete a category.");
      return;
    }

    try {
      // Check if there are any items in this category
      const itemsResponse = await axios.get("http://127.0.0.1:5000/api/item");
      const categoryItems = itemsResponse.data.filter(
        (item) => item.categoryId === parseInt(selectedCategoryId)
      );

      if (categoryItems.length > 0) {
        setErrorMessage(
          "This category cannot be deleted. There are items associated with this category."
        );
        return;
      }

      // Proceed to delete the category
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/category/${selectedCategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(true); // Open modal on success
        setErrorMessage(""); // Clear any previous error messages
        // Remove deleted category from the list
        setCategories(
          categories.filter(
            (category) => category.id !== parseInt(selectedCategoryId)
          )
        );
        setSelectedCategoryId(""); // Reset selected category
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setErrorMessage("Failed to delete category. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Delete Category</h2>

      {/* Category selection */}
      <div>
        <label>Select Category:</label>
        <select value={selectedCategoryId} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Delete button */}
      <button onClick={handleDeleteCategory}>Delete Category</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Category deleted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCategory;
