import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: null,
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search).entries();
    const ingredients = {};
    let price;

    for (const param of query) {
      const [key, value] = param;
      if (key !== 'price') ingredients[key] = +value;
      else price = +value;
    }
    this.setState({ ingredients: { ...ingredients }, totalPrice: price });
  };

  cancelPurchaseHandler = () => this.props.history.goBack();

  continuePurchaseHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <>
        {this.state.ingredients ? (
          <CheckoutSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
          />
        ) : null}
        <Route
          path={this.props.match.url + '/contact-data'}
          render={props => (
            <ContactData
              price={this.state.totalPrice}
              ingredients={this.state.ingredients}
              {...this.props}
            />
          )}
        />
      </>
    );
  }
}

export default Checkout;
