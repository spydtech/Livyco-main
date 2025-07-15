// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { propertyAPI, handleApiError } from "../PropertyController";
// import { FaLocationCrosshairs } from "react-icons/fa6";

// const PropertyRegistration = ({ nextStep }) => {
//   const [formData, setFormData] = useState({
//     clientId: localStorage.getItem("clientId") || "",
//     city: "",
//     name: "",
//     locality: "",
//     street: "",
//     registrationId: "",
//     gstNo: "",
//     cgstNo: "",
//     sgstNo: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [existingProperty, setExistingProperty] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchProperty = async () => {
//     try {
//       const response = await propertyAPI.getProperty();
//       if (response.data.success) {
//         setExistingProperty(response.data.property);
//         // Pre-fill form if property exists
//         if (response.data.property) {
//           setFormData({
//             city: response.data.property.city || "",
//             name: response.data.property.name || "",
//             locality: response.data.property.locality || "",
//             street: response.data.property.street || "",
//             registrationId: response.data.property.registrationId || "",
//             gstNo: response.data.property.gstNo || "",
//             cgstNo: response.data.property.cgstNo || "",
//             sgstNo: response.data.property.sgstNo || "",
//             latitude: response.data.property.location?.coordinates[1]?.toString() || "",
//             longitude: response.data.property.location?.coordinates[0]?.toString() || "",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching property:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProperty();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = [
//       'city', 'name', 'locality', 'street', 
//       'registrationId', 'gstNo'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (formData.latitude || formData.longitude) {
//       if (!formData.latitude || isNaN(formData.latitude)) {
//         newErrors.latitude = "Invalid latitude";
//       }
//       if (!formData.longitude || isNaN(formData.longitude)) {
//         newErrors.longitude = "Invalid longitude";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//  const fetchLocation = async () => {
//   if (!navigator.geolocation) {
//     setErrors(prev => ({ ...prev, location: "Geolocation is not supported by your browser." }));
//     return;
//   }

//   setLoadingLocation(true);
//   setErrors(prev => ({ ...prev, location: "" }));

//   try {
//     const position = await new Promise((resolve, reject) =>
//       navigator.geolocation.getCurrentPosition(resolve, reject, {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0
//       })
//     );

//     const { latitude, longitude } = position.coords;

//     setFormData(prev => ({
//       ...prev,
//       latitude: latitude.toString(),
//       longitude: longitude.toString()
//     }));

//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     );

//     if (!response.ok) throw new Error("Failed to fetch address from coordinates.");

//     const data = await response.json();

//     if (data?.address) {
//       const address = data.address;
//       setFormData(prev => ({
//         ...prev,
//         city: address.city || address.town || address.county || "",
//         locality: address.suburb || address.village || address.neighbourhood || "",
//         street: address.road || address.pedestrian || address.footway || ""
//       }));
//     } else {
//       throw new Error("No address found for coordinates.");
//     }
//   } catch (error) {
//     console.error("Location fetch error:", error);
//     setErrors(prev => ({
//       ...prev,
//       location: "Failed to get location. Please allow location access or enter manually."
//     }));
//   } finally {
//     setLoadingLocation(false);
//   }
// };


//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setSubmitLoading(true);
//     setErrors({});

//     try {
//       const submissionData = {
//         city: formData.city,
//         name: formData.name,
//         locality: formData.locality,
//         street: formData.street,
//         registrationId: formData.registrationId,
//         gstNo: formData.gstNo,
//         cgstNo: formData.cgstNo,
//         sgstNo: formData.sgstNo
//       };

//       if (formData.latitude && formData.longitude) {
//         submissionData.location = {
//           type: "Point",
//           coordinates: [
//             parseFloat(formData.longitude),
//             parseFloat(formData.latitude)
//           ]
//         };
//       }

//       let response;
//       if (existingProperty) {
//         response = await propertyAPI.updateProperty(submissionData);
//       } else {
//         response = await propertyAPI.registerProperty(submissionData);
//       }

