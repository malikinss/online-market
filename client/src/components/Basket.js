import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Basket = ({ products }) => {
  const [cart, setCart] = useState(products);
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return {
            ...item,
            quantity: newQuantity >= 0 ? newQuantity : 0,
          };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotal();
    const orderItems = cart.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

    try {
      const response = await axios.post(
        "/payment",
        JSON.stringify({ items: orderItems, total: totalAmount }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Payment processed successfully:", response.data);
      // Здесь можно перенаправить пользователя или уведомить об успешной оплате
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const goToHistory = () => {
    navigate("/account/basket/history");
  };

  const goBack = () => {
    navigate("/account");
  };

  return (
    <div>
      <h1>Your Basket</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div>
              <button onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
      <button onClick={handlePayment}>Pay</button>
      <button onClick={goToHistory}>History</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default Basket;
