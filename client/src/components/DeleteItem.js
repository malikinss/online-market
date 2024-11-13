import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const DeleteItem = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
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

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ITEMS}`);
        setItems(response.data);
        setFilteredItems(response.data); // Initial filter to show all items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Filter items by category when category changes
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    if (categoryId) {
      const filtered = items.filter(
        (item) => item.categoryId === parseInt(categoryId)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items); // Show all items if no category is selected
    }
  };

  // Handle item selection
  const handleItemChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  // Delete item
  const handleDeleteItem = async () => {
    // Check if the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to delete an item.");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_ITEMS}/${selectedItemId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(true); // Open modal on success
        setErrorMessage(""); // Clear any previous error messages
        // Remove deleted item from the list
        setFilteredItems(
          filteredItems.filter((item) => item.id !== parseInt(selectedItemId))
        );
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage("Failed to delete item. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Delete Item</h2>

      {/* Category selection */}
      <div>
        <label>Select Category:</label>
        <select value={selectedCategoryId} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Item selection */}
      <div>
        <label>Select Item:</label>
        <select value={selectedItemId} onChange={handleItemChange}>
          <option value="">Select an item</option>
          {filteredItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Delete button */}
      <button onClick={handleDeleteItem}>Delete Item</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Item deleted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteItem;
