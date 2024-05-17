import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signin } from '@services/api';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useAuth } from './authcontext';

import signinFields from './signinFields.json';
import './signinstyles.css';

const SigninForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation(signin, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      login();
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
    <div className="form-container">
      <h1 className="title">Welcome Back</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {signinFields.map(field => (
          <div className="input-container" key={field.name}>
            <label className="label" htmlFor={field.name}>{field.label}</label>
            <input
              type={field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type}
              id={field.name}
              {...register(field.name, field.validation)}
              className="input ecommerce-input"
              placeholder={field.placeholder} 
            />
            {field.name === 'password' && (
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className="button" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