//       if (response.data.success) {
//         localStorage.setItem("propertyData", JSON.stringify(formData));
//         nextStep();
//       }
//     } catch (error) {
//       const apiError = handleApiError(error);
//       if (error.response?.status === 409) {
//         setErrors({
//           submit: "You already have a registered property. Updating instead."
//         });
//         await fetchProperty(); // Fetch the existing property
//       } else {
//         setErrors({
//           submit: apiError.message || "Failed to register property"
//         });
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 max-w-4xl">
//       <h2 className="text-lg font-semibold mb-6">
//         Provide the property address, license number, and required registrations
//         for verification.
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { name: "city", placeholder: "City*" },
//           { name: "name", placeholder: "PG/Hostel Name*" },
//           { name: "locality", placeholder: "Locality*" },
//           { name: "street", placeholder: "Street/Area/Landmark*" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={fetchLocation}
//           disabled={loadingLocation}
//           className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
//         >
//           <FaLocationCrosshairs className="mr-2" />
//           {loadingLocation ? "Detecting location..." : "Use Current Location"}
//         </button>
//         {errors.location && (
//           <p className="text-sm text-red-500 mt-1">{errors.location}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {[
//           { name: "registrationId", placeholder: "Registration ID*" },
//           { name: "gstNo", placeholder: "GST No*" },
//           { name: "cgstNo", placeholder: "CGST No" },
//           { name: "sgstNo", placeholder: "SGST No" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Hidden coordinate fields for debugging */}
//       <div className="hidden">
//         <input name="latitude" value={formData.latitude} readOnly />
//         <input name="longitude" value={formData.longitude} readOnly />
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={submitLoading}
//         className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
//       >
//         {submitLoading ? "Processing..." : "Save and Continue"}
//       </button>
//       {errors.submit && (
//         <p className="text-sm text-red-500 mt-2 text-center">{errors.submit}</p>
//       )}
//     </div>
//   );
// };

// export default PropertyRegistration;




// // src/Clients-components/ManageProperties/PropertyRegistration.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { propertyAPI, handleApiError } from "../PropertyController";
// import { FaLocationCrosshairs } from "react-icons/fa6";

// const Registration = ({ nextStep }) => {
//   const [formData, setFormData] = useState({
//     city: "",
//     name: "",
//     locality: "",
//     street: "",
//     registrationId: "",
//     gstNo: "",
//     cgstNo: "",
//     sgstNo: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [existingProperty, setExistingProperty] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchProperty = async () => {
//     try {
//       const response = await propertyAPI.getProperty();
//       if (response.data.success) {
//         setExistingProperty(response.data.property);
//         if (response.data.property) {
//           setFormData({
//             city: response.data.property.city || "",
//             name: response.data.property.name || "",
//             locality: response.data.property.locality || "",
//             street: response.data.property.street || "",
//             registrationId: response.data.property.registrationId || "",
//             gstNo: response.data.property.gstNo || "",
//             cgstNo: response.data.property.cgstNo || "",
//             sgstNo: response.data.property.sgstNo || "",
//             latitude: response.data.property.location?.coordinates[1]?.toString() || "",
//             longitude: response.data.property.location?.coordinates[0]?.toString() || "",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching property:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProperty();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = ['city', 'name', 'locality', 'street', 'registrationId', 'gstNo'];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (formData.latitude || formData.longitude) {
//       if (!formData.latitude || isNaN(formData.latitude)) {
//         newErrors.latitude = "Invalid latitude";
//       }
//       if (!formData.longitude || isNaN(formData.longitude)) {
//         newErrors.longitude = "Invalid longitude";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const fetchLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setLoadingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("Latitude:", latitude, "Longitude:", longitude);

//         try {
//           // Fetch address from OpenStreetMap API
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//           );
//           const data = await response.json();

