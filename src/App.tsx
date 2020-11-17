import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { useAuth } from './hooks';
import { RedirectUser, ProtectedRoute, ROLES } from './helpers';
import { Spinner } from './components';

const HomePage = React.lazy(() => import('./pages/home'));
const BrowsePage = React.lazy(() => import('./pages/browse'));
const AdminPage = React.lazy(() => import('./pages/admin'));
const SigninPage = React.lazy(() => import('./pages/signin'));
const EditUserPage = React.lazy(() => import('./pages/editUser'));
const EditAdminPage = React.lazy(() => import('./pages/editAdmin'));
const UserPage = React.lazy(() => import('./pages/user'));
const AddUser = React.lazy(() => import('./pages/addUser'));
const BrowseUSersPage = React.lazy(() => import('./pages/browseUsers'));
const AddSparePart = React.lazy(() => import('./pages/addSparePart'));
const EditSparePartPage = React.lazy(() => import('./pages/editSparePart'));
const AdminProfilePage = React.lazy(() => import('./pages/adminProfile'));
const ResetPasswordPage = React.lazy(() => import('./pages/resetPassword'));
const NoMatchPage = React.lazy(() => import('./pages/nomatch'));

export function App() {
  const { authUser } = useAuth();
  return (
    <Router>
      <React.Suspense fallback={<Spinner>Loading page...</Spinner>}>
        <Switch>
          <RedirectUser
            authUser={authUser}
            loggedPath={ROUTES.BROWSE}
            path={ROUTES.SIGNIN}
          >
            <SigninPage />
          </RedirectUser>

          <ProtectedRoute
            role={ROLES.USER}
            authUser={authUser}
            path={ROUTES.USER_EDIT}
          >
            <EditUserPage />
          </ProtectedRoute>

          <ProtectedRoute
            role={ROLES.USER}
            authUser={authUser}
            path={ROUTES.USER}
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            path={`${ROUTES.EDIT_SPARE_PART}/:sparePartID`}
            authUser={authUser}
            role={ROLES.ADMIN}
          >
            <EditSparePartPage />
          </ProtectedRoute>

          <ProtectedRoute
            path={ROUTES.ADMIN_PROFILE}
            authUser={authUser}
            role={ROLES.ADMIN}
          >
            <AdminProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            path={ROUTES.EDIT_ADMIN}
            authUser={authUser}
            role={ROLES.ADMIN}
          >
            <EditAdminPage />
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

          <ProtectedRoute
            path={ROUTES.BROWSE_USERS}
            authUser={authUser}
            role={ROLES.ADMIN}
          >
            <BrowseUSersPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            role={ROLES.ADMIN}
            authUser={authUser}
            path={ROUTES.ADMIN}
          >
            <AdminPage />
          </ProtectedRoute>

          <ProtectedRoute
            authUser={authUser}
            role={authUser.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.USER}
            path={ROUTES.BROWSE}
          >
            <BrowsePage />
          </ProtectedRoute>
          <ProtectedRoute
            authUser={authUser}
            role={authUser.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.USER}
            path={ROUTES.RESET_PASSWORD}
          >
            <ResetPasswordPage />
          </ProtectedRoute>

          <RedirectUser
            authUser={authUser}
            loggedPath={ROUTES.BROWSE}
            path={ROUTES.HOME}
          >
            <HomePage />
          </RedirectUser>

          <Route>
            <NoMatchPage />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
