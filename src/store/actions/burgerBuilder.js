import * as actionTypes from './actionTypes';
import axiosOrderInstance from '../../axios/axios-orders';

export const addIngredient = ingredientType => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType,
  };
};

export const removeIngredient = ingredientType => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType,
  };
};

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axiosOrderInstance
      .get(
        'https://burger-builder-f2984-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
