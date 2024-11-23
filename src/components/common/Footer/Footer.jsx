import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

import { RiTwitterXLine } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800  shadow-md">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Branding */}
          <div className="col-span-1">
            <div className="text-gray-800 text-lg font-semibold mb-4 flex items-center">
              {/* <svg */}
              <img src="/images/logo.png" alt="RentEasy Logo" className="h-14 md:h-16 " />
                
                 {/* <img
            src="/images/logo.png"
            alt="Logo"
            className="h-14 md:h-16 lg:-ml-20"
          /> */}
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354l-2.5 4.146H5.5l4.5 4.293-2.5 4.146L12 16.5l2.5 4.146 4.5-4.293H18.5l-4.5-4.293 2.5-4.146L12 4.354z"
                />
              </svg> */}
            <p className='text-xl font-bold hidden lg:block'>RentEasy</p>
            </div>
            <div className=" text-gray-800 px-4 py-5">
  <div className="container mx-auto">
    <p className="text-md hover:text-blue-400 ">
      Making the world a better place through constructing elegant hierarchies.
    </p>
    <div className="flex justify-start xl:gap-6 mt-6">
      <Link to ="https://www.facebook.com/">
      <FaFacebook className="h-8 w-8 text-blue-600 hover:text-blue-500 cursor-pointer transition duration-300" /></Link>
    <Link to ="https://www.instagram.com/accounts/login/?hl=en"> <FaInstagramSquare className="h-8 w-8 text-pink-600 hover:text-pink-500 cursor-pointer transition duration-300" /></Link> 
     <Link to ="https://www.tiktok.com/accounts/login/?hl=en"><RiTwitterXLine className="h-8 w-8 text-blue-400 hover:text-blue-300 cursor-pointer transition duration-300" /></Link> 
      <Link to ="https://x.com/i/flow/login"><AiFillTikTok className="h-8 w-8 text-black hover:text-gray-700 cursor-pointer transition duration-300" /></Link>
    </div>
  </div>
</div>

            <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="hover:text-blue-500">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Solutions */}
          {/* <div>
            <h4 className="text-black font-medium mb-4">Solutions</h4>
            <ul className="space-y-2 text-md">
              <li>
                <a href="#" className="hover:text-blue-500 ">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Automation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Commerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Insights
                </a>
              </li>
            </ul>
          </div> */}

          {/* Support */}
          <div>
            <h4 className=" font-medium mb-4 text-black">Browse Properties</h4>
            <ul className="space-y-2 text-md">
              <li>
                <a href="#" className="hover:text-blue-500">
                House
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                Apartment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                Shop House
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                Rooms
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className=" font-medium mb-4 text-black">Customer Service Help</h4>
            <ul className="space-y-2 text-md">
              <li>
                <a href="#" className="hover:text-blue-500">
                 Review
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                 Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                List your rental
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
               About
                </a>
              </li>
             
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className=" font-medium mb-4 text-black">Legal</h4>
            <ul className="space-y-2 text-md">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-medium mb-4">Download App</h4>
            <ul className="space-y-2 text-md">
              <li>
                <img 
                src ="/images/google.png"
                className=''
                />
              </li>
              <li>
              <img 
                src ="/images/Appstore.png"
                className=''
                />
              </li>
             
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-md text-center">
          <p>© 2024 RentEasy, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

