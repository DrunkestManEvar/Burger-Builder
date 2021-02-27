import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => this.setState({ showSideDrawer: false });

  openSideDrawerHandler = () => this.setState({ showSideDrawer: true });

  render() {
    return (
      <>
        <Toolbar openSideDrawer={this.openSideDrawerHandler} />
        <SideDrawer
          opened={this.state.showSideDrawer}
          backdropClick={this.closeSideDrawerHandler}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