//           if (data && data.address) {
//             setFormData({
//               ...formData,
//               city: data.address.city || data.address.town || "",
//               locality: data.address.suburb || data.address.village || "",
//               street:
//                 data.address.road ||
//                 data.address.neighbourhood ||
//                 data.display_name ||
//                 "",
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching location:", error);
//         } finally {
//           setLoadingLocation(false);
//         }
//       },
//       (error) => {
//         alert("Unable to retrieve location. Please check your permissions.");
//         console.error(error);
//         setLoadingLocation(false);
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setSubmitLoading(true);
//     setErrors({});

//     try {
//       const submissionData = {
//         city: formData.city,
//         name: formData.name,
//         locality: formData.locality,
//         street: formData.street,
//         registrationId: formData.registrationId,
//         gstNo: formData.gstNo,
//         cgstNo: formData.cgstNo,
//         sgstNo: formData.sgstNo
//       };

//       if (formData.latitude && formData.longitude) {
//         submissionData.location = {
//           type: "Point",
//           coordinates: [
//             parseFloat(formData.longitude),
//             parseFloat(formData.latitude)
//           ]
//         };
//       }

//       let response;
//       if (existingProperty) {
//         response = await propertyAPI.updateProperty(submissionData);
//       } else {
//         response = await propertyAPI.registerProperty(submissionData);
//       }

//       if (response.data.success) {
//         localStorage.setItem("propertyData", JSON.stringify(formData));
//         nextStep();
//       }
//     } catch (error) {
//       const apiError = handleApiError(error);
//       if (error.response?.status === 409) {
//         setErrors({
//           submit: "You already have a registered property. Updating instead."
//         });
//         await fetchProperty();
//       } else {
//         setErrors({
//           submit: apiError.message || "Failed to register property"
//         });
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 max-w-4xl">
//       <h2 className="text-lg font-semibold mb-6">
//         Provide the property address, license number, and required registrations for verification.
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { name: "city", placeholder: "City*" },
//           { name: "name", placeholder: "PG/Hostel Name*" },
//           { name: "locality", placeholder: "Locality*" },
//           { name: "street", placeholder: "Street/Area/Landmark*" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={fetchLocation}
//           disabled={loadingLocation}
//           className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
//         >
//           <FaLocationCrosshairs className="mr-2" />
//           {loadingLocation ? "Detecting location..." : "Use Current Location"}
//         </button>
//         {errors.location && (
//           <p className="text-sm text-red-500 mt-1">{errors.location}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {[
//           { name: "registrationId", placeholder: "Registration ID*" },
//           { name: "gstNo", placeholder: "GST No*" },
//           { name: "cgstNo", placeholder: "CGST No" },
//           { name: "sgstNo", placeholder: "SGST No" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Hidden coordinate fields for debugging */}
//       <div className="hidden">
//         <input name="latitude" value={formData.latitude} readOnly />
//         <input name="longitude" value={formData.longitude} readOnly />
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={submitLoading}
//         className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
//       >
//         {submitLoading ? "Processing..." : "Save and Continue"}
//       </button>
//       {errors.submit && (
//         <p className="text-sm text-red-500 mt-2 text-center">{errors.submit}</p>
//       )}
//     </div>
//   );
// };

// export default Registration;





// import React, { useState, useEffect } from "react";
// import { propertyAPI, handleApiError } from "../PropertyController";
// import { FaLocationCrosshairs } from "react-icons/fa6";

// const PropertyRegistration = ({ nextStep, isEditMode, propertyId, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     city: "",
//     name: "",
//     locality: "",
//     street: "",
//     registrationId: "",
//     gstNo: "",
//     cgstNo: "",
//     sgstNo: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     if (isEditMode && propertyId) {
//       fetchPropertyDetails();
//     }
//   }, [isEditMode, propertyId]);

