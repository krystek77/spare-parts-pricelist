import React from 'react';
import { auth, dataBase } from '../lib/firebase';
import {
  MainContainer,
  NavigationContainer,
  SidebarContainer,
  SignOutContainer,
  UserProfileContainer,
  MenuUserContainer,
} from '../containers';
import { ContentTitle } from '../components';
import { useAuth } from '../hooks';

interface IUserPage {}
export const UserPage: React.FC<IUserPage> = () => {
  const { authUser, setAuthUser, initialValue } = useAuth();
  const handleDeleteUser = () => {
    const user = auth.currentUser;
    /**
     * Use transaction
     */

    const refToUser = dataBase.collection('users').doc(authUser.userID);
    dataBase
      .runTransaction((transaction) => {
        return transaction.get(refToUser).then((doc) => {
          if (!doc.exists) {
            return new Error('User does not exists');
          }
          transaction.delete(refToUser);
          user?.delete();
        });
      })
      .then(() => {
        console.log('User details and account deleted successfully');
      })
      .catch((error) => {
        console.log(error.message);
      });

    // dataBase
    //   .collection('users')
    //   .doc(authUser.userID)
    //   .delete()
    //   .then(() => {
    //     // console.log('User details deleted now.');
    //     if (user) {
    //       return user.delete();
    //     }
    //   })
    //   .then(() => {
    //     // console.log('User account deleted successfully');
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };
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
        <UserProfileContainer
          authUser={authUser}
          handleDeleteUser={handleDeleteUser}
        />
        {/** USER PROFILE */}
      </MainContainer>
    </React.Fragment>
  );
};

export default UserPage;
