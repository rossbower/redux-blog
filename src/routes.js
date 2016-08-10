import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home'; // maybe?
import New from './components/new';
import Show from './components/show';
import SignIn from './components/signin';
import RequireAuth from './components/require-auth';


export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="posts/new" component={RequireAuth(New)} />
    <Route path="posts/:id" component={RequireAuth(Show)} />
    <Route path="signin" component={SignIn} />
  </Route>
);
