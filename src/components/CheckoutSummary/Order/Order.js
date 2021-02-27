import React from 'react';
import classes from './Order.module.css';

const Order = props => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map(ingredient => {
    return (
      <span key={ingredient.name} className={classes.Ingredients}>
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <h4>Order</h4>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
