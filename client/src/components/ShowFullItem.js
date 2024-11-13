import React, { Component } from "react";

export class ShowFullItem extends Component {
  render() {
    const { name, description, price, img } = this.props.item;
    return (
      <div className="full-item">
        <div>
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
      </div>
    );
  }
}

export default ShowFullItem;
