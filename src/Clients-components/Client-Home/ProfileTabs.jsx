// import React, { useState, useEffect, useRef } from "react";
// import { userAPI } from "../../Clients-components/PropertyController";

// // Profile Image Component
// const ProfileImageUpload = ({ currentImage, onImageChange, loading, onSaveImage }) => {
//   const fileInputRef = useRef(null);
//   const [imagePreview, setImagePreview] = useState(currentImage || null);
//   const [imageFile, setImageFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   // Reset when currentImage changes
//   useEffect(() => {
//     setImagePreview(currentImage);
//     setImageFile(null);
//   }, [currentImage]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
//         return;
//       }
      
//       if (file.size > 5 * 1024 * 1024) {
//         alert("Image size should be less than 5MB.");
//         return;
//       }
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const previewUrl = reader.result;
//         setImagePreview(previewUrl);
//         setImageFile(file);
//         onImageChange(file, previewUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveImage = async () => {
//     if (!imageFile) {
//       alert("Please select an image first.");
//       return;
//     }

//     setIsUploading(true);
//     try {
//       const success = await onSaveImage(imageFile);
//       if (success) {
//         setImageFile(null);
//       }
//     } catch (error) {
//       alert("Failed to save image. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleImageClick = () => {
//     if (!loading && !isUploading) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleRemoveImage = () => {
//     setImagePreview(currentImage);
//     setImageFile(null);
//     onImageChange(null, null);
//   };

//   return (
//     <div className="flex flex-col items-center mb-6">
//       <div className="relative">
//         {/* Profile Image */}
//         <div 
//           onClick={handleImageClick}
//           className={`w-20 h-20 rounded-full overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90 ${
//             loading || isUploading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {imagePreview ? (
//             <img 
//               src={imagePreview} 
//               alt="Profile" 
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </div>
//           )}
          
//           {/* Camera Icon Overlay */}
//           <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full">
//             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//             </svg>
//           </div>

//           {/* Uploading Spinner */}
//           {isUploading && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//             </div>
//           )}
//         </div>
        
//         {/* Hidden File Input */}
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept="image/*"
//           className="hidden"
//           disabled={loading || isUploading}
//         />
//       </div>
      
//       {/* Image Actions */}
//       <div className="mt-2 flex flex-col items-center gap-2">
//         <p className="text-xs text-gray-600">
//           {imageFile ? "New image selected" : "Click to upload"}
//         </p>
        
//         {imageFile && !isUploading && (
//           <button
//             type="button"
//             onClick={handleSaveImage}
//             className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
//           >
//             Save Image
//           </button>
//         )}
        
//         {imageFile && !isUploading && (
//           <button
//             type="button"
//             onClick={handleRemoveImage}
//             className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// // Loading component
// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center py-8">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#facc14]"></div>
//   </div>
// );

// const ProfileTabs = ({ profile, onComplete }) => {
//   const [activeTab, setActiveTab] = useState("basic");
//   const [loading, setLoading] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [profileImageFile, setProfileImageFile] = useState(null);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     phone: "",
//     email: "",
//     gender: "",
//     dob: "",
//     profession: "",
//     clientId: "",
//     guardianName: "",
//     guardianContact: "",
//     aadharNumber: "",
//     whatsappUpdates: false,
//   });

//   // Initialize form data when profile changes
//   useEffect(() => {
//     if (profile) {
//       // Normalize gender
//       const normalizedGender = profile.gender
//         ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
//         : "";

//       // Format DOB
//       let formattedDob = "";
//       if (profile.dob) {
//         try {
//           formattedDob = String(profile.dob).substring(0, 10);
//         } catch (error) {
//           console.error("Error parsing DOB:", error);
//         }
//       }

//       // Set profile image
//       if (profile.profileImage) {
//         setProfileImage(profile.profileImage);
//       }

