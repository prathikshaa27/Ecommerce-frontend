import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  background-image: url(${"https://i0.wp.com/segwitz.com/wp-content/uploads/2021/09/why-ecommerce-need-mobile-apps.jpg"}); 
  background-size: cover;
  background-position: center; 
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 50px;
`;

export const Options = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
