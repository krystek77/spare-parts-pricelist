import React from 'react';
import {
  Bacground,
  Container,
  Content,
  Inner,
  Title,
  SubTitle,
} from './styles/header';

interface IHeader {
  bgImage?: boolean;
  src?: string;
}
interface IHeaderComposition {
  Container: React.FC;
  Content: React.FC;
  Title: React.FC;
  SubTitle: React.FC;
}
export const Header: React.FC<IHeader> & IHeaderComposition = ({
  children,
  bgImage,
  ...restProps
}) => {
  return bgImage ? (
    <Bacground {...restProps}>{children}</Bacground>
  ) : (
    <>{children}</>
  );
};
Header.Container = function HeaderContainer({ children }) {
  return <Container>{children}</Container>;
};
Header.Content = function HeaderContent({ children }) {
  return (
    <Content>
      <Inner>{children}</Inner>
    </Content>
  );
};
Header.Title = function HeaderTitle({ children }) {
  return <Title>{children}</Title>;
};
Header.SubTitle = function HeaderSubTitle({ children }) {
  return <SubTitle>{children}</SubTitle>;
};
