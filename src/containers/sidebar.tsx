import React from 'react';
import { Sidebar } from '../components';
interface ISidebarContainer {}
export const SidebarContainer: React.FC<ISidebarContainer> = ({
  children,
  ...restProps
}) => {
  return <Sidebar {...restProps}>{children}</Sidebar>;
};