//   const fetchPropertyDetails = async () => {
//     try {
//       const response = await propertyAPI.getProperty(propertyId);
//       if (response.data.success) {
//         const property = response.data.property;
//         console.log("Fetched property:", property);
//         setFormData({
//           city: property.city || "",
//           name: property.name || "",
//           locality: property.locality || "",
//           street: property.street || "",
//           registrationId: property.registrationId || "",
//           gstNo: property.gstNo || "",
//           cgstNo: property.cgstNo || "",
//           sgstNo: property.sgstNo || "",
//           latitude: property.location?.coordinates[1]?.toString() || "",
//           longitude: property.location?.coordinates[0]?.toString() || "",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching property:", error);
//       setErrors({ submit: "Failed to load property details" });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = [
//       'city', 'name', 'locality', 'street', 
//       'registrationId', 'gstNo'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (formData.latitude || formData.longitude) {
//       if (!formData.latitude || isNaN(formData.latitude)) {
//         newErrors.latitude = "Invalid latitude";
//       }
//       if (!formData.longitude || isNaN(formData.longitude)) {
//         newErrors.longitude = "Invalid longitude";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const fetchLocation = async () => {
//     if (!navigator.geolocation) {
//       setErrors(prev => ({ ...prev, location: "Geolocation not supported" }));
//       return;
//     }

//     setLoadingLocation(true);
//     setErrors(prev => ({ ...prev, location: "" }));

//     try {
//       const position = await new Promise((resolve, reject) =>
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//         })
//       );

//       const { latitude, longitude } = position.coords;
//       setFormData(prev => ({
//         ...prev,
//         latitude: latitude.toString(),
//         longitude: longitude.toString()
//       }));

//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//       );
//       const data = await response.json();

//       if (data?.address) {
//         const address = data.address;
//         setFormData(prev => ({
//           ...prev,
//           city: address.city || address.town || "",
//           locality: address.suburb || address.village || "",
//           street: address.road || ""
//         }));
//       }
//     } catch (error) {
//       setErrors(prev => ({
//         ...prev,
//         location: "Failed to get location. Please enter manually."
//       }));
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setSubmitLoading(true);
//     setErrors({});

//     try {
//       const submissionData = {
//         city: formData.city,
//         name: formData.name,
//         locality: formData.locality,
//         street: formData.street,
//         registrationId: formData.registrationId,
//         gstNo: formData.gstNo,
//         cgstNo: formData.cgstNo,
//         sgstNo: formData.sgstNo,
//         location: formData.latitude && formData.longitude ? {
//           type: "Point",
//           coordinates: [
//             parseFloat(formData.longitude),
//             parseFloat(formData.latitude)
//           ]
//         } : undefined
//       };

//       let response;
//       if (isEditMode) {
//         response = await propertyAPI.updateProperty(propertyId, submissionData);
//       } else {
//         response = await propertyAPI.registerProperty(submissionData);
//       }

//      if (response.data.success && response.data.property) {
//   const property = response.data.property;
//   const updatedData = {
//     ...formData,
//     _id: property._id
//   };
//         onUpdate(updatedData);
//         localStorage.setItem("propertyData", JSON.stringify(updatedData));
//          setTimeout(() => nextStep(), 0);
//       }
//     } catch (error) {
//       const apiError = handleApiError(error);
//       setErrors({ submit: apiError.message });
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto p-6 max-w-4xl">
//       <h2 className="text-lg font-semibold mb-6">
//         {isEditMode ? "Edit Property Details" : "Register New Property"}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { name: "city", placeholder: "City*" },
//           { name: "name", placeholder: "PG/Hostel Name*" },
//           { name: "locality", placeholder: "Locality*" },
//           { name: "street", placeholder: "Street/Area/Landmark*" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={fetchLocation}
//           disabled={loadingLocation}
//           className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
//         >
//           <FaLocationCrosshairs className="mr-2" />
//           {loadingLocation ? "Detecting location..." : "Use Current Location"}
//         </button>
//         {errors.location && (
//           <p className="text-sm text-red-500 mt-1">{errors.location}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {[
//           { name: "registrationId", placeholder: "Registration ID*" },
//           { name: "gstNo", placeholder: "GST No*" },
//           { name: "cgstNo", placeholder: "CGST No" },
//           { name: "sgstNo", placeholder: "SGST No" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="hidden">
//         <input name="latitude" value={formData.latitude} readOnly />
//         <input name="longitude" value={formData.longitude} readOnly />
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={submitLoading}
//         className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
//       >
//         {submitLoading ? "Processing..." : "Save and Continue"}
//       </button>
//       {errors.submit && (
//         <p className="text-sm text-red-500 mt-2 text-center">{errors.submit}</p>
//       )}
//     </div>
//   );
// };

