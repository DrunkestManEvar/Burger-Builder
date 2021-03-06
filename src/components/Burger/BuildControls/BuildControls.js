import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p className={classes.PricePara}>
      Current Price:{' '}
      <span className={classes.PriceValue}>${props.price.toFixed(2)}</span>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.type}
        label={control.label}
        added={() => props.addIngredient(control.type)}
        removed={() => props.removeIngredient(control.type)}
        isDisabled={props.ingredients[control.type] === 0}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.canBuy}
      onClick={props.isPurchasing}
    >
      {props.isAuthenticated ? 'Order Now!' : 'Sign In Before Continuing'}
    </button>
  </div>
);

export default BuildControls;
