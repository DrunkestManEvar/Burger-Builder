import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <Toolbar
          openSideDrawer={this.openSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          opened={this.state.showSideDrawer}
          clicked={this.closeSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null,
  };
};

export default connect(mapStateToProps)(Layout);
