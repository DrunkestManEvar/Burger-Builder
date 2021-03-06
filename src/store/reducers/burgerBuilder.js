import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENTS_PRICES = {
  cheese: 0.7,
  meat: 1.3,
  bacon: 1.1,
  salad: 0.4,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  isBuilding: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      const ingredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
      };

      return updateObject(state, {
        ingredients,
        error: false,
        totalPrice: initialState.totalPrice,
        isBuilding: false,
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    case actionTypes.ADD_INGREDIENT: {
      const ingredientTypeAmount = state.ingredients[action.ingredientType] + 1;
      const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientType]: ingredientTypeAmount,
      });

      const updatedPrice =
        state.totalPrice + INGREDIENTS_PRICES[action.ingredientType];

      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        isBuilding: true,
      });
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const ingredientTypeAmount = state.ingredients[action.ingredientType] - 1;
      const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientType]: ingredientTypeAmount,
      });

      const updatedPrice =
        state.totalPrice - INGREDIENTS_PRICES[action.ingredientType];

      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        isBuilding: true,
      });
    }
    default:
      return state;
  }
};

export default reducer;
