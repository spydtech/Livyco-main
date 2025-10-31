// import { useState } from "react";
// import { ArrowLeft } from 'lucide-react';
// import bgimage from '../../assets/user/pgsearch/image (5).png'; // Adjust the path as necessary
// import Header from "../Header";
// import { useNavigate } from "react-router-dom";

// export default function AddProof() {
//     const [select, setselect] = useState("self");
//     const [numb, setnumb] = useState(0);
//     const [selectedGender, setSelectedGender] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [agree, setAgree] = useState(false);
//     const navigate = useNavigate();

//     const handleleftclick = () => setnumb((prev) => prev - 1);
//     const handlerightclick = () => setnumb((prev) => prev + 1);

//     const isMobileValid = mobile.length === 10;

//     return (
//         <>
//         <Header />
//         <div 
//             className="w-full min-h-screen bg-cover bg-no-repeat bg-center py-[5%]"
//             style={{ backgroundImage: `url('${bgimage}')` }}
//         >
//             {/* Header */}
//             <div className="bg-[#FFDC82] flex items-center p-1 ">
//                 <button className="flex items-center gap-2 px-4 py-2 rounded">
//                     <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                     Label
//                 </button>
//             </div>

//             {/* Centered Form */}
//             <div className="flex justify-center items-start py-10 px-10">
//                 <div className="w-1/3 bg-white px-5 rounded-lg shadow-md flex flex-col gap-3 py-3">

//                     {/* Self / Others Buttons */}
//                     <div className="flex gap-6 justify-center">
//                         <button
//                             onClick={() => setselect("self")}
//                             className={`px-4 py-3 w-2/5 border border-black rounded-md text-sm sm:text-base ${select === "self" ? "bg-[#0827B2] text-white" : "bg-white text-black"}`}
//                         >
//                             Self
//                         </button>
//                         <button
//                             onClick={() => setselect("others")}
//                             className={`px-4 py-3 w-2/5 border border-black rounded-md text-sm sm:text-base ${select === "others" ? "bg-[#0827B2] text-white" : "bg-white text-black"}`}
//                         >
//                             Others
//                         </button>
//                     </div>

//                     {/* Counter */}
//                     <div className="flex justify-between items-center w-full px-6">
//                         <button
//                             className={`text-xl -rotate-90 ${numb <= 0 ? 'text-gray-400' : 'text-black'}`}
//                             onClick={handleleftclick}
//                             disabled={numb <= 0}
//                         >
//                             ▲
//                         </button>
//                         <div className="bg-[#FFDC82] flex justify-center items-center text-black w-7 h-7 rounded-full font-semibold">
//                             {numb}
//                         </div>
//                         <button
//                             className={`text-xl rotate-90 ${numb >= 3 ? 'text-gray-400' : 'text-black'}`}
//                             onClick={handlerightclick}
//                             disabled={numb >= 3}
//                         >
//                             ▲
//                         </button>
//                     </div>

