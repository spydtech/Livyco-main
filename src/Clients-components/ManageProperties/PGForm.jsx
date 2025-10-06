// import React, { useState, useEffect } from "react";

// const PGForm = ({ nextStep }) => {
//   const initialFormData = JSON.parse(localStorage.getItem("pgFormData")) || {
//     description: "",
//     gender: "",
//     tenantType: "",
//     foodIncluded: "",
//     rules: [],
//     otherRules: "",
//     services: {
//       washingMachine: "",
//       warden: "",
//       roomCleaning: "",
//     },
//     parking: "",
//     amenities: [],
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const availableRules = [
//     "No Smoking",
//     "No Drinking",
//     "No Visitors",
//     "No Pets",
//   ];
//   const availableAmenities = [
//     "Food",
//     "CCTV Camera",
//     "Security",
//     "Fire Safety",
//     "Lift",
//     "Solar Power",
//   ];

//   useEffect(() => {
//     localStorage.setItem("pgFormData", JSON.stringify(formData));
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleSelection = (key, value) => {
//     setFormData((prev) => {
//       const list = prev[key].includes(value)
//         ? prev[key].filter((item) => item !== value)
//         : [...prev[key], value];
//       return { ...prev, [key]: list };
//     });
//   };

//   const handleSubmit = () => {
//     alert("Form data saved!");
//   };

//   return (
//     <div className="text-black min-h-screen p-6">
//       <div className="max-w-3xl mx-auto p-6 rounded-lg">
//         <label className="block text-gray-500 mb-2">Property Description</label>

//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg border border-gray-600"
//           placeholder="Write with AI"
//         />

//         <div className="mt-4">
//           <label className="block text-gray-500">PG available for*</label>
//           <div className="flex gap-4 mt-2">
//             {["Male", "Female", "Co Living"].map((option) => (
//               <label key={option} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value={option}
//                   checked={formData.gender === option}
//                   onChange={handleChange}
//                   className="accent-yellow-500"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">Preferred Tenant*</label>
//           <select
//             name="tenantType"
//             value={formData.tenantType}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-600 text-black"
//           >
//             <option value="">Select tenant type</option>
//             <option value="Student">Student</option>
//             <option value="Working Professional">Working Professional</option>
//             <option value="Not Specific">Not Specific</option>
//           </select>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">Food Included*</label>
//           <div className="flex gap-4 mt-2">
//             {["Yes", "No"].map((option) => (
//               <label key={option} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="foodIncluded"
//                   value={option}
//                   checked={formData.foodIncluded === option}
//                   onChange={handleChange}
//                   className="accent-yellow-500"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">PG Rules</label>
//           <div className="grid grid-cols-4 gap-2 mt-2">
//             {availableRules.map((rule) => (
//               <label key={rule} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.rules.includes(rule)}
//                   onChange={() => toggleSelection("rules", rule)}
//                   className="accent-yellow-500"
//                 />
//                 {rule}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">Specify any other rules</label>
//           <textarea
//             name="otherRules"
//             value={formData.otherRules}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-600"
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block text-gray-500">PG Services</label>
//           <div className="grid grid-cols-1 gap-4 mt-2">
//             {["washingMachine", "warden", "roomCleaning"].map((service) => (
//               <div key={service}>
//                 <label className="block text-gray-500 capitalize">
//                   {service.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <div className="flex gap-2 mt-1">
//                   {["Yes", "No"].map((option) => (
//                     <label key={option} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name={service}
//                         value={option}
//                         checked={formData.services[service] === option}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             services: {
//                               ...prev.services,
//                               [service]: e.target.value,
//                             },
//                           }))
//                         }
//                         className="accent-yellow-500"
//                       />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">Parking</label>
//           <select
//             name="parking"
//             value={formData.parking}
//             onChange={handleChange}
//             className="w-full p-3 rounded-lg border border-gray-600 text-black"
//           >
//             <option value="">Select parking type</option>
//             <option value="Bike">Bike</option>
//             <option value="Car">Car</option>
//           </select>
//         </div>

//         <div className="mt-4">
//           <label className="block text-gray-500">PG Amenities</label>
//           <div className="grid grid-cols-1 gap-2 mt-2">
//             {availableAmenities.map((amenity) => (
//               <label key={amenity} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.amenities.includes(amenity)}
//                   onChange={() => toggleSelection("amenities", amenity)}
//                   className="accent-yellow-500"
//                 />
//                 {amenity}
//               </label>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={() => {
//             handleSubmit();
//             nextStep();
//           }}
//           className="w-full bg-yellow-500 text-black font-bold py-3 mt-6 rounded-lg"
//         >
//           Save and Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PGForm;


import React, { useState, useEffect, useCallback } from "react";
import { pgAPI, handleApiError } from "../PropertyController";

const PGForm = ({ nextStep, prevStep, propertyId, isEditMode }) => {
  const initialFormData = {
    description: "",
    gender: "",
    tenantType: "",
    foodIncluded: "",
    rules: [],
    otherRules: "",
    services: {
      washingMachine: "",
      warden: "",
      roomCleaning: "",
    },
    parking: "",
    amenities: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available options
  const genderOptions = ["Male", "Female", "Co Living"];
  const tenantOptions = ["Student", "Working Professional", "Not Specific"];
  const yesNoOptions = ["Yes", "No"];
  const availableRules = ["No Smoking", "No Drinking", "No Visitors", "No Pets"];
  const availableAmenities = [
    "Food",
    "CCTV Camera",
    "Security",
    "Fire Safety",
    "Lift",
    "Solar Power",
  ];
  const serviceFields = ["washingMachine", "warden", "roomCleaning"];
  const parkingOptions = ["Bike", "Car"];

  const getSavedFormData = useCallback(() => {
    try {
      const savedData = localStorage.getItem("pgFormData");
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch (error) {
      console.error("Error parsing saved form data:", error);
      return initialFormData;
    }
  }, []);

 const fetchPGData = useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try {
    console.log("📡 Fetching PG data for propertyId:", propertyId);
    const response = await pgAPI.getPGProperty(propertyId);
    console.log("✅ PG fetch response:", response.data);

    if (response.data?.success && response.data.pgData) {
      console.log("✅ Loaded PG data:", response.data.pgData);
      setFormData(response.data.pgData);
    } else {
      console.warn("⚠️ No PG data found for this property.");
      setFormData(initialFormData);
    }
  } catch (error) {
    console.error("❌ Failed to fetch PG details:", error);
    setError("Failed to load PG details. Please try again.");
    setFormData(initialFormData);
  } finally {
    setIsLoading(false);
  }
}, [propertyId]);



  useEffect(() => {
  if (propertyId && isEditMode) {
    fetchPGData();
  } else {
    localStorage.removeItem("pgFormData"); // clear old saved data
    setFormData(initialFormData);
    setIsLoading(false);
  }
}, [propertyId, isEditMode, fetchPGData]);


  useEffect(() => {
    if (!propertyId && !isLoading) {
      localStorage.setItem("pgFormData", JSON.stringify(formData));
    }
  }, [formData, propertyId, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleServiceChange = (service, value) => {
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [service]: value },
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.gender) errors.push("Please select who the PG is available for");
    if (!formData.tenantType) errors.push("Please select preferred tenant type");
    if (!formData.foodIncluded) errors.push("Please specify if food is included");
    if (!formData.description) errors.push("Please provide a property description");
    
    if (errors.length > 0) {
      setError(errors.join(", "));
      return false;
    }
    return true;
  };

 const handleSubmit = async () => {
  if (!validateForm()) return;

  setIsSaving(true);
  setError(null);

  try {
    // Prepare clean data object
    const submissionData = {
      description: formData.description,
      gender: formData.gender,
      tenantType: formData.tenantType,
      foodIncluded: formData.foodIncluded,
      rules: formData.rules,
      otherRules: formData.otherRules,
      services: formData.services,
      parking: formData.parking,
      amenities: formData.amenities
    };

    const response = propertyId
      ? await pgAPI.savePGProperty(propertyId, submissionData)
      : await pgAPI.savePGProperty(null, submissionData);

    if (response.data.success) {
      nextStep();
    } else {
      throw new Error(response.data.message || "Failed to save PG details");
    }
  } catch (error) {
    console.error("Error saving PG details:", error);
    setError(handleApiError(error).message);
  } finally {
    setIsSaving(false);
  }
};

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="text-black min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditMode ? "Edit PG Details" : "Add PG Details"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Property Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            rows={4}
            required
          />
        </div>

        {/* Gender Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            PG available for*
          </label>
          <div className="flex flex-wrap gap-4">
            {genderOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-500"
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tenant Type */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Preferred Tenant*
          </label>
          <select
            name="tenantType"
            value={formData.tenantType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="">Select tenant type</option>
            {tenantOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Food Included */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Food Included*
          </label>
          <div className="flex flex-wrap gap-4">
            {yesNoOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="foodIncluded"
                  value={option}
                  checked={formData.foodIncluded === option}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-500"
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* PG Rules */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">PG Rules</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableRules.map((rule) => (
              <label key={rule} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.rules.includes(rule)}
                  onChange={() => toggleSelection("rules", rule)}
                  className="h-4 w-4 text-yellow-500"
                />
                <span>{rule}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other Rules */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Other Rules
          </label>
          <textarea
            name="otherRules"
            value={formData.otherRules}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
            rows={2}
          />
        </div>

        {/* PG Services */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            PG Services
          </label>
          <div className="space-y-4">
            {serviceFields.map((service) => (
              <div key={service} className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {service.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="flex flex-wrap gap-4">
                  {yesNoOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={service}
                        value={option}
                        checked={formData.services[service] === option}
                        onChange={() => handleServiceChange(service, option)}
                        className="h-4 w-4 text-yellow-500"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Parking</label>
          <select
            name="parking"
            value={formData.parking}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300"
          >
            <option value="">Select parking type</option>
            {parkingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            PG Amenities
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => toggleSelection("amenities", amenity)}
                  className="h-4 w-4 text-yellow-500"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md"
            disabled={isSaving}
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md"
          >
            {isSaving ? "Saving..." : "Save and Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGForm;