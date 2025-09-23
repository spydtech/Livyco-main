// import React from "react";
// import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
// import logo from "../assets/client-main/logo.png"; // Ensure you have the logo image in the correct path
// import { PiGooglePlayLogoLight } from "react-icons/pi";
// import { LiaApple } from "react-icons/lia";

// const Footer = () => {
//   return (
//     <footer className="bg-[#333333] text-[#F8F8FF] py-10 px-6 md:px-16">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
//         {/* Left Section */}
//         <div className="flex flex-col">
//           <img src={logo} className="w-24 h-24 mb-4" alt="Company Logo" />
//           <p className="text-[#F8F8FF] text-xs w-[260px] gap-2 mb-6 text-between">
//             Et Dolore Aut Ipsum Incidunt Nostrum Aliquid Minima. Ut Voluptatibus Sed. Rem Distinctio Aut Et Veritatis Quis. At Provident Temporibus At. Debitis Veritatis Error.
//           </p>
//           <p className="text-[#F8F8FF] font-semibold mb-2 ">Download Our App On</p>
//           <div className="flex flex-col-2   mb-6">
//             <div className="gap-10 flex flex-row text-[#F8F8FF]"> 
//             <p className="bg-yellow-400 text-black py-4 px-4 h-14 w-[150px] rounded-lg  justify-center items-center gap-2 text-xs flex">
//              <PiGooglePlayLogoLight className="text-4xl" />
//               Get it on Google Play
//             </p>
//             <p className="bg-yellow-400 text-black py-2 px-4 h-14 w-[150px] rounded-lg justify-center items-center gap-2  text-xs flex">
//               <LiaApple className="text-4xl" />
//               Download on the App Store
//             </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2  space-x-64 ml-[45%] w-full ">
//         <div className="w-full space-y-10 text-[#F8F8FF]">
//           <p className="font-semibold text-[#F8F8FF] mb-2 w-[100px] flex">About Us</p>
//           <p className="flex w-[100px]">Support</p>
//           <p className="flex">Careers</p>
//           <p className="flex w-[100px]">Mobile App</p>
//           <p className="flex w-[100px]">Contact Us</p>
//         </div>
//         <div className="w-full space-y-10 text-[#F8F8FF]">
//           <p className="font-semibold text-[#F8F8FF] mb-2 flex w-[200px]">Terms And Conditions</p>
//           <p className="flex w-[100px]">Privacy Policy</p>
//           <p className="flex w-[100px]">Blog</p>
//           <p className="flex w-[100px]">Mobile App</p>
//           <p className="flex w-[100px]">Contact Us</p>
//         </div>
//         </div>
            
//           </div>
          
//         </div>

//         {/* Middle Section */}
//         <div className="flex flex-col items-center text-[#F8F8FF]">
//           <p className="text-[#F8F8FF] font-semibold mb-2">Enter Your Email To Get The Latest News</p>
//           <div className="flex w-full max-w-sm border border-[#F8F8FF]  overflow-hidden">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 bg-[#333333] text-[#F8F8FF] focus:outline-none"
//             />
//             <button className="bg-yellow-400 text-black px-4 py-2 font-semibold">Submit</button>
//           </div>
//         </div>
        

//         {/* Right Section */}
//         <div className="flex justify-center md:justify-end ">
//           <button className="bg-blue-600 text-[#F8F8FF] px-10 py-3 rounded-3xl text-sm">Refer & Earn</button>
//         </div>
//       </div>
      

//       {/* Bottom Links */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-20 text-[#F8F8FF] text-sm text-start justify-center md:justify-end md:items-end ml-[90%] ">
       
//         <div className="md:col-span-2 flex flex-col md:items-start md:justify-start">
//           <p className="text-[#F8F8FF] font-semibold mb-2 text-start w-[100px]">Follow Us On</p>
//           <div className="flex space-x-4">
//             <FaInstagram className="text-xl cursor-pointer hover:text-yellow-400" />
//             <FaFacebookF className="text-xl cursor-pointer hover:text-yellow-400" />
//             <FaTwitter className="text-xl cursor-pointer hover:text-yellow-400" />
//             <FaYoutube className="text-xl cursor-pointer hover:text-yellow-400" />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;  




import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/client-main/logo.png";
import { PiGooglePlayLogoLight } from "react-icons/pi";
import { LiaApple } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-[#F8F8FF] py-10 px-6 md:px-16">
      {/* Main Flex Container */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Left */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <img src={logo} className="w-24 h-24 mb-4" alt="Company Logo" />
          <p className="text-xs mb-6 max-w-[260px]">
            Et Dolore Aut Ipsum Incidunt Nostrum Aliquid Minima. Ut Voluptatibus Sed. Rem Distinctio Aut Et Veritatis Quis. At Provident Temporibus At. Debitis Veritatis Error.
          </p>
          <p className="font-semibold mb-2">Download Our App On</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
            <div className="flex items-center justify-center bg-yellow-400 text-black py-3 px-4 h-14 w-full sm:w-[150px] rounded-lg gap-2 text-xs">
              <PiGooglePlayLogoLight className="text-4xl" />
              Google Play
            </div>
            <div className="flex items-center justify-center bg-yellow-400 text-black py-3 px-4 h-14 w-full sm:w-[150px] rounded-lg gap-2 text-xs">
              <LiaApple className="text-4xl" />
              App Store
            </div>
          </div>
        </div>

        {/* right */}
        <div>
          <div className="flex flex-col sm:flex-row  justify-between items-center w-full gap-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <p className="font-semibold mb-2">
                Enter Your Email To Get The Latest News
              </p>
              <div className="flex flex-col sm:flex-row w-full max-w-sm border border-[#F8F8FF] overflow-hidden rounded-md mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-[#333333] text-[#F8F8FF] focus:outline-none"
                />
                <button className="bg-yellow-400 text-black px-4 py-2 font-semibold mt-2 sm:mt-0 sm:ml-2">
                  Submit
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-2 justify-center md:justify-start">
                <FaInstagram className="text-xl cursor-pointer hover:text-yellow-400" />
                <FaFacebookF className="text-xl cursor-pointer hover:text-yellow-400" />
                <FaTwitter className="text-xl cursor-pointer hover:text-yellow-400" />
                <FaYoutube className="text-xl cursor-pointer hover:text-yellow-400" />
              </div>


            </div>

            
            <div className="flex justify-center md:justify-end flex-1">
              <button className="bg-blue-600 text-[#F8F8FF] px-10 py-3 rounded-3xl text-sm">
                Refer & Earn
              </button>
            </div>
          </div>
          {/* Bottom Links */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full text-center sm:text-left">
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">About Us</p>
              <p>Support</p>
              <p>Careers</p>
              <p>Mobile App</p>
              <p>Contact Us</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Blog</p>
              <p>Mobile App</p>
              <p>Contact Us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
