// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { concernAPI } from "../PropertyController"; // Adjust the path as needed
// import { useState, useEffect } from "react";



// const ServiceRequests = () => {
//   const navigate = useNavigate();
// //   const serviceRequests = [
// //   {
// //     id: "HH000000-000-01",
// //     tenantName: " K",
// //     roomDetails: "Room 101 - Bed B",
// //     sharingType: "2 Sharing",
// //     requestType: "Bed Change",
// //     date: "DD-MM-YYYY",
// //     description:
// //       "The current bed is uncomfortable and needs to be replaced for better support and rest.",
// //   },
// // ];



//   const [serviceRequests, setServiceRequests] = useState([]);
  
//   // Fetch user concerns on component mount
//   useEffect(() => {
//     fetchUserConcerns();
//   }, []);

//   const fetchUserConcerns = async () => {
//     try {
//       const response = await concernAPI.getPropertyConcerns();
//       if (response.data && response.data.concerns) {
//         setServiceRequests(response.data.concerns);
//         console.log(response.data.concerns);
//       }
//     } catch (err) {
//       console.error("Error fetching concerns:", err);
//     }
//   };

  





//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#FFFFFF] min-h-screen">
//         <h2 className="text-gray-600 text-sm mb-4">Home / Service Requests</h2>
//         {serviceRequests.map((request) => (
//           <div key={request.id} className="bg-white p-6 rounded-lg border border-[#BCBCBC] mb-4">
//             <h3 className="font-semibold text-lg mb-2">{request.tenantName}</h3>
//             <div className="flex items-center space-x-2 mb-2">
//               <span className="bg-yellow-300 px-3 py-1 text-sm rounded">{request.roomDetails}</span>
//               <span className="bg-yellow-300 px-3 py-1 text-sm rounded">{request.sharingType}</span>
//             </div>
//             <p className="text-gray-700 font-semibold">Service Request - {request.requestType}</p>
//             <p className="text-gray-500 text-sm">Request ID: {request.id}</p>
//             <p className="text-gray-500 text-sm mb-2">{request.date}</p>
//             <p className="text-gray-600 mb-4">{request.description}</p>
//             <div className="flex space-x-4">
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 onClick={() => navigate(`/client/servicerequests/approval/${request.id}`, { state: request })}
//               >
//                 Approve Request
//               </button>
//               <button
//                 className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
//                 onClick={() => navigate(`/client/servicerequests/cancel/${request.id}`, { state: request })}
//               >
//                 Cancel Request
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ServiceRequests;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { concernAPI, propertyAPI } from "../PropertyController";

// const ServiceRequests = () => {
//   const navigate = useNavigate();
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [clientProperties, setClientProperties] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       setError("Please login as a client first");
//       setLoading(false);
//       setIsAuthenticated(false);
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
      
//       // Check if user is a client
//       if (parsedUser.role !== 'client') {
//         setError("Access restricted to clients only");
//         setLoading(false);
//         setIsAuthenticated(false);
//         return;
//       }
      
//       setIsAuthenticated(true);
//       fetchClientProperties();
//     } catch (err) {
//       console.error("Error parsing user data:", err);
//       setError("Invalid user data. Please login again.");
//       setLoading(false);
//       setIsAuthenticated(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedProperty && isAuthenticated) {
//       fetchServiceRequests(selectedProperty);
//     }
//   }, [selectedProperty, isAuthenticated]);

//   const fetchClientProperties = async () => {
//     try {
//       setLoading(true);
//       const response = await propertyAPI.getAllClientProperties();
//       if (response.data.success) {
//         const properties = response.data.data || [];
//         setClientProperties(properties);
//         if (properties.length > 0) {
//           setSelectedProperty(properties[0].property._id);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching client properties:", err);
//       handleApiError(err, "Failed to fetch properties");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchServiceRequests = async (propertyId) => {
//     try {
//       // Check if the selected property belongs to the client
//       const isClientProperty = clientProperties.some(
//         prop => prop.property._id === propertyId
//       );
      
//       console.log('Client properties:', clientProperties);
//       console.log('Selected property ID:', propertyId);
//       console.log('Is client property:', isClientProperty);
//       console.log('User from localStorage:', user);
      
