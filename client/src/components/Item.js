import React, { Component } from "react";

export class Item extends Component {
  render() {
    const { name, description, price, img } = this.props.item;
    return (
      <div className="item">
        <img
          src={`${process.env.REACT_APP_BACKENDSERVER}/${img}`}
          alt={name}
          onClick={() => this.props.onShowItem(this.props.item)}
        />
        <h2>{name}</h2>
        <p>{description}</p>
        <b>{price} ₪</b>
        <div
          className="add-to-cart"
          onClick={() => this.props.onAdd(this.props.item)}
        >
          +
        </div>
      </div>
    );
  }
}

export default Item;
