import React from 'react';
import {
  Container,
  Inner,
  Title,
  Error,
  ErrorServer,
  BaseForm,
  Input,
  Break,
  SubmitButton,
  TextSmall,
  InputsGroup,
  RadioInput,
  InputLabel,
  IconButton,
  TextAreaInput,
  Message,
  ClearButton,
} from './styles/form';

interface IForm {
  bgColor?: boolean;
}
interface IFormComposition {
  BaseForm: React.FC<{
    onSubmit: (e: React.SyntheticEvent) => void;
  }>;
  Title: React.FC;
  Error: React.FC;
  ErrorServer: React.FC;
  Message: React.FC;
  Input: React.FC<{
    type: string;
    name: string;
    value: string;
    placeholder: string;
    id?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.FormEvent<HTMLInputElement>) => void;
  }>;
  Break: React.FC;
  SubmitButton: React.FC<{ type: 'submit'; disabled?: boolean }>;
  ClearButton: React.FC<{
    type: 'button';
    onClick?: () => void;
  }>;
  TextSmall: React.FC;
  InputsGroup: React.FC;
  RadioInput: React.FC<{
    type: 'radio';
    value: string;
    name: string;
    checked: boolean;
    id: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.FormEvent<HTMLInputElement>) => void;
  }>;
  InputLabel: React.FC<{ htmlFor?: string }>;
  IconButton: React.FC<{
    type: 'button';
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  }>;
  TextAreaInput: React.FC<{
    value: string;
    name: string;
    id: string;
    placeholder: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    cols?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  }>;
}
export const Form: React.FC<IForm> & IFormComposition = ({
  children,
  ...restProps
}) => {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
};
Form.BaseForm = function FormBaseForm({ children, ...restProps }) {
  return <BaseForm {...restProps}>{children}</BaseForm>;
};
Form.Title = function FormTitle({ children }) {
  return <Title>{children}</Title>;
};
Form.Input = function FormInput({ ...restProps }) {
  return <Input {...restProps} />;
};
Form.Break = function FormBreak() {
  return <Break />;
};
Form.SubmitButton = function FormSubmitButton({ children, ...restProps }) {
  return <SubmitButton {...restProps}>{children}</SubmitButton>;
};
Form.ClearButton = function FormClearButton({ children, ...restProps }) {
  return <ClearButton {...restProps}>{children}</ClearButton>;
};
Form.TextSmall = function FormTextSmall({ children }) {
  return <TextSmall>{children}</TextSmall>;
};
Form.ErrorServer = function FormErrorServer({ children }) {
  return <ErrorServer>{children}</ErrorServer>;
};
Form.Error = function FormError({ children }) {
  return <Error>{children}</Error>;
};
Form.Message = function FormMessage({ children }) {
  return <Message>{children}</Message>;
};
Form.InputsGroup = function FormInputsGroup({ children }) {
  return <InputsGroup>{children}</InputsGroup>;
};
Form.RadioInput = function FormRadioInput({ ...restProps }) {
  return <RadioInput {...restProps} />;
};
Form.InputLabel = function FormInputLabel({ children, ...restProps }) {
  return <InputLabel {...restProps}>{children}</InputLabel>;
};
Form.IconButton = function FormIconButton({ children, ...restProps }) {
  return <IconButton {...restProps}>{children}</IconButton>;
};
Form.TextAreaInput = function FormTextAreaInput({ ...restProps }) {
  return <TextAreaInput {...restProps} />;
};
