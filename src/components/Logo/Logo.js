import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = props => (
  <div className={classes.LogoContainer}>
    <img src={burgerLogo} alt="BurgerBuilder Logo" />
  </div>
);

export default Logo;
