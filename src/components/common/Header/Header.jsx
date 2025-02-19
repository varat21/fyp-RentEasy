// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Burger,
//   Drawer,
//   Group,
//   Box,
//   Divider,
//   TextInput,
//   ActionIcon,
//   Select,
//   Button,
//   Text
// } from "@mantine/core";
// import { FiAlignJustify, FiSearch } from "react-icons/fi";
// import { useDisclosure } from "@mantine/hooks";
// import { IoLogOutOutline } from "react-icons/io5";
// import { FaQq, FaRegUser } from "react-icons/fa";
// import { CiLogin } from "react-icons/ci";
// import { CiHome } from "react-icons/ci";
// import {
//   MdBedroomParent,
//   MdContactPhone,
//   MdOutlinePolicy,
// } from "react-icons/md";

// import { MdOtherHouses } from "react-icons/md";
// import { LiaWarehouseSolid } from "react-icons/lia";
// import { FcAbout } from "react-icons/fc";
// import { LuTableProperties } from "react-icons/lu";
// import { TbLetterMSmall } from "react-icons/tb";
// import Logout from "../../Pages/Logout";
// import AddProperties from "../../properties/AddProperties";
// import * as jwt_decode from "jwt-decode";

// import { toast, Toaster } from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const[user,setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
//     useDisclosure(false);

//   const dropdownRef = useRef(null);
//   const profileOpenRef = useRef(null); // Added this reference for profile dropdown
//   const [profileOpen, setProfileOpen] = useState(false);

//   // function to decode JWT and get user info
//   const decodeToken =(token)=>{
//     try{
//       const decoded = jwt_decode(token);
//     }catch(error){
//       console.log(error);
//       return null;
//     }
//   };
//   //user information from local storage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = decodeToken(token); // Decode the token
//       if (decoded) {
//         setUser({
//           username: decoded.name || "User", // Replace "name" with the actual property in the token payload
//           userType: decoded.userType,
//         });
//       }
//     }
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//       // Close profile dropdown
//       if (
//         profileOpenRef.current &&
//         !profileOpenRef.current.contains(event.target)
//       ) {
//         setProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);
//   useEffect(()=>{
//     const loggedInUser =JSON.parse(localStorage.getItem("user"));
//     if(loggedInUser){
//       setUser(loggedInUser);
//     }
//   }, []);

//   return (
//     <header className="bg-gray-100 shadow-sm w-full sticky top-0 z-[9999]">
//       <div className="container mx-auto flex justify-between items-center py-2 px-2 md:px-12 lg:px-24">
//         <Link to="/" className="flex items-center">
//           <img
//             src="/images/logo.png"
//             alt="RentEasy Logo"
//             className="h-14 md:h-16 lg:-ml-20"
//           />

//           <span className="ml-2 text-xl font-bold hidden lg:block">
//             RentEasy
//           </span>
//         </Link>

//         <div className="hidden lg:flex w-[55%] h-auto justify-start bg-gray-100 items-center gap-1">
//           <TextInput
//             placeholder="Search by name or location"
//             className="rounded-lg bg-gray-100 flex-grow"
//             rightSection={
//               <ActionIcon
//                 variant="transparent"
//                 onClick={() => console.log("Search initiated")}
//               >
//                 <FiSearch size={18} />
//               </ActionIcon>
//             }
//             styles={{
//               input: {
//                 paddingRight: "2rem",
//                 height: "40px", // Set height here
//               },
//             }}
//           />
//           <Select
//             placeholder="Select price range"
//             data={["Price high to low", "Price low to high"]}
//             className="rounded-lg flex-grow"
//             styles={{
//               dropdown: {
//                 minWidth: "160px", // Optional: Set minimum width for the dropdown
//               },
//               input: {
//                 height: "40px", // Match the height
//               },
//               rightSection: {
//                 height: "48px",
//                 display: "flex",
//                 alignItems: "center",
//               },
//             }}
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="md:hidden">
//             <Burger opened={drawerOpened} onClick={toggleDrawer} />
//           </div>

