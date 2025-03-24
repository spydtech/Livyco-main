import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiExternalLink, FiFilter } from "react-icons/fi";
import FilterModal from "./FilterModal"; // Import the modal
import ClientNav from "../Client-Navbar/ClientNav";

const tenants = [
  {
    id: "1",
    name: "Jagadeesh K",
    tenantId: "LVC0000010",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "abc@gmail.com",
    dob: "10/02/1995",
    aadhar: "1234567890",
    emergencyContact: "9876543210",
    emergencyName: "Ravi Kumar",
    address: "#H.NO, St.name, Rd no, district, State, India, PIN 500001",
    hostelName: "Abc Boys Hostel",
    hostelAddress: "P.No 123, abc, dfg xxxx, Hyd 500001",
    checkInDate: "15/03/2024",
    checkOutDate: "15/09/2024",
    roomDetails: "2nd Floor, Room No 517, 2 Bed sharing",
    advancePaid: "₹5000.00",
    rentPerMonth: "₹10000.00",
    paymentStatus: "cancelled",
    amountPaid: "10,000",
    type: "Short Visit",
  },
  {
    id: 2,
    name: "Tenant Name",
    email: "TenantName@gmail.com",
    checkInDate: "2-2-2021",
    paymentStatus: "Paid",
    amountPaid: "10,000",
    type: "Short Visit",
  },
  {
    id: 3,
    name: "Tenant Name",
    email: "TenantName@gmail.com",
    checkInDate: "2-2-2021",
    paymentStatus: "Paid",
    amountPaid: "10,000",
    type: "Group Booking",
  },
];

const TenantRequestTable = () => {
  const navigate = useNavigate();
 
  
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tenants based on search query
   // Filter tenants based on search query
   const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <ClientNav />
    <div className="p-6 bg-[#F8F8FF] min-h-screen">
      {/* Breadcrumb */}
      <h2 className="text-gray-500 text-sm mb-2">Home / Tenant Request</h2>
      <div className=" p-4 ">

      {/* Search Bar */}
      <div className="flex items-center  mb-4">
            <input
              type="text"
              placeholder="Search By name , Room number"
              className="w-1/2 p-2 border rounded-3xl text-sm bg-[#F8F8FF] focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
           <svg 
            onClick={() => setShowFilter(true)}
           width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.4974 7.79199L29.1641 7.79199M5.83073 28.2087H10.2057M5.83073 7.79199L11.6641 7.79199M16.0391 28.2087L29.1641 28.2087M24.7891 18.0003H29.1641M5.83073 18.0003L18.9557 18.0003" stroke="#333333" stroke-linecap="round"/>
<path d="M11.6667 7.79167C11.6667 9.4025 12.9725 10.7083 14.5833 10.7083C16.1942 10.7083 17.5 9.4025 17.5 7.79167C17.5 6.18084 16.1942 4.875 14.5833 4.875C12.9725 4.875 11.6667 6.18084 11.6667 7.79167Z" stroke="#333333" stroke-linecap="round"/>
<path d="M18.9557 17.9997C18.9557 19.6105 20.2616 20.9163 21.8724 20.9163C23.4832 20.9163 24.7891 19.6105 24.7891 17.9997C24.7891 16.3888 23.4832 15.083 21.8724 15.083C20.2616 15.083 18.9557 16.3888 18.9557 17.9997Z" stroke="#333333" stroke-linecap="round"/>
<path d="M10.2057 28.2087C10.2057 29.8195 11.5116 31.1253 13.1224 31.1253C14.7332 31.1253 16.0391 29.8195 16.0391 28.2087C16.0391 26.5978 14.7332 25.292 13.1224 25.292C11.5116 25.292 10.2057 26.5978 10.2057 28.2087Z" stroke="#333333" stroke-linecap="round"/>
</svg>

          </div>
      {/* <div className="flex items-center bg-white p-3 rounded-full border-gray-500  mb-4 border w-1/2">
        <input
          type="text"
          placeholder="Search by name, room number"
          className="w-full outline-none px-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      <FiFilter
          className="text-gray-600 text-2xl cursor-pointer"
          onClick={() => setShowFilter(true)}
        />
      </div> */}
      

      {/* Table */}
      <div className=" p-4   overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F8F8FF] text-left text-gray-600 border-b border-gray-500">
              <th className="p-3">Tenant Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Check-in Date</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Amount Paid</th>
              <th className="p-3">Type Of Check-in</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant, index) => (
              <tr key={tenant.id} className={`${index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F8F8FF"} `}>
                <td className="p-3">{tenant.name}</td>
                <td className="p-3">{tenant.email}</td>
                <td className="p-3">{tenant.checkInDate}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-white text-sm rounded-md ${
                      tenant.paymentStatus === "Paid" ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {tenant.paymentStatus}
                  </span>
                </td>
                <td className="p-3">{tenant.amountPaid}</td>
                <td className="p-3">{tenant.type}</td>
                <td
  className="p-3 text-blue-600 cursor-pointer"
  onClick={() => navigate(`/client/tenant-request-view/${tenant.id}`, { state: tenant })}
>
  <FiExternalLink className="text-xl" />
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
       {/* Filter Modal */}
       {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
    </>
  );
};

export default TenantRequestTable;
