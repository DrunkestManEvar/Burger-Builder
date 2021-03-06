import React, { Component } from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  cancelPurchaseHandler = () => this.props.history.goBack();

  continuePurchaseHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    const purchasedRedirect = this.props.isPurchased ? (
      <Redirect to="/" />
    ) : null;

    let summaryOrRedirect = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchaseContinued={this.continuePurchaseHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </>
    );

    if (!this.props.ingredients) {
      summaryOrRedirect = <Redirect to="/" />;
    }
    return summaryOrRedirect;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isPurchased: state.order.isPurchased,
  };
};

export default connect(mapStateToProps)(Checkout);