//                     {/* Name / Age / Gender */}
//                     <div className="px-4 flex flex-col gap-2">
//                         <label className="text-gray-700">Name</label>
//                         <div className="flex flex-wrap gap-2">
//                             <input type="text" placeholder="Enter name" className="flex-1 border border-gray-300 rounded-md px-4 py-2 min-w-[150px]" />
//                             <input type="text" placeholder="Age" className="w-20 border border-gray-300 rounded-md px-3 py-2" />
//                             <div className="flex flex-col items-center">
//                                 <div className="text-sm mb-1">Gender</div>
//                                 <div className="flex gap-1">
//                                     <button
//                                         onClick={() => setSelectedGender("male")}
//                                         className={`border rounded-md p-1 transition ${selectedGender === "male" ? "bg-[#0827B2] text-white shadow-md" : "bg-white"}`}
//                                     >
//                                         <img
//                                             src="/src/assets/images/male.png"
//                                             alt="Male"
//                                             className={`w-6 h-6 transition duration-200 ${selectedGender === "male" ? "invert brightness-0" : ""}`}
//                                         />
//                                     </button>
//                                     <button
//                                         onClick={() => setSelectedGender("female")}
//                                         className={`border rounded-md p-1 transition ${selectedGender === "female" ? "bg-[#0827B2] text-white shadow-md" : "bg-white"}`}
//                                     >
//                                         <img
//                                             src="/src/assets/images/female.png"
//                                             alt="Female"
//                                             className={`w-6 h-6 transition duration-200 ${selectedGender === "female" ? "invert brightness-0" : ""}`}
//                                         />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Mobile */}
//                     <div className="px-4 flex flex-col gap-1 relative">
//                         <label className="text-gray-700">Mobile Number*</label>
//                         <input
//                             type="text"
//                             maxLength={10}
//                             value={mobile}
//                             onChange={(e) => {
//                                 setMobile(e.target.value.replace(/\D/g, ""));
//                             }}
//                             className={`border px-4 py-2 w-full rounded-md focus:outline-none`}
//                         />
//                         {!isMobileValid && mobile.length > 0 && (
//                             <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number</p>
//                         )}
//                     </div>

//                     {/* Email */}
//                     <div className="px-4 flex flex-col gap-1">
//                         <label className="text-gray-700">Email</label>
//                         <input type="email" placeholder="Enter E-mail" className="border border-gray-300 rounded-md px-4 py-2 w-full" />
//                     </div>

//                     {/* ID Proof */}
//                     <div className="px-4 flex flex-col gap-2">
//                         <label className="text-gray-700">ID Proof</label>
//                         <div className="flex flex-col sm:flex-row gap-2">
//                             <select className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 w-full cursor-pointer" defaultValue="">
//                                 <option value="" disabled>Select id proof</option>
//                                 <option value="aadhar">Aadhar Card</option>
//                                 <option value="pan">PAN Card</option>
//                                 <option value="passport">Passport</option>
//                                 <option value="voter">Voter ID</option>
//                                 <option value="license">Driving License</option>
//                             </select>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <label className="text-gray-700">ID Proof Upload</label>
//                             <div className="flex flex-col sm:flex-row w-full relative">
//                                 <div className="relative w-full sm:w-2/3">
//                                     <input type="file" id="fileInput" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" />
//                                     <div className="border border-gray-300 cursor-pointer rounded-l-md px-4 py-2 text-sm text-gray-700 h-full flex items-center">
//                                         Click here to upload ID
//                                     </div>
//                                 </div>
//                                 <button className="bg-[#0827B2] text-white px-6 py-2 rounded-r-md w-full sm:w-1/3 z-0">
//                                     Upload
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Purpose */}
//                     <div className="px-4 flex flex-col gap-1">
//                         <label className="text-gray-700">Purpose of visit</label>
//                         <input type="text" className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Enter Purpose Of Visit" />
//                     </div>

//                     {/* Checkbox */}
//                     <div className="px-4 flex items-center justify-center gap-2">
//                         <input
//                             type="checkbox"
//                             className="w-4 h-4 text-blue-600 border-gray-300 rounded"
//                             checked={agree}
//                             onChange={(e) => setAgree(e.target.checked)}
//                         />
//                         <label className="text-sm text-gray-700">
//                             Save details for future use
//                         </label>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="px-4">
//                         <button
//                         // navigate
//                         onClick={() => navigate('/user/pay-to-cart')}
//                             disabled={!isMobileValid || !agree}
//                             className={`w-full py-3 rounded-md text-white transition ${
//                                 isMobileValid && agree
//                                     ? "bg-[#0827B2]"
//                                     : "bg-gray-400 cursor-not-allowed"
//                             }`}
//                         >
//                             ADD NOW
//                         </button>
//                     </div>

//                     {/* Note */}
//                     <div className="px-4 text-center text-sm text-gray-600">
//                         ID is mandatory during check-in
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }


