import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Drawer,
  Button,
  Divider,
} from "@mantine/core";
import { FcAbout } from "react-icons/fc";
import { LuTableProperties } from "react-icons/lu";
import { TbLetterMSmall } from "react-icons/tb";
import { CiLogin, CiHome } from "react-icons/ci";
import { FiAlignJustify } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaQq, FaRegUser } from "react-icons/fa";
import {
  MdBedroomParent,
  MdContactPhone,
  MdOutlinePolicy,
} from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { jwtDecode } from "jwt-decode"; 
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Use jwtDecode directly
          const decoded = jwtDecode(token);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setUser(null);
            return;
          }

          // Set user data from token
          setUser({
            username: decoded.username || decoded.name || "User",
            userType: decoded.userType,
            email: decoded.email
          });
        } catch (error) {
          console.error("Token decode error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
    toast.success("Logged out successfully");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-[999] px-6 py-3 w-full">
      
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-wrap items-center">
          <img src="/images/logo.png" alt="RentEasy" className="h-10" />
          <span className="text-xl font-bold ml-2 text-blue-600">RentEasy</span>
        </Link>
        {/* Search Bar */}
        {/* <div className="hidden md:flex w-[40%] items-center bg-gray-100 rounded-full px-4 py-2">
          <FiSearch className="text-gray-500 mr-2" />
          <TextInput
            placeholder="Search by location or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full"
          />
        </div> */}

        {/* Navigation & Profile */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <Link 
              to="/" 
              className={`transition-colors duration-200 ${
                location.pathname === "/" 
                  ? "text-blue-600 font-bold" 
                  : "hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            {/* <Link to="/properties" 
className={`transition-colors duration-200 ${
  location.pathname === "/properties" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              BookedProperties
            </Link> */}
            <Link to="/about" 
className={`transition-colors duration-200 ${
  location.pathname === "/about" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              About Us
            </Link>
            <Link to="/contact" 
className={`transition-colors duration-200 ${
  location.pathname === "/contact" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              Contact Us
            </Link>
            <Link to="/faq" 
className={`transition-colors duration-200 ${
  location.pathname === "/faq" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              FAQs
            </Link>
             <Link to="/terms" 
className={`transition-colors duration-200 ${
  location.pathname === "/terms" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              Terms & Conditions
            </Link>
           {/* <Link to="/blogs" 
className={`transition-colors duration-200 ${
  location.pathname === "/blogs" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
            Blogs
            </Link> */}
            {user && (
  <Button>
    <Link to="/addProperties">Add Properties</Link>
  </Button>
)}

          </nav>

          {/* Profile Icon */}
          <div className="relative" ref={profileRef}>
            <div
              className="flex items-center cursor-pointer bg-gray-200 p-2 rounded-full"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <FiAlignJustify className="h-5 w-5 text-gray-700" />
              <Avatar src={null} alt="Profile" className="ml-2" />
            </div>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white border ">
                {user ? (
                  <div className="text-center text-sm font-semibold py-2">Welcome, {user.username}</div>
                ) : null}
                <Divider />
                {/* <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                  onClick={() => setProfileOpen(false)}
                >
                  <FaRegUser className="h-5 w-5 mr-2" />
                  Profile
                </Link> */}
                <Link
  to={user ? "/profile" : "/login"}
  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
  onClick={() => {
    setProfileOpen(false);
    if (!user) {
      navigate("/login");
    }
  }}
>
  <FaRegUser className="h-5 w-5 mr-2" />
  Profile
</Link>

                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                  onClick={() => setProfileOpen(false)} // Close dropdown on click
                >
                  <CiLogin className="h-5 w-5 mr-2" />
                  Login
                </Link>
                {/* {user && ( */}
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    navigate("/login");
                    toast.success("Logged out successfully");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <IoLogOutOutline className="mr-2" /> Logout
                </button>
                {/* )} */}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 bg-gray-200 rounded-full"
            onClick={toggleDrawer}
          >
            <FiAlignJustify className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="50%"
        title={<span className="font-bold text-lg">RentEasy</span>}
      >
        <div className="flex flex-col space-y-4">
        
             <Link
            to="/"
            className=" flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <CiHome className="h-5 w-5 mr-2" />
            Home
          </Link>


          <Link
            to="/about"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <FcAbout className="h-5 w-5 mr-2" />
            About
          </Link>
          <Link
            to="/properties"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <LuTableProperties className="h-5 w-5 mr-2" /> Properties
          </Link>
          <Link
            to="/contact"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <MdContactPhone className="h-5 w-5 mr-2" /> Contact
          </Link>
          <Divider my="sm" />
          <Link
            to="/faq"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaQq className="h-5 w-5 mr-2" /> FAQs
          </Link>
          <Link
            to="/terms"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <TbLetterMSmall className="h-5 w-5 mr-2" /> Terms
          </Link>
          <Link
            to="/privacy-policy"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            <MdOutlinePolicy className="h-5 w-5 mr-2" /> Privacy Policy
          </Link>

          {/* Profile-related links */}
          {/* <Divider my="sm" /> */}
          <Link to="/addProperties">
          {user && (
  <Link to="/addProperties">
    <Button className="hover:text-blue-500 flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer">
      Add Properties
    </Button>
  </Link>
)}

          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;









