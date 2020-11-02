import React from 'react';
import { Main } from '../components';
interface IMainContainer {}
export const MainContainer: React.FC<IMainContainer> = ({ children }) => {
  return <Main>{children}</Main>;
};
