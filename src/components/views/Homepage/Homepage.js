import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from '../../features/PostList';
import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../../redux/authorRedux';
import { getAll } from '../../../redux/postsRedux';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = ({className, children}) => {
  
  const allPosts = useSelector(getAll);
  console.log('allPost w Homepage: ',allPosts);
  const currentUser = useSelector(getAuthors);
  console.log('cirrentUser w Homepage: ',currentUser);

  const [ listOfTitles, setListOfTitles ] = useState([])
  console.log('listOfTitles', listOfTitles);

  useEffect(()=>{

    if(currentUser.role === 'admin') {
      setListOfTitles(allPosts);
      console.log(listOfTitles);
    } else if(currentUser.role === 'user') {
      setListOfTitles(allPosts.filter(post => post.author.email === currentUser.email));
    } else {
      let listOfTitlesForEmptyUser = []
      for(let index=0; index < allPosts.length; index++) {
        listOfTitlesForEmptyUser.push({
          title: allPosts[index].title,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (currentUser.role !== '') {
    return (
      <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        <div>
          <Button sx={{ m: 3 }} variant="outlined" href='/post/add'>Add post</Button>
        </div> 
          {children}
        <PostList posts={listOfTitles}/>
      </div>
      )
  } else {
    return (
      <div className={clsx(className, styles.root, )} sx={{ height: 300}}>
        <div>
        </div> 
          {children}
        <div>
          <h1>Login please</h1>
        </div>
      </div>
    )
  }
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
