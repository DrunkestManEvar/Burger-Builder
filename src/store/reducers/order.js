import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  isLoading: false,
  isPurchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_PURCHASE:
      return updateObject(state, { isPurchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { isLoading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, { id: action.id });

      return updateObject(state, {
        orders: state.orders.concat(newOrder),
        isLoading: false,
        isPurchased: true,
      });

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return updateObject(state, { isLoading: false });

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { isLoading: true });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { isLoading: false, orders: action.orders });

    case actionTypes.FETCH_ORDERS_FAILURE:
      return updateObject(state, { isLoading: false });

    default:
      return state;
  }
};

export default reducer;
