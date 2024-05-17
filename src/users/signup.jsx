import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signup } from '@services/api';
import { useNavigate } from 'react-router-dom';
import signupFields from './signupFields.json';
import { toast } from 'react-toastify';
import './styles.css';
import { useAuth } from './authcontext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth(); 

  const mutation = useMutation(signup, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      login();  
      navigate('/'); 
      toast.success("Registration successful. You are now logged in.");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to sign up. Please try again.");
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
    <div className="signup-container">
      <div className="signup-image">
        <img src="https://st.depositphotos.com/1001877/3814/i/450/depositphotos_38143799-stock-photo-e-commerce-shopping-cart-with.jpg" alt="Signup" />
      </div>
      <div className="signup-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signupFields.map(field => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.placeholder}</label>
              <input
                type={field.type}
                id={field.name}
                {...register(field.name, {
                  required: field.validation.required,
                  pattern: field.name === 'email'
                    ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    : field.name === 'mobile'
                      ? /^[0-9]{10}$/
                      : field.name === 'pincode'
                        ? /^[0-9]{6}$/
                        : field.name === 'username'
                          ? /^[a-zA-Z0-9]+$/
                          : field.name === 'password'
                            ? /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                            : null,
                })}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <span className="error">
                  {errors[field.name].type === "required" && "This field is required."}
                  {errors[field.name].type === "pattern" && (
                    field.name === 'email' ? "Invalid email address." :
                    field.name === 'mobile' ? "Mobile number should contain 10 digits." :
                    field.name === 'pincode' ? "Pincode should contain 6 digits." :
                    field.name === 'username' ? "Username should contain only letters and numbers." :
                    field.name === 'password' ? "Password should be at least 8 characters long and contain at least one letter and one number." :
                    null
                  )}
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
  );
};

export default SignupForm;
