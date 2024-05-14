import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 12px 120px; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px; 

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
