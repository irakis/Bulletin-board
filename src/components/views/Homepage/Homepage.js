import React from 'react';
import PropTypes from 'prop-types';
//import PostList from '../../features/PostList';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getLoggedAuthor } from '../../../redux/authorRedux';
import { SimpleList } from '../../features/SimpleList';
//import PostList from '../../features/PostList';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className, children}) => {

  const allPosts = useSelector(getAll);
  let listOfTitles = [];

  const currentUser = useSelector(getLoggedAuthor);
  console.log('user w homepage: ', currentUser);
  console.log('allposts w homepage:', allPosts);

  if (currentUser && currentUser.role === 'admin') {
    listOfTitles = allPosts;
  } else if (currentUser && currentUser.role === 'user') {
    listOfTitles = allPosts.filter( post => post.email === currentUser.email);
  } else if (currentUser === undefined){
    
    // eslint-disable-next-line
    allPosts.map((post) => {listOfTitles.push({title: post.title})})
  }
   
    
  console.log('listOfTitles', listOfTitles);
  
  return (
    <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        {children}
      {/*{(currentUser && currentUser.role === ('admin' || 'user')) ? <PostList posts={listOfTitles}/> : null}*/}
      <SimpleList posts={listOfTitles}/>
    </div>
    );
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
