import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  TextInput,
  Button,
  Group,
  Checkbox,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { useLoginValidation} from '../hooks/formValidate'; // Assuming this is your validation hook
import { useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import axios from "axios";
import { toast } from "react-hot-toast";

import ForgetPasswordModal from "./ForgetPasswordModal";
import { useDisclosure } from '@mantine/hooks';

const Login = () => {

  const { resolver } = useLoginValidation();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver,
  });

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleSignUp = () => {
    navigate("/register");
  };

  const onSubmit = async (data) => {
    try {
      var formData = new FormData();
      formData.append("email",data.email);
      formData.append("password",data.password);
      const response = await axios.post('http://localhost/rent-easy/auth/login.php',formData );
      console.log(response);
      if(response.data.success = 'success'){
        //store session  or user info
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success("Login successful");
        const userType = response.data.userType;
        // Navigate based on userType
        if (userType === 'tenant') {
          navigate("/");
        } else if (userType === 'landlord') {
          navigate("/landlord");
        }
        else if (userType === 'admin') {
          navigate("/admin");
        }

      }else{
        //set the form error if registration failed
        setError("root",{
          type:"manual",
          message:response.data.message,
        });
        toast.error(response.data.message);
      }
      }catch(error){
        console.error(error);
        setError("root",{
          type:"manual",
          message:"An error occurred.Please try again later.",
        });
        toast.error("An error occurred.Please try again later.");
      }
     
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center  p-10 m-10 ">
      {/* Main container */}
      <div className="absolute z-10 flex flex-col lg:flex-row w-full max-w-5xl bg-white  rounded-md p-10 gap-8  border-gray-200 shadow-md">
        {/* Video Section */}
        <div className="hidden lg:block lg:w-fill w-[50%]">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl "
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 lg:p-12  rounded-lg  space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="font-bold text-3xl text-gray-800 text-center lg:text-left ">
              Sign In
            </h1>

            {/* Email Input */}
            <TextInput
              {...register('email')}
              label="Email"
              placeholder="Enter  email"
              error={errors.email?.message}
              withAsterisk
            />

            {/* Password Input */}
            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter  password"
              error={errors.password?.message}
              withAsterisk
            />
            

            {/* Sign In Button */}
            <Button fullWidth type="submit" mt="lg">
              {isSubmitting ? <FiLoader className="animate-spin" /> : 'Sign In'}
            </Button>

           
            <div className="">
            {/* <div className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex justify-center items-center">
            <Checkbox label="Remember Me" />
            </div> */}
            <div className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex justify-center items-center">
            {/* <Group position="apart" mt="md"> */}
              <button  type="button" onClick ={open}>
                Forgot Password?
              </button>
              </div>
              </div>

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
      {/* Forget password modal */}

  
            <ForgetPasswordModal opened={opened} close={close} />

    </div>
  );
};


export default Login;

