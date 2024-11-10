import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const CreateItem = () => {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imgFile: null,
  });
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Decode token to get role
  const decodedToken = jwtDecode(auth.token);
  const role = decodedToken.role;

  useEffect(() => {
    // Fetch categories on component mount
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

  const handleCreateItem = async (e) => {
    e.preventDefault();

    // Check if the user has the "admin" role
    if (role !== "admin") {
      setErrorMessage("You do not have permission to create an item.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("categoryId", formData.categoryId);
    data.append("imgFile", formData.imgFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/item",
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
      console.error("Error creating item:", error);
      setErrorMessage("Failed to create item. Please try again.");
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false); // Close modal
    navigate("/account"); // Redirect to /account
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <form onSubmit={handleCreateItem}>
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
          <label>Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image File:</label>
          <input
            type="file"
            name="imgFile"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Create Item</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <p>Item created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateItem;
