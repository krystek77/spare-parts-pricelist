import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SIGNIN } from '../constants/routes';

interface IRedirectUser {
  authUser: {
    role: string;
    userID: string;
    email: string;
    avatar: string;
    nick: string;
  };
  loggedPath: string;
  path: string;
  exact?: boolean;
}
export const RedirectUser: React.FC<IRedirectUser> = ({
  authUser,
  children,
  loggedPath,
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={(routeProps) =>
        authUser && authUser.role !== '' ? (
          <Redirect to={{ pathname: loggedPath }} />
        ) : (
          children
        )
      }
    />
  );
};
interface IProtectedRoute {
  authUser: {
    role: string;
    userID: string;
    email: string;
    avatar: string;
    nick: string;
  };
  path: string;
  exact?: boolean;
  role?: string;
}
export const ProtectedRoute: React.FC<IProtectedRoute> = ({
  authUser,
  children,
  role = '',
  ...restProps
}) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (authUser && authUser.role === '') {
          return (
            <Redirect to={{ pathname: SIGNIN, state: { from: location } }} />
          );
        }
        if (authUser && authUser.role === role) {
          return children;
        }
        return (
          <Redirect to={{ pathname: SIGNIN, state: { from: location } }} />
        );
      }}
    />
  );
};
