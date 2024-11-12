import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { useFormValidation } from './utils/formValidate'; // Assuming this is your validation hook
import { useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';

const Login = () => {
  const { resolver } = useFormValidation();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver,
  });

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock async behavior
      console.log(data);
      // Here you can handle the actual login logic, like API call, etc.
    } catch (error) {
      setError('root', {
        message: 'An error occurred. Please try again.',
      });
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
      {/* Main container */}
      <div className="absolute z-10 flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg p-10 gap-8">
        {/* Video Section */}
        <div className="hidden lg:block lg:w-1/2">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 lg:p-12 bg-white rounded-lg shadow-lg space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="font-bold text-3xl text-gray-800 text-center lg:text-left">
              Sign In
            </h1>

            {/* Email Input */}
            <TextInput
              {...register('email')}
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              withAsterisk
            />

            {/* Password Input */}
            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              withAsterisk
            />

            {/* Sign In Button */}
            <Button fullWidth type="submit" mt="lg">
              {isSubmitting ? <FiLoader className="animate-spin" /> : 'Sign In'}
            </Button>

            {/* Forgot Password and Sign Up Links */}
            <Group position="apart" mt="md">
              <button className="text-sm font-semibold text-blue-500 hover:text-blue-700">
                Forgot Password?
              </button>
            </Group>

            {/* Remember Me Checkbox */}
            <Checkbox label="Remember Me" />

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Sign in with Google */}
            <Button fullWidth variant="light" color="blue">
              <FcGoogle className="mr-2" />
              Sign In with Google
            </Button>

            <div className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
