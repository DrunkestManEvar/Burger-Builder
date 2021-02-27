import * as actionTypes from './actions';

const INGREDIENTS_PRICES = {
  cheese: 0.7,
  meat: 1.3,
  bacon: 1.1,
  salad: 0.4,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const increasedIngredientTypeAmount =
        state.ingredients[action.ingredientType] + 1;
      const updatedIncreasedIngredients = {
        ...state.ingredients,
        [action.ingredientType]: increasedIngredientTypeAmount,
      };

      const updatedIncreasedPrice =
        state.totalPrice + INGREDIENTS_PRICES[action.ingredientType];

      return {
        ...state,
        ingredients: updatedIncreasedIngredients,
        totalPrice: updatedIncreasedPrice,
      };

    case actionTypes.REMOVE_INGREDIENT:
      const reducedIngredientTypeAmount =
        state.ingredients[action.ingredientType] - 1;
      const updatedReducedIngredients = {
        ...state.ingredients,
        [action.ingredientType]: reducedIngredientTypeAmount,
      };

      const updatedReducedPrice =
        state.totalPrice - INGREDIENTS_PRICES[action.ingredientType];

      return {
        ...state,
        ingredients: updatedReducedIngredients,
        totalPrice: updatedReducedPrice,
      };

    default:
      return state;
  }
};

export default reducer;