// import React, { useState } from "react";
// import { ArrowLeft } from 'lucide-react';
// import bgimage from '../../assets/user/pgsearch/image (5).png';
// import Header from "../Header";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function AddProof() {
//     const [select, setSelect] = useState("self");
//     const [personCount, setPersonCount] = useState(1);
//     const [customers, setCustomers] = useState([{
//         name: "",
//         age: "",
//         gender: "",
//         idProofType: "",
//         idProofNumber: "",
//         idProofFile: null
//     }]);
//     const [mobile, setMobile] = useState("");
//     const [email, setEmail] = useState("");
//     const [purpose, setPurpose] = useState("");
//     const [agree, setAgree] = useState(false);
//     const [loading, setLoading] = useState(false);
    
//     const navigate = useNavigate();
//     const location = useLocation();
//     const bookingData = location.state;

//     const handlePersonChange = (newCount) => {
//         if (newCount < 1 || newCount > 4) return;
        
//         setPersonCount(newCount);
        
//         // Initialize customer data based on count
//         if (newCount > customers.length) {
//             const newCustomers = [...customers];
//             for (let i = customers.length; i < newCount; i++) {
//                 newCustomers.push({
//                     name: "",
//                     age: "",
//                     gender: "",
//                     idProofType: "",
//                     idProofNumber: "",
//                     idProofFile: null
//                 });
//             }
//             setCustomers(newCustomers);
//         } else {
//             setCustomers(customers.slice(0, newCount));
//         }
//     };

//     const handleCustomerChange = (index, field, value) => {
//         const updatedCustomers = [...customers];
//         updatedCustomers[index][field] = value;
//         setCustomers(updatedCustomers);
//     };

//     const handleIdProofUpload = (index, file) => {
//         if (file && file.size > 5 * 1024 * 1024) {
//             alert("File size should be less than 5MB");
//             return;
//         }
        
//         const updatedCustomers = [...customers];
//         updatedCustomers[index].idProofFile = file;
//         setCustomers(updatedCustomers);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!isMobileValid) {
//             alert("Please enter a valid 10-digit mobile number");
//             return;
//         }
        
//         if (!agree) {
//             alert("Please agree to save details for future use");
//             return;
//         }
        
//         // Validate all customer fields
//         for (let i = 0; i < customers.length; i++) {
//             const customer = customers[i];
//             if (!customer.name || !customer.age || !customer.gender) {
//                 alert(`Please fill all details for person ${i + 1}`);
//                 return;
//             }
            
//             if (customer.idProofType && !customer.idProofNumber) {
//                 alert(`Please enter ID proof number for ${customer.name}`);
//                 return;
//             }
//         }
        
//         setLoading(true);
        
//         try {
//             // Prepare booking data
//             const bookingRequest = {
//                 propertyId: bookingData._id,
//                 roomType: bookingData.selectedRoomType,
//                 selectedRooms: bookingData.selectedRooms,
//                 moveInDate: bookingData.selectedDate,
//                 personCount: bookingData.personCount,
//                 customerDetails: {
//                     primary: {
//                         name: customers[0]?.name || "",
//                         age: customers[0]?.age || "",
//                         gender: customers[0]?.gender || "",
//                         mobile: mobile,
//                         email: email,
//                         idProofType: customers[0]?.idProofType || "",
//                         idProofNumber: customers[0]?.idProofNumber || "",
//                         purpose: purpose
//                     },
//                     additional: customers.slice(1),
//                     saveForFuture: agree
//                 }
//             };
            
//             // Create booking (pending payment)
//             const response = await fetch("http://localhost:5000/api/auth/bookings", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 },
//                 body: JSON.stringify(bookingRequest)
//             });
            
//             const result = await response.json();
            
//             if (result.success) {
//                 // Navigate to payment page with booking details
//                 navigate("/user/pay-to-cart", { 
//                     state: { 
//                         booking: result.booking,
//                         advanceAmount: result.booking.pricing.securityDeposit,
//                         rent: result.booking.pricing.monthlyRent
//                     } 
//                 });
//             } else {
//                 alert("Failed to create booking: " + result.message);
//             }
//         } catch (error) {
//             console.error("Booking creation error:", error);
//             alert("An error occurred while creating your booking");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const isMobileValid = mobile.length === 10;

