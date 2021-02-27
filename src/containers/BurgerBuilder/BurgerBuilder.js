import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosOrderInstance from '../../axios/axios-orders';

const INGREDIENTS_PRICES = {
  cheese: 0.7,
  meat: 1.3,
  bacon: 1.1,
  salad: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    canBuy: false,
    isPurchasing: false,
    loadingOrder: false,
    error: false,
  };

  addIngredientHandler = type => {
    this.setState(prevState => {
      const newIngredientAmount = prevState.ingredients[type] + 1;
      const newIngredients = {
        ...prevState.ingredients,
        [type]: newIngredientAmount,
      };

      const newPrice = prevState.totalPrice + INGREDIENTS_PRICES[type];

      return { ingredients: newIngredients, totalPrice: newPrice };
    }, this.updateTotalIngredientsNum);
  };

  removeIngredientHandler = type => {
    this.setState(prevState => {
      const currentIngredientAmount = prevState.ingredients[type];

      if (currentIngredientAmount <= 0) return;

      const newIngredientAmount = currentIngredientAmount - 1;
      const newIngredients = {
        ...prevState.ingredients,
        [type]: newIngredientAmount,
      };

      const newPrice = prevState.totalPrice - INGREDIENTS_PRICES[type];

      return { ingredients: newIngredients, totalPrice: newPrice };
    }, this.updateTotalIngredientsNum);
  };

  updateTotalIngredientsNum = () => {
    const ingredients = { ...this.state.ingredients };
    const ingredientsSum = Object.values(ingredients).reduce(
      (acc, curr) => acc + curr,
      0
    );

    this.setState({ canBuy: ingredientsSum > 0 });
  };

  purchasingHandler = () => this.setState({ isPurchasing: true });

  cancelPurchasingHandler = () => this.setState({ isPurchasing: false });

  componentDidMount() {
    axiosOrderInstance
      .get(
        'https://burger-builder-f2984-default-rtdb.firebaseio.com/ingredients.json'
      )
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error: true }));
  }

  confirmPurchaseHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
    };

    const orderIngredientsArray = Object.entries(order.ingredients);
    let queryIngredientsString = orderIngredientsArray.reduce(
      (acc, curr) => (acc += [...curr] + ' '),
      ''
    );
    queryIngredientsString = queryIngredientsString.replaceAll(' ', '&');
    queryIngredientsString = queryIngredientsString.replaceAll(',', '=');

    const queryPriceString = order.price;

    this.props.history.push(
      '/checkout?' + queryIngredientsString + 'price=' + queryPriceString
    );

    // an easier approach would be to just simply pass the state.ingredients itself:
    // this.props.history.push({pathname: '/checkout', search={this.state.ingredients}})
  };

  render() {
    let mainContent = <Burger ingredients={this.state.ingredients} />;
    if (!this.state.ingredients) mainContent = <Spinner />;

    return (
      <>
        <Modal
          show={this.state.isPurchasing}
          closeModal={this.cancelPurchasingHandler}
        >
          {this.state.loadingOrder || !this.state.ingredients ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              confirmPurchase={this.confirmPurchaseHandler}
              cancelPurchase={this.cancelPurchasingHandler}
              price={this.state.totalPrice}
            />
          )}
        </Modal>
        {this.state.error ? (
          <p>Something went wrong... Please try again later</p>
        ) : (
          mainContent
        )}
        {this.state.ingredients ? (
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            canBuy={this.state.canBuy}
            isPurchasing={this.purchasingHandler}
          />
        ) : null}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrderInstance);
