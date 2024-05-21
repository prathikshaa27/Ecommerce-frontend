import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/pagelayout';

import { signup } from '@services/api';
import signupFields from './signupFields.json';

import './styles.css';

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
      <div className="signup-container">
        <div className="signup-image">
          <img src="https://st.depositphotos.com/1001877/3814/i/450/depositphotos_38143799-stock-photo-e-commerce-shopping-cart-with.jpg" alt="Signup" />
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {signupFields.map(field => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>{field.label}</label>
                <input
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
                  <span className="error">
                    {errors[field.name].type === "required" && "This field is required."}
                    {errors[field.name].type === "minLength" && `Minimum length is ${field.validation.minLength}.`}
                    {errors[field.name].type === "maxLength" && `Maximum length is ${field.validation.maxLength}.`}
                    {errors[field.name].type === "pattern" && "Invalid input."}
                  </span>
                )}
              </div>
            ))}
            <button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignupForm;
