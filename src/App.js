import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';
import { NoPermission } from './components/views/NoPermission/NoPermission';
import { Logged } from './components/views/Logged/Logged';
import { Logout } from './components/views/Logout/Logout';
import { fetchPublished } from './redux/postsRedux';
import { fetchPublishedAuthors } from './redux/authorRedux';


const theme = createTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  }
});

const App = () =>{
  useEffect(()=>{
    store.dispatch(fetchPublished());
    store.dispatch(fetchPublishedAuthors());
  },[])
  
  return (
  <Provider store={store}>
    <Router forceRefresh={true} >
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Routes>
              <Route exact path='/' element={<Homepage/>} />
              <Route exact path='/posts/add/:id' element={<PostAdd/>} />
              <Route exact path='/posts/:id' element={<Post/>} />
              <Route exact path='/posts/:id/edit' element={<PostEdit/>} />
              <Route exact path='/posts/nopermission' element={<NoPermission/>} />
              <Route exact path='/login/author/:id' element={<Logged/>} />
              <Route exact path='/logout' element={<Logout/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  </Provider>
  )
};

export { App };
