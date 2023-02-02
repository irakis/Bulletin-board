import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { SimpleList } from '../../features/SimpleList';
import { fetchPublished } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';
import { useAuth0 } from '@auth0/auth0-react';

const Component = ({className ,children}) => {

  const { isAuthenticated, isLoading, user } = useAuth0();
  console.log('user w homepage', user);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPublished());
  }, [dispatch]);

  const allPosts = useSelector(getAll); 

  return (
    <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        {children}
        <SimpleList posts={allPosts}/>
    </div>
  );
} 

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Homepage,
  //Container as Homepage,
  Component as HomepageComponent,
};
