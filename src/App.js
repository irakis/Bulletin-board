import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout.js';
import { Homepage } from './components/views/Homepage/Homepage.js';
import { Post } from './components/views/Post/Post.js';
import { PostEdit } from './components/views/PostEdit/PostEdit.js';
import { PostAdd } from './components/views/PostAdd/PostAdd.js';
import { NotFound } from './components/views/NotFound/NotFound.js';
import { NoPermission } from './components/views/NoPermission/NoPermission.js';
import { Logged } from './components/views/Logged/Logged.js';
import { Logout } from './components/views/Logout/Logout.js';
import { fetchPublished } from './redux/postsRedux.js';


const theme = createTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () =>{
  useEffect(()=>{
    store.dispatch(fetchPublished());
  },[]);
  
  return (
    <Provider store={store}>
      <Router forceRefresh={true} >
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Routes>
                <Route exact path='/' element={<Homepage/>} />
                <Route exact path='/posts/add' element={<PostAdd/>} />
                <Route exact path='/posts/:id' element={<Post/>} />
                <Route exact path='/posts/:id/edit' element={<PostEdit/>} />
                <Route exact path='/posts/nopermission' element={<NoPermission/>} />
                <Route exact path='/login/author' element={<Logged/>} />
                <Route exact path='/logout' element={<Logout/>} />
                <Route path='*' element={<NotFound/>} />
              </Routes>
            </MainLayout>
          </ThemeProvider>
        </StylesProvider>
      </Router>
    </Provider>
  );
};

export { App };
