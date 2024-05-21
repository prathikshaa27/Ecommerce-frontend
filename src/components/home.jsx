import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@components/pagelayout';

import { BackgroundContainer, Container, Title, Options, Button } from './homepagestyles';

const HomePage = () => {
  return (
    <PageLayout title="Welcome to Shopify">
      <Options>
        <Link to="/signupform">
          <Button>Create an account</Button>
        </Link>
        <Link to="/signinform">
          <Button>Login</Button>
        </Link>
      </Options>
    </PageLayout>
  );
};

export default HomePage;
