import React from 'react';
import SignupForm from './signupForm';
import * as S from './signup.styles';

const Signup = () => {
  return (
    <S.FormContainer>
      <S.Title>Signup</S.Title>
      <SignupForm />
    </S.FormContainer>
  );
};

export default Signup;
