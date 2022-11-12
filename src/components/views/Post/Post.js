import React from 'react';
import PropTypes from 'prop-types';
import SinglePost from '../../features/SinglePost';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

  const Component = ({className, children}) => {
    const { id } = useParams();
    
    return (
    <div className={clsx(className, styles.root)}>
      <h2>Announcement</h2>
      {children}
      <SinglePost/>
      <Button variant="outlined" href={`${id}/edit`}>Edit</Button>
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
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
