import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render( 
  <Auth0Provider
    domain={ process.env.REACT_APP_AUTH0_DOMAIN }
    clientId={ process.env.REACT_APP_AUTH0_CLIENT_ID }
    redirectUri= { process.env.REACT_APP_AUTH0_CALLBACK_URI }
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URI,
    }}
  >
    <App />
  </Auth0Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
