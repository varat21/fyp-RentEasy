

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Burger, Drawer, Group, Box, Divider, TextInput, ActionIcon, Select } from "@mantine/core";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { IoLogOutOutline } from "react-icons/io5";
import { FaQq, FaRegUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { MdBedroomParent, MdContactPhone, MdOutlinePolicy } from "react-icons/md";

import { MdOtherHouses } from "react-icons/md";
import { LiaWarehouseSolid } from "react-icons/lia";
import { FcAbout } from "react-icons/fc";
import { LuTableProperties } from "react-icons/lu";
import { TbLetterMSmall } from "react-icons/tb";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  
  const dropdownRef = useRef(null);
  const profileOpenRef = useRef(null); // Added this reference for profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      // Close profile dropdown
      if (profileOpenRef.current && !profileOpenRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-100 shadow-sm w-full">
      <div className="container mx-auto flex justify-between items-center py-2 px-2 md:px-12 lg:px-24">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="RentEasy Logo" className="h-14 md:h-16 lg:-ml-20" />
          <span className="ml-2 text-xl font-bold hidden lg:block">RentEasy</span>
        </Link>

        <div className="hidden lg:flex w-[55%] h-auto justify-start bg-gray-100 items-center gap-1">
          <TextInput
            placeholder="Search by name or location"
            className="rounded-lg bg-gray-100 flex-grow"
            rightSection={
              <ActionIcon variant="transparent" onClick={() => console.log("Search initiated")}>
                <FiSearch size={18} />
              </ActionIcon>
            }
            styles={{
              input: { 
                paddingRight: '2rem', 
                height: '40px', // Set height here
              },
            }}
          />
          <Select
            placeholder="Select price range"
            data={['Price high to low', 'Price low to high']}
            className="rounded-lg flex-grow"
            styles={{
              dropdown: { 
                minWidth: '160px' // Optional: Set minimum width for the dropdown
              },
              input: { 
                height: '40px', // Match the height
              },
              rightSection: { 
                height: '48px', 
                display: 'flex', 
                alignItems: 'center' 
              },
            }}
          />
        </div> 




        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </div>
          
          <div className=" cursor-pointer hidden md:flex items-center bg-white p-2 rounded-full" ref={profileOpenRef} onClick={() => setProfileOpen(prev => !prev)}>
            <FiAlignJustify className="h-5 w-5 " />
            <Avatar src={null} alt="Profile" className="ml-2" />
            <div   className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            {profileOpen && (
  <div  className="text-center font-semibold text-md absolute right-5 mt-6 w-36 rounded-md shadow-lg bg-white border border-gray-200 z-20">
    {/* Profile-related links */}
    
    <Link
      to="/profile"
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
      onClick={() => setProfileOpen(false)}    >
      <FaRegUser className="h-5 w-5 mr-2" />

      Profile
    </Link>
    
    <Link
      to="/login"
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
      onClick={() => setProfileOpen(false)} // Close dropdown on click
    >
      <CiLogin  className="h-5 w-5 mr-2" />
      Login
    </Link>

    <Link
      to="/logout"
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
      onClick={() => setProfileOpen(false)} // Close dropdown on click
    >
      <IoLogOutOutline className="h-5 w-5 mr-2" />
      Logout
    </Link>
  </div>
)}

            </div>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex  justify-center py-1">
        <Group className="flex text-md font-semibold text-gray-800 space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-500 font-bold">Home</Link>
          <Link to="/rooms" className="text-gray-600 hover:text-blue-500 font-bold">Rooms</Link>
          <Link to="/houses" className="text-gray-600 hover:text-blue-500 font-bold">Houses</Link>
          <Link to="/shopHouse" className="text-gray-600 hover:text-blue-500 font-bold">ShopHouse</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 font-bold">About</Link>
          <Link to="/properties" className="text-gray-600 hover:text-blue-500 font-bold">Properties</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-500 font-bold">Contact</Link>
          
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center hover:text-blue-500 transition">
              More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
  <div className="absolute left-3 mt-2  sm:w-60 md:w-64 lg:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 max-w-36">
    <Link
      to="/faq"
      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
      onClick={() => setDropdownOpen(false)}
    >
      FAQ
    </Link>
    <Link
      to="/terms"
      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
      onClick={() => setDropdownOpen(false)}
    >
      Terms
    </Link>
    <Link
      to="/privacyPolicy"
      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition duration-200 cursor-pointer"
      onClick={() => setDropdownOpen(false)}
    >
      Privacy Policy
    </Link>
  </div>
)}

          </div>
        </Group>
      </nav>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="50%"
        padding="md"
        title={<span className="font-bold text-lg">RentEasy</span>}
      >
        <Box className="flex flex-col space-y-4">
                    <TextInput placeholder="Search by location or price" className="rounded-md mb-4" />

        <Select
            placeholder="Select price range"
            data={['Price high to low', 'Price low to high']}
            className="rounded-md"
                        styles={{
              dropdown: { 
                minWidth: '160px' // Optional: Set minimum width for the dropdown
              },
              input: { 
                height: '30px', // Match the height
              },
              rightSection: { 
                height: '30px', 
                display: 'flex', 
                alignItems: 'center' 
              },
            }}
          />




          <Link to="/" className=" flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><CiHome className="h-5 w-5 mr-2" />Home</Link>
          <Link to="/rooms" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><MdBedroomParent className="h-5 w-5 mr-2" />Rooms</Link>
          <Link to="/houses" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><MdOtherHouses className="h-5 w-5 mr-2"/> Houses</Link>
          <Link to="/shop-house" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><LiaWarehouseSolid className="h-5 w-5 mr-2"/>ShopHouse</Link>
          <Link to="/about" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><FcAbout className="h-5 w-5 mr-2"/>About</Link>
          <Link to="/properties" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><LuTableProperties className="h-5 w-5 mr-2"/> Properties</Link>
          <Link to="/contact" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><MdContactPhone className="h-5 w-5 mr-2"/> Contact</Link>
          <Divider my="sm" />
          <Link to="/faq" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><FaQq className="h-5 w-5 mr-2"/> FAQ</Link>
          <Link to="/terms" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><TbLetterMSmall className="h-5 w-5 mr-2"/> Terms</Link>
          <Link to="/privacy-policy" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}><MdOutlinePolicy className="h-5 w-5 mr-2"/> Privacy Policy</Link>
        
    {/* Profile-related links */}
    <Divider my="sm" />

    <Link
      to="/profile"
      className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}
    >
      <FaRegUser className="h-5 w-5 mr-2" />

      Profile
    </Link>
    
    <Link
      to="/login"
      className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}
     // Close dropdown on click
    >
      <CiLogin  className="h-5 w-5 mr-2" />
      Login
    </Link>

    <Link
      to="/logout"
      className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer" onClick={closeDrawer}
      // Close dropdown on click
    >
      <IoLogOutOutline className="h-5 w-5 mr-2" />
      Logout
    </Link>
        </Box>
      </Drawer>
    </header>
  );
};

export default Header;
