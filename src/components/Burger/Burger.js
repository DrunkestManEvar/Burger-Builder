import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients) // ['cheese', 'meat', 'bacon', 'salad']
    .map(ingredKey =>
      [...Array(props.ingredients[ingredKey])].map((_, i) => (
        <BurgerIngredient
          key={ingredKey + i}
          type={ingredKey}
        ></BurgerIngredient>
      ))
    )
    .reduce((acc, curr) => acc.concat(curr), []);

  if (transformedIngredients.length === 0)
    transformedIngredients = <p>Please add ingredients!</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
