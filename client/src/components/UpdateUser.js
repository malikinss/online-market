import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UpdateUser = () => {
  const { auth } = useAuth();
  const userId = jwtDecode(auth.token).id; // Extracting ID from token
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postal: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await axios.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const userData = response.data;

        // Fill in the fields with the received data
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setAddress({
          country: userData.address?.country || "",
          city: userData.address?.city || "",
          street: userData.address?.street || "",
          building: userData.address?.building || "",
          apartment: userData.address?.apartment || "",
          postal: userData.address?.postal || "",
        });
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, [auth.token, userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/user/update/${userId}`,
        JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address: {
            country: address.country,
            city: address.city,
            street: address.street,
            building: parseInt(address.building),
            apartment: address.apartment ? parseInt(address.apartment) : null,
            postal: parseInt(address.postal),
          },
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        }
      );
      console.log("User updated successfully:", response.data);
      navigate("/account"); // Redirect to account page after update
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Function to go back
  const goBack = () => navigate("/account"); // Go to the account page

  return (
    <form onSubmit={handleUpdate}>
      <h1>Update User</h1>

      <label>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Phone:</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <h2>Address</h2>

      <label>Country:</label>
      <input
        type="text"
        value={address.country}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, country: e.target.value }))
        }
      />

      <label>City:</label>
      <input
        type="text"
        value={address.city}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, city: e.target.value }))
        }
      />

      <label>Street:</label>
      <input
        type="text"
        value={address.street}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, street: e.target.value }))
        }
      />

      <label>Building:</label>
      <input
        type="number"
        value={address.building}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, building: e.target.value }))
        }
      />

      <label>Apartment:</label>
      <input
        type="number"
        value={address.apartment}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, apartment: e.target.value }))
        }
      />

      <label>Postal:</label>
      <input
        type="number"
        value={address.postal}
        onChange={(e) =>
          setAddress((prev) => ({ ...prev, postal: e.target.value }))
        }
      />

      <button type="submit">Update</button>
      <button type="button" onClick={goBack}>
        Back
      </button>
    </form>
  );
};

export default UpdateUser;
