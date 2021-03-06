import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import { updateObject, checkInputValidity } from '../../shared/utility';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        inputType: 'input',
        inputConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          isRequired: true,
          isEmail: true,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      password: {
        inputType: 'input',
        inputConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 6,
        },
        isValid: false,
        hasBeenTouched: false,
      },
    },
    isSigningUp: true,
  };

  changeSignUpState = e => {
    e.preventDefault();
    this.setState(prevState => ({ isSigningUp: !prevState.isSigningUp }));
  };

  formChangeHandler = (e, formElementKey) => {
    const newInputValue = e.target.value;

    this.setState(prevState => {
      const newControls = updateObject(prevState.controls, {
        [formElementKey]: updateObject(prevState.controls[formElementKey], {
          value: newInputValue,
          isValid: checkInputValidity(
            newInputValue,
            prevState.controls[formElementKey].validation
          ),
          hasBeenTouched: true,
        }),
      });

      return { controls: newControls };
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();

    this.props.authHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSigningUp
    );
  };

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/')
      this.props.setAuthRedirectPathHandler('/');
  }

  render() {
    const formElements = [];

    for (const key in this.state.controls) {
      formElements.push({ id: key, ...this.state.controls[key] });
    }

    let formOrSpinner = formElements.map(formElement => {
      return (
        <Input
          key={formElement.id}
          inputType={formElement.inputType}
          inputConfig={formElement.inputConfig}
          value={formElement.value}
          invalid={!formElement.isValid}
          touched={formElement.hasBeenTouched}
          label={formElement.id}
          changed={e => this.formChangeHandler(e, formElement.id)}
        />
      );
    });

    if (this.props.isLoading) formOrSpinner = <Spinner />;

    let errorMessage = null;
    if (this.props.error) errorMessage = this.props.error;

    let authRedirect = null;
    if (this.props.isAuthenticated)
      authRedirect = <Redirect to={this.props.authRedirectPath} />;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h2>{this.state.isSigningUp ? 'Sign Up' : 'Sign In'}</h2>
        <form className={classes.Auth__form}>
          {errorMessage}
          {formOrSpinner}
          <Button btnType="Success" clicked={this.formSubmitHandler}>
            {this.state.isSigningUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button btnType="Danger" clicked={this.changeSignUpState}>
            {this.state.isSigningUp
              ? 'Already signed up? Sign In!'
              : `Don't have an account? Sign Up!`}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.tokenId !== null,
    authRedirectPath: state.auth.authRedirectPath,
    isBuildingBurger: state.burgerBuilder.isBuilding,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authHandler: (email, password, isSigningUp) =>
      dispatch(actionCreators.authAttempt(email, password, isSigningUp)),
    setAuthRedirectPathHandler: () =>
      dispatch(actionCreators.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
