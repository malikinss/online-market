import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const UpdateItem = () => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imgFile: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  useEffect(() => {
    // Fetch categories without auth check
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch all items without auth check
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/item");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchCategories();
    fetchItems();
  }, []);

  // Filter items based on selected category
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    try {
      if (categoryId) {
        const response = await axios.get("http://127.0.0.1:5000/api/item", {
          params: { categoryId: categoryId },
        });
        setItems(
          response.data.filter(
            (item) => item.categoryId === parseInt(categoryId)
          )
        );
      } else {
        // Reset to all items if no category is selected
        const response = await axios.get("http://127.0.0.1:5000/api/item");
        setItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Populate form fields based on selected item
  const handleItemChange = (e) => {
    const itemId = e.target.value;
    setSelectedItemId(itemId);

    const selectedItem = items.find((item) => item.id === parseInt(itemId));
    if (selectedItem) {
      setFormData({
        name: selectedItem.name,
        description: selectedItem.description,
        price: selectedItem.price,
        stock: selectedItem.stock,
        categoryId: selectedItem.categoryId,
        imgFile: null,
      });
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("Item not found. Please select a valid item.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imgFile: e.target.files[0],
    }));
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    // Check if the user has the "admin" role for PUT request
    if (role !== "admin") {
      setErrorMessage("You do not have permission to update an item.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("categoryId", formData.categoryId);
    if (formData.imgFile) {
      data.append("imgFile", formData.imgFile);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/item/${selectedItemId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsModalOpen(true); // Open modal on success
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setErrorMessage("Failed to update item. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
    navigate("/account");
  };

  return (
    <div>
      <h2>Update Item</h2>

      {/* Category selection */}
      <div>
        <label>Filter by Category:</label>
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
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Update item form */}
      <form onSubmit={handleUpdateItem}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image File:</label>
          <input type="file" name="imgFile" onChange={handleFileChange} />
        </div>
        <button type="submit">Update Item</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Item updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;
