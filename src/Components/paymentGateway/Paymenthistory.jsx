// import React from 'react'
// import { useNavigate,useLocation } from "react-router-dom";
// import { ArrowLeft } from 'lucide-react';
// import Header from '../Header';
// import { useState, useEffect } from 'react';

// const Paymenthistory = () => {
//     const navigate = useNavigate();
    
//     const id = "xxxxxxxxxxxxxxxx"
//      const location = useLocation();
//     const { amount, name, date, sharing, image } = location.state || {};
// // borrowed data

//     return (
//         <>
//         <Header />
//          <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center gap-2 px-4  rounded pt-24"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                         <span className="whitespace-nowrap">Transaction</span>
//                     </button>
//             <div className="flex flex-col md:px-20 px-4 w-full max-w-4xl justify-center mx-auto ">
//                 {/*back button */}
//                 <div className="flex items-center p-1">
                   
//                 </div>
//                 {/*card */}
//                 <div className=' p-3 rounded-lg shadow-lg mt-5'>
//                     <div className="flex flex-col sm:flex-row justify-between  gap-6  ">
//                         <div className="flex gap-5 flex-1 min-w-0">
//                             <div className="bg-[#6A029A] text-white rounded-lg flex items-center justify-center aspect-square w-12 flex-shrink-0">
//                                 VS
//                             </div>
//                             <div className="flex flex-col overflow-hidden">
//                                 <p className="text-sm text-gray-600 truncate">Paid to</p>
//                                 <p className="font-medium truncate">{name || "Sender's name"}</p>
//                             </div>
//                         </div>
//                         <div className="flex cursor-pointer">
//                             <div className="bg-[#0080001A] rounded-full w-11 h-11 flex items-center justify-center overflow-hidden">
//                                 <div className="text-[#008000] transform rotate-[130deg] scale-x-[1.7] scale-y-[1.1] flex items-center justify-center">
//                                     <ArrowLeft strokeWidth={1} className="w-6 h-6" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-1 mt-2">
//                         <p className="text-xl font-semibold">{amount != null ? amount : "00.0000"}</p>
//                         <p className="text-sm text-gray-500">dd/mm/yyyy</p>
//                         <p className="text-sm ">Transaction ID - {id}</p>
//                         <div className="flex items-center">
//                             <button className="bg-[#FEE123] px-8 py-2 rounded-lg text-sm font-medium mt-1">
//                                 Download Receipt
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Paymenthistory






import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Download } from 'lucide-react';
import Header from '../Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { bookingAPI } from '../../Clients-components/PropertyController';

