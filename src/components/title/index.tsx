import React from 'react';
import { Container, Inner, BaseTitle, SubTitle } from './styles/title';

interface IContentTitle {
  BaseTitle: React.FC;
  SubTitle: React.FC;
}
export const ContentTitle: React.FC & IContentTitle = ({ children }) => {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
};

ContentTitle.BaseTitle = function ContentTitleBaseTitle({
  children,
  ...restProps
}) {
  return <BaseTitle {...restProps}>{children}</BaseTitle>;
};

ContentTitle.SubTitle = function ContentTitleBaseTitle({
  children,
  ...restProps
}) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};
