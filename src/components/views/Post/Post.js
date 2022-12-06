import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SinglePost from '../../features/SinglePost';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios'; 

import clsx from 'clsx';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const Component = ({className, children}) => {

  const [singlePost, setSinglePost] = useState('')
  const { id } = useParams();

  useEffect(()=>{
  
  const getData = async (id) => { 
    await Axios
    .get(`http://localhost:8000/api/posts/${id}`)
    .then(res => {
      setSinglePost(res.data);
    })
  };
  getData(id);
  }, []);


if(singlePost) {
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Announcement</h2>
      {children}
      <SinglePost post = {singlePost}/>
      <Button variant="outlined" href={`posts/${id}/edit`}>Edit</Button>
    </div>
    );
  };
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
