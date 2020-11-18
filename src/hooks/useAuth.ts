import React from 'react';
import { auth, dataBase } from '../lib/firebase';
import { useHistory } from 'react-router-dom';
// import * as ROUTES from '../constants/routes';

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
const initialValue: IAuthUser = {
  avatar: '',
  userID: '',
  email: '',
  role: '',
  nick: '',
  added: '',
  country: '',
  mobile: '',
  city: '',
  lastUpdated: '',
};

export const useAuth = () => {
  const [authUser, setAuthUser] = React.useState(() => {
    try {
      const authUser = localStorage.getItem('authUser');
      return authUser ? JSON.parse(authUser) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const history = useHistory();
  React.useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dataBase
          .collection('users')
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (!doc.exists) {
            } else {
              const authUser = {
                userID: doc.data()?.userID,
                avatar: doc.data()?.avatar,
                email: doc.data()?.email,
                role: doc.data()?.role,
                nick: doc.data()?.nick,
                added: doc.data()?.added,
                country: doc.data()?.country,
                mobile: doc.data()?.mobile,
                city: doc.data()?.city,
                lastUpdated: doc.data()?.lastUpdated,
              };
              localStorage.setItem('authUser', JSON.stringify(authUser));
              setAuthUser(authUser);
            }
          })
          .catch((error) => console.log(error));
      } else {
        localStorage.removeItem('authUser');
        setAuthUser(initialValue);
        // history.push(ROUTES.HOME);
      }
    });
    return () => {
      listener();
    };
  }, [history]);
  return { authUser, setAuthUser, initialValue };
};
