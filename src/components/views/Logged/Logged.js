import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';
import { SimpleList } from '../../features/SimpleList';
import { getAll, getOneAuthorPosts } from '../../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPublishedAuthors, getLoggedAuthor, loadAuthorsRequest } from '../../../redux/authorRedux';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Logged.module.scss';

const Component = ({className, children}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchPublishedAuthors())
  }, []);

  const navigate = useNavigate();

  const allPosts = useSelector(getAll);
  let listOfTitles = [];

  const currentUser = useSelector(getLoggedAuthor);
  console.log('logged user?: ', currentUser);
  const authorsPosts = useSelector(getOneAuthorPosts(currentUser)); 

  if (currentUser && currentUser.role === 'admin') {
    listOfTitles = allPosts;
  } else if (currentUser && currentUser.role === 'user') {
    listOfTitles = authorsPosts;
  } else if (currentUser === undefined){    
      navigate('/');
  }
     
  console.log('listOfTitles', listOfTitles);

    return (
      <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        <div>
        {(currentUser !== undefined) ? <Button sx={{ m: 3 }} variant="outlined" href='/post/add'>Add post</Button> : null}
        </div> 
          {children}
          {(currentUser !== undefined) ? <PostList posts={listOfTitles}/> : <SimpleList posts={allPosts}/>}
      </div>
      )
};

Component.defaultProps = {
  currentUser: ''
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