//     return (
//         <>
//             <Header />
//             <div 
//                 className="w-full min-h-screen bg-cover bg-no-repeat bg-center py-[5%]"
//                 style={{ backgroundImage: `url('${bgimage}')` }}
//             >
//                 {/* Header */}
//                 <div className="bg-[#FFDC82] flex items-center p-1 ">
//                     <button 
//                         className="flex items-center gap-2 px-4 py-2 rounded"
//                         onClick={() => navigate(-1)}
//                     >
//                         <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                         Back to Room Selection
//                     </button>
//                 </div>

//                 {/* Centered Form */}
//                 <div className="flex justify-center items-start py-10 px-4">
//                     <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/2 bg-white px-5 rounded-lg shadow-md flex flex-col gap-4 py-4">
//                         <h2 className="text-xl font-bold text-center text-gray-800">Customer Details</h2>

//                         {/* Self / Others Buttons */}
//                         <div className="flex gap-4 justify-center">
//                             <button
//                                 type="button"
//                                 onClick={() => setSelect("self")}
//                                 className={`px-4 py-2 w-1/3 border rounded-md text-sm ${select === "self" ? "bg-[#0827B2] text-white" : "bg-white text-black border-gray-300"}`}
//                             >
//                                 Self
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setSelect("others")}
//                                 className={`px-4 py-2 w-1/3 border rounded-md text-sm ${select === "others" ? "bg-[#0827B2] text-white" : "bg-white text-black border-gray-300"}`}
//                             >
//                                 Others
//                             </button>
//                         </div>

//                         {/* Person Counter */}
//                         <div className="flex justify-between items-center w-full px-6">
//                             <span className="text-gray-700">Number of Persons:</span>
//                             <div className="flex items-center gap-3">
//                                 <button
//                                     type="button"
//                                     className={`text-xl -rotate-90 ${personCount <= 1 ? 'text-gray-400' : 'text-black'}`}
//                                     onClick={() => handlePersonChange(personCount - 1)}
//                                     disabled={personCount <= 1}
//                                 >
//                                     ▲
//                                 </button>
//                                 <div className="bg-[#FFDC82] flex justify-center items-center text-black w-8 h-8 rounded-full font-semibold">
//                                     {personCount}
//                                 </div>
//                                 <button
//                                     type="button"
//                                     className={`text-xl rotate-90 ${personCount >= 4 ? 'text-gray-400' : 'text-black'}`}
//                                     onClick={() => handlePersonChange(personCount + 1)}
//                                     disabled={personCount >= 4}
//                                 >
//                                     ▲
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Customer Forms */}
//                         {customers.map((customer, index) => (
//                             <div key={index} className="border-t pt-4">
//                                 <h3 className="font-semibold mb-3 text-blue-800">Person {index + 1} Details</h3>
                                
//                                 {/* Name, Age, Gender */}
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
//                                     <div>
//                                         <label className="text-gray-700 text-sm">Full Name *</label>
//                                         <input 
//                                             type="text" 
//                                             placeholder="Enter full name" 
//                                             value={customer.name}
//                                             onChange={(e) => handleCustomerChange(index, 'name', e.target.value)}
//                                             className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                             required
//                                         />
//                                     </div>
                                    
//                                     <div>
//                                         <label className="text-gray-700 text-sm">Age *</label>
//                                         <input 
//                                             type="number" 
//                                             placeholder="Age" 
//                                             value={customer.age}
//                                             onChange={(e) => handleCustomerChange(index, 'age', e.target.value)}
//                                             className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                             min="18"
//                                             max="100"
//                                             required
//                                         />
//                                     </div>
                                    
