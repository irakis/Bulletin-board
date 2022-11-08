import React from 'react';
import PropTypes from 'prop-types';
import PostForm from '../../features/PostForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOnePost } from '../../../redux/postsRedux';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({className, children}) =>{ 
  
  const { id } = useParams();
  const postToEdit = useSelector(posts => getOnePost(posts, id));

  return (
  <div className={clsx(className, styles.root)}>
    <h2>Edit post:</h2>
    {children}
    <PostForm data={ postToEdit }/>
  </div>
)};

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
  Component as PostEdit,
  // Container as PostEdit,
  Component as PostEditComponent,
};