const PaymentHistory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch payment data from user bookings
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
               const response = await bookingAPI.getUserBookings();

                if (response.data.success && response.data.bookings.length > 0) {
                    // Get the most recent booking with payment data
                    const latestBooking = response.data.bookings[0];
                    
                    // Extract payment information
                    const paymentInfo = {
                        bookingId: latestBooking.id,
                        propertyName: latestBooking.property?.name || 'Property',
                        amount: latestBooking.paymentInfo?.paidAmount || 0,
                        transactionId: latestBooking.paymentInfo?.transactionId || 'N/A',
                        paymentDate: latestBooking.paymentInfo?.paymentDate || latestBooking.createdAt,
                        paymentStatus: latestBooking.paymentInfo?.paymentStatus || 'pending',
                        paymentMethod: latestBooking.paymentInfo?.paymentMethod || 'razorpay',
                        razorpayOrderId: latestBooking.paymentInfo?.razorpayOrderId,
                        razorpayPaymentId: latestBooking.paymentInfo?.razorpayPaymentId,
                        roomType: latestBooking.roomType,
                        moveInDate: latestBooking.moveInDate,
                        // Payment summary
                        paymentSummary: latestBooking.paymentSummary,
                        // All payments history
                        payments: latestBooking.payments || []
                    };
                    
                    setPaymentData(paymentInfo);
                } else {
                    setError('No booking or payment data found');
                }
            } catch (err) {
                console.error('Error fetching payment data:', err);
                setError('Failed to load payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Format time
    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Download receipt handler
    const handleDownloadReceipt = () => {
        if (!paymentData) return;
        
        // Create receipt content
        const receiptContent = `
            PAYMENT RECEIPT
            ================
            
            Transaction ID: ${paymentData.transactionId}
            Booking ID: ${paymentData.bookingId}
            Date: ${formatDate(paymentData.paymentDate)}
            Time: ${formatTime(paymentData.paymentDate)}
            
            Property: ${paymentData.propertyName}
            Room Type: ${paymentData.roomType}
            Move-in Date: ${formatDate(paymentData.moveInDate)}
            
            Payment Details:
            ---------------
            Amount Paid: ${formatCurrency(paymentData.amount)}
            Payment Method: ${paymentData.paymentMethod}
            Status: ${paymentData.paymentStatus.toUpperCase()}
            
            ${paymentData.razorpayOrderId ? `Razorpay Order ID: ${paymentData.razorpayOrderId}` : ''}
            ${paymentData.razorpayPaymentId ? `Razorpay Payment ID: ${paymentData.razorpayPaymentId}` : ''}
            
            Thank you for your payment!
        `;

        // Create and download text file
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `payment-receipt-${paymentData.transactionId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0827B2]"></div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 self-start mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                        <span className="whitespace-nowrap">Back</span>
                    </button>
                    <div className="text-center">
                        <p className="text-red-500 text-lg">{error}</p>
                        <button 
                            onClick={() => navigate('/bookings')}
                            className="mt-4 bg-[#0827B2] text-white px-6 py-2 rounded-lg"
                        >
                            View Bookings
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (!paymentData) {
        return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 self-start mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                        <span className="whitespace-nowrap">Back</span>
                    </button>
                    <p className="text-gray-500">No payment data available</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col md:px-20 px-4 w-full max-w-4xl justify-center mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 pt-24 self-start"
                >
                    <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
                    <span className="whitespace-nowrap">Transaction History</span>
                </button>

                {/* Payment Card */}
                <div className='p-6 rounded-lg shadow-lg mt-5 border border-gray-200'>
                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="flex gap-5 flex-1 min-w-0">
                            <div className="bg-[#6A029A] text-white rounded-lg flex items-center justify-center aspect-square w-12 flex-shrink-0">
                                {paymentData.propertyName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm text-gray-600">Paid to</p>
                                <p className="font-medium truncate">{paymentData.propertyName}</p>
                                <p className="text-sm text-gray-500 mt-1">{paymentData.roomType}</p>
                            </div>
                        </div>
                        <div className="flex cursor-pointer">
                            <div className={`rounded-full w-11 h-11 flex items-center justify-center overflow-hidden ${
                                paymentData.paymentStatus === 'paid' ? 'bg-[#0080001A]' : 'bg-[#FFA5001A]'
                            }`}>
                                <div className={`transform rotate-[130deg] scale-x-[1.7] scale-y-[1.1] flex items-center justify-center ${
                                    paymentData.paymentStatus === 'paid' ? 'text-[#008000]' : 'text-[#FFA500]'
                                }`}>
                                    <ArrowLeft strokeWidth={1} className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Amount and Details */}
                    <div className="space-y-3 mt-4">
                        <p className="text-2xl font-semibold text-gray-800">
                            {formatCurrency(paymentData.amount)}
                        </p>
                        
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                paymentData.paymentStatus === 'paid' 
                                    ? 'bg-green-100 text-green-800'
                                    : paymentData.paymentStatus === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {paymentData.paymentStatus.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500 capitalize">
                                • {paymentData.paymentMethod}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Payment Date</p>
                                <p className="font-medium">
                                    {formatDate(paymentData.paymentDate)} at {formatTime(paymentData.paymentDate)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Move-in Date</p>
                                <p className="font-medium">{formatDate(paymentData.moveInDate)}</p>
                            </div>
                        </div>

                        <div className="border-t pt-3">
                            <p className="text-sm text-gray-600">Transaction ID</p>
                            <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                                {paymentData.transactionId}
                            </p>
                        </div>

                        {/* Payment Summary */}
                        {paymentData.paymentSummary && (
                            <div className="border-t pt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Payment Summary</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Due:</span>
                                        <span className="font-medium">{formatCurrency(paymentData.paymentSummary.totalDue)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Amount Paid:</span>
                                        <span className="font-medium text-green-600">{formatCurrency(paymentData.paymentSummary.totalPaid)}</span>
                                    </div>
                                    {paymentData.paymentSummary.outstandingAmount > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Outstanding:</span>
                                            <span className="font-medium text-red-600">{formatCurrency(paymentData.paymentSummary.outstandingAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`font-medium ${
                                            paymentData.paymentSummary.isFullyPaid ? 'text-green-600' : 'text-orange-600'
                                        }`}>
                                            {paymentData.paymentSummary.isFullyPaid ? 'Fully Paid' : 'Partial Payment'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Download Receipt Button */}
                        <div className="flex items-center justify-center pt-4">
                            <button 
                                onClick={handleDownloadReceipt}
                                className="flex items-center gap-2 bg-[#FEE123] hover:bg-[#e6c91f] px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Payments History */}
                {paymentData.payments && paymentData.payments.length > 1 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                        <div className="space-y-3">
                            {paymentData.payments.map((payment, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(payment.date)} • {payment.method}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            payment.status === 'completed' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </div>
                                    {payment.description && (
                                        <p className="text-sm text-gray-600 mt-2">{payment.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PaymentHistory;