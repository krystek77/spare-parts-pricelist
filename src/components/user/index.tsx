import React from 'react';
import {
  Container,
  Inner,
  ImageWrapper,
  Image,
  DataWrapper,
  Data,
  DataLabel,
  DataValue,
  ControlWrapper,
  DeleteButton,
} from './styles/user';

interface IUserProfileComposition {
  ImageWrapper: React.FC;
  Image: React.FC<{ src: string; alt: string; userList?: boolean }>;
  DataWrapper: React.FC;
  Data: React.FC<{ role?: string }>;
  DataLabel: React.FC;
  DataValue: React.FC;
  ControlWrapper: React.FC;
  DeleteButton: React.FC<{
    type: 'button';
    onClick: () => void;
    disabled?: boolean;
  }>;
}
export const UserProfile: React.FC<{ userList?: boolean }> &
  IUserProfileComposition = ({ children, userList, ...restProps }) => {
  return (
    <Container>
      <Inner userList={userList}>{children}</Inner>
    </Container>
  );
};

UserProfile.ImageWrapper = function UserProfileImageWrapper({
  children,
  ...restProps
}) {
  return <ImageWrapper {...restProps}>{children}</ImageWrapper>;
};
UserProfile.Image = function UserProfileImageWrapper({ ...restProps }) {
  return <Image {...restProps} />;
};
UserProfile.DataWrapper = function UserProfileDataWrapper({
  children,
  ...restProps
}) {
  return <DataWrapper {...restProps}>{children}</DataWrapper>;
};
UserProfile.Data = function UserProfileData({ children, ...restProps }) {
  return <Data {...restProps}>{children}</Data>;
};
UserProfile.DataLabel = function UserProfileDataLabel({
  children,
  ...restProps
}) {
  return <DataLabel {...restProps}>{children}</DataLabel>;
};
UserProfile.DataValue = function UserProfileDataValue({
  children,
  ...restProps
}) {
  return <DataValue {...restProps}>{children}</DataValue>;
};
UserProfile.ControlWrapper = function UserProfileControlWrapper({
  children,
  ...restProps
}) {
  return <ControlWrapper {...restProps}>{children}</ControlWrapper>;
};
UserProfile.DeleteButton = function UserProfileDeleteButton({
  children,
  ...restProps
}) {
  return <DeleteButton {...restProps}>{children}</DeleteButton>;
};
