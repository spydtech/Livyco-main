import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiExternalLink, FiFilter } from "react-icons/fi";
import FilterModal from "./FilterModal"; // Import the modal

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
  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <ClientNav />
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <h2 className="text-gray-500 text-sm mb-2">Home / Tenant Request</h2>

      {/* Search Bar */}
      <div className="flex items-center bg-white p-3 rounded-lg shadow-md mb-4 border">
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
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
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
            {tenants.map((tenant, index) => (
              <tr key={tenant.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}>
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
       {/* Filter Modal */}
       {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
    </div>
    </>
  );
};

export default TenantRequestTable;