//                                     <div>
//                                         <label className="text-gray-700 text-sm">Gender *</label>
//                                         <div className="flex gap-2 mt-1">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => handleCustomerChange(index, 'gender', 'male')}
//                                                 className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${customer.gender === "male" ? "bg-[#0827B2] text-white" : "bg-white text-gray-700 border-gray-300"}`}
//                                             >
//                                                 <span>Male</span>
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => handleCustomerChange(index, 'gender', 'female')}
//                                                 className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${customer.gender === "female" ? "bg-[#0827B2] text-white" : "bg-white text-gray-700 border-gray-300"}`}
//                                             >
//                                                 <span>Female</span>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* ID Proof */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//                                     <div>
//                                         <label className="text-gray-700 text-sm">ID Proof Type</label>
//                                         <select 
//                                             value={customer.idProofType}
//                                             onChange={(e) => handleCustomerChange(index, 'idProofType', e.target.value)}
//                                             className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                         >
//                                             <option value="">Select ID proof</option>
//                                             <option value="aadhar">Aadhar Card</option>
//                                             <option value="pan">PAN Card</option>
//                                             <option value="passport">Passport</option>
//                                             <option value="voter">Voter ID</option>
//                                             <option value="license">Driving License</option>
//                                         </select>
//                                     </div>
                                    
//                                     <div>
//                                         <label className="text-gray-700 text-sm">ID Proof Number</label>
//                                         <input 
//                                             type="text" 
//                                             value={customer.idProofNumber}
//                                             onChange={(e) => handleCustomerChange(index, 'idProofNumber', e.target.value)}
//                                             className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                             placeholder="Enter ID number"
//                                             disabled={!customer.idProofType}
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* ID Proof Upload */}
//                                 <div className="mb-3">
//                                     <label className="text-gray-700 text-sm">Upload ID Proof (Optional)</label>
//                                     <div className="relative mt-1">
//                                         <input 
//                                             type="file" 
//                                             onChange={(e) => handleIdProofUpload(index, e.target.files[0])}
//                                             className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" 
//                                             accept=".jpg,.jpeg,.png,.pdf"
//                                         />
//                                         <div className="border border-gray-300 border-dashed rounded-md px-4 py-3 text-center cursor-pointer">
//                                             {customer.idProofFile ? (
//                                                 <span className="text-green-600 text-sm">File selected: {customer.idProofFile.name}</span>
//                                             ) : (
//                                                 <span className="text-gray-500 text-sm">Click to upload ID proof (Max 5MB)</span>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         {/* Contact Information (for primary person only) */}
//                         <div className="border-t pt-4">
//                             <h3 className="font-semibold mb-3 text-blue-800">Contact Information</h3>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                                 <div>
//                                     <label className="text-gray-700 text-sm">Mobile Number *</label>
//                                     <input
//                                         type="text"
//                                         maxLength={10}
//                                         value={mobile}
//                                         onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                                         className="border border-gray-300 rounded-md px-3 py-2 w-full"
//                                         placeholder="10-digit mobile number"
//                                         required
//                                     />
//                                     {!isMobileValid && mobile.length > 0 && (
//                                         <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit number</p>
//                                     )}
//                                 </div>
                                
//                                 <div>
//                                     <label className="text-gray-700 text-sm">Email Address</label>
//                                     <input 
//                                         type="email" 
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                         placeholder="Enter email address"
//                                     />
//                                 </div>
//                             </div>
                            
//                             <div className="mb-3">
//                                 <label className="text-gray-700 text-sm">Purpose of Stay</label>
//                                 <input 
//                                     type="text" 
//                                     value={purpose}
//                                     onChange={(e) => setPurpose(e.target.value)}
//                                     className="border border-gray-300 rounded-md px-3 py-2 w-full" 
//                                     placeholder="e.g., Work, Study, etc."
//                                 />
//                             </div>
//                         </div>

