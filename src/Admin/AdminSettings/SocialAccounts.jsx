import React from "react";
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
 
const SocialAccounts = () => {
  const socialLinks = [
    {
      name: "YouTube",
      icon: <FaYoutube className="text-red-600 w-12 h-12" />,
      url: "https://www.youtube.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 w-12 h-12" />,
      url: "https://www.instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700 w-12 h-12" />,
      url: "https://www.linkedin.com",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 w-12 h-12" />,
      url: "https://www.facebook.com",
    },
  ];
 
  return (
    <div className="w-full min-h-screen  p-6 flex justify-center items-start">
      <div className="flex justify-center space-x-12 mt-10">
        {socialLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-2 hover:scale-110 transition-transform"
          >
            {item.icon}
            <span className="text-sm text-gray-600">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
 
export default SocialAccounts;