import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const OrderHistory = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const userId = jwtDecode(auth.token).id;

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/order/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.order.createdAt) - new Date(a.order.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth.token, userId]);

  const handlePayOrder = async (orderId, paymentId) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/order/${orderId}`,
        { status: "Paid" },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      await axios.put(
        `http://127.0.0.1:5000/api/payment/${paymentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order.id === orderId
            ? { ...order, order: { ...order.order, status: "Paid" } }
            : order
        )
      );

      setModalMessage("Payment successfully updated.");
      setShowModal(true);

      fetchOrders();
    } catch (error) {
      console.error("Error updating payment or order status:", error);
    }
  };

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.order.id} className="order-item">
              <p className="order-info">
                Order ID: <span className="order-value">{order.order.id}</span>
              </p>
              <p className="order-info">
                Total Price:{" "}
                <span className="order-value">${order.order.totalPrice}</span>
              </p>
              <p className="order-info">
                Status:{" "}
                <span className="order-value">{order.order.status}</span>
              </p>
              <p className="order-info">
                Created At:{" "}
                <span className="order-value">
                  {new Date(order.order.createdAt).toLocaleString()}
                </span>
              </p>
              {order.order.status === "Unpaid" && (
                <button
                  onClick={() =>
                    handlePayOrder(order.order.id, order.payment.id)
                  }
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    maxWidth: "150px",
                    float: "right",
                  }}
                >
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal window */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button
              onClick={() => {
                setShowModal(false);
                fetchOrders();
              }}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
