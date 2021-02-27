import React from 'react';
import HamburgerButton from '../../UI/HamburgerButton/HamburgerButton';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <HamburgerButton click={props.openSideDrawer} />
    <div className={classes.LogoControl}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
