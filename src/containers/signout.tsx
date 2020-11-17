import React from 'react';
import { auth } from '../lib/firebase';
import { Navigation } from '../components';

interface IAuthUser {
  role: string;
  userID: string;
  email: string;
  avatar: string;
  nick: string;
  added: string;
  country: string;
  mobile: string;
  city: string;
  lastUpdated: string;
}

interface ISignOutContainer {
  initialValue: IAuthUser;
  setAuthUser: (user: IAuthUser) => void;
}
export const SignOutContainer: React.FC<ISignOutContainer> = React.memo(
  ({ setAuthUser, initialValue }) => {
    return (
      <React.Fragment>
        <Navigation.AriaLabeledBy id='signOut'>
          Sign out
        </Navigation.AriaLabeledBy>
        <Navigation.SignoutButton
          aria-label='Sign out'
          aria-labelledby='signOut'
          type='button'
          onClick={() => {
            auth
              .signOut()
              .then(() => {
                localStorage.removeItem('authUser');
                setAuthUser(initialValue);
              })
              .catch((error) => {
                console.log('Sign out failed');
              });
          }}
        >
          sign out
        </Navigation.SignoutButton>
      </React.Fragment>
    );
  }
);