// export default PropertyRegistration;




// import React, { useState, useEffect } from "react";
// import { propertyAPI, handleApiError } from "../PropertyController";
// import { FaLocationCrosshairs } from "react-icons/fa6";

// const PropertyRegistration = ({ nextStep, isEditMode, propertyId, propertyData }) => {
//   const [formData, setFormData] = useState({
//     city: "",
//     name: "",
//     locality: "",
//     street: "",
//     registrationId: "",
//     gstNo: "",
//     cgstNo: "",
//     sgstNo: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [loadingLocation, setLoadingLocation] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   useEffect(() => {
//     const loadPropertyData = async () => {
//       if (!isEditMode) return;

//       setLoading(true);
//       setErrors({});
      
//       try {
//         // Try to get data from props first
//         if (propertyData && propertyId) {
//           setFormDataFromProperty(propertyData);
//           return;
//         }

//         // Then try localStorage
//         const localData = localStorage.getItem('editPropertyData');
//         if (localData) {
//           try {
//             const parsedData = JSON.parse(localData);
//             if (parsedData?.property?._id) {
//               setFormDataFromProperty(parsedData.property);
//               return;
//             }
//           } catch (e) {
//             console.error("Error parsing localStorage data:", e);
//           }
//         }

//         // Finally fetch from API
//         if (!propertyId) {
//           throw new Error("No property ID provided for editing");
//         }

//         const response = await propertyAPI.getProperty(propertyId);
        
//         if (!response.data?.success) {
//           throw new Error(response.data?.message || "API request failed");
//         }

//         if (!response.data.property?._id) {
//           throw new Error("Invalid property data format from API");
//         }

//         const property = response.data.property;
//         setFormDataFromProperty(property);
        
//         // Update localStorage
//         localStorage.setItem('editPropertyData', JSON.stringify({
//           property: property
//         }));

//       } catch (error) {
//         console.error("Error loading property data:", error);
//         setErrors({ 
//           submit: error.message || "Failed to load property data" 
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPropertyData();
//   }, [isEditMode, propertyId, propertyData]);

//   const setFormDataFromProperty = (property) => {
//     if (!property) return;

//     setFormData({
//       city: property.city || "",
//       name: property.name || "",
//       locality: property.locality || "",
//       street: property.street || "",
//       registrationId: property.registrationId || "",
//       gstNo: property.gstNo || "",
//       cgstNo: property.cgstNo || "",
//       sgstNo: property.sgstNo || "",
//       latitude: property.location?.coordinates?.[1]?.toString() || "",
//       longitude: property.location?.coordinates?.[0]?.toString() || "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = [
//       'city', 'name', 'locality', 'street', 
//       'registrationId', 'gstNo'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field]) {
//         newErrors[field] = "This field is required";
//       }
//     });

//     if (formData.latitude || formData.longitude) {
//       if (!formData.latitude || isNaN(formData.latitude)) {
//         newErrors.latitude = "Invalid latitude";
//       }
//       if (!formData.longitude || isNaN(formData.longitude)) {
//         newErrors.longitude = "Invalid longitude";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const fetchLocation = async () => {
//     if (!navigator.geolocation) {
//       setErrors(prev => ({ ...prev, location: "Geolocation not supported" }));
//       return;
//     }

//     setLoadingLocation(true);
//     setErrors(prev => ({ ...prev, location: "" }));

