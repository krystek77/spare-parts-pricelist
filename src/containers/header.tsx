import React from 'react';
import { Header } from '../components';
// import { Newsletter } from '../components';
interface IHeaderContainer {
  bgImage?: boolean;
  src?: string;
}
export const HeaderContainer: React.FC<IHeaderContainer> = ({
  children,
  bgImage = false,
  src = 'bg_home_transparent',
}) => {
  return (
    <Header.Container>
      <Header bgImage={bgImage} src={src}>
        {children}
      </Header>
    </Header.Container>
  );
};
