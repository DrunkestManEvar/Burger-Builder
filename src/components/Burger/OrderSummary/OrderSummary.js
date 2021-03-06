import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const orderList = Object.entries(this.props.ingredients).map(keyValPair => {
      const [ingredientName, ingredientValue] = keyValPair;
      return (
        <li key={ingredientName}>
          <span>{ingredientName}</span>: {ingredientValue}
        </li>
      );
    });

    return (
      <>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{orderList}</ul>
        <p>
          Total price:{' '}
          <span style={{ color: 'rgb(48, 145, 48)', fontWeight: 'bold' }}>
            ${this.props.price.toFixed(2)}
          </span>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.confirmPurchase}>
          Continue
        </Button>
      </>
    );
  }
}

export default OrderSummary;
