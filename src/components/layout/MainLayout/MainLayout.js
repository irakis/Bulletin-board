import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';
//import { useSelector } from 'react-redux';
//import { getLoggedAuthor } from '../../../redux/authorRedux';

const Component = ({className, children}) => {

let currentUser = ''
  //const currentUser = { email: 'a1@a1.org' , phone: '2345643', location: 'Rio', isLogged: true, role: 'admin' }
  
  //useSelector(getLoggedAuthor);
  
    return (
    <div className={clsx(className, styles.root)}>
      <Header currentUser={currentUser} />
      { children }
    </div>
  );
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
