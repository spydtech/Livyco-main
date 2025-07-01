import React from 'react';

const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full animate-pulse">
      <div className="relative h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-300 rounded-full mr-1"></div>
          ))}
        </div>
        
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;