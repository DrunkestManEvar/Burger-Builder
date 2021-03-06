import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" clicked={props.clicked}>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated && (
      <NavigationItem link="/orders" clicked={props.clicked}>
        Orders
      </NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout" clicked={props.clicked}>
        Logout
      </NavigationItem>
    ) : (
      <NavigationItem link="/auth" clicked={props.clicked}>
        Login
      </NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
