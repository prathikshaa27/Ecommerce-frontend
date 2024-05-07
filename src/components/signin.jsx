// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const SigninContainer = styled.div`
//   margin: 20px auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SigninForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #f9f9f9; /* Background color of the form */
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 300px;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
//   margin-bottom: 10px;
// `;

// const InputLabel = styled.label`
//   margin-bottom: 5px;
//   color: #333; 
// `;

// const Input = styled.input`
//   padding: 8px;
//   width: 100%;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const SigninButton = styled.button`
//   padding: 10px 20px;
//   background-color: #007bff;
//   color: #fff; 
//   border: none;
//   cursor: pointer;
//   border-radius: 4px;
//   width: 100%;
// `;

// const SigninTitle = styled.h2`
//   font-size: 24px;
//   color: black;
//   margin-bottom: 20px;
// `;

// const Signin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/customer/signin/', formData, {withCredentials:true});
//       console.log(response.data);
//       navigate('/dashboard')

//     } catch (error) {
//       console.error('Signin error:', error);
//     }
//   };

//   return (
//     <SigninContainer>
//       <SigninTitle>Signin</SigninTitle>
//       <SigninForm onSubmit={handleSubmit}>
//         <InputContainer>
//           <InputLabel>Username</InputLabel>
//           <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required />
//         </InputContainer>
//         <InputContainer>
//           <InputLabel>Password</InputLabel>
//           <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
//         </InputContainer>
//         <SigninButton type="submit">Signin</SigninButton>
//       </SigninForm>
//     </SigninContainer>
//   );
// };

// export default Signin;


import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signin } from '../services/api';
import { useNavigate } from 'react-router-dom'; 
import * as  S from './signin.styles'; 
import {toast} from 'react-toastify'

const Signin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); 
  
  const mutation = useMutation(signin);
  
  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
      toast.success('Logged in successfully')
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <S.FormContainer>
      <S.Title>Sign In</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputContainer>
          <S.Label htmlFor="username">Username</S.Label>
          <S.Input type="text" id="username" {...register('username', { required: true })} />
        </S.InputContainer>
        <S.InputContainer>
          <S.Label htmlFor="password">Password</S.Label>
          <S.Input type="password" id="password" {...register('password', { required: true })} />
        </S.InputContainer>
        <S.Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Signing in...' : 'Sign In'}
        </S.Button>
      </S.Form>
    </S.FormContainer>
  );
};

export default Signin;
