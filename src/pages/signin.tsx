import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { dataValidation } from '../helpers';
import { HeaderContainer, NavigationContainer } from '../containers';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

interface ISigninPage {}
interface IErrors {
  email?: string;
  password?: string;
  server?: string;
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
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setErrors({ ...errors, server: error.message });
      });
  };

  return (
    <HeaderContainer bgImage src='bg_Signin'>
      <NavigationContainer bgColor />
      <Form bgColor size={'signin'}>
        <Form.Title>Sign in</Form.Title>
        {isError && errors.server && (
          <Form.ErrorServer>{errors.server}</Form.ErrorServer>
        )}
        <Form.BaseForm onSubmit={handleSignin}>
          <Form.AriaLabeledBy id='loginEmail'>Login email</Form.AriaLabeledBy>
          <Form.Input
            aria-label='Login email'
            aria-labelledby='loginEmail'
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
          <Form.AriaLabeledBy id='loginPassword'>
            Login password
          </Form.AriaLabeledBy>
          <Form.Input
            aria-label='Login password'
            aria-labelledby='loginPassword'
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
          <Form.AriaLabeledBy id='signIn'>Sign in</Form.AriaLabeledBy>
          <Form.SubmitButton
            aria-label='Sign in'
            aria-labelledby='signIn'
            type='submit'
            disabled={!validForm}
          >
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
