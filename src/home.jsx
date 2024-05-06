import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  background-image: url(${"https://i0.wp.com/segwitz.com/wp-content/uploads/2021/09/why-ecommerce-need-mobile-apps.jpg"}); 
  background-size:cover;
  background-position: center; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Title = styled.h2`
  text-align: center;
  color:white;
  font-size:50px;

 
 
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const HomePage = () => {
  return (
    <BackgroundContainer>
        <Container>
      <Title>Welcome to Shopify</Title>
      <Options>
        <Link to="/signup">
           
          <Button>Create an account</Button>
        </Link>
        <Link to="/signin">
          <Button>Login</Button>
        </Link>
      </Options>
      </Container>
   
        </BackgroundContainer>
        
  );
};


export default HomePage;
