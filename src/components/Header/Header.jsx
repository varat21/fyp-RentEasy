import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import { FiAlignJustify } from "react-icons/fi";


const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-gray-200 w-full p-4 m-0 shadow-md">
            <div className="container mx-auto py-4 flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center text-lg font-bold text-gray-800">
                        <img
                            src="/images/logo.png" // Replace with your logo path
                            alt="Logo"
                            className="h-24"
                        />
                        <span className="ml-0 text-xl font-bold">RentEasy</span>
                    </Link>
                </div>
<div className='flex flex-col gap-7'>
                {/* Search Input */}
                <div className="">
                    <input
                        type="text"
                        placeholder="Search by location or price"
                        className="border rounded-lg py-2 px-3 mx-auto w-[450px] shadow-sm ml-40 text-center text-black"
                    />
                  
                </div>

                {/* Navigation Items */}
                <div className="flex items-center  space-x-10 text-md text-white">
                    <Link to="/home" className="text-gray-600 hover:text-blue-500 font-bold">Home</Link>
                    <Link to="/rooms" className="text-gray-600 hover:text-blue-500 font-bold">Rooms</Link>
                    <Link to="/houses" className="text-gray-600 hover:text-blue-500 font-bold">Houses</Link>
                    <Link to="/shop-home" className="text-gray-600 hover:text-blue-500 font-bold">ShopHouse</Link>
                    <Link to="/about" className="text-gray-600 hover:text-blue-500 font-bold">About</Link>
                    <Link to="/properties" className="text-gray-600 hover:text-blue-500 font-bold">Properties</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-blue-500 font-bold">Contact</Link>

                    {/* More Dropdown */}
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-gray-600 hover:text-blue-500 font-bold"
                            >
                                More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>
                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <Link to="/faq" className="block px-4 py-2 text-md text-gray-600 hover:bg-gray-100" role="menuitem">FAQ</Link>
                                    <Link to="/terms" className="block px-4 py-2 text-md text-gray-600 hover:bg-gray-100" role="menuitem">Terms of Service</Link>
                                    <Link to="/privacy" className="block px-4 py-2 text-md text-gray-600 hover:bg-gray-100" role="menuitem">Privacy Policy</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </div>
                {/* Login and Sign Up Buttons on the Right */}
                <div className="flex items-center space-x-2">
                    <Link to="/login">
                        
                    </Link>
                    <Link to="/register">
                      

                        <div 
                        className='w-28 h-12 bg-white rounded-full flex items-center gap-6'
                        >
                        <FiAlignJustify className='h-8 w-11' />
                        <Avatar src={null} alt="no image here" color="black"  />


                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
