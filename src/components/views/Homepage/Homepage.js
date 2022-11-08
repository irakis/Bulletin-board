import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../../redux/authorRedux';
import { getAll } from '../../../redux/postsRedux';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className, children}) => {

  const allPosts = useSelector(getAll);
  console.log('allPosts: ', allPosts);

  const currentUser = useSelector(getAuthors);
  console.log('Home user : ', currentUser.role);

  const [ listOfTitles, setListOfTitles ] = useState([])

  useEffect(()=>{

    if(currentUser.role === 'admin') {
      setListOfTitles(allPosts);
    } else if(currentUser.role === 'user') {
      setListOfTitles(allPosts.filter(post => post.author.email === currentUser.email));
      console.log('listOfTitles: ',listOfTitles);
    } else {
      let listOfTitlesForEmptyUser = []
      for(let index=0; index < allPosts.length; index++) {
        listOfTitlesForEmptyUser.push({
          title: allPosts[index].title,
        });
      }
      console.log(listOfTitlesForEmptyUser);
    //setListOfTitles(listOfTitlesForEmptyUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('listOfTitles before listComponent:', listOfTitles);
  return (
    <div className={clsx(className, styles.root)}>
      <h2>Homepage</h2>
      <div>
        <Link to='/post/add'>Add post</Link>
      </div> 
        {children}
      <PostList posts={listOfTitles}/>
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
