import React from 'react';
import PropTypes from 'prop-types';
import SinglePost from '../../features/SinglePost';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../redux/postsRedux';

import clsx from 'clsx';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';
import { useSelector } from 'react-redux';
import { getOnePost } from '../../../redux/postsRedux';

const Component = ({className, children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log('post id?:',id)

  const singlePost = useSelector(getOnePost(id));
  console.log('to jest post w Post:' , singlePost)

  const handleDelete = (e) =>{
    dispatch(deletePost(id));
    navigate('/login/author');
  }

if(singlePost) {
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Announcement</h2>
      {children}
      <SinglePost post = {singlePost}/>
      <Button variant="outlined" href={`${id}/edit`}>Edit</Button>
      <Button variant="outlined" color="error" sx={{ml:2}} href={'/login/author'}>cancel</Button>
      <Button variant="contained" color="error" sx={{ml:2}} onClick={handleDelete}>delete</Button>
    </div>
    );
  } return <p>Post not found</p>
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Post,
  //Container as Post,
  Component as PostComponent,
};
