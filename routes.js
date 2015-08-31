import React from 'react';
import {Route, DefaultRoute, NotFoundRoute, Redirect} from 'react-router';

import App from './pages/index';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Login from './pages/login';
import HomePage from './pages/home';
import NotFound from './pages/not-found';


export default (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Landing} />
        <Route name="signup" path="signup" handler={Signup} />
        <Route name="login" path="login" handler={Login} />
        <Route name="home" handler={HomePage} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);