//           <div
//             className=" cursor-pointer hidden md:flex items-center bg-white p-2 rounded-full"
//             ref={profileOpenRef}
//             onClick={() => setProfileOpen((prev) => !prev)}
//           >
//             <FiAlignJustify className="h-5 w-5 " />

//             <Avatar src={null} alt="Profile" className="ml-2" />

//             {/* <div>
//   {user ? (
//     <div className="px-4 py-2 font-small">
//       Welcome, <span >{user.name }</span>
//     </div>
//   ) : (
//     <></> // Show blank if user is null
//   )}
// </div>  */}

//             <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//               {profileOpen && (
//                 <div className="text-center font-semibold text-md absolute    mt-6 w-36 rounded-md shadow-lg bg-white border border-gray-200 z-20 xl:">
//                   {/* Profile-related links */}
//                   <div>
//   {user ? (
//     <div>
//     {/* // <div className="px-4 py-2 text-sm"> */}
//             <Text size="xs">  Welcome, <span >{user.name }</span></Text>

//       {/* Welcome, <span >{user.name }</span> */}
//     </div>
//   ) : (
//     <></> // Show blank if user is null
//   )}
//   <Divider my="sm" />

// </div>

//                   <Link
//                     to="/profile"
//                     className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     <FaRegUser className="h-5 w-5 mr-2" />
//                     Profile
//                   </Link>

//                   <Link
//                     to="/login"
//                     className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
//                     onClick={() => setProfileOpen(false)} // Close dropdown on click
//                   >
//                     <CiLogin className="h-5 w-5 mr-2" />
//                     Login
//                   </Link>

//                   <div
//                     to="/logout"
//                     className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
//                     onClick={() => {
//                       // localStorage.removeItem("token");
//                       <Logout/>
//                       navigate("/login");
//                       toast.success("Logged out successfully");
//                     }}
//                   >
//                     <IoLogOutOutline className="h-5 w-5 mr-2" />
//                     <Logout />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>

//       </div>

//       <nav className="hidden md:flex  justify-center py-1">
//         <Group className="flex text-md font-semibold text-gray-800 space-x-8">
//           <Link to="/" className="text-gray-600 hover:text-blue-500 ">
//             Home
//           </Link>
//           <Link to="/rooms" className="text-gray-600 hover:text-blue-500 ">
//             Rooms
//           </Link>
//           <Link to="/houses" className="text-gray-600 hover:text-blue-500 ">
//             Houses
//           </Link>
//           <Link to="/shopHouse" className="text-gray-600 hover:text-blue-500 ">
//             ShopHouse
//           </Link>
//           <Link to="/apartment" className="text-gray-600 hover:text-blue-500 ">
//             Properties
//           </Link>
//           <Link to="/about" className="text-gray-600 hover:text-blue-500 ">
//             About
//           </Link>
//           <Link to="/contact" className="text-gray-600 hover:text-blue-500">
//             Contact
//           </Link>

