import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';
import { SimpleList } from '../../features/SimpleList';
import { getAll, getOneAuthorPosts } from '../../../redux/postsRedux';
import { useAuth0 } from '@auth0/auth0-react'

import clsx from 'clsx';
import { useSelector } from 'react-redux'; 

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Logged.module.scss';

const Component = ({className, children}) => {

  const { isAuthenticated, isLoading, user } = useAuth0();
  const [ authorRole, setAuthorRole] = useState('admin')
  
  const id = user
  const allPosts = useSelector(getAll);
  const authorsPosts = useSelector(getOneAuthorPosts(id));

  if(isLoading) {
    return (
      <div  className={clsx(className, styles.root)} sx={{height: 300}}>...is loading</div>
    )
  } else {
  
  return (
    isAuthenticated && (
    <div className={clsx(className, styles.root)} sx={{height: 300}}>
      <div>
      {(authorRole !== undefined) ? <Button sx={{ m: 3 }} variant="outlined" href={`/posts/add`}>Add post</Button> : null}
      </div> 
        {children}
          {(authorRole === 'user' || authorRole === 'admin') ?
            <PostList posts={(authorRole === 'admin') ? allPosts : authorsPosts} /> 
            : <SimpleList posts={allPosts}/>
          }          
    </div>
    )
  )}
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
  Component as LoggedComponent,
};
