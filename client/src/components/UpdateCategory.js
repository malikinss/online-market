import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const UpdateCategory = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CATEGORIES}`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Populate category name when a category is selected
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(categoryId)
    );
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Category not found. Please select a valid category.");
    }
  };

  // Handle input change for category name
  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Update category on form submission
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    // Check if the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to update a category.");
      return;
    }

    try {
      const data = { name: categoryName };

      const response = await axios.put(
        `${process.env.REACT_APP_CATEGORIES}/${selectedCategoryId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(true); // Open modal on success
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setErrorMessage("Failed to update category. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="update-category-container">
      <h2>Update Category</h2>

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

      {/* Update category form */}
      <form onSubmit={handleUpdateCategory}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            name="name"
            value={categoryName}
            onChange={handleNameChange}
            required
          />
        </div>
        <button type="submit">Update Category</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Category updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCategory;
