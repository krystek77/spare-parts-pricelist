import React from 'react';
import { dataBase } from '../lib/firebase';
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
}
export const useUsers = () => {
  const [users, setUsers] = React.useState<IAuthUser[]>([]);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const unsubscribe = dataBase.collection('users').onSnapshot(
      (snapshot) => {
        const users: IAuthUser[] = snapshot.docs.map((doc) => {
          return {
            role: doc.data().role,
            userID: doc.data().userID,
            email: doc.data().email,
            avatar: doc.data().avatar,
            nick: doc.data().nick,
            added: doc.data().added,
            city: doc.data().city,
            country: doc.data().country,
            mobile: doc.data().mobile,
          };
        });
        setUsers(users);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return { users, error };
};
