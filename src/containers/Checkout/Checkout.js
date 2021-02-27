import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  cancelPurchaseHandler = () => this.props.history.goBack();

  continuePurchaseHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <>
        {this.props.ingredients ? (
          <CheckoutSummary
            ingredients={this.props.ingredients}
            purchaseCancelled={this.cancelPurchaseHandler}
            purchaseContinued={this.continuePurchaseHandler}
          />
        ) : null}
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
