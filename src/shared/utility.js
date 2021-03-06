export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkInputValidity = (inputValue, validityRules) => {
  let isValid = true;

  if (!validityRules) return isValid;

  if (validityRules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(inputValue) && isValid;
  }

  if (validityRules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(inputValue) && isValid;
  }

  if (validityRules.isRequired) isValid = inputValue.trim() !== '' && isValid;

  if (validityRules.minLength)
    isValid = inputValue.trim().length >= validityRules.minLength && isValid;

  if (validityRules.maxLength)
    isValid = inputValue.trim().length <= validityRules.maxLength && isValid;

  return isValid;
};
