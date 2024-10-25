import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput, Button } from "@mantine/core";
import { useFormValidation } from "./utils/formValidate";
import { useState } from "react";

const Register = () => {
  const form = useFormValidation(); // Use the custom form hook for validation
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for submission

  const handleSignUp = () => {
    if (form.validate().hasErrors === false) {
      console.log("User signed up", form.values);
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100 bg-gray-200">
      {/* Main container */}
      <div className="absolute z-10 flex flex-col lg:flex-row w-full max-w-7xl bg-white bg-opacity-95 rounded-lg shadow-2xl p-6 lg:p-10 gap-10">
        {/* Video Section */}
        <div className="hidden lg:block lg:w-1/2 p-4">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center bg-white lg:p-10 rounded-lg">
          <h1 className="font-bold text-4xl text-gray-800 mb-8 text-center lg:text-left">
            Sign Up
          </h1>

          <form onSubmit={form.onSubmit(() => handleSignUp())}>
            {/* Full Name and Phone Number */}
            <div className="flex gap-6 mb-2 w-full">
              <div className="w-full lg:w-[48%] mb-3">
                <TextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...form.getInputProps("fullName")}
                />
              </div>
              <div className="w-full lg:w-[48%] mb-3">
                <TextInput
                  label="Phone Number"
                  type="number"
                  placeholder="Enter your contact number"
                  {...form.getInputProps("phoneNumber")}
                />
              </div>
            </div>

            {/* Address and Email */}
            <div className="flex gap-6 w-full mb-2">
              <div className="w-full lg:w-[48%] mb-3">
                <TextInput
                  label="Address"
                  placeholder="Enter your address"
                  {...form.getInputProps("address")}
                />
              </div>
              <div className="w-full lg:w-[48%] mb-3">
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  {...form.getInputProps("email")}
                />
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="flex gap-6 w-full mb-2">
              <div className="w-full lg:w-[48%] mb-3">
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  {...form.getInputProps("password")}
                />
              </div>
              <div className="w-full lg:w-[48%] mb-3">
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  {...form.getInputProps("confirmPassword")}
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              fullWidth
              type="submit"
              mt="lg"
              loading={loading} // Add loading state to the button
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-700">
            <span>Already have an account?</span>
            <span
              className="font-semibold text-blue-500 hover:underline ml-2 cursor-pointer"
              onClick={handleSignIn}
            >
              Sign In
            </span>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <Button fullWidth color="orange" mt="md">
            <FaGoogle style={{ marginRight: "8px" }} />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
