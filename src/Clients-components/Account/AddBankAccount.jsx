// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { propertyAPI } from '../PropertyController';

// const AddBankAccount = ({ propertyId, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [ifscDetails, setIfscDetails] = useState(null);
//   const [fetchingProperties, setFetchingProperties] = useState(true);
//   const [formData, setFormData] = useState({
//     propertyId: propertyId || '',
//     accountHolderName: '',
//     accountNumber: '',
//     ifscCode: '',
//     bankName: '',
//     branchName: '',
//     accountType: 'savings'
//   });

//   useEffect(() => {
//     fetchOwnerProperties();
//   }, []);

//   useEffect(() => {
//     if (formData.ifscCode.length === 11) {
//       fetchIfscDetails(formData.ifscCode);
//     } else {
//       setIfscDetails(null);
//     }
//   }, [formData.ifscCode]);

//  const fetchOwnerProperties = async () => {
//   try {
//     setFetchingProperties(true);
//     const response = await propertyAPI.getAllClientProperties();
    
//     console.log('Full API Response:', response);
    
//     // Try different possible response structures
//     let propertiesArray = null;
    
//     // Structure 1: response.data is the array directly
//     if (Array.isArray(response.data)) {
//       propertiesArray = response.data;
//       console.log('Structure 1: response.data is array');
//     }
//     // Structure 2: response.data.data is the array
//     else if (response.data && Array.isArray(response.data.data)) {
//       propertiesArray = response.data.data;
//       console.log('Structure 2: response.data.data is array');
//     }
//     // Structure 3: response is the array directly
//     else if (Array.isArray(response)) {
//       propertiesArray = response;
//       console.log('Structure 3: response is array directly');
//     }
//     // Structure 4: Check for your specific API structure
//     else if (response.data && response.data.success && Array.isArray(response.data.data)) {
//       propertiesArray = response.data.data;
//       console.log('Structure 4: success response with data array');
//     }
    
//     if (propertiesArray) {
//       console.log('Found properties array:', propertiesArray);
      
//       const propertyList = propertiesArray.map(item => {
//         // Handle different possible item structures
//         if (item.property) {
//           // Your provided structure: item has property object
//           return {
//             _id: item.property._id,
//             name: item.property.name,
//             locality: item.property.locality,
//             city: item.property.city,
//             status: item.property.status
//           };
//         } else if (item._id && item.name) {
//           // Direct property object structure
//           return {
//             _id: item._id,
//             name: item.name,
//             locality: item.locality || '',
//             city: item.city || '',
//             status: item.status || 'pending'
//           };
//         } else {
//           console.warn('Unknown item structure:', item);
//           return null;
//         }
//       }).filter(item => item !== null);
      
//       console.log('Processed property list:', propertyList);
      
//       const approvedProperties = propertyList.filter(property => 
//         property.status === 'approved'
//       );
      
//       console.log('Final approved properties:', approvedProperties);
//       setProperties(approvedProperties);
//     } else {
//       console.error('Could not find properties array in response:', response);
//       setProperties([]);
//     }
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     console.error('Error details:', error.response || error.message);
//     setProperties([]);
//   } finally {
//     setFetchingProperties(false);
//   }
// };

//   const fetchIfscDetails = async (ifsc) => {
//     try {
//       // Real IFSC API integration
//       const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
//       if (response.ok) {
//         const data = await response.json();
//         setIfscDetails({
//           bank: data.BANK || 'Bank details not found',
//           branch: data.BRANCH || 'Branch details not found',
//           city: data.CITY || 'City not found',
//           state: data.STATE || 'State not found'
//         });
        
//         // Auto-fill bank name and branch if available
//         if (data.BANK) {
//           setFormData(prev => ({
//             ...prev,
//             bankName: data.BANK,
//             branchName: data.BRANCH || prev.branchName
//           }));
//         }
//       } else {
//         setIfscDetails({
//           bank: 'Bank not found',
//           branch: 'Please check IFSC code',
//           city: '',
//           state: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching IFSC details:', error);
//       setIfscDetails({
//         bank: 'Error fetching details',
//         branch: 'Please verify manually',
//         city: '',
//         state: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.propertyId) newErrors.propertyId = 'Please select a property';
//     if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';
//     if (!formData.accountNumber.match(/^\d{9,18}$/)) newErrors.accountNumber = 'Account number must be 9-18 digits';
//     if (!formData.ifscCode.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) newErrors.ifscCode = 'Invalid IFSC code format';
//     if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
//     if (!formData.branchName.trim()) newErrors.branchName = 'Branch name is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       const response = await axios.post('/api/bank-accounts/add', {
//         propertyId: formData.propertyId,
//         bankDetails: formData
//       });

