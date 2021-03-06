import React, { Component, Suspense } from 'react';
import * as actionCreators from './store/actions/index';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.authAutoSignInHandler();
  }

  render() {
    const unauthRoutes = (
      <Suspense fallback={Spinner()}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    const authRoutes = (
      <Suspense fallback={Spinner()}>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              {this.props.isAuthorized && authRoutes}
              {!this.props.isAuthorized && unauthRoutes}
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.tokenId !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authAutoSignInHandler: () => dispatch(actionCreators.authCheckAutoSignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
