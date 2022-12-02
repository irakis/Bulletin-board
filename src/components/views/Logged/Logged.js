import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';
import { SimpleList } from '../../features/SimpleList';
import { getAll, getOneAuthorPosts, getOnePost } from '../../../redux/postsRedux';
import { useNavigate, useParams } from 'react-router-dom';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getLoggedAuthor } from '../../../redux/authorRedux';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Logged.module.scss';

const Component = ({className, children}) => {
  
  const navigate = useNavigate();

  const allPosts = useSelector(getAll);
  const { id } = useParams();

  const author = useSelector(getLoggedAuthor(id));
  const authorRole = author?.role;
  const authorsPosts = useSelector(getOneAuthorPosts(id));
  
  console.log('authorsPosts:', authorsPosts);

  if(id) {
    return (
      <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        <div>
        {(authorRole !== undefined) ? <Button sx={{ m: 3 }} variant="outlined" href='/post/add'>Add post</Button> : null}
        </div> 
          {children}
           {(authorRole === 'user' || authorRole === 'admin') ?
              <PostList posts={(authorRole === 'admin') ? allPosts : authorsPosts} /> 
              : <SimpleList posts={allPosts}/>
            }          
      </div>
    )
  } else 
    navigate('/');
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
