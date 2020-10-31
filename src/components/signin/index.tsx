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
} from './styles/signin';

interface IForm {}
interface IFormComposition {
  BaseForm: React.FC<{
    onSubmit: (e: React.SyntheticEvent) => void;
  }>;
  Title: React.FC;
  Error: React.FC;
  ErrorServer: React.FC;
  Input: React.FC<{
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  }>;
  Break: React.FC;
  SubmitButton: React.FC<{ type: 'submit'; disabled?: boolean }>;
  TextSmall: React.FC;
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
Form.TextSmall = function FormTextSmall({ children }) {
  return <TextSmall>{children}</TextSmall>;
};
Form.ErrorServer = function FormErrorServer({ children }) {
  return <ErrorServer>{children}</ErrorServer>;
};
Form.Error = function FormError({ children }) {
  return <Error>{children}</Error>;
};
