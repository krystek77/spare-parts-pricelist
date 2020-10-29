import React from 'react';
import { NavigationContainer } from '../containers';
interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  return <NavigationContainer isAuthenticated bgColor />;
};
