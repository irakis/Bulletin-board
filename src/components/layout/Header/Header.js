import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar   from '../../common/AppBar';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({ className }) => {

  const [userRole, setUserRole] = useState('');
  
  let links;

  useEffect(()=>{
    const role = localStorage.getItem('currentUserRole');
    console.log('userRole w effect:', role);
    if (role) {
      setUserRole(role);
    } else {
      setUserRole('');
    }
  }, []);

  console.log('role from usestate:', userRole);
  
  if (userRole && userRole === ('admin' || 'user')) {
    links = [{text: 'Announcements', href: '/'}, {text: 'Logout', href: '/logout'}, { text: 'Login', href: '/auth/google'}]  
    return (
      <div className={clsx(className, styles.root)}>
        <AppBar links={links}/>
      </div>
    )
  } else {
    links = [{ text: 'Login', href: '/auth/google'}]

    return (
      <div className={clsx(className, styles.root)}>
        <AppBar links={links}/>
      </div>
    )
  }
};

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
