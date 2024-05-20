import React, { useState } from 'react';
import { BackgroundContainer, Container, Title, Options, Button, SignInFormContainer } from './homepagestyles';
import SigninForm from '../users/signin';
import SignupForm from '../users/signup';


const HomePage = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSuccessfulSignup = () => {
    setShowSignup(false);
  };

  return (
    <BackgroundContainer>
      <Container>
        <Title>Welcome to Shopify</Title>
        <Options>
          <SignInFormContainer>
            {!showSignup && <SigninForm />}
            {!showSignup && (
              <p>Don't have an account? <Button onClick={handleSignupClick}>Create an account</Button></p>
            )}
          </SignInFormContainer>
          <div className="signup-form">
            {showSignup && <SignupForm onSuccessfulSignup={handleSuccessfulSignup} />}
          </div>
        </Options>
      </Container>
    </BackgroundContainer>
  );
};

export default HomePage;
