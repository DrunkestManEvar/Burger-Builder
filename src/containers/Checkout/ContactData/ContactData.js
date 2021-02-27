import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axiosOrderInstance from '../../../axios/axios-orders';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    formOrder: {
      name: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      email: {
        inputType: 'input',
        inputConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      country: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your country',
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      street: {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      'Zip Code': {
        inputType: 'input',
        inputConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code',
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 3,
          maxLength: 10,
        },
        isValid: false,
        hasBeenTouched: false,
      },
      'Delivery Method': {
        inputType: 'select',
        inputConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        isValid: true,
        hasBeenTouched: false,
      },
    },
    isFormValid: false,
  };

  formSubmitHandler = e => {
    e.preventDefault();

    const formData = {};

    for (const inputIdentifier in this.state.formOrder) {
      formData[inputIdentifier] = this.state.formOrder[inputIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData,
    };

    this.setState({ loadingOrder: true }, () => {
      axiosOrderInstance
        .post('/orders.json', order)
        .then(response => console.log(order))
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ loadingOrder: false });
          this.props.history.push('/');
        });
    });
  };

  checkInputValidity = (inputValue, validityRules) => {
    let isValid = true;

    if (!validityRules) return isValid;

    if (validityRules.isRequired) isValid = inputValue.trim() !== '' && isValid;

    if (validityRules.minLength)
      isValid = inputValue.trim().length >= validityRules.minLength && isValid;

    if (validityRules.maxLength)
      isValid = inputValue.trim().length <= validityRules.maxLength && isValid;

    return isValid;
  };

  inputChangeHandler = (e, inputIdentifier) => {
    const inputNewValue = e.target.value;
    this.setState(prevState => {
      const newFormOrder = { ...prevState.formOrder };
      const newInputElement = { ...prevState.formOrder[inputIdentifier] };
      newInputElement.value = inputNewValue;
      newInputElement.hasBeenTouched = true;
      newInputElement.isValid = this.checkInputValidity(
        inputNewValue,
        newInputElement.validation
      );
      newFormOrder[inputIdentifier] = newInputElement;

      const isNewFormValid = Object.keys(newFormOrder)
        .map(inputIdentifier => newFormOrder[inputIdentifier].isValid)
        .every(isValidBoolean => isValidBoolean === true);

      return { formOrder: newFormOrder, isFormValid: isNewFormValid };
    });
  };

  render() {
    const formInputs = [];

    for (const key in this.state.formOrder) {
      formInputs.push({ ...this.state.formOrder[key], id: key });
    }

    let formOrSpinner = (
      <>
        <h4>Please enter your contact details:</h4>
        <form
          className={classes.ContactData__form}
          onSubmit={this.formSubmitHandler}
        >
          {formInputs.map(input => (
            <Input
              key={input.id}
              inputType={input.inputType}
              inputConfig={input.inputConfig}
              value={input.value}
              invalid={!input.isValid}
              touched={input.hasBeenTouched}
              label={input.id}
              changed={e => this.inputChangeHandler(e, input.id)}
            />
          ))}
          <Button
            btnType="Success"
            disabled={!this.state.isFormValid}
            clicked={this.orderBtnClickHandler}
          >
            Order now
          </Button>
        </form>
      </>
    );

    if (this.state.loadingOrder) formOrSpinner = <Spinner />;

    return <div className={classes.ContactData}>{formOrSpinner}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);
