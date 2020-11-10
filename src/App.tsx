import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  HomePage,
  BrowsePage,
  AdminPage,
  SigninPage,
  UserPage,
  AddUser,
  AddSparePart,
  EditSparePartPage,
  NoMatchPage,
} from './pages';
import * as ROUTES from './constants/routes';
import { useAuth } from './hooks';
import { RedirectUser, ProtectedRoute, ROLES } from './helpers';

export function App() {
  const { authUser } = useAuth();
  return (
    <Router>
      {/** <div className="root"> all components</div> */}
      <Switch>
        <RedirectUser
          authUser={authUser}
          loggedPath={ROUTES.BROWSE}
          path={ROUTES.SIGNIN}
        >
          <SigninPage />
        </RedirectUser>
        {/* <Route path={ROUTES.SIGNIN}>
          <SigninPage />
        </Route> */}
        <ProtectedRoute
          role={ROLES.USER}
          authUser={authUser}
          path={ROUTES.USER}
        >
          <UserPage />
        </ProtectedRoute>

        {/* <Route path={ROUTES.USER}>
          <UserPage />
        </Route> */}
        <ProtectedRoute
          path={`${ROUTES.EDIT_SPARE_PART}/:sparePartID`}
          authUser={authUser}
          role={ROLES.ADMIN}
        >
          <EditSparePartPage />
        </ProtectedRoute>
        <ProtectedRoute
          exact
          path={ROUTES.ADD_SPARE_PART}
          authUser={authUser}
          role={ROLES.ADMIN}
        >
          <AddSparePart />
        </ProtectedRoute>
        <ProtectedRoute
          path={ROUTES.ADD_USER}
          authUser={authUser}
          role={ROLES.ADMIN}
        >
          <AddUser />
        </ProtectedRoute>

        {/* <Route path={ROUTES.ADD_USER}>
          <AddUser />
        </Route> */}

        <ProtectedRoute
          exact
          role={ROLES.ADMIN}
          authUser={authUser}
          path={ROUTES.ADMIN}
        >
          <AdminPage />
        </ProtectedRoute>
        {/* <Route path={ROUTES.ADMIN}>
          <AdminPage />
        </Route> */}
        <ProtectedRoute
          authUser={authUser}
          role={authUser.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.USER}
          path={ROUTES.BROWSE}
        >
          <BrowsePage />
        </ProtectedRoute>
        {/* <Route path={ROUTES.BROWSE}>
          <BrowsePage />
        </Route> */}
        <RedirectUser
          authUser={authUser}
          loggedPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
        >
          <HomePage />
        </RedirectUser>
        {/* <Route path={ROUTES.HOME}>
          <HomePage />
        </Route> */}
        <Route>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}
