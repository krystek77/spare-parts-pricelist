import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage, AdminPage, SigninPage, UserPage } from './pages';

export function App() {
  return (
    <Router>
      {/** <div className="root"> all components</div> */}
      <Route path='/signin'>
        <SigninPage />
      </Route>
      <Route path='/user'>
        <UserPage />
      </Route>
      <Route path='/admin'>
        <AdminPage />
      </Route>
      <Route exact path='/'>
        <HomePage />
      </Route>
    </Router>
  );
}