//       if (response.data.success) {
//         onSuccess(response.data.bankAccount);
//       }
//     } catch (error) {
//       console.error('Error adding bank account:', error);
//       setErrors({ 
//         submit: error.response?.data?.message || 'Failed to add bank account. Please try again.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'ifscCode') {
//       setFormData({
//         ...formData,
//         [name]: value.toUpperCase()
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   const handleAccountNumberChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     setFormData({
//       ...formData,
//       accountNumber: value
//     });
//   };

//   const getPropertyDisplayName = (property) => {
//     return `${property.name} - ${property.locality}, ${property.city}`;
//   };

//   if (fetchingProperties) {
//     return (
//       <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
//           <div className="flex justify-center items-center space-x-3">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             <span className="text-gray-600">Loading properties...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Add Bank Account
//           </h2>
//           <p className="text-gray-600 text-base sm:text-lg">
//             Link your bank account to receive payments for your property
//           </p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="text-gray-500 mb-4">
//               <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Properties</h3>
//             <p className="text-gray-600 mb-4">
//               You need to have at least one approved property to add a bank account.
//             </p>
//             <button 
//               onClick={onCancel}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Go Back
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Property Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                 Property Information
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Property <span className="text-red-500">*</span>
//                   </label>
//                   <select 
//                     id="propertyId"
//                     name="propertyId" 
//                     value={formData.propertyId} 
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.propertyId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     required
//                   >
//                     <option value="">Choose a property</option>
//                     {properties.map(property => (
//                       <option key={property._id} value={property._id}>
//                         {getPropertyDisplayName(property)}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.propertyId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.propertyId}</p>
//                   )}
                  
//                   {/* Property Count Info */}
//                   <div className="mt-2 text-sm text-gray-500">
//                     {properties.length} approved property{properties.length !== 1 ? 's' : ''} available
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bank Account Details Section */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                 Bank Account Details
//               </h3>
              
//               <div className="space-y-6">
//                 {/* Account Holder Name */}
//                 <div>
//                   <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
//                     Account Holder Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     name="accountHolderName"
//                     value={formData.accountHolderName}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.accountHolderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     placeholder="Enter account holder's name as per bank records"
//                     required
//                   />
//                   {errors.accountHolderName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
//                   )}
//                 </div>

//                 {/* Account Number */}
//                 <div>
//                   <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                     Account Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                     name="accountNumber"
//                     value={formData.accountNumber}
//                     onChange={handleAccountNumberChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.accountNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     placeholder="Enter your account number"
//                     maxLength="18"
//                     required
//                   />
//                   <p className="mt-1 text-xs text-gray-500">
//                     Must be 9-18 digits. No spaces or special characters.
//                   </p>
//                   {errors.accountNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
//                   )}
//                 </div>

//                 {/* IFSC Code with Tooltip */}
//                 <div className="relative">
//                   <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
//                     IFSC Code <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="ifscCode"
//                       name="ifscCode"
//                       value={formData.ifscCode}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.ifscCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="e.g., SBIN0000123"
//                       maxLength="11"
//                       required
//                     />
//                     {ifscDetails && (
//                       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
//                         <div className="space-y-1">
//                           <div className="font-semibold text-gray-900 text-sm">
//                             {ifscDetails.bank}
//                           </div>
//                           <div className="text-gray-600 text-xs">
//                             {ifscDetails.branch}, {ifscDetails.city}, {ifscDetails.state}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <p className="mt-1 text-xs text-gray-500">
//                     11-character code (e.g., SBIN0000123). We'll auto-fill bank details if available.
//                   </p>
//                   {errors.ifscCode && (
//                     <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
//                   )}
//                 </div>

//                 {/* Bank Name and Branch Name in Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Bank Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="bankName"
//                       name="bankName"
//                       value={formData.bankName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.bankName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter bank name"
//                       required
//                     />
//                     {errors.bankName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Branch Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="branchName"
//                       name="branchName"
//                       value={formData.branchName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.branchName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter branch name"
//                       required
//                     />
//                     {errors.branchName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Account Type Radio Buttons */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Account Type <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex flex-wrap gap-6">
//                     {['savings', 'current', 'salary'].map(type => (
//                       <label key={type} className="flex items-center space-x-3 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="accountType"
//                           value={type}
//                           checked={formData.accountType === type}
//                           onChange={handleChange}
//                           className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                         />
//                         <span className="text-sm font-medium text-gray-700 capitalize">
//                           {type} Account
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Security Notice */}
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
//               <div className="flex-shrink-0 text-green-500 text-lg">🔒</div>
//               <div>
//                 <div className="font-semibold text-green-800 text-sm">
//                   Your bank details are secure
//                 </div>
//                 <p className="text-green-700 text-xs mt-1">
//                   We use bank-level encryption and Razorpay's secure platform to protect your information. 
//                   Your bank details are only used for payment transfers to your account.
//                 </p>
//               </div>
//             </div>

//             {/* Error Banner */}
//             {errors.submit && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="text-red-800 text-sm font-medium">
//                   {errors.submit}
//                 </div>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
//               {onCancel && (
//                 <button 
//                   type="button" 
//                   onClick={onCancel}
//                   disabled={loading}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Adding Bank Account...</span>
//                   </>
//                 ) : (
//                   <span>Add Bank Account</span>
//                 )}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddBankAccount;





// import React, { useState, useEffect } from 'react';
// import { propertyAPI, bankAccountAPI } from '../PropertyController'; // Import the bankAccountAPI
// import ClientNav from '../Client-Navbar/ClientNav';

// const AddBankAccount = ({ propertyId, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [ifscDetails, setIfscDetails] = useState(null);
//   const [fetchingProperties, setFetchingProperties] = useState(true);
//   const [formData, setFormData] = useState({
//     propertyId: propertyId || '',
//     accountHolderName: '',
//     accountNumber: '',
//     ifscCode: '',
//     bankName: '',
//     branchName: '',
//     accountType: 'savings'
//   });

//   useEffect(() => {
//     fetchOwnerProperties();
//   }, []);

//   useEffect(() => {
//     if (formData.ifscCode.length === 11) {
//       fetchIfscDetails(formData.ifscCode);
//     } else {
//       setIfscDetails(null);
//     }
//   }, [formData.ifscCode]);

//   const fetchOwnerProperties = async () => {
//     try {
//       setFetchingProperties(true);
//       const response = await propertyAPI.getAllClientProperties();
      
//       console.log('Full API Response:', response);
      
//       // Try different possible response structures
//       let propertiesArray = null;
      
//       // Structure 1: response.data is the array directly
//       if (Array.isArray(response.data)) {
//         propertiesArray = response.data;
//         console.log('Structure 1: response.data is array');
//       }
//       // Structure 2: response.data.data is the array
//       else if (response.data && Array.isArray(response.data.data)) {
//         propertiesArray = response.data.data;
//         console.log('Structure 2: response.data.data is array');
//       }
//       // Structure 3: response is the array directly
//       else if (Array.isArray(response)) {
//         propertiesArray = response;
//         console.log('Structure 3: response is array directly');
//       }
//       // Structure 4: Check for your specific API structure
//       else if (response.data && response.data.success && Array.isArray(response.data.data)) {
//         propertiesArray = response.data.data;
//         console.log('Structure 4: success response with data array');
//       }
      
//       if (propertiesArray) {
//         console.log('Found properties array:', propertiesArray);
        
//         const propertyList = propertiesArray.map(item => {
//           // Handle different possible item structures
//           if (item.property) {
//             // Your provided structure: item has property object
//             return {
//               _id: item.property._id,
//               name: item.property.name,
//               locality: item.property.locality,
//               city: item.property.city,
//               status: item.property.status
//             };
//           } else if (item._id && item.name) {
//             // Direct property object structure
//             return {
//               _id: item._id,
//               name: item.name,
//               locality: item.locality || '',
//               city: item.city || '',
//               status: item.status || 'pending'
//             };
//           } else {
//             console.warn('Unknown item structure:', item);
//             return null;
//           }
//         }).filter(item => item !== null);
        
//         console.log('Processed property list:', propertyList);
        
//         const approvedProperties = propertyList.filter(property => 
//           property.status === 'approved'
//         );
        
//         console.log('Final approved properties:', approvedProperties);
//         setProperties(approvedProperties);
//       } else {
//         console.error('Could not find properties array in response:', response);
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//       console.error('Error details:', error.response || error.message);
//       setProperties([]);
//     } finally {
//       setFetchingProperties(false);
//     }
//   };

//   const fetchIfscDetails = async (ifsc) => {
//     try {
//       // Real IFSC API integration
//       const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
//       if (response.ok) {
//         const data = await response.json();
//         setIfscDetails({
//           bank: data.BANK || 'Bank details not found',
//           branch: data.BRANCH || 'Branch details not found',
//           city: data.CITY || 'City not found',
//           state: data.STATE || 'State not found'
//         });
        
//         // Auto-fill bank name and branch if available
//         if (data.BANK) {
//           setFormData(prev => ({
//             ...prev,
//             bankName: data.BANK,
//             branchName: data.BRANCH || prev.branchName
//           }));
//         }
//       } else {
//         setIfscDetails({
//           bank: 'Bank not found',
//           branch: 'Please check IFSC code',
//           city: '',
//           state: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching IFSC details:', error);
//       setIfscDetails({
//         bank: 'Error fetching details',
//         branch: 'Please verify manually',
//         city: '',
//         state: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     // Use the validation utility from bankAccountAPI
//     const validation = bankAccountAPI.validateBankAccount(formData);
    
//     const newErrors = {};
    
//     // Add property validation
//     if (!formData.propertyId) newErrors.propertyId = 'Please select a property';
    
//     // Add API validation errors
//     if (!validation.isValid) {
//       validation.errors.forEach(error => {
//         // Map validation errors to field names
//         if (error.includes('Account holder name')) newErrors.accountHolderName = error;
//         else if (error.includes('Account number')) newErrors.accountNumber = error;
//         else if (error.includes('IFSC code')) newErrors.ifscCode = error;
//         else if (error.includes('Bank name')) newErrors.bankName = error;
//         else if (error.includes('Branch name')) newErrors.branchName = error;
//       });
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       // Use the bankAccountAPI instead of direct axios call
//       const response = await bankAccountAPI.addBankAccount({
//         propertyId: formData.propertyId,
//         accountHolderName: formData.accountHolderName,
//         accountNumber: formData.accountNumber,
//         ifscCode: formData.ifscCode,
//         bankName: formData.bankName,
//         branchName: formData.branchName,
//         accountType: formData.accountType
//       });

//       if (response.data.success) {
//         onSuccess(response.data.bankAccount);
//       }
//     } catch (error) {
//       console.error('Error adding bank account:', error);
//       setErrors({ 
//         submit: error.message || 'Failed to add bank account. Please try again.' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'ifscCode') {
//       setFormData({
//         ...formData,
//         [name]: value.toUpperCase()
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   const handleAccountNumberChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     setFormData({
//       ...formData,
//       accountNumber: value
//     });
//   };

//   const getPropertyDisplayName = (property) => {
//     return `${property.name} - ${property.locality}, ${property.city}`;
//   };

//   // Format account number for display
//   const displayAccountNumber = bankAccountAPI.formatAccountNumber(formData.accountNumber);

//   if (fetchingProperties) {
//     return (
//         <>
//         <ClientNav />
//       <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
//           <div className="flex justify-center items-center space-x-3">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             <span className="text-gray-600">Loading properties...</span>
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   }

//   return (
//     <>
//     <ClientNav />
//     <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Add Bank Account
//           </h2>
//           <p className="text-gray-600 text-base sm:text-lg">
//             Link your bank account to receive payments for your property
//           </p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="text-center py-8">
//             <div className="text-gray-500 mb-4">
//               <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Properties</h3>
//             <p className="text-gray-600 mb-4">
//               You need to have at least one approved property to add a bank account.
//             </p>
//             <button 
//               onClick={onCancel}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Go Back
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Property Information Section */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                 Property Information
//               </h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Property <span className="text-red-500">*</span>
//                   </label>
//                   <select 
//                     id="propertyId"
//                     name="propertyId" 
//                     value={formData.propertyId} 
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.propertyId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     required
//                   >
//                     <option value="">Choose a property</option>
//                     {properties.map(property => (
//                       <option key={property._id} value={property._id}>
//                         {getPropertyDisplayName(property)}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.propertyId && (
//                     <p className="mt-1 text-sm text-red-600">{errors.propertyId}</p>
//                   )}
                  
//                   {/* Property Count Info */}
//                   <div className="mt-2 text-sm text-gray-500">
//                     {properties.length} approved property{properties.length !== 1 ? 's' : ''} available
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bank Account Details Section */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                 Bank Account Details
//               </h3>
              
//               <div className="space-y-6">
//                 {/* Account Holder Name */}
//                 <div>
//                   <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
//                     Account Holder Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountHolderName"
//                     name="accountHolderName"
//                     value={formData.accountHolderName}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.accountHolderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     placeholder="Enter account holder's name as per bank records"
//                     required
//                   />
//                   {errors.accountHolderName && (
//                     <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
//                   )}
//                 </div>

//                 {/* Account Number with formatted display */}
//                 <div>
//                   <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                     Account Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="accountNumber"
//                     name="accountNumber"
//                     value={formData.accountNumber}
//                     onChange={handleAccountNumberChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                       errors.accountNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                     }`}
//                     placeholder="Enter your account number"
//                     maxLength="18"
//                     required
//                   />
//                   {/* Display formatted account number preview */}
//                   {formData.accountNumber && (
//                     <div className="mt-2 text-xs text-gray-600">
//                       Preview: {displayAccountNumber}
//                     </div>
//                   )}
//                   <p className="mt-1 text-xs text-gray-500">
//                     Must be 9-18 digits. No spaces or special characters.
//                   </p>
//                   {errors.accountNumber && (
//                     <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
//                   )}
//                 </div>

//                 {/* IFSC Code with Tooltip */}
//                 <div className="relative">
//                   <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
//                     IFSC Code <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="ifscCode"
//                       name="ifscCode"
//                       value={formData.ifscCode}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.ifscCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="e.g., SBIN0000123"
//                       maxLength="11"
//                       required
//                     />
//                     {ifscDetails && (
//                       <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
//                         <div className="space-y-1">
//                           <div className="font-semibold text-gray-900 text-sm">
//                             {ifscDetails.bank}
//                           </div>
//                           <div className="text-gray-600 text-xs">
//                             {ifscDetails.branch}, {ifscDetails.city}, {ifscDetails.state}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <p className="mt-1 text-xs text-gray-500">
//                     11-character code (e.g., SBIN0000123). We'll auto-fill bank details if available.
//                   </p>
//                   {errors.ifscCode && (
//                     <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
//                   )}
//                 </div>

//                 {/* Bank Name and Branch Name in Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Bank Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="bankName"
//                       name="bankName"
//                       value={formData.bankName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.bankName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter bank name"
//                       required
//                     />
//                     {errors.bankName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Branch Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="branchName"
//                       name="branchName"
//                       value={formData.branchName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.branchName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter branch name"
//                       required
//                     />
//                     {errors.branchName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Account Type Radio Buttons */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Account Type <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex flex-wrap gap-6">
//                     {['savings', 'current', 'salary'].map(type => (
//                       <label key={type} className="flex items-center space-x-3 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="accountType"
//                           value={type}
//                           checked={formData.accountType === type}
//                           onChange={handleChange}
//                           className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                         />
//                         <span className="text-sm font-medium text-gray-700 capitalize">
//                           {type} Account
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Security Notice */}
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
//               <div className="flex-shrink-0 text-green-500 text-lg">🔒</div>
//               <div>
//                 <div className="font-semibold text-green-800 text-sm">
//                   Your bank details are secure
//                 </div>
//                 <p className="text-green-700 text-xs mt-1">
//                   We use bank-level encryption and Razorpay's secure platform to protect your information. 
//                   Your bank details are only used for payment transfers to your account.
//                 </p>
//               </div>
//             </div>

//             {/* Error Banner */}
//             {errors.submit && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="text-red-800 text-sm font-medium">
//                   {errors.submit}
//                 </div>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
//               {onCancel && (
//                 <button 
//                   type="button" 
//                   onClick={onCancel}
//                   disabled={loading}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Adding Bank Account...</span>
//                   </>
//                 ) : (
//                   <span>Add Bank Account</span>
//                 )}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default AddBankAccount;




// import React, { useState, useEffect } from 'react';
// import { propertyAPI, bankAccountAPI } from '../PropertyController';
// import ClientNav from '../Client-Navbar/ClientNav';

// const AddBankAccount = ({ propertyId, onSuccess, onCancel }) => {
//   const [loading, setLoading] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [ifscDetails, setIfscDetails] = useState(null);
//   const [fetchingProperties, setFetchingProperties] = useState(true);
//   const [formData, setFormData] = useState({
//     propertyId: propertyId || '',
//     accountHolderName: '',
//     accountNumber: '',
//     ifscCode: '',
//     bankName: '',
//     branchName: '',
//     accountType: 'savings'
//   });

//   useEffect(() => {
//     fetchOwnerProperties();
//   }, []);

//   useEffect(() => {
//     if (formData.ifscCode.length === 11) {
//       fetchIfscDetails(formData.ifscCode);
//     } else {
//       setIfscDetails(null);
//     }
//   }, [formData.ifscCode]);

//   const fetchOwnerProperties = async () => {
//     try {
//       setFetchingProperties(true);
//       const response = await propertyAPI.getAllClientProperties();
      
//       console.log('Full API Response:', response);
      
//       let propertiesArray = [];
      
//       if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         propertiesArray = response.data.data;
//       } else if (Array.isArray(response.data)) {
//         propertiesArray = response.data;
//       } else if (Array.isArray(response)) {
//         propertiesArray = response;
//       }
      
//       console.log('Extracted properties array:', propertiesArray);
      
//       if (propertiesArray.length > 0) {
//         const propertyList = propertiesArray.map(item => {
//           if (item.property && item.property._id) {
//             return {
//               _id: item.property._id,
//               name: item.property.name,
//               locality: item.property.locality,
//               city: item.property.city,
//               status: item.property.status
//             };
//           } else if (item._id && item.name) {
//             return {
//               _id: item._id,
//               name: item.name,
//               locality: item.locality || '',
//               city: item.city || '',
//               status: item.status || 'pending'
//             };
//           }
//           return null;
//         }).filter(item => item !== null);
        
//         console.log('Processed property list:', propertyList);
        
//         const approvedProperties = propertyList.filter(property => 
//           property.status === 'approved' || property.status === 'active'
//         );
        
//         console.log('Approved properties:', approvedProperties);
//         setProperties(approvedProperties);
//       } else {
//         console.warn('No properties found in response');
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//       setProperties([]);
//     } finally {
//       setFetchingProperties(false);
//     }
//   };

//   const fetchIfscDetails = async (ifsc) => {
//     try {
//       const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
//       if (response.ok) {
//         const data = await response.json();
//         setIfscDetails({
//           bank: data.BANK || 'Bank details not found',
//           branch: data.BRANCH || 'Branch details not found',
//           city: data.CITY || 'City not found',
//           state: data.STATE || 'State not found'
//         });
        
//         if (data.BANK) {
//           setFormData(prev => ({
//             ...prev,
//             bankName: data.BANK,
//             branchName: data.BRANCH || prev.branchName
//           }));
//         }
//       } else {
//         setIfscDetails({
//           bank: 'Bank not found',
//           branch: 'Please check IFSC code',
//           city: '',
//           state: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching IFSC details:', error);
//       setIfscDetails({
//         bank: 'Error fetching details',
//         branch: 'Please verify manually',
//         city: '',
//         state: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const validation = bankAccountAPI.validateBankAccount(formData);
    
//     const newErrors = {};
    
//     if (!formData.propertyId) newErrors.propertyId = 'Please select a property';
    
//     if (!validation.isValid) {
//       validation.errors.forEach(error => {
//         if (error.includes('Account holder name')) newErrors.accountHolderName = error;
//         else if (error.includes('Account number')) newErrors.accountNumber = error;
//         else if (error.includes('IFSC code')) newErrors.ifscCode = error;
//         else if (error.includes('Bank name')) newErrors.bankName = error;
//         else if (error.includes('Branch name')) newErrors.branchName = error;
//       });
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!validateForm()) return;

