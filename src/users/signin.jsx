// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useMutation } from 'react-query';
// import { signin } from '../services/api';
// import { useNavigate } from 'react-router-dom'; 
// import * as  S from './signin.styles'; 
// import { toast } from 'react-toastify';

// const Signin = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate(); 
  
//   const mutation = useMutation(signin);
  
//   const onSubmit = async (data) => {
//     try {
//       await mutation.mutateAsync(data);
//       toast.success('Logged in successfully'); 
//       navigate('/dashboard'); 
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   return (
//     <S.FormContainer>
//       <S.Title>Sign In</S.Title>
//       <S.Form onSubmit={handleSubmit(onSubmit)}>
//         <S.InputContainer>
//           <S.Label htmlFor="username">Username</S.Label>
//           <S.Input type="text" id="username" {...register('username', { required: true })} />
//         </S.InputContainer>
//         <S.InputContainer>
//           <S.Label htmlFor="password">Password</S.Label>
//           <S.Input type="password" id="password" {...register('password', { required: true })} />
//         </S.InputContainer>
//         <S.Button type="submit" disabled={mutation.isLoading}>
//           {mutation.isLoading ? 'Signing in...' : 'Sign In'}
//         </S.Button>
//       </S.Form>
//     </S.FormContainer>
//   );
// };

// export default Signin;


import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signin } from '../services/api';
import { useNavigate } from 'react-router-dom';
import * as S from './signin.styles';
import { toast } from 'react-toastify';
import signinFields from './signinFields.json'; 

const SigninForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation(signin);

  const onSubmit = async data => {
    try {
      await mutation.mutateAsync(data);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.FormContainer>
      <S.Title>Sign In</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {signinFields.map(field => (
          <S.InputContainer key={field.name}>
            <S.Label htmlFor={field.name}>{field.label}</S.Label>
            <S.Input
              type={field.type}
              id={field.name}
              {...register(field.name, field.validation)}
            />
          </S.InputContainer>
        ))}
        <S.Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Signing in...' : 'Sign In'}
        </S.Button>
      </S.Form>
    </S.FormContainer>
  );
};

export default SigninForm;