//     try {
//       const position = await new Promise((resolve, reject) =>
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//         })
//       );

//       const { latitude, longitude } = position.coords;
//       setFormData(prev => ({
//         ...prev,
//         latitude: latitude.toString(),
//         longitude: longitude.toString()
//       }));

//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//       );
//       const data = await response.json();

//       if (data?.address) {
//         const address = data.address;
//         setFormData(prev => ({
//           ...prev,
//           city: address.city || address.town || "",
//           locality: address.suburb || address.village || "",
//           street: address.road || ""
//         }));
//       }
//     } catch (error) {
//       setErrors(prev => ({
//         ...prev,
//         location: "Failed to get location. Please enter manually."
//       }));
//     } finally {
//       setLoadingLocation(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setSubmitLoading(true);
//     setErrors({});

//     try {
//       const submissionData = {
//         city: formData.city,
//         name: formData.name,
//         locality: formData.locality,
//         street: formData.street,
//         registrationId: formData.registrationId,
//         gstNo: formData.gstNo,
//         cgstNo: formData.cgstNo,
//         sgstNo: formData.sgstNo,
//         location: formData.latitude && formData.longitude ? {
//           type: "Point",
//           coordinates: [
//             parseFloat(formData.longitude),
//             parseFloat(formData.latitude)
//           ]
//         } : undefined
//       };

//       let response;
//       if (isEditMode) {
//         response = await propertyAPI.updateProperty(propertyId, submissionData);
//       } else {
//         response = await propertyAPI.registerProperty(submissionData);
//       }

//       if (!response.data?.success) {
//         throw new Error(response.data?.message || "Operation failed");
//       }

//       const updatedProperty = response.data.property;
      
//       if (isEditMode) {
//         const existingData = JSON.parse(localStorage.getItem('editPropertyData') || '{}');
//         localStorage.setItem('editPropertyData', JSON.stringify({
//           ...existingData,
//           property: updatedProperty
//         }));
//       }

//       nextStep();
//     } catch (error) {
//       const apiError = handleApiError(error);
//       setErrors({ submit: apiError.message });
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto p-6 max-w-4xl">
//       <h2 className="text-lg font-semibold mb-6">
//         {isEditMode ? "Edit Property Details" : "Register New Property"}
//       </h2>

//       {errors.submit && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{errors.submit}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { name: "city", placeholder: "City*" },
//           { name: "name", placeholder: "PG/Hostel Name*" },
//           { name: "locality", placeholder: "Locality*" },
//           { name: "street", placeholder: "Street/Area/Landmark*" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <button
//           type="button"
//           onClick={fetchLocation}
//           disabled={loadingLocation}
//           className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
//         >
//           <FaLocationCrosshairs className="mr-2" />
//           {loadingLocation ? "Detecting location..." : "Use Current Location"}
//         </button>
//         {errors.location && (
//           <p className="text-sm text-red-500 mt-1">{errors.location}</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {[
//           { name: "registrationId", placeholder: "Registration ID*" },
//           { name: "gstNo", placeholder: "GST No*" },
//           { name: "cgstNo", placeholder: "CGST No" },
//           { name: "sgstNo", placeholder: "SGST No" },
//         ].map((field) => (
//           <div key={field.name}>
//             <input
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className={`w-full p-3 border rounded-md focus:ring-2 ${
//                 errors[field.name] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
//               }`}
//             />
//             {errors[field.name] && (
//               <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={submitLoading || loading}
//         className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
//       >
//         {submitLoading ? "Processing..." : "Save and Continue"}
//       </button>
//     </div>
//   );
// };

// export default PropertyRegistration;

import React, { useState, useEffect } from "react";
import { propertyAPI, handleApiError } from "../PropertyController";
import { FaLocationCrosshairs } from "react-icons/fa6";

