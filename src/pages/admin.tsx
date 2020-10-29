import React from 'react';
import { NavigationContainer } from '../containers';

interface IAdminPage {}
export const AdminPage: React.FC<IAdminPage> = () => {
  return <NavigationContainer isAuthenticated bgColor />;
};
