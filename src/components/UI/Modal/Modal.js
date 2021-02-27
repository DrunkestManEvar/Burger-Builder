import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, NextState) {
    return (
      nextProps.show !== this.props.show ||
      (this.props.show && nextProps.children !== this.props.children)
    );
  }

  componentDidUpdate() {
    console.log('Modal updated');
  }

  render() {
    const modalClasses = [classes.Modal];

    this.props.show
      ? modalClasses.push(classes.visible)
      : modalClasses.push(classes.invisible);

    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.closeModal} />
        <div className={modalClasses.join(' ')}>{this.props.children}</div>
      </>
    );
  }
}

export default Modal;