//       if (!isClientProperty && clientProperties.length > 0) {
//         setError("You don't have access to this property");
//         setServiceRequests([]);
//         setLoading(false);
//         return;
//       }
      
//       setLoading(true);
//       console.log("Fetching concerns for property:", propertyId);
      
//       const response = await concernAPI.getPropertyConcerns(propertyId);
//       console.log("API Response:", response.data);
      
//       if (response.data.success) {
//         const concerns = response.data.concerns.map(concern => ({
//           ...concern,
//           id: concern._id,
//           tenantName: concern.userId?.name || "Unknown Tenant",
//           roomDetails: `Room ${concern.currentRoom} - ${concern.currentBed}`,
//           sharingType: `${concern.currentSharingType} Sharing`,
//           requestType: concern.type.replace('-', ' ').toUpperCase(),
//           date: new Date(concern.createdAt).toLocaleDateString('en-IN'),
//           description: concern.comment || "No description provided"
//         }));
        
//         setServiceRequests(concerns);
//         setError(null);
//       }
//     } catch (err) {
//       console.error("Error fetching service requests:", err);
//       console.error("Error response:", err.response?.data);
//       console.error("Error status:", err.response?.status);
//       handleApiError(err, "Failed to fetch service requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApiError = (error, defaultMessage) => {
//     if (error.response?.status === 401) {
//       setError("Session expired. Please login again.");
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setIsAuthenticated(false);
//     } else if (error.response?.status === 403) {
//       setError("Access denied. You don't have permission to view concerns for this property.");
//     } else if (error.response?.status === 404) {
//       setError("API endpoint not found. Please check the endpoint URL.");
//     } else {
//       setError(error.response?.data?.message || defaultMessage);
//     }
//   };

//   const handleApprove = async (requestId) => {
//     try {
//       const adminNotes = prompt("Enter any notes for this approval:");
//       if (adminNotes === null) return;
      
//       await concernAPI.approveConcern(requestId, {
//         adminNotes: adminNotes || "Request approved by client"
//       });
      
//       alert("Request approved successfully! The tenant's room details have been updated.");
//       fetchServiceRequests(selectedProperty);
//     } catch (error) {
//       console.error("Error approving request:", error);
//       handleApiError(error, "Failed to approve request");
//     }
//   };

//   const handleReject = async (requestId) => {
//     const rejectionReason = prompt("Please enter the reason for rejection:");
//     if (!rejectionReason) return;
    
//     try {
//       await concernAPI.rejectConcern(requestId, rejectionReason);
//       alert("Request rejected successfully!");
//       fetchServiceRequests(selectedProperty);
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//       handleApiError(error, "Failed to reject request");
//     }
//   };

//   const handleComplete = async (requestId) => {
//     const completionNotes = prompt("Enter completion notes:");
//     if (completionNotes === null) return;
    
//     try {
//       await concernAPI.completeConcern(requestId, {
//         completionNotes: completionNotes || "Request completed by client"
//       });
      
//       alert("Request marked as completed!");
//       fetchServiceRequests(selectedProperty);
//     } catch (error) {
//       console.error("Error completing request:", error);
//       handleApiError(error, "Failed to complete request");
//     }
//   };

//   const handleViewDetails = (request) => {
//     navigate(`/client/servicerequests/details/${request._id}`, { state: request });
//   };

//   const handleLoginRedirect = () => {
//     navigate('/client/client-login');
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'completed': return 'bg-blue-100 text-blue-800';
//       case 'cancelled': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#FFFFFF] min-h-screen">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <p>Authentication required. Please login as a client to access service requests.</p>
//             <button
//               onClick={handleLoginRedirect}
//               className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
//       <div className="p-6 bg-[#FFFFFF] min-h-screen">
//         <h2 className="text-gray-600 text-sm mb-4">Home / Service Requests</h2>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <p>{error}</p>
//             {error.includes("Session expired") && (
//               <button
//                 onClick={handleLoginRedirect}
//                 className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Login Again
//               </button>
//             )}
//           </div>
//         )}

