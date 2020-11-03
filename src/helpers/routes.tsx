import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN } from '../constants/routes';

interface IRedirectUser {
  user: {} | null;
  loggedPath: string;
  path: string;
  exact?: boolean;
}
export const RedirectUser: React.FC<IRedirectUser> = ({
  user,
  children,
  loggedPath,
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={(routeProps) =>
        user ? <Redirect to={{ pathname: loggedPath }} /> : children
      }
    />
  );
};
interface IProtectedRoute {
  user: { role?: string } | null;
  role?: string;
  path: string;
  exact?: boolean;
}
export const ProtectedRoute: React.FC<IProtectedRoute> = ({
  user,
  role,
  children,
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        console.log(location);
        if (!user) {
          return (
            <Redirect to={{ pathname: SIGNIN, state: { from: location } }} />
          );
        }
        if (user && user.role === role) {
          return children;
        }
        return null;
      }}
    />
  );
};
