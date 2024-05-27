import React from 'react';
import { BackgroundContainer, Container, Title, Options, Button } from './homepagestyles';
import './homepagestyles';

const PageLayout = ({ title, children }) => {
  return (
    <BackgroundContainer>
      <Container>
        <Title>{title}</Title>
        {children}
      </Container>
    </BackgroundContainer>
  );
};

export default PageLayout;
