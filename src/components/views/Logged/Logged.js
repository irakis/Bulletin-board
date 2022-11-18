import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';
import { SimpleList } from '../../features/SimpleList';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getLoggedAuthor } from '../../../redux/authorRedux';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Logged.module.scss';

const Component = ({className, children}) => {

  const currentUserEmail = window.localStorage.getItem('currnetUserEmail');
  console.log('currneUserEmail w Logged:', currentUserEmail)
  
  const allPosts = useSelector(getAll);
  let listOfTitles = [];

  const currentUser = useSelector(getLoggedAuthor);
  console.log('user w logged: ', currentUser);
  console.log('allposts w logged:', allPosts);

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
        <div>
        {(currentUser !== undefined) ? <Button sx={{ m: 3 }} variant="outlined" href='/post/add'>Add post</Button> : null}
        </div> 
          {children}
          {(currentUser !== undefined) ? <PostList posts={listOfTitles}/> : <SimpleList posts={listOfTitles}/>}
      </div>
      )
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
  Component as Logged,
  // Container as Homepage,
  Component as LoggedComponent,
};
