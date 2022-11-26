import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//import PostList from '../../features/PostList';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getLoggedAuthor } from '../../../redux/authorRedux';
import { SimpleList } from '../../features/SimpleList';
import { fetchPublished } from '../../../redux/postsRedux';
//import PostList from '../../features/PostList';
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';


const Component = ({className ,children}) => {
  const dispatch = useDispatch();

  useEffect(()=>{console.log('homepage dispatch!!:');
    dispatch(fetchPublished());
  }, [dispatch]);

 const allPosts = useSelector(getAll); 

  console.log('allPosts:', allPosts);
  //const [listOfTitles, setListOfTitles] = useState(allPosts);
  //console.log('listofTitled:', listOfTitles);


  return (
    <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        {children}
        <SimpleList posts={allPosts}/>
    </div>
    );
};

Component.defaultProps = {
  allPosts: ''
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

{/*const mapStateToProps = (state) => {
  console.log('mapStatToProps: ', state)
  return {
    allPosts : getAll(state),
  }
};

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);*/}

export {
  Component as Homepage,
  //Container as Homepage,
  Component as HomepageComponent,
};
