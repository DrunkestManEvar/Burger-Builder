import React, { Component } from 'react';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/CheckoutSummary/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosOrderInstance from '../../axios/axios-orders';
import classes from './Orders.module.css';

import * as actionCreators from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.initOrdersFetchingHandler(this.props.tokenId, this.props.userId);
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <div className={classes.Orders}>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price.toFixed(2)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    tokenId: state.auth.tokenId,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initOrdersFetchingHandler: (tokenId, userId) =>
      dispatch(actionCreators.fetchOrdersAttempt(tokenId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosOrderInstance));
