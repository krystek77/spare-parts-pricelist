import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage, AdminPage, SigninPage, UserPage } from './pages';
import { ADMIN, HOME, SIGNIN, USER } from './constants/routes';

export function App() {
  return (
    <Router>
      {/** <div className="root"> all components</div> */}
      <Route path={SIGNIN}>
        <SigninPage />
      </Route>
      <Route path={USER}>
        <UserPage />
      </Route>
      <Route path={ADMIN}>
        <AdminPage />
      </Route>
      <Route exact path={HOME}>
        <HomePage />
      </Route>
    </Router>
  );
}
