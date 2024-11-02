import React from "react";
import { FaTrash } from "react-icons/fa";

const Order = (props) => {
  const { name, img, counter } = props.item;

  return (
    <div className="item">
      <img src={`http://127.0.0.1:5000/${img}`} alt={name} />
      <h2>{name}</h2>
      <b>{counter}</b>
      <FaTrash
        className="delete-icon"
        onClick={() => props.onDelete(props.item.id)}
      />
    </div>
  );
};

export default Order;