//           <div ref={dropdownRef} className="relative">
//             <button
//               onClick={() => setDropdownOpen((prev) => !prev)}
//               className="flex items-center hover:text-blue-500 transition text-semiBold"
//             >
//               More
//               <svg
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {dropdownOpen && (
//               <div className="absolute left-3 mt-2  sm:w-60 md:w-64 lg:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-w-36">
//                 <Link
//                   to="/faq"
//                   className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   FAQ
//                 </Link>
//                 <Link
//                   to="/terms"
//                   className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Terms
//                 </Link>
//                 <Link
//                   to="/privacyPolicy"
//                   className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
//                   onClick={() => setDropdownOpen(false)}
//                 >
//                   Privacy Policy
//                 </Link>
//               </div>
//             )}
//           </div>
//           <Link to="/addProperties">
//             <Button
//               color="blue"
//               size="sm"
//               className="text-gray-600 hover:text-blue-500"
//             >
//               Add Properties
//             </Button>
//           </Link>
//         </Group>
//       </nav>

//       <Drawer
//         opened={drawerOpened}
//         onClose={closeDrawer}
//         size="50%"
//         padding="md"
//         title={<span className="font-bold text-lg">RentEasy</span>}
//       >
//         <Box className="flex flex-col space-y-4">
//           <TextInput
//             placeholder="Search by location or price"
//             className="rounded-md mt-10"
//           />

//           <Select
//             placeholder="Select price range"
//             data={["Price high to low", "Price low to high"]}
//             className="rounded-md"
//             styles={{
//               dropdown: {
//                 // minWidth: "160px", // Optional: Set minimum width for the dropdown
//               },
//               input: {
//                 height: "30px", // Match the height
//               },
//               rightSection: {
//                 height: "30px",
//                 display: "flex",
//                 alignItems: "center",
//               },
//             }}
//           />

//           <Link
//             to="/"
//             className=" flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <CiHome className="h-5 w-5 mr-2" />
//             Home
//           </Link>
//           <Link
//             to="/rooms"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <MdBedroomParent className="h-5 w-5 mr-2" />
//             Rooms
//           </Link>
//           <Link
//             to="/houses"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <MdOtherHouses className="h-5 w-5 mr-2" /> Houses
//           </Link>
//           <Link
//             to="/shop-house"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <LiaWarehouseSolid className="h-5 w-5 mr-2" />
//             ShopHouse
//           </Link>
//           <Link
//             to="/about"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <FcAbout className="h-5 w-5 mr-2" />
//             About
//           </Link>
//           <Link
//             to="/properties"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <LuTableProperties className="h-5 w-5 mr-2" /> Properties
//           </Link>
//           <Link
//             to="/contact"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <MdContactPhone className="h-5 w-5 mr-2" /> Contact
//           </Link>
//           <Divider my="sm" />
//           <Link
//             to="/faq"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <FaQq className="h-5 w-5 mr-2" /> FAQ
//           </Link>
//           <Link
//             to="/terms"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <TbLetterMSmall className="h-5 w-5 mr-2" /> Terms
//           </Link>
//           <Link
//             to="/privacy-policy"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <MdOutlinePolicy className="h-5 w-5 mr-2" /> Privacy Policy
//           </Link>

//           {/* Profile-related links */}
//           <Divider my="sm" />
//           <Link to="/addProperties">
//             <Button className=" hover:text-blue-500 flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer">
//               Add Properties
//             </Button>
//           </Link>

//           <Link
//             to="/profile"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//           >
//             <FaRegUser className="h-5 w-5 mr-2" />
//             Profile
//           </Link>

//           <Link
//             to="/login"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={closeDrawer}
//             // Close dropdown on click
//           >
//             <CiLogin className="h-5 w-5 mr-2" />
//             Login
//           </Link>

//           <Link
//             // to="/logout"
//             className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
//             onClick={() => {
//               closeDrawer();
//               localStorage.removeItem("token");
//             }}

//             // Close dropdown on click
//           >
//             <IoLogOutOutline className="h-5 w-5 mr-2" />
//             <Logout />
//           </Link>
//         </Box>
//       </Drawer>
//     </header>
//   );
// };

// export default Header;


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
import { jwtDecode } from "jwt-decode"; // Correct import
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
            <Link to="/apartment" 
className={`transition-colors duration-200 ${
  location.pathname === "/apartment" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              Properties
            </Link>
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
              Terms
            </Link>
            <Link to="/privacyPolicy" 
className={`transition-colors duration-200 ${
  location.pathname === "/privacyPolicy" 
    ? "text-blue-600 font-bold" 
    : "hover:text-blue-500"
}`}            >
              Privacy Policy
            </Link>
            <Button>
              <Link to="/addProperties">Add Properties</Link>
            </Button>
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
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                  onClick={() => setProfileOpen(false)}
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
          {/* <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeDrawer}
          >
            <CiHome className="h-5 w-5 inline-block mr-2" /> Home
          </Link>
          <Link
            to="/apartment"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeDrawer}
          >
            Properties
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeDrawer}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeDrawer}
          >
            Contact
          </Link> */}
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
            <Button className=" hover:text-blue-500 flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer">
              Add Properties
            </Button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;









