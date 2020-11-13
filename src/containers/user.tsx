import React from 'react';
import { UserProfile } from '../components';
import { FaTrashAlt } from 'react-icons/fa';
import { ROLES } from '../helpers';

export const UserProfileContainer = ({ ...restProps }) => {
  const {
    authUser: {
      role,
      email,
      avatar,
      nick,
      added,
      country,
      mobile,
      city,
      userID,
    },
    userList,
    handleDelete,
    message,
  } = restProps;
  return (
    <React.Fragment>
      {message && <UserProfile.Message>{message}</UserProfile.Message>}
      <UserProfile userList={userList}>
        <UserProfile.ImageWrapper>
          <UserProfile.Image
            src={`../assets/images/${avatar}.webP`}
            alt='User avatar'
            userList={userList}
          />
        </UserProfile.ImageWrapper>
        <UserProfile.DataWrapper>
          <UserProfile.Data>
            <UserProfile.DataLabel>Added:</UserProfile.DataLabel>
            <UserProfile.DataValue>{added}</UserProfile.DataValue>
          </UserProfile.Data>
          <UserProfile.Data>
            <UserProfile.DataLabel>Email:</UserProfile.DataLabel>
            <UserProfile.DataValue>{email}</UserProfile.DataValue>
          </UserProfile.Data>
          <UserProfile.Data>
            <UserProfile.DataLabel>Name:</UserProfile.DataLabel>
            <UserProfile.DataValue>
              {`${nick}`.toUpperCase()}
            </UserProfile.DataValue>
          </UserProfile.Data>
          <UserProfile.Data role={role}>
            <UserProfile.DataLabel>Role:</UserProfile.DataLabel>
            <UserProfile.DataValue>{role}</UserProfile.DataValue>
          </UserProfile.Data>
          {country && (
            <UserProfile.Data>
              <UserProfile.DataLabel>Country:</UserProfile.DataLabel>
              <UserProfile.DataValue>{country}</UserProfile.DataValue>
            </UserProfile.Data>
          )}
          {city && (
            <UserProfile.Data>
              <UserProfile.DataLabel>City:</UserProfile.DataLabel>
              <UserProfile.DataValue>{city}</UserProfile.DataValue>
            </UserProfile.Data>
          )}
          {mobile && (
            <UserProfile.Data>
              <UserProfile.DataLabel>Mobile phone:</UserProfile.DataLabel>
              <UserProfile.DataValue>{mobile}</UserProfile.DataValue>
            </UserProfile.Data>
          )}
        </UserProfile.DataWrapper>
        {userList && (
          <UserProfile.ControlWrapper>
            <UserProfile.DeleteButton
              type='button'
              onClick={() => handleDelete && handleDelete(userID)}
              disabled={role === ROLES.ADMIN}
            >
              <FaTrashAlt />
            </UserProfile.DeleteButton>
          </UserProfile.ControlWrapper>
        )}
      </UserProfile>
    </React.Fragment>
  );
};
