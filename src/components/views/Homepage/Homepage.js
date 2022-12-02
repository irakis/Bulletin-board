import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//import PostList from '../../features/PostList';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { fetchPublishedAuthors } from '../../../redux/authorRedux';
import { SimpleList } from '../../features/SimpleList';
import { fetchPublished } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';


const Component = ({className ,children}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchPublished());
    dispatch(fetchPublishedAuthors());
  }, [dispatch]);

  const allPosts = useSelector(getAll); 

  return (
    <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        {children}
        <SimpleList posts={allPosts}/>
    </div>
    );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

{/*const mapStateToProps = (state) => {
  console.log('mapStatToProps: ', state)
  return {
    allPosts : getAll(state),
  }
};

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);*/}

export {
  Component as Homepage,
  //Container as Homepage,
  Component as HomepageComponent,
};
