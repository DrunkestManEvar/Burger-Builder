import React from 'react';
import Button from '../UI/Button/Button';
import Burger from '../Burger/Burger';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h3>Here's your order:</h3>
      <div className={classes.BurgerContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className={classes.BtnsContainer}>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
