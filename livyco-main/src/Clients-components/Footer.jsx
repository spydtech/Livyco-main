import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/client-main/logo.png"; // Ensure you have the logo image in the correct path
import { PiGooglePlayLogoLight } from "react-icons/pi";
import { LiaApple } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-[#F8F8FF] py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Section */}
        <div className="flex flex-col">
          <img src={logo} className="w-24 h-24 mb-4" alt="Company Logo" />
          <p className="text-[#F8F8FF] text-xs w-[260px] gap-2 mb-6 text-between">
            Et Dolore Aut Ipsum Incidunt Nostrum Aliquid Minima. Ut Voluptatibus Sed. Rem Distinctio Aut Et Veritatis Quis. At Provident Temporibus At. Debitis Veritatis Error.
          </p>
          <p className="text-[#F8F8FF] font-semibold mb-2 ">Download Our App On</p>
          <div className="flex flex-col-2   mb-6">
            <div className="gap-10 flex flex-row text-[#F8F8FF]"> 
            <p className="bg-yellow-400 text-black py-4 px-4 h-14 w-[150px] rounded-lg  justify-center items-center gap-2 text-xs flex">
             <PiGooglePlayLogoLight className="text-4xl" />
              Get it on Google Play
            </p>
            <p className="bg-yellow-400 text-black py-2 px-4 h-14 w-[150px] rounded-lg justify-center items-center gap-2  text-xs flex">
              <LiaApple className="text-4xl" />
              Download on the App Store
            </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  space-x-64 ml-[45%] w-full ">
        <div className="w-full space-y-10 text-[#F8F8FF]">
          <p className="font-semibold text-[#F8F8FF] mb-2 w-[100px] flex">About Us</p>
          <p className="flex w-[100px]">Support</p>
          <p className="flex">Careers</p>
          <p className="flex w-[100px]">Mobile App</p>
          <p className="flex w-[100px]">Contact Us</p>
        </div>
        <div className="w-full space-y-10 text-[#F8F8FF]">
          <p className="font-semibold text-[#F8F8FF] mb-2 flex w-[200px]">Terms And Conditions</p>
          <p className="flex w-[100px]">Privacy Policy</p>
          <p className="flex w-[100px]">Blog</p>
          <p className="flex w-[100px]">Mobile App</p>
          <p className="flex w-[100px]">Contact Us</p>
        </div>
        </div>
            
          </div>
          
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center text-[#F8F8FF]">
          <p className="text-[#F8F8FF] font-semibold mb-2">Enter Your Email To Get The Latest News</p>
          <div className="flex w-full max-w-sm border border-[#F8F8FF]  overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-[#333333] text-[#F8F8FF] focus:outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 py-2 font-semibold">Submit</button>
          </div>
        </div>
        

        {/* Right Section */}
        <div className="flex justify-center md:justify-end ">
          <button className="bg-blue-600 text-[#F8F8FF] px-10 py-3 rounded-3xl text-sm">Refer & Earn</button>
        </div>
      </div>
      

      {/* Bottom Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-20 text-[#F8F8FF] text-sm text-start justify-center md:justify-end md:items-end ml-[90%] ">
       
        <div className="md:col-span-2 flex flex-col md:items-start md:justify-start">
          <p className="text-[#F8F8FF] font-semibold mb-2 text-start w-[100px]">Follow Us On</p>
          <div className="flex space-x-4">
            <FaInstagram className="text-xl cursor-pointer hover:text-yellow-400" />
            <FaFacebookF className="text-xl cursor-pointer hover:text-yellow-400" />
            <FaTwitter className="text-xl cursor-pointer hover:text-yellow-400" />
            <FaYoutube className="text-xl cursor-pointer hover:text-yellow-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  