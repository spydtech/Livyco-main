import React from "react";
import { useNavigate } from "react-router-dom";
import ClientNav from "../Client-Navbar/ClientNav";

const serviceRequests = [
  {
    id: "HH000000-000-01",
    tenantName: "Jagadeesh K",
    roomDetails: "Room 101 - Bed B",
    sharingType: "2 Sharing",
    requestType: "Bed Change",
    date: "DD-MM-YYYY",
    description:
      "The current bed is uncomfortable and needs to be replaced for better support and rest.",
  },
];

const ServiceRequests = () => {
  const navigate = useNavigate();

  return (
    <>
      <ClientNav />
      <div className="p-6 bg-[#FFFFFF] min-h-screen">
        <h2 className="text-gray-600 text-sm mb-4">Home / Service Requests</h2>
        {serviceRequests.map((request) => (
          <div key={request.id} className="bg-white p-6 rounded-lg border border-[#BCBCBC] mb-4">
            <h3 className="font-semibold text-lg mb-2">{request.tenantName}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-yellow-300 px-3 py-1 text-sm rounded">{request.roomDetails}</span>
              <span className="bg-yellow-300 px-3 py-1 text-sm rounded">{request.sharingType}</span>
            </div>
            <p className="text-gray-700 font-semibold">Service Request - {request.requestType}</p>
            <p className="text-gray-500 text-sm">Request ID: {request.id}</p>
            <p className="text-gray-500 text-sm mb-2">{request.date}</p>
            <p className="text-gray-600 mb-4">{request.description}</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/client/servicerequests/approval/${request.id}`, { state: request })}
              >
                Approve Request
              </button>
              <button
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
                onClick={() => navigate(`/client/servicerequests/cancel/${request.id}`, { state: request })}
              >
                Cancel Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceRequests;