//                         {/* Checkbox */}
//                         <div className="flex items-start gap-2 mt-3">
//                             <input
//                                 type="checkbox"
//                                 className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
//                                 checked={agree}
//                                 onChange={(e) => setAgree(e.target.checked)}
//                                 required
//                             />
//                             <label className="text-sm text-gray-700">
//                                 I agree to save these details for future bookings and confirm that all information provided is accurate.
//                             </label>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="mt-4">
//                             <button
//                                 type="submit"
//                                 disabled={!isMobileValid || !agree || loading}
//                                 className={`w-full py-3 rounded-md text-white font-medium transition ${
//                                     isMobileValid && agree && !loading
//                                         ? "bg-[#0827B2] hover:bg-blue-700"
//                                         : "bg-gray-400 cursor-not-allowed"
//                                 }`}
//                             >
//                                 {loading ? "Processing..." : "PROCEED TO PAYMENT"}
//                             </button>
//                         </div>

//                         {/* Note */}
//                         <div className="text-center text-sm text-gray-600 mt-2">
//                             Original ID proof is mandatory during check-in. Booking confirmation is subject to verification.
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }




import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import bgimage from '../../assets/user/pgsearch/image (5).png';
import Header from "../Header";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProof() {
    const [select, setSelect] = useState("self");
    const [personCount, setPersonCount] = useState(1);
    const [customers, setCustomers] = useState([{
        name: "",
        age: "",
        gender: "",
        idProofType: "",
        idProofNumber: "",
        idProofFile: null
    }]);
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [purpose, setPurpose] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state;

    useEffect(() => {
        if (!bookingData || !bookingData.propertyId) {
            alert("Booking data is incomplete. Please go back and try again.");
            navigate(-1);
        }
    }, [bookingData, navigate]);

    const handlePersonChange = (newCount) => {
        if (newCount < 1 || newCount > 4) return;
        
        setPersonCount(newCount);
        
        // Initialize customer data based on count
        if (newCount > customers.length) {
            const newCustomers = [...customers];
            for (let i = customers.length; i < newCount; i++) {
                newCustomers.push({
                    name: "",
                    age: "",
                    gender: "",
                    idProofType: "",
                    idProofNumber: "",
                    idProofFile: null
                });
            }
            setCustomers(newCustomers);
        } else {
            setCustomers(customers.slice(0, newCount));
        }
    };

    const handleCustomerChange = (index, field, value) => {
        const updatedCustomers = [...customers];
        updatedCustomers[index][field] = value;
        setCustomers(updatedCustomers);
    };

    const handleIdProofUpload = (index, file) => {
        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }
        
        const updatedCustomers = [...customers];
        updatedCustomers[index].idProofFile = file;
        setCustomers(updatedCustomers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isMobileValid) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }
        
        if (!agree) {
            alert("Please agree to save details for future use");
            return;
        }
        
        // Validate all customer fields
        for (let i = 0; i < customers.length; i++) {
            const customer = customers[i];
            if (!customer.name || !customer.age || !customer.gender) {
                alert(`Please fill all details for person ${i + 1}`);
                return;
            }
            
            if (customer.idProofType && !customer.idProofNumber) {
                alert(`Please enter ID proof number for ${customer.name}`);
                return;
            }
        }
        
        // Check if we have a valid property ID
        if (!bookingData?.propertyId) {
            alert("Property information is missing. Please go back and try again.");
            return;
        }
        
        setLoading(true);
        
        try {
            // Prepare booking data - include propertyId from bookingData
            const bookingRequest = {
                propertyId: bookingData.propertyId,
                roomType: bookingData.selectedRoomType || bookingData.roomType,
                selectedRooms: bookingData.selectedRooms || [],
                moveInDate: bookingData.selectedDate || bookingData.moveInDate,
                endDate: bookingData.endDate || bookingData.moveOutDate,
                durationType: bookingData.durationType || 'monthly',
                durationDays: bookingData.durationDays || 0,
                durationMonths: bookingData.durationMonths || 1,
                personCount: bookingData.personCount || personCount,
                customerDetails: {
                    primary: {
                        name: customers[0]?.name || "",
                        age: customers[0]?.age || "",
                        gender: customers[0]?.gender || "",
                        mobile: mobile,
                        email: email,
                        idProofType: customers[0]?.idProofType || "",
                        idProofNumber: customers[0]?.idProofNumber || "",
                        purpose: purpose
                    },
                    additional: customers.slice(1),
                    saveForFuture: agree
                },
                pricing: {
                    advanceAmount: bookingData.advanceAmount || 0,
                    securityDeposit: bookingData.depositAmount || 0,
                    totalAmount: bookingData.totalAmount || 0
                }
            };
            
            console.log('📤 Creating booking with data:', bookingRequest);
            
            // Create booking (pending payment)
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(bookingRequest)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                if (response.status === 409) {
                    alert(`The following rooms are not available: ${result.unavailableRooms?.join(', ')}. Please go back and select different rooms.`);
                    return;
                }
                
                throw new Error(result.message || `Booking failed: ${response.status}`);
            }
            
            if (result.success) {
                console.log('✅ Booking created successfully:', result.booking);
                // Navigate to payment page with complete booking details
                navigate("/user/pay-to-cart", { 
                    state: { 
                        ...bookingData,
                        booking: result.booking,
                        propertyId: bookingData.propertyId
                    } 
                });
            } else {
                alert("Failed to create booking: " + result.message);
            }
        } catch (error) {
            console.error("❌ Booking creation error:", error);
            alert("An error occurred while creating your booking: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const isMobileValid = mobile.length === 10;

    return (
        <>
            <Header />
            <div 
                className="w-full min-h-screen bg-cover bg-no-repeat bg-center py-[5%]"
                style={{ backgroundImage: `url('${bgimage}')` }}
            >
                {/* Header */}
                <div className="bg-[#FFDC82] flex items-center p-1 ">
                    <button 
                        className="flex items-center gap-2 px-4 py-2 rounded"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                        Back to Room Selection
                    </button>
                </div>

                {/* Centered Form */}
                <div className="flex justify-center items-start py-10 px-4">
                    <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/2 bg-white px-5 rounded-lg shadow-md flex flex-col gap-4 py-4">
                        <h2 className="text-xl font-bold text-center text-gray-800">Customer Details</h2>

                        {/* Self / Others Buttons */}
                        <div className="flex gap-4 justify-center">
                            <button
                                type="button"
                                onClick={() => setSelect("self")}
                                className={`px-4 py-2 w-1/3 border rounded-md text-sm ${select === "self" ? "bg-[#0827B2] text-white" : "bg-white text-black border-gray-300"}`}
                            >
                                Self
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelect("others")}
                                className={`px-4 py-2 w-1/3 border rounded-md text-sm ${select === "others" ? "bg-[#0827B2] text-white" : "bg-white text-black border-gray-300"}`}
                            >
                                Others
                            </button>
                        </div>

                        {/* Person Counter */}
                        <div className="flex justify-between items-center w-full px-6">
                            <span className="text-gray-700">Number of Persons:</span>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className={`text-xl -rotate-90 ${personCount <= 1 ? 'text-gray-400' : 'text-black'}`}
                                    onClick={() => handlePersonChange(personCount - 1)}
                                    disabled={personCount <= 1}
                                >
                                    ▲
                                </button>
                                <div className="bg-[#FFDC82] flex justify-center items-center text-black w-8 h-8 rounded-full font-semibold">
                                    {personCount}
                                </div>
                                <button
                                    type="button"
                                    className={`text-xl rotate-90 ${personCount >= 4 ? 'text-gray-400' : 'text-black'}`}
                                    onClick={() => handlePersonChange(personCount + 1)}
                                    disabled={personCount >= 4}
                                >
                                    ▲
                                </button>
                            </div>
                        </div>

                        {/* Customer Forms */}
                        {customers.map((customer, index) => (
                            <div key={index} className="border-t pt-4">
                                <h3 className="font-semibold mb-3 text-blue-800">Person {index + 1} Details</h3>
                                
                                {/* Name, Age, Gender */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                    <div>
                                        <label className="text-gray-700 text-sm">Full Name *</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter full name" 
                                            value={customer.name}
                                            onChange={(e) => handleCustomerChange(index, 'name', e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="text-gray-700 text-sm">Age *</label>
                                        <input 
                                            type="number" 
                                            placeholder="Age" 
                                            value={customer.age}
                                            onChange={(e) => handleCustomerChange(index, 'age', e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                            min="18"
                                            max="100"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="text-gray-700 text-sm">Gender *</label>
                                        <div className="flex gap-2 mt-1">
                                            <button
                                                type="button"
                                                onClick={() => handleCustomerChange(index, 'gender', 'male')}
                                                className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${customer.gender === "male" ? "bg-[#0827B2] text-white" : "bg-white text-gray-700 border-gray-300"}`}
                                            >
                                                <span>Male</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleCustomerChange(index, 'gender', 'female')}
                                                className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${customer.gender === "female" ? "bg-[#0827B2] text-white" : "bg-white text-gray-700 border-gray-300"}`}
                                            >
                                                <span>Female</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* ID Proof */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="text-gray-700 text-sm">ID Proof Type</label>
                                        <select 
                                            value={customer.idProofType}
                                            onChange={(e) => handleCustomerChange(index, 'idProofType', e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                        >
                                            <option value="">Select ID proof</option>
                                            <option value="aadhar">Aadhar Card</option>
                                            <option value="pan">PAN Card</option>
                                            <option value="passport">Passport</option>
                                            <option value="voter">Voter ID</option>
                                            <option value="license">Driving License</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="text-gray-700 text-sm">ID Proof Number</label>
                                        <input 
                                            type="text" 
                                            value={customer.idProofNumber}
                                            onChange={(e) => handleCustomerChange(index, 'idProofNumber', e.target.value)}
                                            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                            placeholder="Enter ID number"
                                            disabled={!customer.idProofType}
                                        />
                                    </div>
                                </div>

                                {/* ID Proof Upload */}
                                <div className="mb-3">
                                    <label className="text-gray-700 text-sm">Upload ID Proof (Optional)</label>
                                    <div className="relative mt-1">
                                        <input 
                                            type="file" 
                                            onChange={(e) => handleIdProofUpload(index, e.target.files[0])}
                                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" 
                                            accept=".jpg,.jpeg,.png,.pdf"
                                        />
                                        <div className="border border-gray-300 border-dashed rounded-md px-4 py-3 text-center cursor-pointer">
                                            {customer.idProofFile ? (
                                                <span className="text-green-600 text-sm">File selected: {customer.idProofFile.name}</span>
                                            ) : (
                                                <span className="text-gray-500 text-sm">Click to upload ID proof (Max 5MB)</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Contact Information (for primary person only) */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3 text-blue-800">Contact Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="text-gray-700 text-sm">Mobile Number *</label>
                                    <input
                                        type="text"
                                        maxLength={10}
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                        placeholder="10-digit mobile number"
                                        required
                                    />
                                    {!isMobileValid && mobile.length > 0 && (
                                        <p className="text-red-500 text-xs mt-1">Enter a valid 10-digit number</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="text-gray-700 text-sm">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="text-gray-700 text-sm">Purpose of Stay</label>
                                <input 
                                    type="text" 
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full" 
                                    placeholder="e.g., Work, Study, etc."
                                />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-2 mt-3">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                required
                            />
                            <label className="text-sm text-gray-700">
                                I agree to save these details for future bookings and confirm that all information provided is accurate.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={!isMobileValid || !agree || loading}
                                className={`w-full py-3 rounded-md text-white font-medium transition ${
                                    isMobileValid && agree && !loading
                                        ? "bg-[#0827B2] hover:bg-blue-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {loading ? "Processing..." : "PROCEED TO PAYMENT"}
                            </button>
                        </div>

                        {/* Note */}
                        <div className="text-center text-sm text-gray-600 mt-2">
                            Original ID proof is mandatory during check-in. Booking confirmation is subject to verification.
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}