import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getLoggedAuthor } from '../../../redux/authorRedux';
import { getAll } from '../../../redux/postsRedux';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Logged.module.scss';

const Component = ({className, children}) => {
  
  const allPosts = useSelector(getAll);
  console.log('allPost w logged: ',allPosts);
  const currentUser = useSelector(getLoggedAuthor);

    return (
      <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        <div>
          <Button sx={{ m: 3 }} variant="outlined" href='/post/add'>Add post</Button>
        </div> 
          {children}
        <PostList posts={allPosts}/>
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
