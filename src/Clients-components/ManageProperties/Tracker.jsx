// import { useState } from "react";
// // import PropertyRegistration from "./PropertyRegistration"; // Correct
// import  Registration  from './PropertyRegistration.jsx';
// import AddMedia from "./AddMedia";
// import RoomSelection from "./RoomSelection";
// import PGForm from "./PGForm";
// import TermsPost from "./TermsPost";
// import HostelListing from "./HostelListing";

// const steps = [
//   "Enter Property & Registration Details",
//   "Upload Documents",
//   "Add Amenities & Features",
//   "Set Pricing & Availability",
//   "Review & Submit",
// ];

// export default function Tracker() {
//   const [currentStep, setCurrentStep] = useState(0);

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="mx-auto p-6  min-h-screen bg-[#f8f8ff] ">
//       {/* Progress Tracker */}
//       <div className="relative flex justify-between items-center mb-8">
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center w-1/5 relative"
//           >
//             {/* Connecting Line */}
//             {index > 0 && (
//               <div
//                 className={`absolute top-[19px]  -left-1/2 w-full h-[2px] ${
//                   index <= currentStep ? "bg-blue-600" : "bg-gray-300"
//                 }`}
//                 style={{ zIndex: 1 }}
//               ></div>
//             )}
//             <div
//               className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border-4 ${
//                 index === currentStep
//                   ? "border-blue-600 bg-blue-600 text-white"
//                   : "border-blue-600 bg-white"
//               }`}
//             >
//               <div
//                 className={`w-4 h-4 rounded-full  ${
//                   index === currentStep ? "bg-white" : "bg-blue-600"
//                 }`}
//               ></div>
//             </div>
//             {/* <div
//               className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold transition-all duration-300 ${
//                 index <= currentStep ? "bg-blue-600" : "bg-gray-300"
//               }`}
//             >
//               {index + 1}
//             </div> */}
//             <p
//               className={`text-sm mt-2 ${
//                 index <= currentStep ? "text-blue-600" : "text-gray-500"
//               }`}
//             >
//               {step}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Step Content */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         {currentStep === 0 && <Registration nextStep={nextStep} />}
//         {currentStep === 1 && (
//           <AddMedia nextStep={nextStep} prevStep={prevStep} />
//         )}
//         {currentStep === 2 && (
//           <RoomSelection nextStep={nextStep} prevStep={prevStep} />
//         )}
//         {currentStep === 3 && (
//           <PGForm nextStep={nextStep} prevStep={prevStep} />
//         )}
//         {currentStep === 4 && (
//           <HostelListing nextStep={nextStep} prevStep={prevStep} />
//         )}
//       </div>

//       {/* Navigation Buttons */}
//       {/* <div className="flex justify-between mt-6">
//         <button
//           onClick={prevStep}
//           disabled={currentStep === 0}
//           className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextStep}
//           disabled={currentStep === steps.length - 1}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           {currentStep === steps.length - 1 ? "Submit" : "Next"}
//         </button>
//       </div> */}
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import PropertyRegistration from './PropertyRegistration.jsx';
import AddMedia from "./AddMedia";
import RoomSelection from "./RoomSelection";
import PGForm from "./PGForm";
import HostelListing from "./HostelListing";
import { propertyAPI, mediaAPI, roomAPI, pgAPI } from "../PropertyController";

const steps = [
  "Property Details",
  "Media Upload",
  "Room Configuration",
  "PG Details",
  "Review & Submit"
];

export default function Tracker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [showTracker, setShowTracker] = useState(false);
  const [completePropertyData, setCompletePropertyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPropertyData = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const [propertyRes, mediaRes, roomRes, pgRes] = await Promise.all([
        propertyAPI.getProperty(id), // Now using the correct function
        mediaAPI.getMedia(id).catch(() => ({ data: { media: null } })),
        roomAPI.getRoomTypes(id).catch(() => ({ data: { roomTypes: null } })),
        pgAPI.getPGProperty(id).catch(() => ({ data: { pgProperty: null } }))
      ]);

      const propertyData = {
        property: propertyRes.data?.property || null,
        media: mediaRes.data?.media || null,
        rooms: roomRes.data?.roomTypes || null,
        pg: pgRes.data?.pgProperty || null
      };

      setCompletePropertyData(propertyData);
      localStorage.setItem('editPropertyData', JSON.stringify(propertyData));
    } catch (err) {
      console.error("Error fetching property data:", err);
      setError(err.message);
      
      const localData = localStorage.getItem('editPropertyData');
      if (localData) {
        try {
          setCompletePropertyData(JSON.parse(localData));
        } catch (e) {
          console.error("Error parsing local data:", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editMode && propertyId) {
      fetchPropertyData(propertyId);
    }
  }, [editMode, propertyId]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNewProperty = (id = null) => {
    setPropertyId(id);
    setEditMode(!!id);
    setShowTracker(true);
    setCurrentStep(0);
    if (!id) {
      setCompletePropertyData(null);
      localStorage.removeItem('editPropertyData');
    }
  };

  const renderStepContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>Error loading property: {error}</p>
          <button 
            onClick={() => fetchPropertyData(propertyId)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      );
    }

    switch(currentStep) {
      case 0:
        return (
        <PropertyRegistration
            nextStep={nextStep}
            isEditMode={editMode}
            propertyId={propertyId}
            propertyData={completePropertyData}
            
          />

        );
      case 1:
        return (
          <AddMedia 
            nextStep={nextStep} 
            prevStep={prevStep} 
            propertyId={propertyId}
            isEditMode={editMode}
            mediaData={completePropertyData?.media}
          />
        );
      case 2:
        return (
          <RoomSelection 
            nextStep={nextStep} 
            prevStep={prevStep} 
            propertyId={propertyId}
            isEditMode={editMode}
            roomData={completePropertyData?.rooms}
          />
        );
      case 3:
        return (
          <PGForm 
            nextStep={nextStep} 
            prevStep={prevStep} 
            propertyId={propertyId}
            isEditMode={editMode}
            pgData={completePropertyData?.pg}
          />
        );
      case 4:
        return (
          <HostelListing 
            setShowTracker={setShowTracker}
            onNewProperty={handleNewProperty}
            setEditMode={setEditMode}
            setPropertyId={setPropertyId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-6 min-h-screen bg-[#f8f8ff]">
      {showTracker ? (
        <>
          <div className="relative flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center w-1/5 relative">
                {index > 0 && (
                  <div
                    className={`absolute top-[19px] -left-1/2 w-full h-[2px] ${
                      index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border-4 ${
                    index === currentStep
                      ? "border-blue-600 bg-blue-600 text-white"
                      : index < currentStep
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-blue-600 bg-white"
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <p
                  className={`text-sm mt-2 text-center ${
                    index <= currentStep ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            {renderStepContent()}
          </div>
        </>
      ) : (
        <HostelListing 
          setShowTracker={setShowTracker}
          onNewProperty={handleNewProperty}
          setEditMode={setEditMode}
          setPropertyId={setPropertyId}
        />
      )}
    </div>
  );
}