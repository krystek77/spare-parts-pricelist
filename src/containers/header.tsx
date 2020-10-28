import React from 'react';
import { Header } from '../components';
import { NavigationContainer } from './navigation';
interface IHeaderContainer {
  bgImage?: boolean;
  src?: string;
}
export const HeaderContainer: React.FC<IHeaderContainer> = ({
  bgImage = false,
  src = 'bg_home_transparent',
}) => {
  return (
    <Header.Container>
      <Header bgImage={bgImage} src={src}>
        <NavigationContainer />
        <Header.Content>
          <Header.Title>
            Browse the spare parts priclist anytime and anywhere.
          </Header.Title>
          <Header.SubTitle>
            Add, delete, edit pricelist category and spare parts
          </Header.SubTitle>
        </Header.Content>
      </Header>
    </Header.Container>
  );
};
