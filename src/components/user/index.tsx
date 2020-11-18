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
  Message,
  EmailLink,
  AriaLabeledBy,
} from './styles/user';

interface IUserProfileComposition {
  ImageWrapper: React.FC;
  Image: React.FC<{ src: string; alt: string; userList?: boolean }>;
  DataWrapper: React.FC;
  Data: React.FC<{ userRole?: string }>;
  DataLabel: React.FC<{ userRole?: string }>;
  DataValue: React.FC<{ userRole?: string }>;
  ControlWrapper: React.FC;
  DeleteButton: React.FC<{
    ['aria-label']?: string;
    ['aria-labelledby']?: string;
    type: 'button';
    onClick: () => void;
    disabled?: boolean;
  }>;
  Message: React.FC;
  AriaLabeledBy: React.FC<{ id?: string }>;
  EmailLink: React.FC<{ href: string }>;
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
UserProfile.Message = function UserProfileMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>;
};
UserProfile.AriaLabeledBy = function UserProfileAriaLabeledBy({
  children,
  ...restProps
}) {
  return <AriaLabeledBy {...restProps}>{children}</AriaLabeledBy>;
};
UserProfile.EmailLink = function UserProfileEmailLink({
  children,
  ...restProps
}) {
  return <EmailLink {...restProps}>{children}</EmailLink>;
};
