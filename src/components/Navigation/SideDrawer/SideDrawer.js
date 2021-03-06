import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = props => {
  const sideDrawerClasses = [classes.SideDrawer];

  props.opened
    ? sideDrawerClasses.push(classes.Opened)
    : sideDrawerClasses.push(classes.Closed);

  return (
    <>
      <Backdrop show={props.opened} clicked={props.clicked} />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.LogoControl}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuthenticated}
            clicked={props.clicked}
          />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
