import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import './App.scss';
import NotFound from './components/NotFound';
import Header from './components/Header';
import productApi from 'api/productApi';
import SignIn from 'features/Auth/pages/SignIn';

import firebase from 'firebase';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

// Lazy load - code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          // Tên param do bên backend quy định
          _page: 1,
          _limit: 10,
        };

        const response = await productApi.getAll(params);
        console.log(response);
        setProductList(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    };
    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle something here
          console.log('User is not logged in');
          return;
        }

        // Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log('Logged in user: ', currentUser);
        } catch (error) {
          console.log('Failed to login ', error.message);
        }

        // console.log('Logged in user:', user.displayName);
        // const token = await user.getIdToken();
        // console.log('Logged in user token: ', token);
        localStorage.setItem(
          'firebaseui::rememberedAccounts',
          JSON.stringify(user.providerData)
        );
      });

    return () => unregisterAuthObserver();
  }, [dispatch]);

  const handleButtunClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };

      const response = await productApi.getAll(params);
      console.log(response);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
  };

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Header />

          <Button onClick={handleButtunClick}>Fetch Product List</Button>

          <Switch>
            <Redirect exact from="/" to="/photos" />
            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
