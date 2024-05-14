import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signup } from '@services/api';
import * as S from './signup.styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import signupFields from './signupFields.json';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

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
          <div key={field.name}>
            <S.Input
              type={field.type}
              {...register(field.name, {
                required: field.validation.required,
                minLength: field.name === 'password' ? 8 : undefined,
                maxLength: field.name === 'pincode' ? 6 : undefined,
                pattern: field.name === 'mobile' ? /^\d{10}$/ : undefined,
              })}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <span>{field.name === 'mobile' ? 'Mobile number must have exactly 10 digits.' : `Invalid ${field.name}`}</span>
            )}
          </div>
        ))}
      </S.Form>
      <S.Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Signing up...' : 'Signup'}
      </S.Button>
    </S.FormContainer>
  );
};

export default SignupForm;
