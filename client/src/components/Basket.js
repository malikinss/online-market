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
  const [showModal, setShowModal] = useState(false); // Состояние для модального окна
  const navigate = useNavigate();

  const handleIncrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order) {
      onUpdate(id, order.counter + 1); // Увеличение количества
    }
  };

  const handleDecrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order.counter > 1) {
      onUpdate(id, order.counter - 1); // Уменьшение количества, если больше 1
    } else {
      onDelete(id); // Удаление элемента, если количество 1
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

    // Отправка данных на сервер
    axios
      .post("http://127.0.0.1:5000/api/order", orderData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Обработка ответа сервера
        // Удаляем все элементы из корзины после успешного создания заказа
        orders.forEach((order) => onDelete(order.id)); // Удаляем каждый элемент

        // Показать модальное окно
        setShowModal(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModalAndNavigate = () => {
    setShowModal(false); // Закрываем модальное окно
    navigate("/account/order-history"); // Перенаправление на историю заказов
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

      {/* Модальное окно */}
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
