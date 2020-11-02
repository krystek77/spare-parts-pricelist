import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { HeaderContainer, NavigationContainer } from '../containers';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

interface ISigninPage {}
interface IErrors {
  email?: string;
  password?: string;
  server?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isEmpty = (str: string): boolean => {
  if (str.trim() === '') return true;
  return false;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isEmail = (email: string): boolean => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regExp) !== null ? true : false;
};
const passwordLength = (
  password: string,
  min: number,
  max: number
): boolean => {
  return min <= password.length && password.length <= max;
};

function emailValidation(email: string): boolean {
  let isValid: boolean = true;
  isValid = !isEmpty(email) && isValid;
  isValid = isEmail(email) && isValid;
  return isValid;
}

function passwordValidation(password: string) {
  let isValid: boolean = true;
  isValid = !isEmpty(password) && isValid;
  isValid = passwordLength(password, 6, 10) && isValid;
  return isValid;
}

function dataValidation(email: string, password: string) {
  let isValid: boolean = emailValidation(email) && passwordValidation(password);
  return isValid;
}

export const SigninPage: React.FC<ISigninPage> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errors, setErrors] = React.useState<IErrors>({});

  const history = useHistory();

  const validForm = dataValidation(email, password);
  const isError = Object.keys(errors).length > 0 ? true : false;

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign in successfully');
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setErrors({ ...errors, server: error.message });
      });
  };

  return (
    <HeaderContainer bgImage src='bg_Signin'>
      <NavigationContainer bgColor />
      <Form>
        <Form.Title>Sign in</Form.Title>
        {isError && errors.server && (
          <Form.ErrorServer>{errors.server}</Form.ErrorServer>
        )}
        <Form.BaseForm onSubmit={handleSignin}>
          <Form.Input
            type='text'
            name='email'
            value={email}
            placeholder='Email address'
            // onChange:React.ChangeEventHandler<HTMLInputElement> =
            onChange={(e) => {
              setErrors({});
              setEmail(e.currentTarget.value);
            }}
          />
          <Form.Input
            type='text'
            placeholder='Password'
            value={password}
            name='password'
            onChange={(e) => {
              setErrors({});
              setPassword(e.currentTarget.value);
            }}
          />
          <Form.Break />
          <Form.SubmitButton type='submit' disabled={!validForm}>
            Sign in
          </Form.SubmitButton>
          <Form.Break />
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot.
          </Form.TextSmall>
        </Form.BaseForm>
      </Form>
    </HeaderContainer>
  );
};
