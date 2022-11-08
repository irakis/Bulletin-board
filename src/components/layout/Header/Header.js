import React from 'react';
import PropTypes from 'prop-types';
import AppBar   from '../../common/AppBar';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, currentUser }) => {
  
  let links;
  
  if (currentUser.role === ('admin' || 'user')) {
    links = [{text: 'Announcements', href: '/'}, {text: 'Logout', href: '/logout'}]  
  } else {
    links = [{ text: 'Login', href:  'https://google.com'}]
  }
  return (
    <div className={clsx(className, styles.root)}>
      <AppBar links={links}/>
    </div>
  )
};
Component.defaultProps = { 
  currentUser: ''
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