//   setLoading(true);
//   setErrors({});

//   try {
//     console.log('Form data:', formData);

//     const selectedPropertyId = formData.propertyId || (properties.length > 0 ? properties[0]._id : null);
    
//     if (!selectedPropertyId) {
//       throw new Error('No property selected');
//     }

//     // Test payload - try different structures
//     const payload = {
//       propertyId: selectedPropertyId,
//       bankDetails: {
//         accountHolderName: formData.accountHolderName,
//         accountNumber: formData.accountNumber,
//         ifscCode: formData.ifscCode,
//         bankName: formData.bankName,
//         branchName: formData.branchName,
//         accountType: formData.accountType
//       }
//     };

//     console.log('Sending payload:', payload);

//     // Use direct API call instead of bankAccountAPI to test
//     const response = await bankAccountAPI.addBankAccount({
//       propertyId: selectedPropertyId,
//       accountHolderName: formData.accountHolderName,
//         accountNumber: formData.accountNumber,
//         ifscCode: formData.ifscCode,
//         bankName: formData.bankName,
//         branchName: formData.branchName,
//         accountType: formData.accountType
//     });

//     console.log('API response:', response);

//     if (response.data.success) {
//       onSuccess(response.data.bankAccount);
//     }
//   } catch (error) {
//     console.error('Error adding bank account:', error);
//     setErrors({ 
//       submit: error.message || 'Failed to add bank account. Please try again.' 
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'ifscCode') {
//       setFormData({
//         ...formData,
//         [name]: value.toUpperCase()
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }

