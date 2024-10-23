import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/home");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="relative h-screen flex justify-center items-center bg-gray-100">
        {/* Background image */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('./images/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "auto",
          }}
        ></div> */}
        
        {/* Main container */}
        <div className="absolute z-10 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full lg:w-full bg-white bg-opacity-90 shadow-2xl rounded-lg p-8 md:p-10">
          {/* Lottie MP4 Video */}
          <div className="hidden lg:block w-full lg:w-6/12 p-4">
            <video
              src="/images/lottee.mp4"
              autoPlay
              loop
              muted
              className="rounded-3xl"
            />
          </div>

          {/* Login Form */}
          <div className="lg:w-6/12 w-full flex flex-col justify-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">Sign In</h1>
            
            {/* Email Input */}
            <div className="w-full lg:full">
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

            {/* Password Input */}
            <div className="w-full lg:w-full">
    <label className="block text-gray-700 font-medium mb-2">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

            {/* Sign In Button */}
            <button
              className="p-2 text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-center mt-4 w-full flex items-center justify-center"
              onClick={handleSignIn}
            >
              Sign In
            </button>

            {/* Forgot Password and Sign Up */}
            <div className="flex items-center justify-between mt-4">
              <button className="text-sm font-semibold text-black">
                Forgot Password?
              </button>
              <span className="text-sm text-black">
                Don't have an account?
                <span
                  className="font-semibold text-blue-500 cursor-pointer"
                  onClick={handleSignUp}
                >
                  Sign Up
                </span>
              </span>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mt-4">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-black text-lg">
                Remember Me
              </label>
            </div>

            {/* Divider and Sign In with Google */}
            <p className="text-black text-center my-4">or</p>
            <button
              className="flex items-center justify-center w-full p-2 text-white bg-orange-300 hover:bg-red-700 rounded-lg focus:outline-none"
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
