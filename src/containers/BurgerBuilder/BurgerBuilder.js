import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axiosOrderInstance from '../../axios/axios-orders';

export class BurgerBuilder extends Component {
  state = {
    isPurchasing: false,
    loadingOrder: false,
    error: false,
  };

  updateTotalIngredientsNum = () => {
    const ingredients = { ...this.props.ingredients };
    const ingredientsSum = Object.values(ingredients).reduce(
      (acc, curr) => acc + curr,
      0
    );

    return ingredientsSum > 0;
  };

  purchasingHandler = () => {
    // line below was added to replace the one in the confirmPurchaseHandler()
    this.props.initPurchaseHandler();
    if (!this.props.isAuthenticated) {
      this.props.setAuthRedirectPathHandler('/checkout');
      this.props.history.push('/auth');
    } else this.setState({ isPurchasing: true });
  };

  cancelPurchasingHandler = () => this.setState({ isPurchasing: false });

  componentDidMount() {
    this.props.initIngredientsHandler();
  }

  confirmPurchaseHandler = () => {
    // this.props.initPurchaseHandler();
    this.props.history.push('/checkout');
  };

  render() {
    let mainContent = <Burger ingredients={this.props.ingredients} />;
    if (!this.props.ingredients) mainContent = <Spinner />;

    return (
      <>
        <Modal
          show={this.state.isPurchasing}
          closeModal={this.cancelPurchasingHandler}
        >
          {this.state.loadingOrder || !this.props.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.props.ingredients}
              confirmPurchase={this.confirmPurchaseHandler}
              cancelPurchase={this.cancelPurchasingHandler}
              price={this.props.totalPrice}
            />
          )}
        </Modal>
        {this.props.error ? (
          <p>Something went wrong... Please try again later</p>
        ) : (
          mainContent
        )}
        {this.props.ingredients ? (
          <BuildControls
            addIngredient={this.props.addIngredientHandler}
            removeIngredient={this.props.removeIngredientHandler}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            isAuthenticated={this.props.isAuthenticated}
            canBuy={this.updateTotalIngredientsNum()}
            isPurchasing={this.purchasingHandler}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.tokenId !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIngredientsHandler: () => dispatch(actionCreators.initIngredients()),
    addIngredientHandler: ingredientType =>
      dispatch(actionCreators.addIngredient(ingredientType)),
    removeIngredientHandler: ingredientType =>
      dispatch(actionCreators.removeIngredient(ingredientType)),
    initPurchaseHandler: () => dispatch(actionCreators.initPurchase()),
    setAuthRedirectPathHandler: path =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrderInstance));
