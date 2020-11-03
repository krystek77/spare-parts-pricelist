import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  HomePage,
  BrowsePage,
  AdminPage,
  SigninPage,
  UserPage,
  AddUser,
  NoMatchPage,
} from './pages';
import * as ROUTES from './constants/routes';
import { RedirectUser, ProtectedRoute, ROLES } from './helpers';

const user = { role: 'admin' };

export function App() {
  return (
    <Router>
      {/** <div className="root"> all components</div> */}
      <Switch>
        <RedirectUser
          user={user}
          loggedPath={ROUTES.BROWSE}
          path={ROUTES.SIGNIN}
        >
          <SigninPage />
        </RedirectUser>

        <ProtectedRoute user={user} role={ROLES.USER} path={ROUTES.USER}>
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute user={user} role={ROLES.ADMIN} path={ROUTES.ADD_USER}>
          <AddUser />
        </ProtectedRoute>

        <ProtectedRoute user={user} role={ROLES.ADMIN} path={ROUTES.ADMIN}>
          <AdminPage />
        </ProtectedRoute>

        <ProtectedRoute user={user} role={user.role} path={ROUTES.BROWSE}>
          <BrowsePage role={user.role} />
        </ProtectedRoute>
        {/** if user is logged then he can not go to home page, immediately to browse page */}
        <RedirectUser user={user} path={ROUTES.HOME} loggedPath={ROUTES.BROWSE}>
          <HomePage />
        </RedirectUser>

        {/* <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route> */}

        <Route>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}