//       setFormData({
//         name: profile.name || "",
//         location: profile.location || "",
//         phone: profile.phone || "",
//         email: profile.email || "",
//         gender: normalizedGender,
//         dob: formattedDob,
//         profession: profile.userType || "",
//         clientId: profile.clientId || "",
//         guardianName: profile.guardianName || "",
//         guardianContact: profile.guardianContact || "",
//         aadharNumber: profile.aadhar || "",
//         whatsappUpdates: profile.whatsappUpdates || false,
//       });
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleProfileImageChange = (file) => {
//     if (file) {
//       setProfileImageFile(file);
//     } else {
//       setProfileImage(profile.profileImage);
//       setProfileImageFile(null);
//     }
//   };

//   // Function to save profile image
//   const handleSaveProfileImage = async (file) => {
//     if (!file) return false;

//     try {
//       // Create FormData for image upload
//       const imageFormData = new FormData();
//       imageFormData.append('profileImage', file);
      
//       const response = await userAPI.uploadProfileImage(imageFormData);
      
//       if (response.data && response.data.success) {
//         const uploadedImageUrl = response.data.profileImage || response.data.user?.profileImage;
        
//         if (uploadedImageUrl) {
//           setProfileImage(uploadedImageUrl);
//           return true;
//         }
//       }
      
//       throw new Error("Failed to upload image");
//     } catch (error) {
//       alert("Failed to save image. Please try again.");
//       throw error;
//     }
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     try {
//       // Upload profile image if there's a new one
//       if (profileImageFile) {
//         await handleSaveProfileImage(profileImageFile);
//       }

//       // Prepare the data for API submission
//       const payload = {
//         name: formData.name,
//         location: formData.location,
//         phone: formData.phone,
//         email: formData.email,
//         gender: formData.gender.toLowerCase(),
//         dob: formData.dob ? new Date(formData.dob).toISOString() : "",
//         userType: formData.profession,
//         guardianName: formData.guardianName,
//         guardianContact: formData.guardianContact,
//         aadhar: formData.aadharNumber,
//         whatsappUpdates: formData.whatsappUpdates,
//       };

//       // Update user data
//       const res = await userAPI.updateUser(payload);

//       if (res.data && res.data.success) {
//         // Get fresh user data to include profileImage
//         const userRes = await userAPI.getUser();
//         if (userRes.data?.user) {
//           alert("Profile Updated Successfully ✅");
//           if (onComplete) onComplete(userRes.data.user);
//         }
//       } else {
//         alert("Failed to update profile. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       if (error.response) {
//         alert(`Error: ${error.response.data.message || "Failed to update profile"}`);
//       } else {
//         alert("Network error. Please check your connection and try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="w-full bg-white p-6">
//       <div className="w-full max-w-4xl bg-white p-6 rounded-lg h-[600px] overflow-y-auto">
//         <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>
        
//         {/* Profile Image at Top */}
//         <div className="flex justify-center mb-6">
//           <ProfileImageUpload 
//             currentImage={profileImage}
//             onImageChange={handleProfileImageChange}
//             onSaveImage={handleSaveProfileImage}
//             loading={loading}
//           />
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center mb-6">
//           <div
//             onClick={() => setActiveTab("basic")}
//             className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
//               activeTab === "basic"
//                 ? "text-[#facc14] border-b-2 border-[#facc14]"
//                 : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
//             }`}
//           >
//             Basic Info
//           </div>
//           <div
//             onClick={() => setActiveTab("contact")}
//             className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
//               activeTab === "contact"
//                 ? "text-[#facc14] border-b-2 border-[#facc14]"
//                 : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
//             }`}
//           >
//             Contact Info
//           </div>
//           <div
//             onClick={() => setActiveTab("professional")}
//             className={`cursor-pointer px-4 py-2 font-medium transition-colors duration-200 ${
//               activeTab === "professional"
//                 ? "text-[#facc14] border-b-2 border-[#facc14]"
//                 : "text-gray-400 hover:text-[#facc14] border-b-2 border-transparent"
//             }`}
//           >
//             Professional Info
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="space-y-4">
//           {activeTab === "basic" && (
//             <>
//               <div>
//                 <label className="block mb-1">Full Name*</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Client ID*</label>
//                 <input
//                   type="text"
//                   name="clientId"
//                   value={formData.clientId}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded bg-gray-100"
//                   required
//                   disabled
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Location*</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1">Date of Birth*</label>
//                 <input
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {activeTab === "contact" && (
//             <>
//               <div>
//                 <label className="block mb-1">Mobile Number*</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="whatsappUpdates"
//                     checked={formData.whatsappUpdates}
//                     onChange={handleChange}
//                     className="mr-2"
//                   />
//                   Get Updates on WhatsApp
//                 </label>
//               </div>

//               <div>
//                 <label className="block mb-1">Email ID*</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           {activeTab === "professional" && (
//             <>
//               <div>
//                 <label className="block mb-1">Aadhar Card Number*</label>
//                 <input
//                   type="text"
//                   name="aadharNumber"
//                   value={formData.aadharNumber}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//             </>
//           )}

//           <div className="flex justify-center mt-6 pt-4 border-t">
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="w-1/3 bg-[#facc14] text-black py-2 rounded disabled:opacity-50 hover:bg-[#e6b800] transition-colors font-medium"
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileTabs;





import React, { useState, useEffect, useRef } from "react";
import { userAPI } from "../../Clients-components/PropertyController";
import { 
  FaCamera, 
  FaUser, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaCalendar,
  FaIdCard,
  FaWhatsapp,
  FaSave,
  FaTimes,
  FaVenusMars,
  FaBriefcase,
  FaUserFriends,
  FaCheckCircle,
  FaArrowLeft,
  FaUpload
} from "react-icons/fa";

// Loading Overlay Component
const LoadingOverlay = ({ message = "Processing..." }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 font-medium">{message}</p>
    </div>
  </div>
);

// Profile Image Upload Component
const ProfileImageUpload = ({ currentImage, onImageChange, loading, onSaveImage }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(currentImage || null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setImagePreview(currentImage);
    setImageFile(null);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        setImagePreview(previewUrl);
        setImageFile(file);
        onImageChange(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    setIsUploading(true);
    try {
      const success = await onSaveImage(imageFile);
      if (success) {
        setImageFile(null);
      }
    } catch (error) {
      alert("Failed to save image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(currentImage);
    setImageFile(null);
    onImageChange(null, null);
  };

  return (
    <div className="relative group">
      <div className="relative">
        {/* Profile Image Container */}
        <div 
          onClick={() => !loading && !isUploading && fileInputRef.current?.click()}
          className={`w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
            loading || isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 hover:shadow-3xl'
          }`}
        >
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
              <FaUser className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* Upload Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <FaCamera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Uploading Indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
        
        {/* Camera Icon */}
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-full shadow-xl">
          <FaCamera className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={loading || isUploading}
      />

      {/* Image Actions */}
      {imageFile && !isUploading && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-64">
          <p className="text-sm font-medium text-gray-900 mb-3 text-center">New image selected</p>
          <div className="flex gap-2">
            <button
              onClick={handleSaveImage}
              className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaSave className="w-3 h-3" />
              Save
            </button>
            <button
              onClick={handleRemoveImage}
              className="flex-1 px-3 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimes className="w-3 h-3" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Input Field Component
const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  icon: Icon, 
  placeholder, 
  disabled = false,
  required = true 
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-blue-500" />}
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-gray-900 ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-blue-400'
        }`}
        required={required}
      />
      {Icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
    </div>
  </div>
);

// Select Field Component
const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  icon: Icon, 
  required = true 
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-blue-500" />}
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-white hover:border-blue-400 appearance-none text-gray-900"
        required={required}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {Icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// Checkbox Field Component
const CheckboxField = ({ label, name, checked, onChange, icon: Icon }) => (
  <div 
    onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
      checked 
        ? 'bg-green-50 border-green-200' 
        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }`}
  >
    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
      checked 
        ? 'bg-green-500 border-green-500' 
        : 'bg-white border-gray-300'
    }`}>
      {checked && <FaCheckCircle className="w-4 h-4 text-white" />}
    </div>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 text-green-500" />}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  </div>
);

// Tab Button Component
const TabButton = ({ label, isActive, onClick, icon: Icon, index }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
    }`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{label}</span>
    </div>
    <div className={`absolute -bottom-2 w-8 h-1 rounded-full transition-all duration-300 ${
      isActive ? 'bg-white' : 'bg-transparent'
    }`}></div>
    {isActive && (
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-xs font-bold text-blue-600">{index + 1}</span>
      </div>
    )}
  </button>
);

const ProfileTabs = ({ profile, onComplete }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    profession: "",
    clientId: "",
    guardianName: "",
    guardianContact: "",
    aadharNumber: "",
    whatsappUpdates: false,
  });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ];

  const professionOptions = [
    { value: "student", label: "Student" },
    { value: "professional", label: "Working Professional" },
    { value: "business", label: "Business Owner" },
    { value: "other", label: "Other" }
  ];

  const tabs = [
    { id: "basic", label: "Personal", icon: FaUser },
    { id: "contact", label: "Contact", icon: FaPhone },
    { id: "professional", label: "Professional", icon: FaBriefcase }
  ];

  // Initialize form data
  useEffect(() => {
    if (profile) {
      const normalizedGender = profile.gender
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase()
        : "";

      let formattedDob = "";
      if (profile.dob) {
        try {
          formattedDob = String(profile.dob).substring(0, 10);
        } catch (error) {
          console.error("Error parsing DOB:", error);
        }
      }

      if (profile.profileImage) {
        setProfileImage(profile.profileImage);
      }

      setFormData({
        name: profile.name || "",
        location: profile.location || "",
        phone: profile.phone || "",
        email: profile.email || "",
        gender: normalizedGender,
        dob: formattedDob,
        profession: profile.userType || "",
        clientId: profile.clientId || "",
        guardianName: profile.guardianName || "",
        guardianContact: profile.guardianContact || "",
        aadharNumber: profile.aadhar || "",
        whatsappUpdates: profile.whatsappUpdates || false,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleProfileImageChange = (file) => {
    if (file) {
      setProfileImageFile(file);
    } else {
      setProfileImage(profile?.profileImage);
      setProfileImageFile(null);
    }
  };

  const handleSaveProfileImage = async (file) => {
    if (!file) return false;

    try {
      const imageFormData = new FormData();
      imageFormData.append('profileImage', file);
      
      const response = await userAPI.uploadProfileImage(imageFormData);
      
      if (response.data && response.data.success) {
        const uploadedImageUrl = response.data.profileImage || response.data.user?.profileImage;
        
        if (uploadedImageUrl) {
          setProfileImage(uploadedImageUrl);
          return true;
        }
      }
      
      throw new Error("Failed to upload image");
    } catch (error) {
      alert("Failed to save image. Please try again.");
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      if (profileImageFile) {
        await handleSaveProfileImage(profileImageFile);
      }

      const payload = {
        name: formData.name,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender.toLowerCase(),
        dob: formData.dob ? new Date(formData.dob).toISOString() : "",
        userType: formData.profession,
        guardianName: formData.guardianName,
        guardianContact: formData.guardianContact,
        aadhar: formData.aadharNumber,
        whatsappUpdates: formData.whatsappUpdates,
      };

      const res = await userAPI.updateUser(payload);

      if (res.data && res.data.success) {
        const userRes = await userAPI.getUser();
        if (userRes.data?.user) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            if (onComplete) onComplete(userRes.data.user);
          }, 2000);
        }
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case "basic":
        return (
          <div className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={FaUser}
              placeholder="Enter your full name"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Client ID"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                icon={FaIdCard}
                placeholder="Your client ID"
                disabled
              />
              
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={genderOptions}
                icon={FaVenusMars}
              />
            </div>
            
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              icon={FaMapMarkerAlt}
              placeholder="Enter your location"
            />
            
            <InputField
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              icon={FaCalendar}
            />
          </div>
        );
        
      case "contact":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                icon={FaPhone}
                placeholder="Enter your mobile number"
              />
              
              <InputField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                icon={FaEnvelope}
                placeholder="Enter your email address"
              />
            </div>
            
            <CheckboxField
              label="Get Updates on WhatsApp"
              name="whatsappUpdates"
              checked={formData.whatsappUpdates}
              onChange={handleChange}
              icon={FaWhatsapp}
            />
            
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaPhone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Contact Preferences</h4>
                  <p className="text-sm text-blue-600">We'll send important updates via your preferred method. Make sure your contact details are up-to-date.</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "professional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Aadhar Card Number"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                icon={FaIdCard}
                placeholder="Enter 12-digit Aadhar number"
              />
              
              <SelectField
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                options={professionOptions}
                icon={FaBriefcase}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Guardian Name"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                icon={FaUserFriends}
                placeholder="Guardian's name"
                required={false}
              />
              
              <InputField
                label="Guardian Contact"
                name="guardianContact"
                value={formData.guardianContact}
                onChange={handleChange}
                type="tel"
                icon={FaPhone}
                placeholder="Guardian's contact number"
                required={false}
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {loading && <LoadingOverlay message="Saving your profile..." />}
      
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Profile Updated!</h3>
              <p className="text-gray-600">Your changes have been saved successfully.</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-2 mb-2 ">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => onComplete && onComplete(profile)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Edit Profile</h1>
              <p className="text-blue-100">Update your personal and professional information</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <ProfileImageUpload 
              currentImage={profileImage}
              onImageChange={handleProfileImageChange}
              onSaveImage={handleSaveProfileImage}
              loading={loading}
            />
            <p className="text-blue-100 mt-4 text-center max-w-md">
              Upload a clear profile photo. This will be visible to tenants and in your account.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl  p-8">
          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                  <TabButton
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    icon={tab.icon}
                    index={index}
                  />
                  {index < tabs.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(tabs.findIndex(t => t.id === activeTab) + 1) * (100 / tabs.length)}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === "basic" && "Personal Information"}
                {activeTab === "contact" && "Contact Details"}
                {activeTab === "professional" && "Professional Information"}
              </h2>
              <p className="text-gray-600">
                {activeTab === "basic" && "Update your basic personal details"}
                {activeTab === "contact" && "Manage your contact information and preferences"}
                {activeTab === "professional" && "Update your professional and verification details"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <p><span className="text-red-500">*</span> Indicates required fields</p>
              <p className="mt-1">All information is securely stored and encrypted</p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => onComplete && onComplete(profile)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium hover:shadow-lg"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                <FaSave className="w-5 h-5" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProfileTabs;