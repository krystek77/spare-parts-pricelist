import React from 'react';
import {
  Container,
  Inner,
  Panel,
  LogoLink,
  LogoIcon,
  LogoText,
  ButtonLink,
  SignoutButton,
  Avatar,
  AriaLabeledBy,
} from './styles/navigation';

interface INavigation {}
interface INavigationComposition {
  Container: React.FC<{ bgColor?: boolean }>;
  Panel: React.FC;
  Logo: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    to: string;
  }>;
  LogoIcon: React.FC<{ src: string; alt: string }>;
  LogoText: React.FC;
  ButtonLink: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    to: string;
  }>;
  SignoutButton: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    type: 'button';
    onClick: () => void;
  }>;
  Avatar: React.FC<{ src: string; alt: string }>;
  AriaLabeledBy: React.FC<{ id?: string }>;
}
export const Navigation: React.FC<INavigation> & INavigationComposition = ({
  children,
  ...restProps
}) => {
  return <Inner>{children}</Inner>;
};

Navigation.Container = function NavigationContainer({
  children,
  ...restProps
}) {
  return <Container {...restProps}>{children}</Container>;
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
Navigation.SignoutButton = function NavigationSignoutButton({
  children,
  type,
  ...restProps
}) {
  return <SignoutButton {...restProps}>{children}</SignoutButton>;
};
Navigation.Avatar = function NavigationAvatar({ ...restProps }) {
  return <Avatar {...restProps} />;
};
Navigation.AriaLabeledBy = function NavigationAriaLabeledBy({
  children,
  ...restProps
}) {
  return <AriaLabeledBy {...restProps}>{children}</AriaLabeledBy>;
};
