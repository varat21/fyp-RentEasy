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
        <div className="w-full lg:w-6/12 p-6 lg:p-10">
          <h1 className="font-bold text-4xl text-gray-800 mb-8 text-center lg:text-left">Sign In</h1>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign In Button */}
          <button
            className="w-full p-3 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-center flex items-center justify-center"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          {/* Forgot Password and Sign Up Links */}
          <div className="flex justify-between items-center mt-4">
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
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mt-6">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 text-gray-700">
              Remember Me
            </label>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-600">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Sign in with Google */}
          <button className="w-full p-3 text-white bg-red-500 hover:bg-red-600 flex items-center justify-center rounded-lg">
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
