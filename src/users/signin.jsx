import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signin } from '@services/users';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import styled from 'styled-components';
import { toast } from 'react-toastify';

import PageLayout from '@components/pagelayout';
import signinFields from './signinFields.json'

import './signinstyles.css';

const FormContainer = styled.div`
  max-width: 400px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto 20px 100px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PasswordToggle = styled.span`
  cursor: pointer;
  color: #007bff;
  margin-left: 7px;
`;

const SigninForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation(signin, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      document.cookie = `authToken=${data.token}; path=/`;
      toast.success('Logged in successfully');
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to sign in. Please try again.');
    }
  });

  const onSubmit = async data => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Sign In">
      <FormContainer>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {signinFields.map(field => (
            <InputContainer key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                type={field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                id={field.name}
                {...register(field.name, field.validation)}
                className="ecommerce-input"
              />
              {field.name === 'password' && (
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </PasswordToggle>
              )}
            </InputContainer>
          ))}
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>
      </FormContainer>
    </PageLayout>
  );
};

export default SigninForm;
