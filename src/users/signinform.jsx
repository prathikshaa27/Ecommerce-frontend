import React from 'react';
import SigninForm from './signinForm';
import * as S from './signin.styles';

const Signin = () => {
  return (
    <S.FormContainer>
      <S.Title>Sign In</S.Title>
      <SigninForm />
    </S.FormContainer>
  );
};

export default Signin;
