import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Order from "./Order";
import axios from "axios";
import "../index.css";

const Basket = (props) => {
  const { auth } = useAuth();
  const user_id = jwtDecode(auth.token).id;
  const { orders, totalPrice, onDelete, onUpdate } = props;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleIncrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order) {
      onUpdate(id, order.counter + 1); // Increase in quantity
    }
  };

  const handleDecrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order.counter > 1) {
      onUpdate(id, order.counter - 1); // Decrease quantity if more than 1
    } else {
      onDelete(id); // Remove element if quantity is 1
    }
  };

  const handlePayOrder = () => {
    const orderItems = orders.map((order) => ({
      itemId: order.id,
      quantity: order.counter,
    }));

    const orderData = {
      userId: user_id,
      orderItems,
    };

    // Sending data to the server
    axios
      .post(`${process.env.REACT_APP_ORDERS}`, orderData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Processing the server response

        // Clearing the shopping cart
        orders.forEach((order) => onUpdate(order.id, 1));
        orders.forEach((order) => onDelete(order.id));

        // Show modal window
        setShowModal(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModalAndNavigate = () => {
    setShowModal(false); // Close the modal window
    navigate("/account/order-history"); // Redirect to order history
  };

  const showOrders = () => (
    <div className="basket-container">
      {orders.map((el) => (
        <div key={el.id} className="order-item">
          <Order item={el} onDelete={onDelete} />
          <div>
            <button
              className="button-decrease"
              onClick={() => handleDecrease(el.id)}
            >
              -
            </button>
            <span>{el.counter}</span>
            <button
              className="button-increase"
              onClick={() => handleIncrease(el.id)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <p className="summa">Total price: {totalPrice.toFixed(2)} ₪</p>
      <button className="pay-order" onClick={handlePayOrder}>
        Order
      </button>
    </div>
  );

  const showNothing = () => (
    <div className="empty">
      <h2>Cart is empty</h2>
    </div>
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {orders.length > 0 ? showOrders() : showNothing()}

      {/* Modal window */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Ordered successfully!</p>
            <button onClick={closeModalAndNavigate}>To Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
