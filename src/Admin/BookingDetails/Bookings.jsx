import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaBars, FaSearch, FaUser, FaHome, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api";
const ITEMS_PER_PAGE = 5;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingType, setBookingType] = useState("online");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async (type = "online") => {
    try {
      setLoading(true);
      setError("");
      const token =
        localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      let url = `${API_BASE_URL}/auth/bookings`;
      if (type === "offline") url = `${API_BASE_URL}/offline-bookings`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) setBookings(response.data);
      else if (response.data.bookings && Array.isArray(response.data.bookings))
        setBookings(response.data.bookings);
      else setBookings([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(bookingType);
  }, [bookingType]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const tenant =
      bookingType === "online"
        ? b.user || {}
        : typeof b.tenant === "object"
        ? b.tenant
        : { name: b.tenant };
    const property = bookingType === "online" ? b.property || {} : b.propertyId || {};
    const clientId = bookingType === "online" ? tenant.clientId : b.createdBy || "";
    return (
      tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone?.toString().includes(searchTerm) ||
      property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (page) => page >= 1 && page <= totalPages && setCurrentPage(page);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading bookings...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-sm">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <h2 className="text-lg text-red-600 mb-2 font-semibold">Failed to load bookings</h2>
          <p className="text-gray-600 mb-3 text-sm">{error}</p>
          <button
            onClick={() => fetchBookings(bookingType)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!Array.isArray(bookings) || bookings.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-sm">No bookings found.</p>
      </div>
    );

  // ---------- View Details Card  ----------
  if (selectedBooking) {
    const tenant =
      bookingType === "online"
        ? selectedBooking.user || {}
        : typeof selectedBooking.tenant === "object"
        ? selectedBooking.tenant
        : { name: selectedBooking.tenant };
    const property = bookingType === "online" ? selectedBooking.property || {} : selectedBooking.propertyId || {};
    const room =
      bookingType === "online"
        ? selectedBooking.roomDetails?.[0] || {}
        : selectedBooking.roomDetails || {};

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedBooking(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors duration-200 bg-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md border border-gray-100"
          >
            <FaArrowLeft className="text-sm" /> Back to Bookings
          </button>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-[#1e3b8a] p-6 text-white">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tenant Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaUser className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Tenant Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Name" value={tenant.name || "N/A"} />
                  <InfoRow label="Email" value={tenant.email || "N/A"} />
                  <InfoRow label="Phone" value={tenant.phone || "N/A"} />
                  <InfoRow label="Client ID" value={tenant.clientId || selectedBooking.createdBy || "N/A"} />
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaHome className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Property Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Property Name" value={property.name || "N/A"} />
                  <InfoRow label="Address" value={property.address || "N/A"} />
                  <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} />
                  <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || "N/A"} />
                  <InfoRow label="Amenities" value={room.amenities?.join(", ") || "N/A"} />
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaCalendarAlt className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Booking Information</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Move In" value={new Date(selectedBooking.checkInDate || selectedBooking.moveInDate).toLocaleDateString()} />
                  <InfoRow label="Move Out" value={new Date(selectedBooking.checkOutDate || selectedBooking.moveOutDate).toLocaleDateString()} />
                  <InfoRow 
                    label="Status" 
                    value={
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(selectedBooking.status || selectedBooking.bookingStatus)}`}>
                        {(selectedBooking.status || selectedBooking.bookingStatus)?.toUpperCase()}
                      </span>
                    } 
                  />
                  <InfoRow label="Booking ID" value={selectedBooking._id || selectedBooking.id || "N/A"} />
                  <InfoRow label="Created By" value={selectedBooking.createdBy || "N/A"} />
                </div>
              </div>

              {/* Payment & Additional Info */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                    <FaMoneyBillWave className="text-gray-800" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg">Payment & Additional Info</h3>
                </div>
                <div className="space-y-3">
                  <InfoRow label="Payment Status" value={selectedBooking.paymentStatus || "N/A"} />
                  <InfoRow label="Amount Paid" value={selectedBooking.amountPaid ? `$${selectedBooking.amountPaid}` : "N/A"} />
                  <InfoRow label="Total Amount" value={selectedBooking.totalAmount ? `$${selectedBooking.totalAmount}` : "N/A"} />
                  <InfoRow label="Additional Notes" value={selectedBooking.notes || "N/A"} />
                  <InfoRow label="Booking Source" value={bookingType} />
                  <InfoRow label="Created At" value={new Date(selectedBooking.createdAt).toLocaleString()} />
                  <InfoRow label="Updated At" value={new Date(selectedBooking.updatedAt).toLocaleString()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Main Page & Table ----------
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72 mt-6">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 px-10 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition text-sm"
            >
              <FaBars className="text-gray-600" />
              Filter
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded text-sm z-50">
                <button
                  className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    setBookingType("offline");
                    setCurrentPage(1);
                  }}
                >
                  Offline Bookings
                </button>
                <button
                  className="w-full text-left px-3 py-1 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    setBookingType("online");
                    setCurrentPage(1);
                  }}
                >
                  Online Bookings
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold text-xs uppercase">
              <tr>
                <th className="px-4 py-2 border w-40">Client ID</th>
                <th className="px-4 py-2 border w-40">Tenant</th>
                <th className="px-4 py-2 border w-32">Phone</th>
                <th className="px-4 py-2 border w-52">Email</th>
                <th className="px-4 py-2 border w-52">Property</th>
                {bookingType === "online" ? (
                  <>
                    <th className="px-4 py-2 border w-32">Room No</th>
                    <th className="px-4 py-2 border w-40">Room Type</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2 border w-32">Room ID</th>
                    <th className="px-4 py-2 border w-40">Sharing</th>
                  </>
                )}
                <th className="px-4 py-2 border w-40">Move In</th>
                <th className="px-4 py-2 border w-40">Move Out</th>
                <th className="px-4 py-2 border w-36">Status</th>
                <th className="px-4 py-2 border w-36">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((b) => {
                const room =
                  bookingType === "online"
                    ? b.roomDetails?.[0] || {}
                    : b.roomDetails || {};
                const property =
                  bookingType === "online" ? b.property || {} : b.propertyId || {};
                const tenant =
                  bookingType === "online"
                    ? b.user || {}
                    : typeof b.tenant === "object"
                    ? b.tenant
                    : { name: b.tenant };
                const clientId =
                  bookingType === "online" ? tenant.clientId : b.createdBy || "N/A";

                return (
                  <tr key={b._id || b.id} className="hover:bg-gray-50 cursor-pointer transition-all">
                    <td className="px-4 py-2 border">{clientId}</td>
                    <td className="px-4 py-2 border">{tenant.name || "N/A"}</td>
                    <td className="px-4 py-2 border">{tenant.phone || "N/A"}</td>
                    <td className="px-4 py-2 border">{tenant.email || "N/A"}</td>
                    <td className="px-4 py-2 border">{property.name || "N/A"}</td>
                    {bookingType === "online" ? (
                      <>
                        <td className="px-4 py-2 border">{room.roomNumber || "N/A"}</td>
                        <td className="px-4 py-2 border">{room.sharingType || room.roomType || "N/A"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 border">{room.roomIdentifier || "N/A"}</td>
                        <td className="px-4 py-2 border">{room.sharingType || room.roomType || "N/A"}</td>
                      </>
                    )}
                    <td className="px-4 py-2 border">
                      {new Date(b.checkInDate || b.moveInDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(b.checkOutDate || b.moveOutDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(
                          b.status || b.bookingStatus
                        )}`}
                      >
                        {(b.status || b.bookingStatus)?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                        onClick={() => setSelectedBooking(b)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm rounded border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// Helper component for detail view
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-sm font-medium text-gray-600 min-w-[120px]">{label}:</span>
    <span className="text-sm text-gray-800 text-right flex-1">{value}</span>
  </div>
);

export default Bookings;