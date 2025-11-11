import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { adminBankAccountsAPI } from "../adminController";
 
const ITEMS_PER_PAGE = 5;
 
const RoleActivityForm = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 
  const adminToken = localStorage.getItem("adminToken");
 
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        setLoading(true);
       const response = await adminBankAccountsAPI.getAllBankAccounts();
        setBankAccounts(response.data.bankAccounts || []);
      } catch (err) {
        console.error("Error fetching bank accounts:", err);
        setError("Failed to fetch bank accounts");
      } finally {
        setLoading(false);
      }
    };
 
    fetchBankAccounts();
  }, [adminToken]);
 
  const filteredAccounts = bankAccounts.filter((account) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      account.accountHolderName?.toLowerCase().includes(searchLower) ||
      account.bankName?.toLowerCase().includes(searchLower) ||
      account.branchName?.toLowerCase().includes(searchLower) ||
      account.ifscCode?.toLowerCase().includes(searchLower) ||
      account.clientId?.clientId?.toLowerCase().includes(searchLower) ||
      account.clientId?.name?.toLowerCase().includes(searchLower)
    );
  });
 
  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredAccounts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
 
  if (loading) return <div className="p-5">Loading bank accounts...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;
 
  return (
    <div className="p-8 font-sans max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Account Details</h1>
 
      <div className="relative mb-5 w-full max-w-[350px] mt-11">
        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
 
      {currentItems.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <div className="overflow-x-auto relative">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">Client ID</th>
                <th className="border border-gray-300 p-2 text-left">Account Holder Name</th>
                <th className="border border-gray-300 p-2 text-left">Account Number</th>
                <th className="border border-gray-300 p-2 text-left">Branch Name</th>
                <th className="border border-gray-300 p-2 text-left">Bank Name</th>
                <th className="border border-gray-300 p-2 text-left">IFSC Code</th>
                <th className="border border-gray-300 p-2 text-left">Verified</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((account) => (
                <tr key={account._id}>
                  <td className="border border-gray-300 p-2">
                    {account.clientId?.clientId || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {account.accountHolderName || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {account.accountNumber || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {account.branchName || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{account.bankName || "-"}</td>
                  <td className="border border-gray-300 p-2">{account.ifscCode || account.ifsc || "-"}</td>
                  <td className="border border-gray-300 p-2">{account.isVerified ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
 
          {/* Pagination Bottom Right */}
          <div className="flex justify-end mt-3 space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
 
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
 
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default RoleActivityForm;