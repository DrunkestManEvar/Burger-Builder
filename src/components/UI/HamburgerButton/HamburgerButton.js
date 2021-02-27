import React from 'react';
import classes from './HamburgerButton.module.css';

const HamburgerButton = props => {
  const hamburgerButtonClasses = [classes.Hamburger];

  if (props.showSideBar) hamburgerButtonClasses.push(classes.clicked);

  return (
    <div className={hamburgerButtonClasses.join(' ')} onClick={props.click}>
      <span className={classes.HamburgerLine}></span>
      <span className={classes.HamburgerLine}></span>
      <span className={classes.HamburgerLine}></span>
    </div>
  );
};

export default HamburgerButton;
