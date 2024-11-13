import React from "react";
import { FaTrash } from "react-icons/fa";

const Order = (props) => {
  const { name, img, counter, price } = props.item;

  return (
    <div className="item">
      <img src={`${process.env.REACT_APP_BACKENDSERVER}/${img}`} alt={name} />
      <h2>{name}</h2>
      <b>
        {price}₪ * {counter} = {(price * counter).toFixed(2)}
      </b>
      <FaTrash
        className="delete-icon"
        onClick={() => props.onDelete(props.item.id)}
      />
    </div>
  );
};

export default Order;
