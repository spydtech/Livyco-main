// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from 'lucide-react';
// import cancelData from './cancelData';
// import Header from '../Header';

// export const Cancel = () => {
//     const navigate = useNavigate();

//     const getSharingBadgeClass = (type) => {
//         switch (type.toLowerCase()) {
//             case 'co-living':
//                 return 'bg-[#FFEAD1] text-[#FF9E02]';
//             case 'men':
//                 return 'bg-[#AFD1FF] text-[#0827B2]';
//             case 'women':
//                 return 'bg-[#F8BDE9] text-[#E504AD]';
//             default:
//                 return 'bg-gray-200 text-gray-800';
//         }
//     };

//     return (
//         <>
//         <Header />
//         <div className='flex flex-col md:px-20 px-4 justify-center content-center py-20'>
//             {/* Back Button */}
//             <div className="flex items-center p-1">
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="flex items-center gap-2 px-4 py-2 rounded"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                     Booking History
//                 </button>
//             </div>

//             {/* Card List */}
//             <div className="flex flex-col mt-6 space-y-5 ">
//                 {cancelData.map((item, i) => (
//                     <div
//                         key={i}
//                         className="flex flex-col md:flex-row border-2 rounded-2xl shadow-xl overflow-hidden"
//                     >
//                         <img
//                             onClick={() => {
//                                 console.log("Navigating to review", item);
//                                 navigate("/user/pay-rent", { state: { name: item.name, date: item.date,sharing:item.sharing,image:item.image,amount:item.amount } });
//                             }}
//                             src={item.image}
//                             alt="Building"
//                             className="cursor-pointer w-full md:w-1/4 h-[200px] p-5 md:h-[250px] object-cover rounded-3xl md:rounded-t-none md:rounded-l-3xl"
//                         />

//                         <div className="flex-1 p-4  flex flex-col justify-between ">
//                             <div className='space-y-4'>
//                                 <div className='flex justify-between items-center'>
//                                     <p className="text-lg font-bold">{item.name}</p>
//                                     <p className={`text-sm px-3 py-1 rounded-full ${getSharingBadgeClass(item.sharing)}`}>
//                                         {item.sharing}
//                                     </p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg font-semibold">Check-in Date -</p>
//                                     <p className="text-sm">{item.date}</p>
//                                 </div>

//                                 <div className='flex items-center gap-5'>
//                                     <p className="text-lg  ">Amount Paid</p>
//                                     <p className="text-xl">{item.amount}</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-center'>
//                                 <button className="
//   w-full text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-full
//   hover:bg-[#0827B2] hover:
//   hover:transition hover:duration-300 hover:ease-in
//   hover:ring-2 hover:ring-white hover:ring-inset hover:ring-opacity-40
// ">
//                                     Cancel Booking
//                                 </button>

//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         </>
//     );
// };


import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from '../Header';

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
            const response = await fetch(`http://localhost:5000/api/auth/bookings/${bookingId}/cancel`, {
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
                    // Refresh the page or update the booking list
                    navigate(0); // Reload the current page
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
                        {/* Property Image - You might want to add actual property images */}
                        <div className="w-full md:w-1/4 h-[200px] md:h-[250px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Property Image</span>
                        </div>

                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div className='space-y-4'>
                                <div className='flex justify-between items-center'>
                                    <p className="text-lg font-bold">
                                        {bookingData.booking?.propertyId?.name || bookingData.booking?.property || 'Property Name'}
                                    </p>
                                    <p className={`text-sm px-3 py-1 rounded-full ${getSharingBadgeClass(bookingData.booking?.roomType?.type)}`}>
                                        {bookingData.booking?.roomType?.type || 'Room Type'}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg font-semibold">Check-in Date -</p>
                                    <p className="text-sm">
                                        {bookingData.booking?.moveInDate ? new Date(bookingData.booking.moveInDate).toLocaleDateString() : 'Not specified'}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Amount Paid</p>
                                    <p className="text-xl">
                                        ₹ {bookingData.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 }) || '0.00'}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Transaction ID</p>
                                    <p className="text-sm font-mono">
                                        {bookingData.transactionId || 'N/A'}
                                    </p>
                                </div>

                                <div className='flex items-center gap-5'>
                                    <p className="text-lg">Booking Status</p>
                                    <p className="text-sm font-semibold text-green-600">
                                        {bookingData.booking?.bookingStatus || 'Confirmed'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className='flex justify-center mt-4'>
                                <button 
                                    className="w-full text-[#0827B2] border border-[#0827B2] px-4 py-2 rounded-full hover:bg-[#0827B2] hover:text-white transition duration-300 ease-in"
                                    onClick={() => handleCancelBooking(bookingData.booking?._id)}
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