import React from 'react';
import {
  Container,
  Inner,
  Panel,
  LogoLink,
  LogoIcon,
  LogoText,
  ButtonLink,
} from './styles/navigation';

interface INavigation {}
interface INavigationComposition {
  Container: React.FC<{ bgColor?: boolean }>;
  Panel: React.FC;
  Logo: React.FC<{ to: string }>;
  LogoIcon: React.FC<{ src: string; alt: string }>;
  LogoText: React.FC;
  ButtonLink: React.FC<{ to: string }>;
}
export const Navigation: React.FC<INavigation> & INavigationComposition = ({
  children,
  ...restProps
}) => {
  return <Inner>{children}</Inner>;
};

Navigation.Container = function NavigationContainer({
  children,
  bgColor,
  ...restProps
}) {
  return (
    <Container bgColor={bgColor} {...restProps}>
      {children}
    </Container>
  );
};
Navigation.Panel = function NavigationPanel({ children }) {
  return <Panel>{children}</Panel>;
};
Navigation.Logo = function NavigationLogo({ children, to, ...restProps }) {
  return (
    <LogoLink to={to} {...restProps}>
      {children}
    </LogoLink>
  );
};
Navigation.ButtonLink = function NavigationButtonLink({ children, to }) {
  return <ButtonLink to={to}>{children}</ButtonLink>;
};
Navigation.LogoIcon = function NavigationLogoIcon({ ...restProps }) {
  return <LogoIcon {...restProps} />;
};
Navigation.LogoText = function NavigationLogoText({ children }) {
  return <LogoText>{children}</LogoText>;
};
