// import { useNavigate } from "react-router-dom";
// import { PasswordInput, TextInput, Button, Select } from "@mantine/core";
// import { FcGoogle } from "react-icons/fc";
// import { Controller, useForm } from "react-hook-form";
// import { FiLoader } from "react-icons/fi";
// import { useFormValidation } from "../hooks/formValidate";
// import { toast } from "react-hot-toast";
// import axios from "axios"; // Make sure to import axios

// const Register = () => {

  
//   const { resolver } = useFormValidation();
//   const {
//     control,
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver,
//   });
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       var formData = new FormData();
//       formData.append("email", data.email);
//       formData.append("password", data.password);
//       formData.append("name", data.name);
//       formData.append("phoneNumber", data.phoneNumber);
//       formData.append("userType", data.userType);

//       // Send form data using axios
//       const response = await axios.post(
//         "http://localhost/rent-easy/auth/register.php",
//         formData
//       );
//       console.log(response);
//       if (response.data.success) {
//         // Registration was successful, navigate to login
//         toast.success("Registration successful, Check your mail to verify email");
//         navigate("/login");
//       } else {
//         // Set the form error if registration failed
//         setError("root", {
//           type: "manual",
//           message: response.data.message,
//         });
//         toast.error(response.data.message); // Show error to the user
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setError("root", {
//         type: "manual",
//         message: "An error occurred. Please try again later.",
//       });
//       toast.error("An error occurred. Please try again later.");
//     }
//   };

//   const handleSignIn = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="relative min-h-screen flex justify-center items-center  p-10 m-10">
//       {/* Main container */}
//       <div className="absolute z-10 flex flex-col lg:flex-row w-full max-w-5xl   bg-white rounded-md p-10 gap-10 border-gray-200 shadow-md">
//         {/* Video Section */}
//         <div className="hidden lg:block lg:w-full  w-[50%]">
//           <video
//             src="/images/lottee.mp4"
//             autoPlay
//             loop
//             muted
//             className="w-full h-full object-cover rounded-xl "
//           />
//         </div>

//         {/* Form Section */}
//         <div className="lg:w-full w-full flex flex-col justify-center  lg:p-10 rounded-lg">
//           <h1 className="font-extrabold text-3xl text-gray-800 mb-8 text-center lg:text-left">
//             Sign Up
//           </h1>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Full Name and Phone Number */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <TextInput
//                   {...register("name")}
//                   label="Full Name"
//                   placeholder="Enter Full Name"
//                   error={errors.name?.message}
//                   className="border-gray-300 shadow-sm rounded-lg"
//                 />
//               </div>
//               <div>
//                 <TextInput
//                   {...register("phoneNumber")}
//                   label="Phone Number"
//                   type="number"
//                   placeholder="Enter phone number"
//                   error={errors.phoneNumber?.message}
//                   className="border-gray-300 shadow-sm rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* User Type and Email */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <Controller
//                   name="userType" // Specify the name of the field
//                   control={control} // Pass control prop
//                   render={({ field }) => (
//                     <Select
//                       {...field} // Spread the field props into the Select component
//                       label="User Type"
//                       placeholder="Select user type"
//                       data={["Landlord", "Tenant"]}
//                       error={errors.userType?.message}
//                       className="rounded-lg"
//                     />
//                   )}
//                 />
//               </div>
//               <div>
//                 <TextInput
//                   {...register("email")}
//                   label="Email"
//                   placeholder="Enter email"
//                   error={errors.email?.message}
//                   className="border-gray-300 shadow-sm rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <PasswordInput
//                   {...register("password")}
//                   label="Password"
//                   placeholder="Enter password"
//                   error={errors.password?.message}
//                   className="border-gray-300 shadow-sm rounded-lg"
//                 />
//               </div>
//               <div>
//                 <PasswordInput
//                   label="Confirm Password"
//                   placeholder="Confirm password"
//                   className="border-gray-300 shadow-sm rounded-lg"
//                   {...register("confirmPassword")}
//                   error={errors.confirmPassword?.message}
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button
//               fullWidth
//               type="submit"
//               mt="lg"
//               disabled={isSubmitting}
//               className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
//             >
//               {isSubmitting ? <FiLoader className="animate-spin" /> : "Sign Up"}
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">or</span>
//             </div>
//           </div>

//           {/* Google Sign Up Button */}
//           <Button fullWidth variant="light" color="blue" mt="md">
//             <FcGoogle className="mr-2" />
//             Sign up with Google
//           </Button>

//           <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
//             <span>Already have an account?</span>
//             <span
//               className="font-semibold text-blue-500 hover:underline ml-2 cursor-pointer"
//               onClick={handleSignIn}
//             >
//               Sign In
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;








import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput, Button, Select } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { Controller, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { useFormValidation } from "../hooks/formValidate";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { resolver } = useFormValidation();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver,
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("userType", data.userType);

      const response = await axios.post(
        "http://localhost/rent-easy/auth/register.php",
        formData
      );
      console.log(response);
      

      if (response.data.success) {
        toast.success("Registration successful! Check your email to verify.");
        // navigate("/VerifyEmail");
      } else {
        setError("root", {
          type: "manual",
          message: response.data.message,
        });
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSignIn = () => navigate("/login");

  return (
    <div className="relative min-h-screen flex justify-center items-center px-5 py-10">
      {/* Main container */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md p-8 gap-8">
        {/* Video Section */}
        <div className="hidden lg:block w-full lg:w-1/2">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name and Phone Number */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TextInput
                {...register("name")}
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.name?.message}
                className="rounded-lg"
              />
              <TextInput
                {...register("phoneNumber")}
                label="Phone Number"
                type="number"
                placeholder="Enter your phone number"
                error={errors.phoneNumber?.message}
                className="rounded-lg"
              />
            </div>

            {/* User Type and Email */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="User Type"
                    placeholder="Select user type"
                    data={["Landlord", "Tenant"]}
                    error={errors.userType?.message}
                    className="rounded-lg"
                  />
                )}
              />
              <TextInput
                {...register("email")}
                label="Email"
                placeholder="Enter your email"
                error={errors.email?.message}
                className="rounded-lg"
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PasswordInput
                {...register("password")}
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                className="rounded-lg"
              />
              <PasswordInput
                {...register("confirmPassword")}
                label="Confirm Password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                className="rounded-lg"
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {isSubmitting ? <FiLoader className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            fullWidth
            variant="outline"
            color="gray"
            className="flex items-center justify-center gap-2"
          >
            <FcGoogle />
            Sign up with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-500 font-semibold cursor-pointer"
              onClick={handleSignIn}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