//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

//   const handleAccountNumberChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '');
//     setFormData({
//       ...formData,
//       accountNumber: value
//     });
//   };

//   const getPropertyDisplayName = (property) => {
//     return `${property.name} - ${property.locality}, ${property.city}`;
//   };

//   const displayAccountNumber = bankAccountAPI.formatAccountNumber(formData.accountNumber);

//   if (fetchingProperties) {
//     return (
//       <>
//         <ClientNav />
//         <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
//             <div className="flex justify-center items-center space-x-3">
//               <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-gray-600">Loading properties...</span>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
//       <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
//           {/* Debug Section */}
//           {properties.length > 0 && (
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//               <h4 className="font-semibold text-yellow-800">Debug: Available Properties</h4>
//               <div className="text-xs text-yellow-700 mt-2">
//                 {properties.map(prop => (
//                   <div key={prop._id}>
//                     ID: {prop._id} | Name: {prop.name} | Status: {prop.status}
//                   </div>
//                 ))}
//               </div>
//               <div className="text-xs text-yellow-600 mt-2">
//                 Selected Property ID: {formData.propertyId}
//               </div>
//             </div>
//           )}

//           <div className="text-center mb-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//               Add Bank Account
//             </h2>
//             <p className="text-gray-600 text-base sm:text-lg">
//               Link your bank account to receive payments for your property
//             </p>
//           </div>

