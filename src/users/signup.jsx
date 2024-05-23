import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import PageLayout from '../components/pagelayout';
import { signup } from '@services/users';
import signupFields from './signupFields.json';


const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

const SignupImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const SignupFormContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SignupForm = ({ onSuccessfulSignup = () => {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation(signup, {
    onSuccess: () => {
      toast.success("Registration successful. You can now sign in.");
      onSuccessfulSignup();
      navigate('/signinform');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to sign up. Please try again.');
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
    <PageLayout title="Create an Account">
      <SignupContainer>
        <SignupImage>
          <img src="https://st.depositphotos.com/1001877/3814/i/450/depositphotos_38143799-stock-photo-e-commerce-shopping-cart-with.jpg" alt="Signup" />
        </SignupImage>
        <SignupFormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {signupFields.map(field => (
              <FormGroup key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  type={field.type}
                  id={field.name}
                  {...register(field.name, {
                    required: field.validation.required,
                    minLength: field.validation.minLength,
                    maxLength: field.validation.maxLength,
                    pattern: field.validation.pattern,
                  })}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <ErrorMessage>
                    {errors[field.name].type === "required" && "This field is required."}
                    {errors[field.name].type === "minLength" && `Minimum length is ${field.validation.minLength}.`}
                    {errors[field.name].type === "maxLength" && `Maximum length is ${field.validation.maxLength}.`}
                    {errors[field.name].type === "pattern" && "Invalid input."}
                  </ErrorMessage>
                )}
              </FormGroup>
            ))}
            <SubmitButton type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Signing up...' : 'Signup'}
            </SubmitButton>
          </form>
        </SignupFormContainer>
      </SignupContainer>
    </PageLayout>
  );
};

export default SignupForm;
