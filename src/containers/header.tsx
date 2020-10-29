import React from 'react';
import { Header } from '../components';
import { NavigationContainer } from './navigation';
import { Newsletter } from '../components';
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
          <Newsletter>
            <Newsletter.Input type='text' placeholder='Enter your email' />
            <Newsletter.Button type='button'>Subscribe</Newsletter.Button>
            <Newsletter.Break />
            <Newsletter.Text>
              We are starting to be up to date. Enter email and subscribe to
              newsletter
            </Newsletter.Text>
          </Newsletter>
        </Header.Content>
      </Header>
    </Header.Container>
  );
};