//           {properties.length === 0 ? (
//             <div className="text-center py-8">
//               <div className="text-gray-500 mb-4">
//                 <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Properties</h3>
//               <p className="text-gray-600 mb-4">
//                 You need to have at least one approved property to add a bank account.
//               </p>
//               <button 
//                 onClick={onCancel}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Go Back
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Property Information Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                   Property Information
//                 </h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
//                       Select Property <span className="text-red-500">*</span>
//                     </label>
//                     <select 
//                       id="propertyId"
//                       name="propertyId" 
//                       value={formData.propertyId} 
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.propertyId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       required
//                     >
//                       <option value="">Choose a property</option>
//                       {properties.map(property => (
//                         <option key={property._id} value={property._id}>
//                           {getPropertyDisplayName(property)}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.propertyId && (
//                       <p className="mt-1 text-sm text-red-600">{errors.propertyId}</p>
//                     )}
                    
//                     <div className="mt-2 text-sm text-gray-500">
//                       {properties.length} approved property{properties.length !== 1 ? 's' : ''} available
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Bank Account Details Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
//                   Bank Account Details
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Account Holder Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="accountHolderName"
//                       name="accountHolderName"
//                       value={formData.accountHolderName}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.accountHolderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter account holder's name as per bank records"
//                       required
//                     />
//                     {errors.accountHolderName && (
//                       <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                       Account Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       id="accountNumber"
//                       name="accountNumber"
//                       value={formData.accountNumber}
//                       onChange={handleAccountNumberChange}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                         errors.accountNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                       }`}
//                       placeholder="Enter your account number"
//                       maxLength="18"
//                       required
//                     />
//                     {formData.accountNumber && (
//                       <div className="mt-2 text-xs text-gray-600">
//                         Preview: {displayAccountNumber}
//                       </div>
//                     )}
//                     <p className="mt-1 text-xs text-gray-500">
//                       Must be 9-18 digits. No spaces or special characters.
//                     </p>
//                     {errors.accountNumber && (
//                       <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
//                     )}
//                   </div>

