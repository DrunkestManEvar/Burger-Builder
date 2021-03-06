import * as actionTypes from './actionTypes';
import axiosOrderInstance from '../../axios/axios-orders';

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData,
  };
};

const purchaseBurgerFailure = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error,
  };
};

export const purchaseBurgerAttempt = (orderData, tokenId) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axiosOrderInstance
      .post(`/orders.json?auth=${tokenId}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
      });
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

const fetchOrdersFailure = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    error,
  };
};

export const fetchOrdersAttempt = (tokenId, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    axiosOrderInstance
      .get(`/orders.json?auth=${tokenId}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        const fetchedOrders = [];
        for (const orderKey in res.data) {
          fetchedOrders.push({
            ...res.data[orderKey],
            id: orderKey,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailure(error));
      });
  };
};
