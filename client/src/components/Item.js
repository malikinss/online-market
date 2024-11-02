import React, { Component } from 'react';

export class Item extends Component {
  render() {
    const { name, description, price, img } = this.props.item;
    return (
      <div className='item'>
        <img src={`http://127.0.0.1:5000/${img}`} alt={name} onClick={() => this.props.onShowItem(this.props.item)} />
        <h2>{name}</h2>
        <p>{description}</p>
        <b>{price} ₪</b>
        <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
      </div>
    );
  }
}

export default Item