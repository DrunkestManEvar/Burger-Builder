import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  const { inputType, invalid, touched, ...rest } = props;

  const { inputConfig, value } = rest;

  const inputClasses = [classes.Input];

  if (invalid && touched) inputClasses.push(classes.Invalid);

  let inputElement;

  switch (inputType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...inputConfig}
          value={value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea {...inputConfig} value={value} onChange={props.changed} />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={props.changed}
        >
          {inputConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      console.log(inputType);
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...rest}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