//         {/* Property Selector */}
//         {clientProperties.length > 0 && (
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Property:
//             </label>
//             <select
//               value={selectedProperty}
//               onChange={(e) => setSelectedProperty(e.target.value)}
//               className="w-full md:w-1/3 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {clientProperties.map((property) => (
//                 <option key={property.property._id} value={property.property._id}>
//                   {property.property.name} - {property.property.locality}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <p>Loading service requests...</p>
//           </div>
//         ) : serviceRequests.length === 0 ? (
//           <div className="bg-white p-6 rounded-lg border border-[#BCBCBC] text-center">
//             <p className="text-gray-500">
//               {selectedProperty ? "No service requests found for this property" : "Please select a property"}
//             </p>
//           </div>
//         ) : (
//           serviceRequests.map((request) => (
//             <div key={request._id} className="bg-white p-6 rounded-lg border border-[#BCBCBC] mb-4">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">{request.tenantName}</h3>
//                   <p className="text-gray-500 text-sm">Request ID: {request._id}</p>
//                   <p className="text-gray-500 text-sm">{request.date}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div className="flex items-center space-x-2 mb-4">
//                 <span className="bg-yellow-200 px-3 py-1 text-sm rounded">
//                   {request.roomDetails}
//                 </span>
//                 <span className="bg-yellow-200 px-3 py-1 text-sm rounded">
//                   {request.sharingType}
//                 </span>
//               </div>

//               <p className="text-gray-700 font-semibold mb-2">
//                 Service Request - {request.requestType}
//               </p>

//               {request.description && (
//                 <p className="text-gray-600 mb-4">{request.description}</p>
//               )}

//               {/* Requested Changes */}
//               {(request.type === 'bed-change' || request.type === 'room-change') && (
//                 <div className="bg-blue-50 p-4 rounded-lg mb-4">
//                   <h4 className="font-semibold text-blue-800 mb-3">Requested Changes:</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="flex items-center">
//                       <span className="text-blue-600 font-medium mr-2">New Room:</span>
//                       <span className="bg-white px-2 py-1 rounded">Room {request.requestedRoom}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-blue-600 font-medium mr-2">New Bed:</span>
//                       <span className="bg-white px-2 py-1 rounded">{request.requestedBed}</span>
//                     </div>
//                     {request.requestedSharingType && (
//                       <div className="flex items-center">
//                         <span className="text-blue-600 font-medium mr-2">New Sharing:</span>
//                         <span className="bg-white px-2 py-1 rounded">{request.requestedSharingType} Sharing</span>
//                       </div>
//                     )}
//                     {request.requestedFloor && (
//                       <div className="flex items-center">
//                         <span className="text-blue-600 font-medium mr-2">New Floor:</span>
//                         <span className="bg-white px-2 py-1 rounded">Floor {request.requestedFloor}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Rejection reason if rejected */}
//               {request.status === "rejected" && request.rejectionReason && (
//                 <div className="bg-red-50 p-3 rounded-lg mb-4">
//                   <h4 className="font-semibold text-red-800 mb-1">Rejection Reason:</h4>
//                   <p className="text-red-600">{request.rejectionReason}</p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => handleViewDetails(request)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
//                 >
//                   View Details
//                 </button>
                
//                 {request.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => handleApprove(request._id)}
//                       className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//                     >
//                       Approve Request
//                     </button>
//                     <button
//                       onClick={() => handleReject(request._id)}
//                       className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                     >
//                       Reject Request
//                     </button>
//                   </>
//                 )}
                
//                 {request.status === 'approved' && (
//                   <button
//                     onClick={() => handleComplete(request._id)}
//                     className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//                   >
//                     Mark Complete
//                   </button>
//                 )}
                
//                 {request.status === 'approved' && request.approvedAt && (
//                   <span className="text-sm text-green-600">
//                     Approved on: {new Date(request.approvedAt).toLocaleDateString()}
//                   </span>
//                 )}
                
//                 {request.status === 'rejected' && request.rejectedAt && (
//                   <span className="text-sm text-red-600">
//                     Rejected on: {new Date(request.rejectedAt).toLocaleDateString()}
//                   </span>
//                 )}
                
