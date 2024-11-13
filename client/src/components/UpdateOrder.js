import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const UpdateOrder = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [newStatus, setNewStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const decodedToken = jwtDecode(auth.token);
  const isAdmin = decodedToken.role === "admin";

  // Function to get a list of orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_ORDERS}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // Filter orders excluding "Delivered" and "Canceled" statuses, and sort by creation date
      const filteredOrders = response.data
        .filter(
          (order) => order.status !== "Delivered" && order.status !== "Canceled"
        )
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // We receive orders when the component is first loaded
  useEffect(() => {
    fetchOrders();
  }, []);

  // We update the selected status for the order
  const handleSelectChange = (orderId, status) => {
    setNewStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: status,
    }));
  };

  // Function for changing the order status
  const handleStatusChange = async (orderId) => {
    const statusToUpdate = newStatus[orderId];
    if (!statusToUpdate) {
      console.warn("Please select a new status before updating.");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_ORDERS}/${orderId}`, {
        status: statusToUpdate,
      });

      // Re-request for orders after status update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h1>Order Management</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <p className="order-info">
                Total Price:{" "}
                <span className="order-value">{order.totalPrice} ₪</span>
              </p>
              <p className="order-info">
                Status: <span className="order-value">{order.status}</span>
              </p>
              <p className="order-info">
                Created At:{" "}
                <span className="order-value">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="order-info">
                Updated At:{" "}
                <span className="order-value">
                  {new Date(order.updatedAt).toLocaleString()}
                </span>
              </p>

              {/* Drop down menu for selecting a new status */}
              <select
                className="compact-select"
                value={newStatus[order.id] || ""}
                onChange={(e) => handleSelectChange(order.id, e.target.value)}
              >
                <option value="">Select new status</option>
                <option value="Processing">Order in process</option>
                <option value="Shipped">Shipped</option>
                <option value="Canceled">Canceled</option>
                <option value="Delivered">Delivered</option>
              </select>

              {/* Button to change status */}
              <button
                onClick={() => handleStatusChange(order.id)}
                disabled={!newStatus[order.id] || order.status === "Delivered"}
                style={{
                  marginLeft: "5px",
                  padding: "6px 10px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Change status
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateOrder;
