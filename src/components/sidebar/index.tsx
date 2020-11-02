import React from 'react';
import { Container, Inner, ButtonLink } from './styles/sidebar';
interface ISidebar {}
interface ISidebarComposition {
  ButtonLink: React.FC<{ to: string }>;
}
export const Sidebar: React.FC<ISidebar> & ISidebarComposition = ({
  children,
}) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

Sidebar.ButtonLink = function SidebarButtonLink({ children, to }) {
  return <ButtonLink to={to}>{children}</ButtonLink>;
};