//                 {request.status === 'completed' && request.completedAt && (
//                   <span className="text-sm text-blue-600">
//                     Completed on: {new Date(request.completedAt).toLocaleDateString()}
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default ServiceRequests;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientNav from "../Client-Navbar/ClientNav";
import { concernAPI, propertyAPI } from "../PropertyController";

const ServiceRequests = () => {
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientProperties, setClientProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      setError("Please login as a client first");
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user is a client
      if (parsedUser.role !== 'client') {
        setError("Access restricted to clients only");
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      
      setIsAuthenticated(true);
      fetchClientProperties();
    } catch (err) {
      console.error("Error parsing user data:", err);
      setError("Invalid user data. Please login again.");
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (selectedProperty && isAuthenticated) {
      fetchServiceRequests(selectedProperty);
    }
  }, [selectedProperty, isAuthenticated]);

  const fetchClientProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.getAllClientProperties();
      if (response.data.success) {
        const properties = response.data.data || [];
        setClientProperties(properties);
        if (properties.length > 0) {
          setSelectedProperty(properties[0].property._id);
        }
      }
    } catch (err) {
      console.error("Error fetching client properties:", err);
      handleApiError(err, "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const fetchServiceRequests = async (propertyId) => {
    try {
      // Check if the selected property belongs to the client
      const isClientProperty = clientProperties.some(
        prop => prop.property._id === propertyId
      );
      
      if (!isClientProperty && clientProperties.length > 0) {
        setError("You don't have access to this property");
        setServiceRequests([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      const response = await concernAPI.getPropertyConcerns(propertyId);
      
      if (response.data.success) {
        const concerns = response.data.concerns.map(concern => {
          // Create base concern object
          const concernObj = {
            ...concern,
            id: concern._id,
            tenantName: concern.userId?.name || "Unknown Tenant",
            roomDetails: `Room ${concern.currentRoom || "N/A"} - ${concern.currentBed || "N/A"}`,
            sharingType: `${concern.currentSharingType || "N/A"} Sharing`,
            requestType: concern.type ? concern.type.replace('-', ' ').toUpperCase() : "UNKNOWN",
            date: concern.createdAt ? new Date(concern.createdAt).toLocaleDateString('en-IN') : "Unknown date",
            description: concern.comment || "No description provided"
          };
          
          // Add requested changes for bed-change and room-change types
          if (concern.type === 'bed-change' || concern.type === 'room-change') {
            return {
              ...concernObj,
              requestedRoom: concern.requestedRoom || "Not specified",
              requestedBed: concern.requestedBed || "Not specified",
              requestedSharingType: concern.requestedSharingType,
              requestedFloor: concern.requestedFloor
            };
          }
          
          return concernObj;
        });
        
        setServiceRequests(concerns);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching service requests:", err);
      handleApiError(err, "Failed to fetch service requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error, defaultMessage) => {
    if (error.response?.status === 401) {
      setError("Session expired. Please login again.");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    } else if (error.response?.status === 403) {
      setError("Access denied. You don't have permission to view concerns for this property.");
    } else if (error.response?.status === 404) {
      setError("API endpoint not found. Please check the endpoint URL.");
    } else {
      setError(error.response?.data?.message || defaultMessage);
    }
  };

  const handleApprove = (requestId) => {
    // Find the request object to pass to the approval page
    const request = serviceRequests.find(req => req._id === requestId);
    if (request) {
      navigate(`/client/servicerequests/approval/${requestId}`, { state: request });
    }
  };

  const handleReject = (requestId) => {
    // Find the request object to pass to the cancel page
    const request = serviceRequests.find(req => req._id === requestId);
    if (request) {
      navigate(`/client/servicerequests/cancel/${requestId}`, { state: request });
    }
  };

  const handleComplete = async (requestId) => {
    try {
      const completionNotes = prompt("Enter completion notes:");
      if (completionNotes === null) return;
      
      await concernAPI.completeConcern(requestId, {
        completionNotes: completionNotes || "Request completed by client"
      });
      
      alert("Request marked as completed!");
      fetchServiceRequests(selectedProperty);
    } catch (error) {
      console.error("Error completing request:", error);
      handleApiError(error, "Failed to complete request");
    }
  };

  const handleViewDetails = (request) => {
    navigate(`/client/servicerequests/details/${request._id}`, { state: request });
  };

  const handleLoginRedirect = () => {
    navigate('/client/client-login');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#FFFFFF] min-h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Authentication required. Please login as a client to access service requests.</p>
            <button
              onClick={handleLoginRedirect}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="p-6 bg-[#FFFFFF] min-h-screen">
        <h2 className="text-gray-600 text-sm mb-4">Home / Service Requests</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            {error.includes("Session expired") && (
              <button
                onClick={handleLoginRedirect}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login Again
              </button>
            )}
          </div>
        )}

        {/* Property Selector */}
        {clientProperties.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Property:
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full md:w-1/3 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {clientProperties.map((property) => (
                <option key={property.property._id} value={property.property._id}>
                  {property.property.name} - {property.property.locality}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading service requests...</p>
          </div>
        ) : serviceRequests.length === 0 ? (
          <div className="bg-white p-6 rounded-lg border border-[#BCBCBC] text-center">
            <p className="text-gray-500">
              {selectedProperty ? "No service requests found for this property" : "Please select a property"}
            </p>
          </div>
        ) : (
          serviceRequests.map((request) => (
            <div key={request._id} className="bg-white p-6 rounded-lg border border-[#BCBCBC] mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{request.tenantName}</h3>
                  <p className="text-gray-500 text-sm">Request ID: {request._id}</p>
                  <p className="text-gray-500 text-sm">{request.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}>
                  {request.status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-yellow-200 px-3 py-1 text-sm rounded">
                  {request.roomDetails}
                </span>
                <span className="bg-yellow-200 px-3 py-1 text-sm rounded">
                  {request.sharingType}
                </span>
              </div>

              <p className="text-gray-700 font-semibold mb-2">
                Service Request - {request.requestType}
              </p>

              {request.description && (
                <p className="text-gray-600 mb-4">{request.description}</p>
              )}

              {/* Requested Changes - Only show for bed-change and room-change types */}
              {(request.type === 'bed-change' || request.type === 'room-change') && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Requested Changes:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <span className="text-blue-600 font-medium mr-2">New Room:</span>
                      <span className="bg-white px-2 py-1 rounded">Room {request.requestedRoom || "Not specified"}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-600 font-medium mr-2">New Bed:</span>
                      <span className="bg-white px-2 py-1 rounded">{request.requestedBed || "Not specified"}</span>
                    </div>
                    {request.requestedSharingType && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">New Sharing:</span>
                        <span className="bg-white px-2 py-1 rounded">{request.requestedSharingType} Sharing</span>
                      </div>
                    )}
                    {request.requestedFloor && (
                      <div className="flex items-center">
                        <span className="text-blue-600 font-medium mr-2">New Floor:</span>
                        <span className="bg-white px-2 py-1 rounded">Floor {request.requestedFloor}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rejection reason if rejected */}
              {request.status === "rejected" && request.rejectionReason && (
                <div className="bg-red-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-red-800 mb-1">Rejection Reason:</h4>
                  <p className="text-red-600">{request.rejectionReason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleViewDetails(request)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition"
                >
                  View Details
                </button>
                
                {request.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(request._id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Approve Request
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Reject Request
                    </button>
                  </>
                )}
                
                {request.status === 'approved' && (
                  <button
                    onClick={() => handleComplete(request._id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    Mark Complete
                  </button>
                )}
                
                {request.status === 'approved' && request.approvedAt && (
                  <span className="text-sm text-green-600">
                    Approved on: {new Date(request.approvedAt).toLocaleDateString()}
                  </span>
                )}
                
                {request.status === 'rejected' && request.rejectedAt && (
                  <span className="text-sm text-red-600">
                    Rejected on: {new Date(request.rejectedAt).toLocaleDateString()}
                  </span>
                )}
                
                {request.status === 'completed' && request.completedAt && (
                  <span className="text-sm text-blue-600">
                    Completed on: {new Date(request.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ServiceRequests;