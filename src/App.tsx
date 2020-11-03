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

export function App() {
  return (
    <Router>
      {/** <div className="root"> all components</div> */}
      <Switch>
        <Route path={ROUTES.SIGNIN}>
          <SigninPage />
        </Route>
        <Route path={ROUTES.USER}>
          <UserPage />
        </Route>
        <Route path={ROUTES.ADD_USER}>
          <AddUser />
        </Route>
        <Route path={ROUTES.ADMIN}>
          <AdminPage />
        </Route>

        <Route path={ROUTES.BROWSE}>
          <BrowsePage />
        </Route>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}
