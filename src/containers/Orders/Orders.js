import React, { Component } from 'react';
import Order from '../../components/CheckoutSummary/Order/Order';
import axiosOrderInstance from '../../axios/axios-orders';
import classes from './Orders.module.css';

class Orders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    axiosOrderInstance
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (const orderKey in res.data) {
          fetchedOrders.push({
            ...res.data[orderKey],
            id: orderKey,
          });
        }
        this.setState({ orders: fetchedOrders });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className={classes.Orders}>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default Orders;
