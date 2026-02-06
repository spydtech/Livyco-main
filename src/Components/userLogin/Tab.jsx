import React, { useState, useRef, useEffect } from 'react';
import UserLogin from './UserLogin';
import ClientLogin from '../../Clients-components/Client-Login/ClientLogin';
import { FaUser, FaBuilding } from 'react-icons/fa';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [direction, setDirection] = useState('');
  const prevTabRef = useRef('user');

  const tabs = [
    { 
      id: 'user', 
      label: 'User',
      icon: <FaUser className="w-4 h-4 md:w-5 md:h-5" />
    },
    { 
      id: 'hostels', 
      label: 'Hostels',
      icon: <FaBuilding className="w-4 h-4 md:w-5 md:h-5" />
    }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === activeTab) return;
    
    // Determine animation direction
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const nextIndex = tabs.findIndex(tab => tab.id === tabId);
    setDirection(nextIndex > currentIndex ? 'right' : 'left');
    
    prevTabRef.current = activeTab;
    setActiveTab(tabId);
  };

  // Flip animation effect
  const getTabAnimation = (tabId) => {
    const isActive = activeTab === tabId;
    const isPrev = prevTabRef.current === tabId;
    
    if (isActive && direction === 'right') {
      return 'animate-rotateInFromLeft';
    }
    if (isActive && direction === 'left') {
      return 'animate-rotateInFromRight';
    }
    if (isPrev && direction === 'right') {
      return 'animate-rotateOutToRight';
    }
    if (isPrev && direction === 'left') {
      return 'animate-rotateOutToLeft';
    }
    return '';
  };

  // Pulse effect for active tab
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDirection('');
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-7xl">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
          
          {/* Tab Navigation - Glass Morphism Effect */}
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border-b border-gray-200/50">
            <div className="flex relative p-1">
              {/* Animated background slide */}
              <div 
                className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-xl shadow-lg transition-all duration-500 ease-out ${
                  activeTab === 'hostels' ? 'translate-x-full' : ''
                }`}
                style={{
                  boxShadow: '0 4px 20px -2px rgba(59, 130, 246, 0.3)'
                }}
              />
              
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    relative flex-1 z-10 py-4 px-6 flex items-center justify-center gap-3
                    transition-all duration-300 font-medium text-sm md:text-base
                    ${activeTab === tab.id 
                      ? 'text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                    ${getTabAnimation(tab.id)}
                  `}
                >
                  <span className={`
                    relative p-2 rounded-lg transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-br from-blue-100 to-indigo-100 shadow-inner' 
                      : 'bg-transparent'
                    }
                  `}>
                    {tab.icon}
                    {/* Active indicator dot */}
                    {activeTab === tab.id && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75"></span>
                    )}
                  </span>
                  
                  <span className="relative">
                    {tab.label}
                    {/* Underline animation */}
                    <span className={`
                      absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500
                      transition-all duration-500 ${activeTab === tab.id ? 'w-full' : ''}
                    `} />
                  </span>
                  
                  {/* Hover effect */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-50/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content with 3D flip effect */}
          <div className="relative   min-h-[700px] perspective-1000">
            {/* User Tab Content */}
            <div className={`
              absolute inset-0   transition-all duration-700 ease-out transform-style-3d
              ${activeTab === 'user' 
                ? 'opacity-100 rotate-0' 
                : 'opacity-0 -rotate-y-90 pointer-events-none'
              }
            `}>
              <div className="bg-white rounded-xl  shadow-lg border border-gray-100">
                <UserLogin />
              </div>
            </div>

            {/* Hostel Tab Content */}
            <div className={`
              absolute inset-0  transition-all duration-700 ease-out transform-style-3d
              ${activeTab === 'hostels' 
                ? 'opacity-100 rotate-0' 
                : 'opacity-0 rotate-y-90 pointer-events-none'
              }
            `}>
              <div className="bg-white rounded-xl  shadow-lg border border-gray-100">
                <ClientLogin />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-indigo-100/30 to-transparent rounded-full translate-x-24 translate-y-24" />
        </div>
        
        {/* Tab indicators (dots) */}
        <div className="flex justify-center gap-2 mt-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${activeTab === tab.id 
                  ? 'w-8 bg-gradient-to-r from-blue-500 to-indigo-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
              aria-label={`Switch to ${tab.label} tab`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;