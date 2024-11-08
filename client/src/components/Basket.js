// import React, { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import jwtDecode from "jwt-decode";
// import Order from "./Order";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../index.css";

// const Basket = (props) => {
//   const { orders, totalPrice, onDelete, onUpdate, setOrders } = props;
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const { auth } = useAuth();
//   const user_id = jwtDecode(auth.token).id;

//   useEffect(() => {
//     // Reset order submission state when new items are added to the basket
//     if (orders.length > 0 && isOrderSubmitted) {
//       setIsOrderSubmitted(false);
//     }
//   }, [orders]);

//   const handleIncrease = (id) => {
//     const order = orders.find((item) => item.id === id);
//     if (order) {
//       onUpdate(id, order.counter + 1);
//     }
//   };

//   const handleDecrease = (id) => {
//     const order = orders.find((item) => item.id === id);
//     if (order.counter > 1) {
//       onUpdate(id, order.counter - 1);
//     } else {
//       onDelete(id);
//     }
//   };

//   const handlePayOrder = () => {
//     const userId = user_id;
//     const orderItems = orders.map((order) => ({
//       itemId: order.id,
//       quantity: order.counter,
//     }));

//     const orderData = {
//       userId,
//       orderItems,
//     };

//     axios
//       .post("http://127.0.0.1:5000/api/order", orderData)
//       .then((response) => {
//         console.log(response.data);
//         setOrders([]); // Clear the basket after order is placed
//         setIsOrderSubmitted(true); // Set order as submitted
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleNavigateToPayment = () => {
//     navigate("/account/basket/payment");
//   };

//   const showOrders = () => (
//     <div className="basket-container">
//       {orders.map((el) => (
//         <div key={el.id} className="order-item">
//           <Order item={el} onDelete={onDelete} />
//           <div>
//             <button
//               className="button-decrease"
//               onClick={() => handleDecrease(el.id)}
//             >
//               -
//             </button>
//             <span>{el.counter}</span>
//             <button
//               className="button-increase"
//               onClick={() => handleIncrease(el.id)}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       ))}
//       <p className="summa">Total price: {totalPrice.toFixed(2)} ₪</p>

//       {!isOrderSubmitted ? (
//         <button
//           className="pay-order"
//           onClick={handlePayOrder}
//           disabled={isOrderSubmitted}
//         >
//           Order
//         </button>
//       ) : (
//         <button className="pass-to-payment" onClick={handleNavigateToPayment}>
//           Pass to Payment
//         </button>
//       )}
//     </div>
//   );

//   const showNothing = () => (
//     <div className="empty">
//       <h2>Basket is empty</h2>
//     </div>
//   );

//   return (
//     <div>
//       <h1>Your Basket</h1>
//       {orders.length > 0 ? showOrders() : showNothing()}
//     </div>
//   );
// };

// export default Basket;

import React from "react";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Order from "./Order";
import axios from "axios";
import "../index.css";

const Basket = (props) => {
  const { auth } = useAuth();
  const user_id = jwtDecode(auth.token).id;
  const { orders, totalPrice, onDelete, onUpdate } = props;

  const handleIncrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order) {
      onUpdate(id, order.counter + 1); // Increasing the quantity
    }
  };

  const handleDecrease = (id) => {
    const order = orders.find((item) => item.id === id);
    if (order.counter > 1) {
      onUpdate(id, order.counter - 1); // Reduce quantity if more than 1
    } else {
      onDelete(id); // Remove element if quantity is 1
    }
  };

  const handlePayOrder = () => {
    const userId = user_id; // Here you can take the user ID from props or context TO DO!!!
    const orderItems = orders.map((order) => ({
      itemId: order.id,
      quantity: order.counter,
    }));

    const orderData = {
      userId,
      orderItems,
    };

    // Sending data to the server
    axios
      .post("http://127.0.0.1:5000/api/order", orderData)
      .then((response) => {
        console.log(response.data); // Handle the server response
        // Remove items from basket after successful order submission
        orders.forEach((order) => onDelete(order.id));
      })
      .catch((error) => console.error("Error:", error));
  };

  const showOrders = () => {
    return (
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
  };

  const showNothing = () => (
    <div className="empty">
      <h2>Basket is empty</h2>
    </div>
  );

  return (
    <div>
      <h1>Your Basket</h1>
      {orders.length > 0 ? showOrders() : showNothing()}
    </div>
  );
};

export default Basket;
