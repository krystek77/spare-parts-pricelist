import React from 'react';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  SignOutContainer,
  UserProfileContainer,
  MenuUserContainer,
} from '../containers';
import {  ContentTitle } from '../components';
import { useAuth } from '../hooks';


interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();

  return (
    <React.Fragment>
      <NavigationContainer bgColor>
        <SignOutContainer
          setAuthUser={setAuthUser}
          initialValue={initialValue}
        />
      </NavigationContainer>
      <SidebarContainer>
        {/** LINKS */}
        <MenuUserContainer />
        {/** LINKS */}
      </SidebarContainer>
      <MainContainer>
        {/** TITLE */}
        <ContentTitle>
          <ContentTitle.BaseTitle>USER PROFILE</ContentTitle.BaseTitle>
          <ContentTitle.SubTitle>{authUser.nick}</ContentTitle.SubTitle>
        </ContentTitle>
        {/** TITLE */}
        {/** USER PROFILE */}
        <UserProfileContainer authUser={authUser} />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};
