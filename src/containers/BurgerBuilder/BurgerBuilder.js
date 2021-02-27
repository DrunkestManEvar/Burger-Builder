import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrderInstance from '../../axios/axios-orders';

class BurgerBuilder extends Component {
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

  purchasingHandler = () => this.setState({ isPurchasing: true });

  cancelPurchasingHandler = () => this.setState({ isPurchasing: false });

  // componentDidMount() {
  //   axiosOrderInstance
  //     .get(
  //       'https://burger-builder-f2984-default-rtdb.firebaseio.com/ingredients.json'
  //     )
  //     .then(response => this.setState({ ingredients: response.data }))
  //     .catch(error => this.setState({ error: true }));
  // }

  confirmPurchaseHandler = () => this.props.history.push('/checkout');

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
        {this.state.error ? (
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: ingredientType =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType }),
    removeIngredientHandler: ingredientType =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrderInstance));