const PropertyRegistration = ({ nextStep, isEditMode, propertyId, propertyData }) => {
  const [formData, setFormData] = useState({
    city: "",
    name: "",
    locality: "",
    street: "",
    registrationId: "",
    gstNo: "",
    cgstNo: "",
    sgstNo: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // ✅ Load property data in edit mode
  useEffect(() => {
  const loadPropertyData = async () => {
    if (!isEditMode || !propertyId) {
      resetForm();
      return;
    }

    setLoading(true);
    setErrors({});

    if (propertyData?.property && propertyData.property._id === propertyId) {
      setFormDataFromProperty(propertyData.property);
      setLoading(false);
      return;
    }

    try {
      const localData = localStorage.getItem("editPropertyData");
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed?.property && parsed.property._id === propertyId) {
          setFormDataFromProperty(parsed.property);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn("Invalid localStorage data:", e);
    }

    try {
      const response = await propertyAPI.getProperty(propertyId);

      if (response.data?.success && Array.isArray(response.data.data)) {
        const match = response.data.data.find(
          (item) => item.property?._id === propertyId
        );

        if (match?.property) {
          setFormDataFromProperty(match.property);
          localStorage.setItem("editPropertyData", JSON.stringify({ property: match.property }));
        } else {
          throw new Error("Property not found in API data");
        }
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      console.error("API error:", err);
      setErrors({ submit: "Failed to load property. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  loadPropertyData();
}, [isEditMode, propertyId, propertyData]);

  // ✅ Set form data from property
  const setFormDataFromProperty = (property) => {
    const coordinates = property.location?.coordinates || [];
    const latitude = coordinates[1]?.toString() || "";
    const longitude = coordinates[0]?.toString() || "";

    setFormData({
      city: property.city || "",
      name: property.name || "",
      locality: property.locality || "",
      street: property.street || "",
      registrationId: property.registrationId || "",
      gstNo: property.gstNo || "",
      cgstNo: property.cgstNo || "",
      sgstNo: property.sgstNo || "",
      latitude,
      longitude,
    });
  };

  const resetForm = () => {
    setFormData({
      city: "",
      name: "",
      locality: "",
      street: "",
      registrationId: "",
      gstNo: "",
      cgstNo: "",
      sgstNo: "",
      latitude: "",
      longitude: "",
    });
    setErrors({});
    setLoading(false);
    setLoadingLocation(false);
    setSubmitLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'city', 'name', 'locality', 'street', 
      'registrationId', 'gstNo'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.latitude || formData.longitude) {
      if (!formData.latitude || isNaN(formData.latitude)) {
        newErrors.latitude = "Invalid latitude";
      }
      if (!formData.longitude || isNaN(formData.longitude)) {
        newErrors.longitude = "Invalid longitude";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const fetchLocation = async () => {
  //   if (!navigator.geolocation) {
  //     setErrors(prev => ({ ...prev, location: "Geolocation not supported" }));
  //     return;
  //   }

  //   setLoadingLocation(true);
  //   setErrors(prev => ({ ...prev, location: "" }));

  //   try {
  //     const position = await new Promise((resolve, reject) =>
  //       navigator.geolocation.getCurrentPosition(resolve, reject, {
  //         enableHighAccuracy: true,
  //         timeout: 10000,
  //       })
  //     );

  //     const { latitude, longitude } = position.coords;
  //     setFormData(prev => ({
  //       ...prev,
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString()
  //     }));

  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  //     );
  //     const data = await response.json();

  //     if (data?.address) {
  //       const address = data.address;
  //       setFormData(prev => ({
  //         ...prev,
  //         city: address.city || address.town || "",
  //         locality: address.suburb || address.village || "",
  //         street: address.road || ""
  //       }));
  //     }
  //   } catch (error) {
  //     setErrors(prev => ({
  //       ...prev,
  //       location: "Failed to get location. Please enter manually."
  //     }));
  //   } finally {
  //     setLoadingLocation(false);
  //   }
  // };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude, longitude } = coords;
          const res = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=pk.d9ded81b098baab4433252bccb34a41e&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            city: data.address.city || data.address.town || data.address.county || "",
            locality: data.address.suburb || data.address.village || data.address.neighbourhood || "",
            street: data.address.road || data.display_name || "",
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          }));
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          alert("Failed to get address.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error("Location fetch failed", err);
        alert("Location permission denied.");
        setLoadingLocation(false);
      }
    );
  };
  // const handleSubmit = async () => {
  //   if (!validateForm()) return;

  //   setSubmitLoading(true);
  //   setErrors({});

  //   try {
  //     const submissionData = {
  //       city: formData.city,
  //       name: formData.name,
  //       locality: formData.locality,
  //       street: formData.street,
  //       registrationId: formData.registrationId,
  //       gstNo: formData.gstNo,
  //       cgstNo: formData.cgstNo,
  //       sgstNo: formData.sgstNo,
  //       location: formData.latitude && formData.longitude ? {
  //         type: "Point",
  //         coordinates: [
  //           parseFloat(formData.longitude),
  //           parseFloat(formData.latitude)
  //         ]
  //       } : undefined
  //     };

  //     let response;
  //     if (isEditMode) {
  //       response = await propertyAPI.updateProperty(propertyId, submissionData);
  //     } else {
  //       response = await propertyAPI.registerProperty(submissionData);
  //     }

  //     if (!response.data?.success) {
  //       throw new Error(response.data?.message || "Operation failed");
  //     }

  //     const updatedProperty = response.data.property;
  //     const existingData = JSON.parse(localStorage.getItem('editPropertyData') || "{}");
  //     localStorage.setItem('editPropertyData', JSON.stringify({
  //       ...existingData,
  //       property: updatedProperty 
  //     }));

  //     nextStep();
  //   } catch (error) {
  //     const apiError = handleApiError(error);
  //     setErrors({ submit: apiError.message });
  //   } finally {
  //     setSubmitLoading(false);
  //   }
  // };
   const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);
    setErrors({});

    try {
      const submissionData = {
        city: formData.city,
        name: formData.name,
        locality: formData.locality,
        street: formData.street,
        registrationId: formData.registrationId,
        gstNo: formData.gstNo,
        cgstNo: formData.cgstNo,
        sgstNo: formData.sgstNo,
        location:
          formData.latitude && formData.longitude
            ? {
                type: "Point",
                coordinates: [
                  parseFloat(formData.longitude),
                  parseFloat(formData.latitude),
                ],
              }
            : undefined,
      };

      let response;
      if (isEditMode) {
        response = await propertyAPI.updateProperty(propertyId, submissionData);
      } else {
        response = await propertyAPI.registerProperty(submissionData);
      }

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Operation failed");
      }

      localStorage.setItem(
        "editPropertyData",
        JSON.stringify({ property: response.data.property })
      );

      nextStep();
    } catch (error) {
      const apiError = handleApiError(error);
      setErrors({ submit: apiError.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="text-lg font-semibold mb-6">
        {isEditMode ? "Edit Property Details" : "Register New Property"}
      </h2>

      {errors.submit && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{errors.submit}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["city", "name", "locality", "street"].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1) + "*"}
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors[field] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={fetchLocation}
          disabled={loadingLocation}
          className="flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
        >
          <FaLocationCrosshairs className="mr-2" />
          {loadingLocation ? "Detecting location..." : "Use Current Location"}
        </button>
        {errors.location && (
          <p className="text-sm text-red-500 mt-1">{errors.location}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {["registrationId", "gstNo", "cgstNo", "sgstNo"].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, " $1") + (field === "cgstNo" || field === "sgstNo" ? "" : "*")}
              className={`w-full p-3 border rounded-md focus:ring-2 ${
                errors[field] ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
              }`}
            />
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitLoading || loading}
        className="w-full mt-8 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
      >
        {submitLoading ? "Processing..." : "Save and Continue"}
      </button>
    </div>
  );
};

export default PropertyRegistration;
