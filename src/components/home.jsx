import React from 'react';
import { Link } from 'react-router-dom';

import { BackgroundContainer, Container, Title, Options, Button } from './homepagestyles';

const HomePage = () => {
  return (
    <BackgroundContainer>
      <Container>
        <Title>Welcome to Shopify</Title>
        <Options>
          <Link to="/signupform">
            <Button>Create an account</Button>
          </Link>
          <Link to="/signinform">
            <Button>Login</Button>
          </Link>
        </Options>
      </Container>
    </BackgroundContainer>
  );
};

export default HomePage;
