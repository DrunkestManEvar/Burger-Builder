import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      activeClassName={classes.active}
      to={props.link}
      exact
      onClick={props.clicked}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
