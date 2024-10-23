import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("User signed up");
  };

  const handleSignIn = () => {
    navigate("/"); // Navigate to Sign In page
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">

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
        <div className="lg:w-1/2 w-full flex flex-col justify-center bg-white  lg:p-10 rounded-lg shadow-lg">
        <h1 className="font-bold text-4xl text-gray-800 mb-8 text-center lg:text-left">Sign Up</h1>
      
          
          {/* Full Name and Phone Number */}
          <div className="flex  gap-4 w-full">
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your contact number"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address and Email */}
          <div className="flex gap-4 w-full">
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium ">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex  gap-4 w-full">
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full lg:w-[48%] mb-3">
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            className="mt-6 p-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg w-full flex items-center justify-center transition duration-300 ease-in-out"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

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
          <button
            className="flex items-center justify-center w-full p-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg focus:outline-none transition duration-300 ease-in-out"
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