//                   <div className="relative">
//                     <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
//                       IFSC Code <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="ifscCode"
//                         name="ifscCode"
//                         value={formData.ifscCode}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                           errors.ifscCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                         }`}
//                         placeholder="e.g., SBIN0000123"
//                         maxLength="11"
//                         required
//                       />
//                       {ifscDetails && (
//                         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
//                           <div className="space-y-1">
//                             <div className="font-semibold text-gray-900 text-sm">
//                               {ifscDetails.bank}
//                             </div>
//                             <div className="text-gray-600 text-xs">
//                               {ifscDetails.branch}, {ifscDetails.city}, {ifscDetails.state}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       11-character code (e.g., SBIN0000123). We'll auto-fill bank details if available.
//                     </p>
//                     {errors.ifscCode && (
//                       <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="bankName"
//                         name="bankName"
//                         value={formData.bankName}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                           errors.bankName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                         }`}
//                         placeholder="Enter bank name"
//                         required
//                       />
//                       {errors.bankName && (
//                         <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
//                         Branch Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="branchName"
//                         name="branchName"
//                         value={formData.branchName}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
//                           errors.branchName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
//                         }`}
//                         placeholder="Enter branch name"
//                         required
//                       />
//                       {errors.branchName && (
//                         <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       Account Type <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex flex-wrap gap-6">
//                       {['savings', 'current', 'salary'].map(type => (
//                         <label key={type} className="flex items-center space-x-3 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="accountType"
//                             value={type}
//                             checked={formData.accountType === type}
//                             onChange={handleChange}
//                             className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                           />
//                           <span className="text-sm font-medium text-gray-700 capitalize">
//                             {type} Account
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
//                 <div className="flex-shrink-0 text-green-500 text-lg">🔒</div>
//                 <div>
//                   <div className="font-semibold text-green-800 text-sm">
//                     Your bank details are secure
//                   </div>
//                   <p className="text-green-700 text-xs mt-1">
//                     We use bank-level encryption and Razorpay's secure platform to protect your information. 
//                     Your bank details are only used for payment transfers to your account.
//                   </p>
//                 </div>
//               </div>

