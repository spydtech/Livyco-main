import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from '../Header';
import { API_BASE_URL } from '../../Clients-components/PropertyController';

export const Cancel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingData = location.state;

    const getSharingBadgeClass = (type) => {
        switch (type?.toLowerCase()) {
            case 'co-living':
                return 'bg-[#FFEAD1] text-[#FF9E02]';
            case 'men':
                return 'bg-[#AFD1FF] text-[#0827B2]';
            case 'women':
                return 'bg-[#F8BDE9] text-[#E504AD]';
            case 'single':
                return 'bg-[#D1FFD1] text-[#00B207]';
            case 'double':
                return 'bg-[#FFD1D1] text-[#B20000]';
            case 'triple':
                return 'bg-[#D1D1FF] text-[#0000B2]';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/bookings/${bookingId}/cancel`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert("Booking cancelled successfully!");
                    navigate(0);
                } else {
                    alert("Failed to cancel booking: " + result.message);
                }
            } else {
                alert("Failed to cancel booking. Please try again.");
            }
        } catch (error) {
            console.error("Cancel booking error:", error);
            alert("An error occurred while cancelling the booking.");
        }
    };

    // If no booking data, show empty state
    if (!bookingData) {
        return (
            <>
                <Header />
                <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
                    <div className="flex items-center p-1">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 rounded"
                        >
                            <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                            Back to Booking
                        </button>
                    </div>
                    <div className="text-center py-8">
                        <p>No booking information found.</p>
                    </div>
                </div>
            </>
        );
    }

    // Extract data from the nested structure
    const booking = bookingData.booking || {};
    const paymentDetails = bookingData.paymentDetails || {};
    const propertyName = booking.propertyName || 'Property Name';
    const roomType = booking.roomType || '';
    const totalAmount = booking.totalAmount || paymentDetails.amount || 0;
    const transactionId = paymentDetails.transactionId || bookingData.paymentId || 'N/A';
    const moveInDate = booking.moveInDate ? new Date(booking.moveInDate).toLocaleDateString() : 'Not specified';
    const status = booking.status || 'confirmed';

    return (
        <>
            <Header />
            <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
                {/* Back Button */}
                <div className="flex items-center p-1">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                        Booking History
                    </button>
                </div>

                {/* Booking Card */}
                <div className="flex flex-col mt-6 space-y-5">
                    <div className="flex flex-col md:flex-row border-2 rounded-2xl shadow-xl overflow-hidden">
                        {/* Property Image */}
                        <div className="w-full md:w-1/4 h-[200px] md:h-[250px] bg-gray-200 flex items-center justify-center">
                            {booking.propertyImages && booking.propertyImages.length > 0 ? (
                                <img 
                                    src={booking.propertyImages[0]} 
                                    alt={propertyName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500">No Image Available</span>
                            )}
                        </div>

                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div className='space-y-4'>
                                <div className='flex justify-between items-center'>
                                    <p className="text-lg font-bold">
                                        {propertyName}
                                    </p>
                                    <p className={`text-sm px-3 py-1 rounded-full ${getSharingBadgeClass(roomType)}`}>
                                        {roomType.charAt(0).toUpperCase() + roomType.slice(1)}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg font-semibold">Check-in Date -</p>
                                    <p className="text-sm">
                                        {moveInDate}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Amount Paid</p>
                                    <p className="text-xl">
                                        ₹ {totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Transaction ID</p>
                                    <p className="text-sm font-mono">
                                        {transactionId}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Booking Status</p>
                                    <p className={`text-sm font-semibold ${
                                        status === 'confirmed' ? 'text-green-600' : 
                                        status === 'cancelled' ? 'text-red-600' : 
                                        'text-yellow-600'
                                    }`}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </p>
                                </div>

                                {/* Additional booking details */}
                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Duration</p>
                                    <p className="text-sm">
                                        {booking.durationMonths ? `${booking.durationMonths} month(s)` : 
                                         booking.durationDays ? `${booking.durationDays} day(s)` : 'Not specified'}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Room Details</p>
                                    <p className="text-sm">
                                        {booking.rooms && booking.rooms.length > 0 
                                            ? booking.rooms.map(room => room.roomIdentifier).join(', ')
                                            : 'No room details'
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            <div className='flex justify-center mt-4'>
                                <button 
                                    className="w-full text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-full hover:bg-[#0827B2] hover:text-white transition duration-300 ease-in"
                                    onClick={() => handleCancelBooking(booking._id)}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


// import React from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from 'lucide-react';
// import Header from '../Header';

// export const Cancel = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const bookingData = location.state;

//     const getSharingBadgeClass = (type) => {
//         switch (type?.toLowerCase()) {
//             case 'co-living':
//                 return 'bg-[#FFEAD1] text-[#FF9E02]';
//             case 'men':
//                 return 'bg-[#AFD1FF] text-[#0827B2]';
//             case 'women':
//                 return 'bg-[#F8BDE9] text-[#E504AD]';
//             case 'single':
//                 return 'bg-[#D1FFD1] text-[#00B207]';
//             case 'double':
//                 return 'bg-[#FFD1D1] text-[#B20000]';
//             case 'triple':
//                 return 'bg-[#D1D1FF] text-[#0000B2]';
//             default:
//                 return 'bg-gray-200 text-gray-800';
//         }
//     };

//     const handleCancelBooking = async (bookingId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/auth/bookings/${bookingId}/cancel`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`
//                 }
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 if (result.success) {
//                     alert("Booking cancelled successfully!");
//                     // Refresh the page or update the booking list
//                     navigate(0); // Reload the current page
//                 } else {
//                     alert("Failed to cancel booking: " + result.message);
//                 }
//             } else {
//                 alert("Failed to cancel booking. Please try again.");
//             }
//         } catch (error) {
//             console.error("Cancel booking error:", error);
//             alert("An error occurred while cancelling the booking.");
//         }
//     };

//     // If no booking data, show empty state
//     if (!bookingData) {
//         return (
//             <>
//                 <Header />
//                 <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
//                     <div className="flex items-center p-1">
//                         <button
//                             onClick={() => navigate(-1)}
//                             className="flex items-center gap-2 px-4 py-2 rounded"
//                         >
//                             <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                             Back to Booking
//                         </button>
//                     </div>
//                     <div className="text-center py-8">
//                         <p>No booking information found.</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     return (
//         <>
//             <Header />
//             <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
//                 {/* Back Button */}
//                 <div className="flex items-center p-1">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center gap-2 px-4 py-2 rounded"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                         Booking History
//                     </button>
//                 </div>

//                 {/* Booking Card */}
//                 <div className="flex flex-col mt-6 space-y-5">
//                     <div className="flex flex-col md:flex-row border-2 rounded-2xl shadow-xl overflow-hidden">
//                         {/* Property Image - You might want to add actual property images */}
//                         <div className="w-full md:w-1/4 h-[200px] md:h-[250px] bg-gray-200 flex items-center justify-center">
//                             <span className="text-gray-500">Property Image</span>
//                         </div>

//                         <div className="flex-1 p-4 flex flex-col justify-between">
//                             <div className='space-y-4'>
//                                 <div className='flex justify-between items-center'>
//                                     <p className="text-lg font-bold">
//                                         {bookingData.booking?.propertyId?.name || bookingData.booking?.property || 'Property Name'}
//                                     </p>
//                                     <p className={`text-sm px-3 py-1 rounded-full ${getSharingBadgeClass(bookingData.booking?.gender || bookingData.booking?.sharingType)}`}>
//                                         {bookingData.booking?.gender || 'lifestyle'}
//                                     </p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg font-semibold">Check-in Date -</p>
//                                     <p className="text-sm">
//                                         {bookingData.booking?.moveInDate ? new Date(bookingData.booking.moveInDate).toLocaleDateString() : 'Not specified'}
//                                     </p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg">Amount Paid</p>
//                                     <p className="text-xl">
//                                         ₹ {bookingData.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 }) || '0.00'}
//                                     </p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg">Transaction ID</p>
//                                     <p className="text-sm font-mono">
//                                         {bookingData.transactionId || 'N/A'}
//                                     </p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg">Booking Status</p>
//                                     <p className="text-sm font-semibold text-green-600">
//                                         {bookingData.booking?.bookingStatus || 'Confirmed'}
//                                     </p>
//                                 </div>
//                             </div>
                            
//                             <div className='flex justify-center mt-4'>
//                                 <button 
//                                     className="w-full text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-full hover:bg-[#0827B2] hover:text-white transition duration-300 ease-in"
//                                     onClick={() => handleCancelBooking(bookingData.booking?._id)}
//                                 >
//                                     Cancel Booking
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };