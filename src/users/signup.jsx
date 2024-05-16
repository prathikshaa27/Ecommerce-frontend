import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signup } from '@services/api';
import { useNavigate } from 'react-router-dom';
import signupFields from './signupFields.json';

import { toast } from 'react-toastify';
import './styles.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation(signup);

  const onSubmit = async data => {
    try {
      await mutation.mutateAsync(data);
      navigate('/signinform');
      toast.success("Registration successful. You can now sign in.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
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
      <div className="signup-image">
        <img src="https://st.depositphotos.com/1001877/3814/i/450/depositphotos_38143799-stock-photo-e-commerce-shopping-cart-with.jpg" alt="Signup" />
      </div>
    </div>
  );
};

export default SignupForm;
