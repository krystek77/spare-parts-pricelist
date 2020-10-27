import React from 'react';
import {
  CancelButton,
  AddButton,
  Button,
  TransparentButton,
  Label,
  Icon,
} from './styles/button';

interface ICustomButton {
  btn?: string;
  onClick?: () => void;
}
interface ICustomButtonComposition {
  Label: React.FC;
  Icon: React.FC;
}

export const CustomButton: React.FC<ICustomButton> &
  ICustomButtonComposition = ({ children, ...restProps }) => {
  const { btn } = restProps;
  let returnedButton = <Button {...restProps}>{children}</Button>;

  switch (btn) {
    case 'CANCEL':
      returnedButton = <CancelButton {...restProps}>{children}</CancelButton>;
      break;
    case 'ADD':
      returnedButton = <AddButton {...restProps}>{children}</AddButton>;
      break;
    case 'TRANSPARENT':
      returnedButton = (
        <TransparentButton {...restProps}>{children}</TransparentButton>
      );
      break;
    default:
      returnedButton = <Button {...restProps}>{children}</Button>;
      break;
  }
  return returnedButton;
};

CustomButton.Label = function CustomButtonLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};
CustomButton.Icon = function CustomButtonIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};
