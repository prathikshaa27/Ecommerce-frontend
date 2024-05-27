import React from 'react';
import SignupForm from './signup';
import * as S from './signup.styles';
import './styles.css'

const Signup = () => {
  return (
    <S.FormContainer>
      <S.Title>Signup</S.Title>
      <SignupForm />
    </S.FormContainer>
  );
};

export default Signup;
