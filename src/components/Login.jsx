import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput, Button, Group, Checkbox } from '@mantine/core';
import { useFormValidation } from "./utils/formValidate"; // Assuming this hook is already set up for validation
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const form = useFormValidation();  // Use the custom form hook for validation
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };
  const handleSignIn=()=>{
    navigate("/home");
  }

 
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center bg-white rounded-lg shadow-2xl p-8 md:p-10">
        
        {/* Video Section */}
        <div className="hidden lg:block w-full lg:w-6/12 p-4">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="rounded-3xl w-full"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={form.onSubmit(() => handleSignIn())} className="w-full lg:w-6/12 p-6 lg:p-10">

          <h1 className="font-bold text-4xl text-gray-800 mb-8 text-center lg:text-left">Sign In</h1>

          {/* Email Input */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            error={form.errors.email}  // Display error for email input
            {...form.getInputProps('email')}
          />

          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            withAsterisk
            mt="md"
            error={form.errors.password}  // Display error for password input
            {...form.getInputProps('password')}
          />

          {/* Sign In Button */}
          {/* <Button
            fullWidth
            type="submit"
            mt="lg"
            loading={loading}  // Add loading state to the button
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button> */}
          <Button
            fullWidth
            type="submit"
            mt="lg"
          >
            Sign In
          </Button>

          {/* Forgot Password and Sign Up Links */}
          <Group position="apart" mt="md">
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-700">
              Forgot Password?
            </button>
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </span>
          </Group>

          {/* Remember Me Checkbox */}
          <Checkbox
            mt="lg"
            label="Remember Me"
          />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-600">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Sign in with Google */}
          <Button
            fullWidth
            color="orange"
            mt="md"
          >
            <FaGoogle style={{ marginRight: '8px' }} />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