//               {errors.submit && (
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                   <div className="text-red-800 text-sm font-medium">
//                     {errors.submit}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
//                 {onCancel && (
//                   <button 
//                     type="button" 
//                     onClick={onCancel}
//                     disabled={loading}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Cancel
//                   </button>
//                 )}
//                 <button 
//                   type="submit" 
//                   disabled={loading}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Adding Bank Account...</span>
//                     </>
//                   ) : (
//                     <span>Add Bank Account</span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBankAccount;


import React, { useState, useEffect } from 'react';
import { propertyAPI, bankAccountAPI } from '../PropertyController';
 import ClientNav from '../Client-Navbar/ClientNav';

const AddBankAccount = ({ propertyId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState({});
  const [ifscDetails, setIfscDetails] = useState(null);
  const [fetchingProperties, setFetchingProperties] = useState(true);
  const [formData, setFormData] = useState({
    propertyId: propertyId || '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: 'savings'
  });

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  useEffect(() => {
    if (formData.ifscCode.length === 11) {
      fetchIfscDetails(formData.ifscCode);
    } else {
      setIfscDetails(null);
    }
  }, [formData.ifscCode]);

  const fetchOwnerProperties = async () => {
    try {
      setFetchingProperties(true);
      const response = await propertyAPI.getProperty();
      
      let propertiesArray = [];
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        propertiesArray = response.data.data;
      } else if (Array.isArray(response.data)) {
        propertiesArray = response.data;
      } else if (Array.isArray(response)) {
        propertiesArray = response;
      }
      
      if (propertiesArray.length > 0) {
        const propertyList = propertiesArray.map(item => {
          if (item.property && item.property._id) {
            return {
              _id: item.property._id,
              name: item.property.name,
              locality: item.property.locality,
              city: item.property.city,
              status: item.property.status
            };
          } else if (item._id && item.name) {
            return {
              _id: item._id,
              name: item.name,
              locality: item.locality || '',
              city: item.city || '',
              status: item.status || 'pending'
            };
          }
          return null;
        }).filter(item => item !== null);
        
        const approvedProperties = propertyList.filter(property => 
          property.status === 'approved' || property.status === 'active'
        );
        
        setProperties(approvedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setFetchingProperties(false);
    }
  };

  const fetchIfscDetails = async (ifsc) => {
    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (response.ok) {
        const data = await response.json();
        setIfscDetails({
          bank: data.BANK || 'Bank details not found',
          branch: data.BRANCH || 'Branch details not found',
          city: data.CITY || 'City not found',
          state: data.STATE || 'State not found'
        });
        
        if (data.BANK) {
          setFormData(prev => ({
            ...prev,
            bankName: data.BANK,
            branchName: data.BRANCH || prev.branchName
          }));
        }
      } else {
        setIfscDetails({
          bank: 'Bank not found',
          branch: 'Please check IFSC code',
          city: '',
          state: ''
        });
      }
    } catch (error) {
      console.error('Error fetching IFSC details:', error);
      setIfscDetails({
        bank: 'Error fetching details',
        branch: 'Please verify manually',
        city: '',
        state: ''
      });
    }
  };

  const validateForm = () => {
    const validation = bankAccountAPI.validateBankAccount(formData);
    
    const newErrors = {};
    
    if (!formData.propertyId) newErrors.propertyId = 'Please select a property';
    
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        if (error.includes('Account holder name')) newErrors.accountHolderName = error;
        else if (error.includes('Account number')) newErrors.accountNumber = error;
        else if (error.includes('IFSC code')) newErrors.ifscCode = error;
        else if (error.includes('Bank name')) newErrors.bankName = error;
        else if (error.includes('Branch name')) newErrors.branchName = error;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const selectedPropertyId = formData.propertyId || (properties.length > 0 ? properties[0]._id : null);
      
      if (!selectedPropertyId) {
        throw new Error('No property selected');
      }

      const response = await bankAccountAPI.addBankAccount({
        propertyId: selectedPropertyId,
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
        branchName: formData.branchName,
        accountType: formData.accountType
      });

      console.log('API response:', response);

      if (response.data.success) {
        // Check if onSuccess is a function before calling it
        if (typeof onSuccess === 'function') {
          onSuccess(response.data.bankAccount);
        } else {
          // If no onSuccess callback, show success message and reset form
          alert('Bank account added successfully!');
          setFormData({
            propertyId: propertyId || '',
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            bankName: '',
            branchName: '',
            accountType: 'savings'
          });
        }
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      setErrors({ 
        submit: error.message || 'Failed to add bank account. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'ifscCode') {
      setFormData({
        ...formData,
        [name]: value.toUpperCase()
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      accountNumber: value
    });
  };

  const getPropertyDisplayName = (property) => {
    return `${property.name} - ${property.locality}, ${property.city}`;
  };

  const displayAccountNumber = bankAccountAPI.formatAccountNumber(formData.accountNumber);

  if (fetchingProperties) {
    return (
      <>
        <ClientNav />
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className=" rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading properties...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Add Bank Account
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Link your bank account to receive payments for your property
            </p>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Approved Properties</h3>
              <p className="text-gray-600 mb-4">
                You need to have at least one approved property to add a bank account.
              </p>
              <button 
                onClick={onCancel}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Property Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Property <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="propertyId"
                      name="propertyId" 
                      value={formData.propertyId} 
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                        errors.propertyId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      required
                    >
                      <option value="">Choose a property</option>
                      {properties.map(property => (
                        <option key={property._id} value={property._id}>
                          {getPropertyDisplayName(property)}
                        </option>
                      ))}
                    </select>
                    {errors.propertyId && (
                      <p className="mt-1 text-sm text-red-600">{errors.propertyId}</p>
                    )}
                    
                    <div className="mt-2 text-sm text-gray-500">
                      {properties.length} approved property{properties.length !== 1 ? 's' : ''} available
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Account Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Bank Account Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">
                      Account Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountHolderName"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                        errors.accountHolderName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Enter account holder's name as per bank records"
                      required
                    />
                    {errors.accountHolderName && (
                      <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleAccountNumberChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                        errors.accountNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      }`}
                      placeholder="Enter your account number"
                      maxLength="18"
                      required
                    />
                    {formData.accountNumber && (
                      <div className="mt-2 text-xs text-gray-600">
                        Preview: {displayAccountNumber}
                      </div>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Must be 9-18 digits. No spaces or special characters.
                    </p>
                    {errors.accountNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                          errors.ifscCode ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                        placeholder="e.g., SBIN0000123"
                        maxLength="11"
                        required
                      />
                      {ifscDetails && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900 text-sm">
                              {ifscDetails.bank}
                            </div>
                            <div className="text-gray-600 text-xs">
                              {ifscDetails.branch}, {ifscDetails.city}, {ifscDetails.state}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      11-character code (e.g., SBIN0000123). We'll auto-fill bank details if available.
                    </p>
                    {errors.ifscCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                          errors.bankName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                        placeholder="Enter bank name"
                        required
                      />
                      {errors.bankName && (
                        <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
                        Branch Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 transition-colors ${
                          errors.branchName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                        placeholder="Enter branch name"
                        required
                      />
                      {errors.branchName && (
                        <p className="mt-1 text-sm text-red-600">{errors.branchName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Account Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {['savings', 'current', 'salary'].map(type => (
                        <label key={type} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="accountType"
                            value={type}
                            checked={formData.accountType === type}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {type} Account
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <div className="flex-shrink-0 text-green-500 text-lg">🔒</div>
                <div>
                  <div className="font-semibold text-green-800 text-sm">
                    Your bank details are secure
                  </div>
                  <p className="text-green-700 text-xs mt-1">
                    We use bank-level encryption and Razorpay's secure platform to protect your information. 
                    Your bank details are only used for payment transfers to your account.
                  </p>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-800 text-sm font-medium">
                    {errors.submit}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={onCancel}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Bank Account...</span>
                    </>
                  ) : (
                    <span>Add Bank Account</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddBankAccount;