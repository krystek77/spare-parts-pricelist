import React from 'react';
import { Container, Inner, Title, Body, Content, Label } from './styles/info';
interface IInfo {}
interface IInfoComposition {
  Title: React.FC;
  Content: React.FC<{
    type?: string;
  }>;
  Label: React.FC;
  Body: React.FC;
}

export const Info: React.FC<IInfo> & IInfoComposition = ({
  children,
  ...restProps
}) => {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
};

Info.Title = function InfoTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};
Info.Content = function InfoContent({ children, ...restProps }) {
  return <Content {...restProps}>{children}</Content>;
};
Info.Label = function InfoLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};
Info.Body = function InfoBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};
