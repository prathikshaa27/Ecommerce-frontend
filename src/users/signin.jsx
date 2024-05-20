// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useMutation } from 'react-query';
// import { signin } from '@services/api';
// import { useNavigate } from 'react-router-dom';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// import signinFields from './signinFields.json';

// import * as S from './signin.styles';
// import { toast } from 'react-toastify';
// import './signinstyles.css';

// const SigninForm = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const mutation = useMutation(signin, {
//     onSuccess: (data) => {
//       setIsAuthenticated(true); 
//       document.cookie = `authToken=${data.token}; path=/`;
//       toast.success('Logged in successfully'); 
//       navigate('/');
//     },
//     onError: (error) => {
//       console.error(error);
//       toast.error('Failed to sign in. Please try again.');
//     }
//   });

//   const onSubmit = async data => {
//     try {
//       await mutation.mutateAsync(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <S.FormContainer>
//       <S.Title>Sign In</S.Title>
//       <S.Form onSubmit={handleSubmit(onSubmit)}>
//         {signinFields.map(field => (
//           <S.InputContainer key={field.name}>
//             <S.Label htmlFor={field.name}>{field.label}</S.Label>
//             <S.Input
//               type={field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type} 
//               id={field.name}
//               {...register(field.name, field.validation)}
//               className="ecommerce-input" 
//             />
//             {field.name === 'password' && (
//               <S.PasswordToggle onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} 
//               </S.PasswordToggle>
//             )}
//           </S.InputContainer>
//         ))}
//         <S.Button type="submit" disabled={mutation.isLoading}>
//           {mutation.isLoading ? 'Signing in...' : 'Sign In'}
//         </S.Button>
//       </S.Form>
//     </S.FormContainer>
//   );
// };

// export default SigninForm;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signin } from '@services/api';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import signinFields from './signinFields.json';

import * as S from './signin.styles';
import { toast } from 'react-toastify';
import './signinstyles.css';

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
    <S.FormContainer>
      <S.Title>Sign In</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {signinFields.map(field => (
          <S.InputContainer key={field.name}>
            <S.Label htmlFor={field.name}>{field.label}</S.Label>
            <S.Input
              type={field.name === 'password' ? (showPassword ? 'text' : 'password') : field.type}
              id={field.name}
              {...register(field.name, field.validation)}
              className="ecommerce-input"
            />
            {field.name === 'password' && (
              <S.PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </S.PasswordToggle>
            )}
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
