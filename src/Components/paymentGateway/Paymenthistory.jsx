import React from 'react'
import { useNavigate } from "react-router-dom";
import { 
    ArrowLeft, 
    Download, 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    FileText, 
    CreditCard, 
    Calendar, 
    Home, 
    Receipt, 
    Hash, 
    IndianRupee,
    Building,
    Shield,
    X,
    Copy,
    ExternalLink,
    User,
    Mail,
    Phone,
    MapPin,
    Bed,
    Info,
    ChevronDown,
    ChevronUp,
    Smartphone,
    Wallet,
    Banknote
} from 'lucide-react';
import Header from '../Header';
import { useState, useEffect } from 'react';
import paymentImg from "../../assets/paymentHistory/undraw_credit-card-payments_y0vn.png";
import { bookingAPI } from '../../Clients-components/PropertyController';

const PaymentHistory = () => {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        transaction: true,
        property: false,
        payment: true,
        customer: false
    });

    // Fetch payment data
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                setError(null);
                const response = await bookingAPI.getUserBookings();

                if (response.data.success && response.data.bookings?.length > 0) {
                    const allPayments = [];
                    
                    response.data.bookings.forEach(booking => {
                        // Extract student info from booking
                        const studentInfo = booking.student || booking.user || {};
                        
                        if (booking.payments?.length > 0) {
                            booking.payments.forEach(payment => {
                                allPayments.push({
                                    bookingId: booking._id || booking.id,
                                    propertyId: booking.property?._id || booking.property?.id,
                                    propertyName: booking.property?.name || 'Property',
                                    propertyAddress: booking.property?.address || 'Address not available',
                                    propertyContact: booking.property?.contactNumber || booking.property?.phone || 'N/A',
                                    amount: payment.amount || 0,
                                    baseAmount: payment.baseAmount || payment.amount || 0,
                                    taxAmount: payment.taxAmount || 0,
                                    discount: payment.discount || 0,
                                    transactionId: payment.transactionId || payment.razorpayPaymentId || `TXN-${Date.now()}`,
                                    utrNumber: payment.UTRNumber || payment.upiTransactionId || 'N/A',
                                    paymentDate: payment.date || payment.createdAt || booking.createdAt,
                                    paymentStatus: payment.status || 'pending',
                                    paymentMethod: payment.method || booking.paymentInfo?.paymentMethod || 'razorpay',
                                    razorpayOrderId: payment.razorpayOrderId,
                                    razorpayPaymentId: payment.razorpayPaymentId,
                                    razorpaySignature: payment.razorpaySignature,
                                    roomType: booking.roomType || 'Standard',
                                    roomNumber: booking.roomNumber || 'N/A',
                                    moveInDate: booking.moveInDate || booking.checkInDate,
                                    moveOutDate: booking.moveOutDate || booking.checkOutDate,
                                    bookingDate: booking.createdAt,
                                    paymentType: payment.type || 'advance',
                                    description: payment.description || 'Booking Payment',
                                    notes: payment.notes || '',
                                    referenceNumber: payment.referenceNumber,
                                    bankName: payment.bankName,
                                    branchName: payment.branchName,
                                    accountNumber: payment.accountNumber,
                                    
                                    // Student/Customer Details
                                    studentName: studentInfo.name || studentInfo.fullName || 'N/A',
                                    studentEmail: studentInfo.email || 'N/A',
                                    studentPhone: studentInfo.phone || studentInfo.mobile || 'N/A',
                                    studentId: studentInfo._id || studentInfo.id,
                                    studentAddress: studentInfo.address || 'N/A',
                                    
                                    // Additional booking details
                                    bookingStatus: booking.status || 'confirmed',
                                    depositAmount: booking.depositAmount || 0,
                                    securityDeposit: booking.securityDeposit || 0,
                                    maintenanceCharges: booking.maintenanceCharges || 0,
                                    electricityCharges: booking.electricityCharges || 0,
                                    waterCharges: booking.waterCharges || 0,
                                    otherCharges: booking.otherCharges || 0,
                                    totalAmount: booking.totalAmount || payment.amount || 0,
                                    paidAmount: booking.paidAmount || payment.amount || 0,
                                    balanceAmount: booking.balanceAmount || 0,
                                    
                                    // Payment history
                                    paymentHistory: booking.payments || [],
                                    paymentCount: booking.payments?.length || 1
                                });
                            });
                        } else if (booking.paymentInfo) {
                            allPayments.push({
                                bookingId: booking._id || booking.id,
                                propertyId: booking.property?._id || booking.property?.id,
                                propertyName: booking.property?.name || 'Property',
                                propertyAddress: booking.property?.address || 'Address not available',
                                propertyContact: booking.property?.contactNumber || booking.property?.phone || 'N/A',
                                amount: booking.paymentInfo.paidAmount || 0,
                                baseAmount: booking.paymentInfo.baseAmount || booking.paymentInfo.paidAmount || 0,
                                taxAmount: booking.paymentInfo.taxAmount || 0,
                                discount: booking.paymentInfo.discount || 0,
                                transactionId: booking.paymentInfo.transactionId || `TXN-${Date.now()}`,
                                utrNumber: booking.paymentInfo.UTRNumber || 'N/A',
                                paymentDate: booking.paymentInfo.paymentDate || booking.createdAt,
                                paymentStatus: booking.paymentInfo.paymentStatus || 'pending',
                                paymentMethod: booking.paymentInfo.paymentMethod || 'razorpay',
                                razorpayOrderId: booking.paymentInfo.razorpayOrderId,
                                razorpayPaymentId: booking.paymentInfo.razorpayPaymentId,
                                razorpaySignature: booking.paymentInfo.razorpaySignature,
                                roomType: booking.roomType || 'Standard',
                                roomNumber: booking.roomNumber || 'N/A',
                                moveInDate: booking.moveInDate || booking.checkInDate,
                                moveOutDate: booking.moveOutDate || booking.checkOutDate,
                                bookingDate: booking.createdAt,
                                paymentType: 'advance',
                                description: 'Booking Advance Payment',
                                notes: booking.paymentInfo.notes || '',
                                referenceNumber: booking.paymentInfo.referenceNumber,
                                bankName: booking.paymentInfo.bankName,
                                branchName: booking.paymentInfo.branchName,
                                accountNumber: booking.paymentInfo.accountNumber,
                                
                                // Student/Customer Details
                                studentName: booking.student?.name || booking.user?.name || 'N/A',
                                studentEmail: booking.student?.email || booking.user?.email || 'N/A',
                                studentPhone: booking.student?.phone || booking.user?.phone || 'N/A',
                                studentId: booking.student?._id || booking.user?._id,
                                studentAddress: booking.student?.address || booking.user?.address || 'N/A',
                                
                                // Additional booking details
                                bookingStatus: booking.status || 'confirmed',
                                depositAmount: booking.depositAmount || 0,
                                securityDeposit: booking.securityDeposit || 0,
                                maintenanceCharges: booking.maintenanceCharges || 0,
                                electricityCharges: booking.electricityCharges || 0,
                                waterCharges: booking.waterCharges || 0,
                                otherCharges: booking.otherCharges || 0,
                                totalAmount: booking.totalAmount || booking.paymentInfo.paidAmount || 0,
                                paidAmount: booking.paidAmount || booking.paymentInfo.paidAmount || 0,
                                balanceAmount: booking.balanceAmount || 0,
                                
                                // Payment history
                                paymentHistory: [],
                                paymentCount: 1
                            });
                        }
                    });

                    if (allPayments.length > 0) {
                        const sortedPayments = allPayments.sort((a, b) => 
                            new Date(b.paymentDate) - new Date(a.paymentDate)
                        );
                        setPaymentData(sortedPayments);
                    } else {
                        setPaymentData([]);
                        setError('No payment transactions found');
                    }
                } else {
                    setPaymentData([]);
                    setError('No bookings found');
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.response?.data?.message || 'Failed to load payment history');
                setPaymentData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, []);

    // View details handler
    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPayment(null);
    };

    // Toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // You can add a toast notification here
            console.log('Copied to clipboard:', text);
        });
    };

    // Format functions
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Time';
            return date.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        } catch (e) {
            return 'Invalid Time';
        }
    };

    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return '₹0';
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(numAmount);
    };

    const formatDateTime = (dateString) => {
        return `${formatDate(dateString)} at ${formatTime(dateString)}`;
    };

    const getStatusConfig = (status) => {
        const statusLower = (status || '').toLowerCase();
        switch(statusLower) {
            case 'completed':
            case 'paid':
            case 'success':
                return { 
                    icon: CheckCircle, 
                    bg: 'bg-green-50', 
                    text: 'text-green-700', 
                    border: 'border-green-200', 
                    label: 'Completed',
                    badge: 'bg-green-100 text-green-800'
                };
            case 'pending':
            case 'processing':
                return { 
                    icon: Clock, 
                    bg: 'bg-yellow-50', 
                    text: 'text-yellow-700', 
                    border: 'border-yellow-200', 
                    label: 'Pending',
                    badge: 'bg-yellow-100 text-yellow-800'
                };
            case 'failed':
            case 'rejected':
            case 'cancelled':
                return { 
                    icon: AlertCircle, 
                    bg: 'bg-red-50', 
                    text: 'text-red-700', 
                    border: 'border-red-200', 
                    label: 'Failed',
                    badge: 'bg-red-100 text-red-800'
                };
            case 'refunded':
                return { 
                    icon: Receipt, 
                    bg: 'bg-blue-50', 
                    text: 'text-blue-700', 
                    border: 'border-blue-200', 
                    label: 'Refunded',
                    badge: 'bg-blue-100 text-blue-800'
                };
            default:
                return { 
                    icon: Clock, 
                    bg: 'bg-gray-50', 
                    text: 'text-gray-700', 
                    border: 'border-gray-200', 
                    label: status || 'Unknown',
                    badge: 'bg-gray-100 text-gray-800'
                };
        }
    };

    const getPaymentMethodConfig = (method) => {
        const methodLower = (method || '').toLowerCase();
        switch(methodLower) {
            case 'razorpay': return { icon: Shield, name: 'Razorpay', color: 'text-purple-600' };
            case 'upi': return { icon: Smartphone, name: 'UPI', color: 'text-blue-600' };
            case 'card': return { icon: CreditCard, name: 'Credit/Debit Card', color: 'text-indigo-600' };
            case 'netbanking': return { icon: Building, name: 'Net Banking', color: 'text-green-600' };
            case 'wallet': return { icon: Wallet, name: 'Digital Wallet', color: 'text-orange-600' };
            case 'cash': return { icon: Banknote, name: 'Cash', color: 'text-green-600' };
            case 'bank_transfer': return { icon: Building, name: 'Bank Transfer', color: 'text-blue-600' };
            default: return { icon: CreditCard, name: method || 'Payment', color: 'text-gray-600' };
        }
    };

    const handleDownloadReceipt = (payment) => {
        if (!payment) return;
        const statusConfig = getStatusConfig(payment.paymentStatus);
        const methodConfig = getPaymentMethodConfig(payment.paymentMethod);
        
        const receiptContent = `
╔══════════════════════════════════════════════════════════╗
║                  LIVYCO HOSTELS                          ║
║                 PAYMENT RECEIPT                          ║
╚══════════════════════════════════════════════════════════╝

▬▬▬▬▬▬▬▬▬▬▬▬ TRANSACTION DETAILS ▬▬▬▬▬▬▬▬▬▬▬▬

Booking ID:          ${payment.bookingId}
Transaction ID:      ${payment.transactionId}
UTR/Reference:       ${payment.utrNumber}
Date & Time:         ${formatDateTime(payment.paymentDate)}
Payment Status:      ${statusConfig.label}

▬▬▬▬▬▬▬▬▬▬▬▬ PROPERTY DETAILS ▬▬▬▬▬▬▬▬▬▬▬▬

Property:            ${payment.propertyName}
Address:             ${payment.propertyAddress}
Contact:             ${payment.propertyContact}
Room Type:           ${payment.roomType}
Room Number:         ${payment.roomNumber}
Move-in Date:        ${formatDate(payment.moveInDate)}
Move-out Date:       ${formatDate(payment.moveOutDate) || 'N/A'}

▬▬▬▬▬▬▬▬▬▬▬▬ CUSTOMER DETAILS ▬▬▬▬▬▬▬▬▬▬▬▬

Name:                ${payment.studentName}
Email:               ${payment.studentEmail}
Phone:               ${payment.studentPhone}
Address:             ${payment.studentAddress}

▬▬▬▬▬▬▬▬▬▬▬▬ PAYMENT DETAILS ▬▬▬▬▬▬▬▬▬▬▬▬

Payment Method:      ${methodConfig.name}
Payment Type:        ${payment.paymentType}
Base Amount:         ${formatCurrency(payment.baseAmount)}
Tax Amount:          ${formatCurrency(payment.taxAmount)}
Discount:            ${formatCurrency(payment.discount)}
Total Amount:        ${formatCurrency(payment.amount)}

▬▬▬▬▬▬▬▬▬▬▬▬ BREAKDOWN ▬▬▬▬▬▬▬▬▬▬▬▬

Security Deposit:    ${formatCurrency(payment.securityDeposit)}
Maintenance:         ${formatCurrency(payment.maintenanceCharges)}
Electricity:         ${formatCurrency(payment.electricityCharges)}
Water:               ${formatCurrency(payment.waterCharges)}
Other Charges:       ${formatCurrency(payment.otherCharges)}

▬▬▬▬▬▬▬▬▬▬▬▬ SUMMARY ▬▬▬▬▬▬▬▬▬▬▬▬

Total Due:           ${formatCurrency(payment.totalAmount)}
Amount Paid:         ${formatCurrency(payment.paidAmount)}
Balance Due:         ${formatCurrency(payment.balanceAmount)}

═══════════════════════════════════════════════════════════
            Thank you for choosing Livyco!
═══════════════════════════════════════════════════════════
        For support: support@livyco.com
        Phone: 1800-XXX-XXXX
═══════════════════════════════════════════════════════════
`;

        const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Livyco-Receipt-${payment.transactionId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Filter payments
    const filteredPayments = paymentData.filter(payment => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'success') {
            return ['completed', 'paid', 'success'].includes(payment.paymentStatus?.toLowerCase());
        }
        if (activeFilter === 'pending') {
            return ['pending', 'processing'].includes(payment.paymentStatus?.toLowerCase());
        }
        if (activeFilter === 'failed') {
            return ['failed', 'rejected', 'cancelled'].includes(payment.paymentStatus?.toLowerCase());
        }
        return true;
    });

    // Get the selected payment's status icon component
    const SelectedStatusIcon = selectedPayment ? getStatusConfig(selectedPayment.paymentStatus).icon : null;
    const selectedStatusConfig = selectedPayment ? getStatusConfig(selectedPayment.paymentStatus) : null;
    const selectedMethodConfig = selectedPayment ? getPaymentMethodConfig(selectedPayment.paymentMethod) : null;

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 pt-16">
                    <div className="container mx-auto px-4 py-8">
                        {/* Loading skeleton */}
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {[1,2,3].map(i => (
                                    <div key={i} className="bg-white rounded-xl p-5">
                                        <div className="h-24 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                {[1,2].map(i => (
                                    <div key={i} className="bg-white rounded-xl p-6">
                                        <div className="h-40 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Back</span>
                                </button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
                                    <p className="text-gray-500 text-sm mt-1">View all your payment transactions</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                {filteredPayments.length} transaction{filteredPayments.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {['all', 'success', 'pending', 'failed'].map(filter => {
                                const filterConfig = {
                                    all: { label: 'All Payments', color: 'bg-gray-100 text-gray-800' },
                                    success: { label: 'Successful', color: 'bg-green-100 text-green-800' },
                                    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
                                    failed: { label: 'Failed', color: 'bg-red-100 text-red-800' }
                                };
                                
                                const count = filter === 'all' ? paymentData.length :
                                            filter === 'success' ? paymentData.filter(p => ['completed', 'paid', 'success'].includes(p.paymentStatus?.toLowerCase())).length :
                                            filter === 'pending' ? paymentData.filter(p => ['pending', 'processing'].includes(p.paymentStatus?.toLowerCase())).length :
                                            paymentData.filter(p => ['failed', 'rejected', 'cancelled'].includes(p.paymentStatus?.toLowerCase())).length;
                                
                                return (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium ${
                                            activeFilter === filter 
                                                ? 'bg-[#0827B2] text-white' 
                                                : filterConfig[filter].color
                                        }`}
                                    >
                                        {filterConfig[filter].label}
                                        <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                                            activeFilter === filter 
                                                ? 'bg-white/20' 
                                                : 'bg-white/80'
                                        }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payment Transactions */}
                    <div className="space-y-4">
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((payment, index) => {
                                const statusConfig = getStatusConfig(payment.paymentStatus);
                                const StatusIcon = statusConfig.icon;
                                const methodConfig = getPaymentMethodConfig(payment.paymentMethod);
                                
                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-3 rounded-lg ${statusConfig.bg} ${statusConfig.border} border`}>
                                                        <StatusIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                            <h3 className="text-lg font-semibold text-gray-900">
                                                                {payment.propertyName}
                                                            </h3>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusConfig.badge}`}>
                                                                <StatusIcon className="w-3 h-3" />
                                                                {statusConfig.label}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <Home className="w-4 h-4" />
                                                                {payment.roomType}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                {formatDate(payment.moveInDate)}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                {methodConfig.icon && <methodConfig.icon className="w-4 h-4" />}
                                                                {methodConfig.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {formatCurrency(payment.amount)}
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        {formatDate(payment.paymentDate)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Hash className="w-4 h-4 text-gray-400" />
                                                        <span className="text-xs font-medium text-gray-500 uppercase">Transaction ID</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <code className="font-mono text-sm bg-gray-50 px-3 py-2 rounded flex-1">
                                                            {payment.transactionId}
                                                        </code>
                                                        <button 
                                                            onClick={() => copyToClipboard(payment.transactionId)}
                                                            className="p-2 text-gray-400 hover:text-gray-600"
                                                            title="Copy Transaction ID"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-gray-400" />
                                                        <span className="text-xs font-medium text-gray-500 uppercase">Booking ID</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <code className="font-mono text-sm bg-gray-50 px-3 py-2 rounded flex-1">
                                                            {payment.bookingId}
                                                        </code>
                                                        <button 
                                                            onClick={() => navigate(`/booking/${payment.bookingId}`)}
                                                            className="p-2 text-gray-400 hover:text-gray-600"
                                                            title="View Booking"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t">
                                                <div className="text-sm text-gray-500">
                                                    <span className="font-medium">Note:</span> {payment.description}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => handleViewDetails(payment)}
                                                        className="px-4 py-2 text-sm font-medium text-[#0827B2] hover:bg-blue-50 rounded-lg border border-[#0827B2]"
                                                    >
                                                        View Full Details
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDownloadReceipt(payment)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#0827B2] hover:bg-[#071e8f] text-white text-sm font-medium rounded-lg"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download Receipt
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                                <img src={paymentImg} alt="No Payments" className="w-48 h-48 mx-auto mb-6 opacity-60" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">No Payment History</h3>
                                <p className="text-gray-500 mb-6">
                                    {activeFilter !== 'all' 
                                        ? `No ${activeFilter} payments found` 
                                        : 'You haven\'t made any payments yet. Complete a booking to see your payment history here.'
                                    }
                                </p>
                                {activeFilter !== 'all' ? (
                                    <button 
                                        onClick={() => setActiveFilter('all')}
                                        className="inline-flex items-center gap-2 bg-[#0827B2] text-white px-6 py-3 rounded-lg font-medium"
                                    >
                                        Show All Payments
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/properties')}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0827B2] to-[#6A029A] text-white px-6 py-3 rounded-lg font-medium"
                                    >
                                        Browse Hostels
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Details Modal */}
            {isModalOpen && selectedPayment && SelectedStatusIcon && selectedStatusConfig && selectedMethodConfig && (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
                onClick={handleCloseModal}
            ></div>

            {/* Modal container */}
            <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white rounded-xl shadow-xl">
                {/* Modal header */}
                <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 py-4 border-b rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${selectedStatusConfig.bg}`}>
                                <SelectedStatusIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Payment Details</h2>
                                <p className="text-xs sm:text-sm text-gray-500">Transaction ID: {selectedPayment.transactionId}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handleDownloadReceipt(selectedPayment)}
                                className="p-2 text-gray-400 hover:text-gray-600"
                                title="Download Receipt"
                            >
                                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal body */}
                <div className="px-4 sm:px-6 py-4 max-h-[70vh] overflow-y-auto">
                    {/* Amount and Status Banner */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {formatCurrency(selectedPayment.amount)}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${selectedStatusConfig.badge}`}>
                                        {selectedStatusConfig.label}
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-500">
                                        • {selectedMethodConfig.name}
                                    </span>
                                </div>
                            </div>
                            <div className="text-left sm:text-right">
                                <div className="text-xs sm:text-sm text-gray-600">Payment Date</div>
                                <div className="text-base sm:text-lg font-semibold text-gray-900">
                                    {formatDateTime(selectedPayment.paymentDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <div className="space-y-4">
                        {/* Transaction Details */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('transaction')}
                                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Transaction Details</h3>
                                </div>
                                {expandedSections.transaction ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                )}
                            </button>
                            {expandedSections.transaction && (
                                <div className="p-3 sm:p-4 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Transaction ID</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded flex-1 truncate">
                                                    {selectedPayment.transactionId}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(selectedPayment.transactionId)}
                                                    className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                                                    title="Copy to clipboard"
                                                >
                                                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">UTR/Reference Number</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded flex-1 truncate">
                                                    {selectedPayment.utrNumber}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(selectedPayment.utrNumber)}
                                                    className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                                                    title="Copy to clipboard"
                                                >
                                                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Booking ID</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded flex-1 truncate">
                                                    {selectedPayment.bookingId}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(selectedPayment.bookingId)}
                                                    className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                                                    title="Copy to clipboard"
                                                >
                                                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Payment Type</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.paymentType}</p>
                                        </div>
                                        {selectedPayment.razorpayOrderId && (
                                            <div className="md:col-span-2">
                                                <label className="text-xs sm:text-sm font-medium text-gray-500">Razorpay Order ID</label>
                                                <code className="block font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded mt-1 truncate">
                                                    {selectedPayment.razorpayOrderId}
                                                </code>
                                            </div>
                                        )}
                                        {selectedPayment.razorpayPaymentId && (
                                            <div className="md:col-span-2">
                                                <label className="text-xs sm:text-sm font-medium text-gray-500">Razorpay Payment ID</label>
                                                <code className="block font-mono text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded mt-1 truncate">
                                                    {selectedPayment.razorpayPaymentId}
                                                </code>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Property Details */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('property')}
                                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Property & Room Details</h3>
                                </div>
                                {expandedSections.property ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                )}
                            </button>
                            {expandedSections.property && (
                                <div className="p-3 sm:p-4 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Property Name</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base font-medium">{selectedPayment.propertyName}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Property Contact</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.propertyContact}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Room Type</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.roomType}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Room Number</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.roomNumber}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Move-in Date</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">
                                                {formatDate(selectedPayment.moveInDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Move-out Date</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">
                                                {formatDate(selectedPayment.moveOutDate) || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Property Address</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">
                                                {selectedPayment.propertyAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Breakdown */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('payment')}
                                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Payment Breakdown</h3>
                                </div>
                                {expandedSections.payment ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                )}
                            </button>
                            {expandedSections.payment && (
                                <div className="p-3 sm:p-4 bg-white">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm sm:text-base">Base Amount:</span>
                                            <span className="font-medium text-sm sm:text-base">{formatCurrency(selectedPayment.baseAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm sm:text-base">Tax Amount:</span>
                                            <span className="font-medium text-red-600 text-sm sm:text-base">+ {formatCurrency(selectedPayment.taxAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm sm:text-base">Discount:</span>
                                            <span className="font-medium text-green-600 text-sm sm:text-base">- {formatCurrency(selectedPayment.discount)}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                                                <span>Total Amount:</span>
                                                <span>{formatCurrency(selectedPayment.amount)}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Additional charges */}
                                        <div className="pt-4 border-t">
                                            <h4 className="font-medium text-gray-700 text-sm sm:text-base mb-3">Additional Charges</h4>
                                            <div className="space-y-2">
                                                {selectedPayment.securityDeposit > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Security Deposit:</span>
                                                        <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.securityDeposit)}</span>
                                                    </div>
                                                )}
                                                {selectedPayment.maintenanceCharges > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Maintenance Charges:</span>
                                                        <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.maintenanceCharges)}</span>
                                                    </div>
                                                )}
                                                {selectedPayment.electricityCharges > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Electricity Charges:</span>
                                                        <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.electricityCharges)}</span>
                                                    </div>
                                                )}
                                                {selectedPayment.waterCharges > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Water Charges:</span>
                                                        <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.waterCharges)}</span>
                                                    </div>
                                                )}
                                                {selectedPayment.otherCharges > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Other Charges:</span>
                                                        <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.otherCharges)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Payment summary */}
                                        <div className="pt-4 border-t">
                                            <h4 className="font-medium text-gray-700 text-sm sm:text-base mb-3">Payment Summary</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs sm:text-sm text-gray-600">Total Due:</span>
                                                    <span className="text-xs sm:text-sm font-medium">{formatCurrency(selectedPayment.totalAmount)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs sm:text-sm text-gray-600">Amount Paid:</span>
                                                    <span className="text-xs sm:text-sm font-medium text-green-600">{formatCurrency(selectedPayment.paidAmount)}</span>
                                                </div>
                                                {selectedPayment.balanceAmount > 0 && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs sm:text-sm text-gray-600">Balance Due:</span>
                                                        <span className="text-xs sm:text-sm font-medium text-red-600">{formatCurrency(selectedPayment.balanceAmount)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Customer Details */}
                        <div className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection('customer')}
                                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Customer Details</h3>
                                </div>
                                {expandedSections.customer ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                )}
                            </button>
                            {expandedSections.customer && (
                                <div className="p-3 sm:p-4 bg-white">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Name</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.studentName}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.studentEmail}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Phone</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.studentPhone}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Customer ID</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.studentId || 'N/A'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-xs sm:text-sm font-medium text-gray-500">Address</label>
                                            <p className="mt-1 text-gray-900 text-sm sm:text-base">{selectedPayment.studentAddress}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        {selectedPayment.notes && (
                            <div className="border rounded-lg overflow-hidden">
                                <div className="p-3 sm:p-4 bg-yellow-50 border-b">
                                    <div className="flex items-center gap-2">
                                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Additional Notes</h3>
                                    </div>
                                </div>
                                <div className="p-3 sm:p-4 bg-white">
                                    <p className="text-gray-700 text-sm sm:text-base">{selectedPayment.notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Payment History */}
                        {selectedPayment.paymentHistory && selectedPayment.paymentHistory.length > 0 && (
                            <div className="border rounded-lg overflow-hidden">
                                <div className="p-3 sm:p-4 bg-gray-50">
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Payment History</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                        {selectedPayment.paymentCount} payment{selectedPayment.paymentCount !== 1 ? 's' : ''} for this booking
                                    </p>
                                </div>
                                <div className="p-3 sm:p-4 bg-white">
                                    <div className="space-y-3">
                                        {selectedPayment.paymentHistory.map((payment, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-sm sm:text-base">{formatCurrency(payment.amount)}</div>
                                                    <div className="text-xs sm:text-sm text-gray-500 truncate">
                                                        {formatDate(payment.date)} • {payment.method} • {payment.transactionId}
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ml-2 ${
                                                    payment.status === 'completed' || payment.status === 'paid'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal footer - FIXED RESPONSIVENESS */}
                <div className="sticky bottom-0 bg-white px-4 sm:px-6 py-4 border-t rounded-b-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left w-full sm:w-auto">
                            Need help? Contact support at support@livyco.com
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                            <button
                                onClick={handleCloseModal}
                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border flex-1 sm:flex-none min-w-[80px] text-center"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleDownloadReceipt(selectedPayment)}
                                className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-[#0827B2] hover:bg-[#071e8f] text-white text-xs sm:text-sm font-medium rounded-lg flex-1 sm:flex-none min-w-[140px] text-center"
                            >
                                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Download Receipt</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
        </>
    );
};

export default PaymentHistory;





// import React from 'react'
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft, Download } from 'lucide-react';
// import Header from '../Header';
// import { useState, useEffect } from 'react';
// import paymentImg from "../../assets/paymentHistory/undraw_credit-card-payments_y0vn.png";
// import axios from 'axios';
// import { bookingAPI } from '../../Clients-components/PropertyController';

// const PaymentHistory = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [paymentData, setPaymentData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch payment data from user bookings
//     useEffect(() => {
//         const fetchPaymentData = async () => {
//             try {
//                const response = await bookingAPI.getUserBookings();

//                 if (response.data.success && response.data.bookings.length > 0) {
//                     // Get the most recent booking with payment data
//                     const latestBooking = response.data.bookings[0];
                    
//                     // Extract payment information from payments array (latest payment)
//                     const latestPayment = latestBooking.payments && latestBooking.payments.length > 0 
//                         ? latestBooking.payments[0] 
//                         : null;
                    
//                     if (latestPayment) {
//                         const paymentInfo = {
//                             bookingId: latestBooking.id,
//                             propertyName: latestBooking.property?.name || 'Property',
//                             amount: latestPayment.amount || 0,
//                             transactionId: latestPayment.transactionId || 'N/A',
//                             utrNumber: latestPayment.UTRNumber || 'N/A',
//                             paymentDate: latestPayment.date || latestPayment.paidDate || latestBooking.createdAt,
//                             paymentStatus: latestPayment.status || 'pending',
//                             paymentMethod: latestPayment.method || 'razorpay',
//                             razorpayOrderId: latestPayment.razorpayOrderId,
//                             razorpayPaymentId: latestPayment.razorpayPaymentId,
//                             roomType: latestBooking.roomType,
//                             moveInDate: latestBooking.moveInDate,
                            
//                             // Payment summary
//                             paymentSummary: latestBooking.paymentSummary,
//                             // All payments history
//                             payments: latestBooking.payments || []
//                         };
                        
//                         setPaymentData(paymentInfo);
//                     } else {
//                         // Fallback to paymentInfo if no payments array
//                         const paymentInfo = {
//                             bookingId: latestBooking.id,
//                             propertyName: latestBooking.property?.name || 'Property',
//                             amount: latestBooking.paymentInfo?.paidAmount || 0,
//                             transactionId: latestBooking.paymentInfo?.transactionId || 'N/A',
//                             utrNumber: latestBooking.paymentInfo?.UTRNumber || 'N/A',
//                             paymentDate: latestBooking.paymentInfo?.paymentDate || latestBooking.createdAt,
//                             paymentStatus: latestBooking.paymentInfo?.paymentStatus || 'pending',
//                             paymentMethod: latestBooking.paymentInfo?.paymentMethod || 'razorpay',
//                             razorpayOrderId: latestBooking.paymentInfo?.razorpayOrderId,
//                             razorpayPaymentId: latestBooking.paymentInfo?.razorpayPaymentId,
//                             roomType: latestBooking.roomType,
//                             moveInDate: latestBooking.moveInDate,
                            
//                             // Payment summary
//                             paymentSummary: latestBooking.paymentSummary,
//                             // All payments history
//                             payments: latestBooking.payments || []
//                         };
                        
//                         setPaymentData(paymentInfo);
//                     }
//                 } else {
//                     setError('No booking or payment data found');
//                 }
//             } catch (err) {
//                 console.error('Error fetching payment data:', err);
//                 setError('Failed to load payment history');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPaymentData();
//     }, []);

//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric'
//         });
//     };

//     // Format time
//     const formatTime = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleTimeString('en-IN', {
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     // Format currency
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 2
//         }).format(amount);
//     };

//     // Download receipt handler
//     const handleDownloadReceipt = () => {
//         if (!paymentData) return;
        
//         // Create receipt content
//         const receiptContent = `
//             PAYMENT RECEIPT
//             ================
            
//             Transaction ID: ${paymentData.transactionId}
//             UTR Number: ${paymentData.utrNumber}
//             Booking ID: ${paymentData.bookingId}
//             Date: ${formatDate(paymentData.paymentDate)}
//             Time: ${formatTime(paymentData.paymentDate)}
            
//             Property: ${paymentData.propertyName}
//             Room Type: ${paymentData.roomType}
//             Move-in Date: ${formatDate(paymentData.moveInDate)}
            
//             Payment Details:
//             ---------------
//             Amount Paid: ${formatCurrency(paymentData.amount)}
//             Payment Method: ${paymentData.paymentMethod}
//             Status: ${paymentData.paymentStatus.toUpperCase()}
            
//             ${paymentData.razorpayOrderId ? `Razorpay Order ID: ${paymentData.razorpayOrderId}` : ''}
//             ${paymentData.razorpayPaymentId ? `Razorpay Payment ID: ${paymentData.razorpayPaymentId}` : ''}
            
//             Thank you for your payment!
//         `;

//         // Create and download text file
//         const blob = new Blob([receiptContent], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `payment-receipt-${paymentData.transactionId}.txt`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//     };

//     if (loading) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex justify-center items-center min-h-screen">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0827B2]"></div>
//                 </div>
//             </>
//         );
//     }

//     if (error) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col items-center justify-start py-20   min-h-screen px-4">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center gap-2 px-4 self-start mb-4"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                         <span className="whitespace-nowrap">Back</span>
//                     </button>
//                     <div className="text-center mt-10">
//                         <img
//                             src={paymentImg}
//                             alt="Error"
//                             className="mx-auto mb-6 w-48 h-48 object-contain"
//                         />
//                         <p className="text-gray-500 text-lg">{error}</p>
//                         <button 
//                             onClick={() => navigate('/bookings')}
//                             className="mt-4 bg-[#0827B2] text-white px-6 py-2 rounded-lg"
//                         >
//                             View Bookings
//                         </button>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     if (!paymentData) {
//         return (
//             <>
//                 <Header />
//                 <div className="flex flex-col items-center justify-center min-h-screen px-4">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center gap-2 px-4 self-start mb-4"
//                     >
//                         <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                         <span className="whitespace-nowrap">Back</span>
//                     </button>
//                     <div className="text-center">
//                         <img
//                             src={paymentImg}
//                             alt="Error"
//                             className="mx-auto mb-6 w-48 h-48 object-contain"
//                         />
//                     <p className="text-gray-500">No payment data available</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col md:px-20 px-4 w-full max-w-4xl justify-center mx-auto">
//                 {/* Back button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="flex items-center gap-2 px-4 pt-24 self-start"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-[#0827B2]" />
//                     <span className="whitespace-nowrap">Transaction History</span>
//                 </button>

//                 {/* Payment Card */}
//                 <div className='p-6 rounded-lg shadow-lg mt-5 border border-gray-200'>
//                     <div className="flex flex-col sm:flex-row justify-between gap-6">
//                         <div className="flex gap-5 flex-1 min-w-0">
//                             <div className="bg-[#6A029A] text-white rounded-lg flex items-center justify-center aspect-square w-12 flex-shrink-0">
//                                 {paymentData.propertyName.charAt(0).toUpperCase()}
//                             </div>
//                             <div className="flex flex-col overflow-hidden">
//                                 <p className="text-sm text-gray-600">Paid to</p>
//                                 <p className="font-medium truncate">{paymentData.propertyName}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{paymentData.roomType}</p>
//                             </div>
//                         </div>
//                         <div className="flex cursor-pointer">
//                             <div className={`rounded-full w-11 h-11 flex items-center justify-center overflow-hidden ${
//                                 paymentData.paymentStatus === 'paid' || paymentData.paymentStatus === 'completed' 
//                                     ? 'bg-[#0080001A]' : 'bg-[#FFA5001A]'
//                             }`}>
//                                 <div className={`transform rotate-[130deg] scale-x-[1.7] scale-y-[1.1] flex items-center justify-center ${
//                                     paymentData.paymentStatus === 'paid' || paymentData.paymentStatus === 'completed' 
//                                         ? 'text-[#008000]' : 'text-[#FFA500]'
//                                 }`}>
//                                     <ArrowLeft strokeWidth={1} className="w-6 h-6" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Payment Amount and Details */}
//                     <div className="space-y-3 mt-4">
//                         <p className="text-2xl font-semibold text-gray-800">
//                             {formatCurrency(paymentData.amount)}
//                         </p>
                        
//                         <div className="flex items-center gap-2">
//                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                 paymentData.paymentStatus === 'paid' || paymentData.paymentStatus === 'completed'
//                                     ? 'bg-green-100 text-green-800'
//                                     : paymentData.paymentStatus === 'pending'
//                                     ? 'bg-yellow-100 text-yellow-800'
//                                     : 'bg-red-100 text-red-800'
//                             }`}>
//                                 {paymentData.paymentStatus.toUpperCase()}
//                             </span>
//                             <span className="text-sm text-gray-500 capitalize">
//                                 • {paymentData.paymentMethod}
//                             </span>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                             <div>
//                                 <p className="text-gray-600">Payment Date</p>
//                                 <p className="font-medium">
//                                     {formatDate(paymentData.paymentDate)} at {formatTime(paymentData.paymentDate)}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-gray-600">Move-in Date</p>
//                                 <p className="font-medium">{formatDate(paymentData.moveInDate)}</p>
//                             </div>
//                         </div>

//                         <div className="border-t pt-3">
//                             <p className="text-sm text-gray-600">Transaction ID</p>
//                             <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
//                                 {paymentData.transactionId}
//                             </p>
//                         </div>

//                         {/* UTR Number */}
//                         <div className="border-t pt-3">
//                             <p className="text-sm text-gray-600">UTR Number</p>
//                             <p className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
//                                 {paymentData.utrNumber}
//                             </p>
//                         </div>

//                         {/* Payment Summary */}
//                         {paymentData.paymentSummary && (
//                             <div className="border-t pt-3">
//                                 <p className="text-sm font-medium text-gray-700 mb-2">Payment Summary</p>
//                                 <div className="space-y-1 text-sm">
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Total Due:</span>
//                                         <span className="font-medium">{formatCurrency(paymentData.paymentSummary.totalDue)}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Amount Paid:</span>
//                                         <span className="font-medium text-green-600">{formatCurrency(paymentData.paymentSummary.totalPaid)}</span>
//                                     </div>
//                                     {paymentData.paymentSummary.outstandingAmount > 0 && (
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-600">Outstanding:</span>
//                                             <span className="font-medium text-red-600">{formatCurrency(paymentData.paymentSummary.outstandingAmount)}</span>
//                                         </div>
//                                     )}
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">Status:</span>
//                                         <span className={`font-medium ${
//                                             paymentData.paymentSummary.isFullyPaid ? 'text-green-600' : 'text-orange-600'
//                                         }`}>
//                                             {paymentData.paymentSummary.isFullyPaid ? 'Fully Paid' : 'Partial Payment'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Download Receipt Button */}
//                         <div className="flex items-center justify-center pt-4">
//                             <button 
//                                 onClick={handleDownloadReceipt}
//                                 className="flex items-center gap-2 bg-[#FEE123] hover:bg-[#e6c91f] px-6 py-3 rounded-lg text-sm font-medium transition-colors"
//                             >
//                                 <Download className="w-4 h-4" />
//                                 Download Receipt
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Additional Payments History */}
//                 {paymentData.payments && paymentData.payments.length > 1 && (
//                     <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-4">Payment History</h3>
//                         <div className="space-y-3">
//                             {paymentData.payments.map((payment, index) => (
//                                 <div key={index} className="p-4 border border-gray-200 rounded-lg">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <p className="font-medium">{formatCurrency(payment.amount)}</p>
//                                             <p className="text-sm text-gray-500">
//                                                 {formatDate(payment.date)} • {payment.method} • {payment.transactionId} 
//                                             </p>
//                                             {payment.UTRNumber && (
//                                                 <p className="text-sm text-gray-500">
//                                                     UTR: {payment.UTRNumber}
//                                                 </p>
//                                             )}
//                                         </div>
//                                         <span className={`px-2 py-1 rounded-full text-xs ${
//                                             payment.status === 'completed' || payment.status === 'paid'
//                                                 ? 'bg-green-100 text-green-800'
//                                                 : 'bg-yellow-100 text-yellow-800'
//                                         }`}>
//                                             {payment.status}
//                                         </span>
//                                     </div>
//                                     {payment.description && (
//                                         <p className="text-sm text-gray-600 mt-2">{payment.description}</p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default PaymentHistory;