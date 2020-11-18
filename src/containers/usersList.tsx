import React from 'react';
import { Spinner } from '../components';
import { UserProfileContainer } from '../containers';

interface IUser {
  role: string;
  userID: string;
  email: string;
  avatar: string;
  nick: string;
  added: string;
  country: string;
  mobile: string;
  city: string;
}

interface IUsersListContainer {
  users: IUser[];
  isLoading: boolean;
  handleDeleteOtherUser?: (item: string) => void;
  message: string;
}
export const UsersListContainer: React.FC<IUsersListContainer> = (props) => {
  const { users, isLoading, handleDeleteOtherUser, message } = props;

  const content = isLoading ? (
    <Spinner>Loading users list ...</Spinner>
  ) : users && users.length > 0 ? (
    <React.Fragment>
      {users.map((item: IUser) => (
        <UserProfileContainer
          key={item.userID}
          authUser={item}
          userList
          handleDeleteOtherUser={handleDeleteOtherUser}
          message={message}
        />
      ))}
    </React.Fragment>
  ) : null;
  return content;
};
