import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar   from '../../common/AppBar';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className, currentUser }) => {
  //console.log('heder user: ', currentUser.role)
  let links;

  const dispatch = useDispatch();

  useEffect(()=>{
    const role = localStorage.getItem('currentUserRole');
    console.log('local storage reole:', role);
  }, [dispatch]);

  
  if (currentUser.role === ('admin' || 'user')) {
    links = [{text: 'Announcements', href: '/'}, {text: 'Logout', href: '/logout'}]  
    return (
      <div className={clsx(className, styles.root)}>
        <AppBar links={links}/>
      </div>
    )
  } else if (currentUser.role === undefined){
    links = [{ text: 'Login', href: '/auth/google'}]

    return (
      <div className={clsx(className, styles.root)}>
        <AppBar links={links}/>
      </div>
    )
  }
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
