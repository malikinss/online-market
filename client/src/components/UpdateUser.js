import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import "../index.css";

const UpdateUser = () => {
  const { auth } = useAuth();
  const decodedToken = jwtDecode(auth.token);
  const userId = decodedToken.id;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [addressData, setAddressData] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postal: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_USERS}/${userId}`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );

        const { user, address } = response.data;

        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        });

        setAddressData({
          country: address.country,
          city: address.city,
          street: address.street,
          building: address.building,
          apartment: address.apartment,
          postal: address.postal,
        });
      } catch (error) {
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [userId, auth.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await axios.put(
        `${process.env.REACT_APP_USERS}/${userId}`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          address: addressData,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setSuccess(true);
    } catch (error) {
      setError("Failed to update user data.");
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="form-container">
      <h2>Update User Information</h2>
      {error && <p className="message error-message">{error}</p>}
      {success && (
        <p className="message success-message">
          User information updated successfully!
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleUserChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleUserChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleUserChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleUserChange}
            className="input"
            required
          />
        </div>

        <h3>Address Information</h3>
        <div className="form-group">
          <label className="label">Country:</label>
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">City:</label>
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Street:</label>
          <input
            type="text"
            name="street"
            value={addressData.street}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Building:</label>
          <input
            type="number"
            name="building"
            value={addressData.building}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Apartment:</label>
          <input
            type="number"
            name="apartment"
            value={addressData.apartment}
            onChange={handleAddressChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Postal Code:</label>
          <input
            type="text"
            name="postal"
            value={addressData.postal}
            onChange={handleAddressChange}
            className="input"
          />
        </div>

        <button type="submit" className="button">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
