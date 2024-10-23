import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Logic for sign-up can be added here
    console.log("User signed up");
  };

  const handleSignIn = () => {
    navigate("/"); // Navigate to Sign In page
  };

  return (
    <div>
      
    <div className="relative h-screen flex justify-center items-center bg-gray-100">
      {/* Background image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: "url('./images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div> */}

      {/* Main container */}
      <div className="absolute z-10 flex gap-8 flex-col lg:flex-row lg:justify-between lg:items-center w-full lg:w-full bg-white bg-opacity-90 rounded-lg p-8 md:p-10">
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

        {/* Register Form */}
        <div className="lg:w-6/12 w-full flex flex-col justify-center">
        <div className="lg:w-full w-full flex flex-col justify-center bg-white p-6 rounded-lg   mx-auto">
  <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">Sign Up</h1>

  <div className="flex gap-8 flex-wrap justify-between">
    <div className="w-full lg:w-5/12">
      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
      <input
        type="text"
        placeholder="Enter your full name"
        className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="w-full lg:w-5/12">
      <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
      <input
        type="number"
        placeholder="Enter your contact number"
        className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div className="flex gap-8 flex-wrap justify-between">
    <div className="w-full lg:w-5/12">
      <label className="block text-gray-700 font-medium mb-2">Address</label>
      <input
        type="text"
        placeholder="Enter your address"
        className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="w-full lg:w-5/12">
      <label className="block text-gray-700 font-medium mb-2">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
  <div className="flex gap-8 flex-wrap justify-between">
  <div className="w-full lg:w-5/12">
    <label className="block text-gray-700 font-medium mb-2">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      className="p-3 mb-4 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="w-full lg:w-5/12">
    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
    <input
      type="password"
      placeholder="Confirm your password"
      className="p-3 rounded-lg w-full text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>
</div>
  <button
    className="p-3 text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg w-full flex items-center justify-center transition duration-300 ease-in-out"
    onClick={handleSignUp}
  >
    Sign Up
  </button>

  <div className="flex items-center justify-between mt-4">
    <span className="text-sm text-gray-700">Already have an account?</span>
    <span
      className="text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
      onClick={handleSignIn}
    >
      Sign In
    </span>
  </div>

  {/* <!-- Divider and Sign Up with Google --> */}
  <div className="relative my-6">
    <p className="text-center text-gray-500">or</p>
  </div>

  <button
    className="flex items-center justify-center w-full p-3 text-white bg-orange-300 hover:bg-red-600 rounded-lg focus:outline-none"
  >
    <FaGoogle className="mr-2" />
    Sign up with Google
  </button>
</div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
