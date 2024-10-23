import { useLocation } from "react-router-dom";

const Navbar = () => {
  const pathName = useLocation()
  console.log(pathName);
  


  return (
    // <div className="p-4 shadow-lg bg-white">
          <div className="absolute px-8 py-1  z-10  flex items-center h-20 w-[98%] bg-blue-500 rounded-lg shadow-lg ">

      <div className="absolute  py-1  z-10  flex items-center h-20 w-[100%] bg-blue-500 rounded-lg ">

      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center justify-start">
  <img src="/images/logo.png" className="w-16 h-16 rounded-full" alt="Logo" />
</div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold text-lg">
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
          <li className="hover:text-gray-200 cursor-pointer">Categories</li>

          <li className="hover:text-gray-200 cursor-pointer">About</li>
          <li className="hover:text-gray-200 cursor-pointer">Contact</li>
        </ul>

        {/* Right Section (Login, SignUp, or other CTA buttons) */}
        <div className="hidden md:flex space-x-4 items-center">
     {/* Only show Sign in button if not on login or register page */}
     {pathName == "/login" && pathName == "/register" && (
              <button className="hover:text-gray-200 cursor-pointer">Sign in</button>
            )}
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Sign up
          </button> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
