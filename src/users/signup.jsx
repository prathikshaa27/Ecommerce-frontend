// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const Title = styled.h2`
//   text-align: center;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     profile: {
//       mobile: '',
//       address: '',
//       pincode: '',
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       profile: {
//         ...prevData.profile,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/api/customer/signup/', formData, { withCredentials: true });
//       console.log(response.data);
//       navigate('/signin')
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <FormContainer>
//       <Title>Signup</Title>
//       <Form onSubmit={handleSubmit}>
//         <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//         <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//         <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//         <Input type="text" name="mobile" value={formData.profile.mobile} onChange={handleProfileChange} placeholder="Mobile" required />
//         <Input type="text" name="address" value={formData.profile.address} onChange={handleProfileChange} placeholder="Address" required />
//         <Input type="text" name="pincode" value={formData.profile.pincode} onChange={handleProfileChange} placeholder="Pincode" required />
//         <Button type="submit">Signup</Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default Signup;

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signup } from '../services/api';
import * as S from './signup.styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import signupFields from './signupFields.json'; 

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const mutation = useMutation(signup);

  const onSubmit = async data => {
    try {
      await mutation.mutateAsync(data);
      navigate('/signin');
      toast.success("Registration successful. You can now sign in.");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.FormContainer>
      <S.Title>Signup</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {signupFields.map(field => (
          <S.Input
            key={field.name}
            type={field.type}
            {...register(field.name, field.validation)}
            placeholder={field.placeholder}
          />
        ))}
        <S.Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Signing up...' : 'Signup'}
        </S.Button>
      </S.Form>
    </S.FormContainer>
  );
};

export default SignupForm;
