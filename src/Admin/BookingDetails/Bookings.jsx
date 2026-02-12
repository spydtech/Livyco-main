import React, { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaBars, 
  FaSearch, 
  FaUser, 
  FaHome, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaTimes,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHistory,
  FaExchangeAlt,
  FaRupeeSign,
  FaBell,
  FaEnvelope,
  FaCreditCard,
  FaShieldAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelopeOpen,
  FaIdCard,
  FaReceipt,
  FaPrint,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaSync,
  FaChartLine,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaPlug,
  FaWifi,
  FaSignal,
  FaCloud
} from "react-icons/fa";
import { 
  adminBookingsAPI, 
  adminBankAccountsAPI, 
  adminPaymentsAPI
} from "../adminController";

const ITEMS_PER_PAGE = 10;

// Helper component for detail view
const InfoRow = ({ label, value, highlight = false, icon: Icon = null }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2 min-w-[180px]">
      {Icon && <Icon className={`text-sm ${highlight ? 'text-blue-500' : 'text-gray-400'}`} />}
      <span className={`text-sm font-medium ${highlight ? 'text-blue-600' : 'text-gray-600'}`}>
        {label}:
      </span>
    </div>
    <span className={`text-sm ${highlight ? 'text-blue-600 font-semibold' : 'text-gray-800'} text-right flex-1 break-words max-w-[250px]`}>
      {value}
    </span>
  </div>
);

// Status Badge Component
const StatusBadge = ({ status, type = "booking" }) => {
  const getStatusConfig = () => {
    const statusLower = status?.toLowerCase() || 'pending';
    
    if (type === "payment") {
      switch(statusLower) {
        case 'completed': return { color: 'bg-green-100 text-green-800', icon: '✓' };
        case 'failed': return { color: 'bg-red-100 text-red-800', icon: '✗' };
        case 'refunded': return { color: 'bg-purple-100 text-purple-800', icon: '↺' };
        case 'pending': return { color: 'bg-yellow-100 text-yellow-800', icon: '⏳' };
        default: return { color: 'bg-gray-100 text-gray-800', icon: '?' };
      }
    } else if (type === "transfer") {
      switch(statusLower) {
        case 'completed': return { color: 'bg-green-100 text-green-800', icon: '✓' };
        case 'processing': return { color: 'bg-blue-100 text-blue-800', icon: '⏳' };
        case 'failed': return { color: 'bg-red-100 text-red-800', icon: '✗' };
        case 'manual_pending':
        case 'pending': return { color: 'bg-yellow-100 text-yellow-800', icon: '🔄' };
        case 'partial': return { color: 'bg-orange-100 text-orange-800', icon: '½' };
        default: return { color: 'bg-gray-100 text-gray-800', icon: '?' };
      }
    } else {
      switch(statusLower) {
        case 'approved':
        case 'confirmed':
        case 'completed': return { color: 'bg-green-100 text-green-800', icon: '✓' };
        case 'pending':
        case 'processing': return { color: 'bg-yellow-100 text-yellow-800', icon: '⏳' };
        case 'cancelled':
        case 'rejected':
        case 'failed': return { color: 'bg-red-100 text-red-800', icon: '✗' };
        case 'checked_in': return { color: 'bg-blue-100 text-blue-800', icon: '🏠' };
        case 'checked_out': return { color: 'bg-gray-100 text-gray-800', icon: '🏃' };
        default: return { color: 'bg-gray-100 text-gray-800', icon: '?' };
      }
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${config.color}`}>
      <span>{config.icon}</span>
      <span>{status?.toUpperCase() || 'PENDING'}</span>
    </span>
  );
};

// Loading Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 text-sm">{message}</p>
      <p className="text-gray-500 text-xs mt-2">Please wait while we fetch your data</p>
    </div>
  </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-lg text-red-600 mb-2 font-bold">Connection Error</h2>
      <p className="text-gray-600 mb-4 text-sm">
        {error || 'Failed to fetch bookings data'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 text-sm transition shadow-sm"
        >
          Retry Connection
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 bg-gray-600 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 text-sm transition shadow-sm"
        >
          Refresh Page
        </button>
      </div>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className={`bg-gradient-to-r ${color} rounded-xl p-5 border ${color.includes('blue') ? 'border-blue-200' : color.includes('green') ? 'border-green-200' : color.includes('yellow') ? 'border-yellow-200' : 'border-gray-200'}`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium opacity-80 mb-1">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-xs opacity-70 mt-1">{subtitle}</div>}
      </div>
      <div className="p-3 bg-white bg-opacity-30 rounded-lg">
        <Icon className="text-xl" />
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyBookings = ({ bookingType, onRefresh }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
    <div className="text-gray-400 text-5xl mb-4">📋</div>
    <h2 className="text-lg text-gray-600 mb-2 font-semibold">No Bookings Found</h2>
    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
      {bookingType === "online" 
        ? "No online bookings available. Online bookings will appear here when customers make payments." 
        : "No offline bookings available. Offline bookings can be added manually."}
    </p>
    <button
      onClick={onRefresh}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 text-sm transition shadow-sm flex items-center gap-2 mx-auto"
    >
      <FaSync /> Refresh Bookings
    </button>
  </div>
);

// Transfer Popup Component
const TransferPopup = ({
  booking,
  payment,
  bankAccounts,
  bankAccountLoading,
  selectedBankAccount,
  onSelectBankAccount,
  onClose,
  onTransferComplete
}) => {
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferStatus, setTransferStatus] = useState(null);
  const [transferNotes, setTransferNotes] = useState('');
  const [useRazorpay, setUseRazorpay] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [manualTransferForm, setManualTransferForm] = useState({
    bookingId: '',
    originalAmount: 0,
    transactionReference: '',
    utrNumber: '',
    paymentMode: 'Bank Transfer',
    screenshotUrl: ''
  });

  useEffect(() => {
    if (booking) {
      const bookingId = booking._id || booking.id || '';
      const originalAmount = getTotalPaidAmount();
      const transactionReference = `MANUAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      setManualTransferForm({
        bookingId,
        originalAmount,
        transactionReference,
        utrNumber: '',
        paymentMode: 'Bank Transfer',
        screenshotUrl: ''
      });
    }
  }, [booking, payment]);

  const calculateTransferAmounts = (amount) => {
    const platformCommission = amount * 0.05;
    const gstOnCommission = platformCommission * 0.18;
    const totalPlatformEarnings = platformCommission + gstOnCommission;
    const clientAmount = amount - totalPlatformEarnings;
    
    return {
      clientAmount,
      platformCommission,
      gstOnCommission,
      totalPlatformEarnings,
      breakdown: {
        totalPayment: amount,
        platformCommissionRate: '5%',
        gstRate: '18%',
        platformCommission,
        gstOnCommission,
        clientAmount
      }
    };
  };

  const getTransferAmount = () => {
    if (payment?.transferDetails?.clientAmount) {
      return payment.transferDetails.clientAmount;
    }
    
    const paymentAmount = payment?.amount || 0;
    const amounts = calculateTransferAmounts(paymentAmount);
    return amounts.clientAmount;
  };

  const getPlatformCommission = () => {
    if (payment?.transferDetails?.platformCommission) {
      return payment.transferDetails.platformCommission;
    }
    
    const paymentAmount = payment?.amount || 0;
    const amounts = calculateTransferAmounts(paymentAmount);
    return amounts.platformCommission;
  };

  const getTotalPaidAmount = () => {
    console.log('Getting total paid amount:', {
      booking: booking,
      payment: payment,
      bookingPaymentInfo: booking?.paymentInfo,
      bookingTransferDetails: booking?.transferDetails,
      bookingPricing: booking?.pricing
    });

    if (payment?.amount) {
      console.log('Using payment.amount:', payment.amount);
      return payment.amount;
    }
    
    if (booking?.paymentInfo?.paidAmount !== undefined) {
      console.log('Using booking.paymentInfo.paidAmount:', booking.paymentInfo.paidAmount);
      return booking.paymentInfo.paidAmount;
    }
    
    if (booking?.transferDetails?.totalAmount !== undefined) {
      console.log('Using booking.transferDetails.totalAmount:', booking.transferDetails.totalAmount);
      return booking.transferDetails.totalAmount;
    }
    
    if (booking?.pricing?.totalAmount !== undefined) {
      console.log('Using booking.pricing.totalAmount:', booking.pricing.totalAmount);
      return booking.pricing.totalAmount;
    }
    
    if (booking?.payments && Array.isArray(booking.payments) && booking.payments.length > 0) {
      const total = booking.payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      console.log('Using sum of payments:', total);
      return total;
    }
    
    console.log('No amount found, returning 1 as default');
    return 1;
  };

  const handleManualTransferSubmit = async () => {
    if (!selectedBankAccount) {
      alert('Please select a bank account to proceed with the transfer.');
      return;
    }

    console.log('Validating form:', {
      bookingId: manualTransferForm.bookingId,
      originalAmount: manualTransferForm.originalAmount,
      transactionReference: manualTransferForm.transactionReference,
      hasBookingId: !!manualTransferForm.bookingId && manualTransferForm.bookingId.trim() !== '',
      hasAmount: manualTransferForm.originalAmount > 0,
      hasReference: !!manualTransferForm.transactionReference && manualTransferForm.transactionReference.trim() !== '',
      selectedBankAccount: selectedBankAccount
    });

    if (!manualTransferForm.bookingId || manualTransferForm.bookingId.trim() === '') {
      alert('Booking ID is required.');
      return;
    }

    if (!manualTransferForm.originalAmount || manualTransferForm.originalAmount <= 0) {
      alert(`Amount must be greater than 0. Current amount: ${manualTransferForm.originalAmount}`);
      return;
    }

    if (!manualTransferForm.transactionReference || manualTransferForm.transactionReference.trim() === '') {
      alert('Transaction Reference is required.');
      return;
    }

    try {
      setTransferLoading(true);
      setTransferStatus(null);

      const clientId = selectedBankAccount.clientId || booking?.clientId;
      
      console.log('Client ID to send:', {
        stringClientId: booking?.clientId, 
        bankAccountClientId: selectedBankAccount.clientId, 
        usingId: clientId
      });

      const transferData = {
        bookingId: manualTransferForm.bookingId.trim(),
        bankAccountId: selectedBankAccount._id,
        originalAmount: manualTransferForm.originalAmount,
        transactionReference: manualTransferForm.transactionReference.trim(),
        notes: transferNotes || `Manual transfer for booking ${booking?._id?.substring(0, 8) || manualTransferForm.bookingId.substring(0, 8)}...`,
        utrNumber: manualTransferForm.utrNumber.trim(),
        paymentMode: manualTransferForm.paymentMode,
        screenshotUrl: manualTransferForm.screenshotUrl.trim(),
        clientId: clientId,
        clientName: selectedBankAccount.accountHolderName
      };

      console.log('📤 Sending manual transfer data:', transferData);

      const response = await adminPaymentsAPI.initiateManualTransfer(transferData);

      console.log('✅ Manual transfer API response:', response.data);
      
      if (response.data && response.data.success) {
        const successMessage = response.data.message || 'Manual transfer recorded successfully';
        
        setTransferStatus({
          type: 'success',
          message: successMessage,
          details: response.data.data || response.data
        });
        
        alert(`✅ ${successMessage}\n\nReference: ${manualTransferForm.transactionReference}\nAmount: ₹${manualTransferForm.originalAmount.toLocaleString('en-IN')}`);
        
        setTimeout(() => {
          onClose();
          if (onTransferComplete) {
            onTransferComplete(response.data.data || response.data);
          }
        }, 2000);
        
      } else {
        setTransferStatus({
          type: 'error',
          message: response.data?.message || 'Manual transfer failed',
          details: response.data?.error
        });
        
        alert(`Manual Transfer Failed:\n${response.data?.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('🔥 Manual transfer process error:', error.response?.data || error);
      
      let errorMessage = 'Manual transfer process failed.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (errorMessage.includes('Cast to ObjectId')) {
        errorMessage = 'Invalid client ID format. Please ensure the property owner has a valid account.';
      }
      
      setTransferStatus({
        type: 'error',
        message: errorMessage,
        details: error.response?.data
      });
      
      alert(`❌ Manual Transfer Failed:\n${errorMessage}`);
    } finally {
      setTransferLoading(false);
    }
  };

  const transferAmounts = calculateTransferAmounts(getTotalPaidAmount());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Transfer Payment to Property Owner</h3>
              <p className="text-blue-100 mt-1 text-sm">
                Transfer payment amount to property owner's bank account
              </p>
              {isLiveMode && useRazorpay && (
                <div className="mt-2 p-2 bg-red-900 bg-opacity-30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-400" />
                    <span className="text-yellow-200 text-sm font-semibold">LIVE MODE - Real Money Transfer</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2"
              disabled={transferLoading}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Transfer Method</h4>
            <div className="flex gap-4">
              <button
                onClick={() => setUseRazorpay(true)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  useRazorpay 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${useRazorpay ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <FaCreditCard className={`text-lg ${useRazorpay ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="text-left">
                    <h5 className="font-semibold text-gray-800">Razorpay Transfer</h5>
                    <p className="text-sm text-gray-600">
                      {isLiveMode ? 'Automated transfer via Razorpay (Real Money)' : 'Test transfer (Simulated)'}
                    </p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setUseRazorpay(false)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  !useRazorpay 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${!useRazorpay ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <FaExchangeAlt className={`text-lg ${!useRazorpay ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="text-left">
                    <h5 className="font-semibold text-gray-800">Manual Transfer</h5>
                    <p className="text-sm text-gray-600">Record manual bank transfer</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FaReceipt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-lg">Payment Transfer Summary</h4>
                <p className="text-blue-600 text-sm">Booking ID: {booking?._id?.substring(0, 8) || manualTransferForm.bookingId?.substring(0, 8)}...</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <InfoRow label="Booking ID" value={manualTransferForm.bookingId?.substring(0, 12) || 'N/A'} icon={FaIdCard} />
                  <InfoRow label="Property Owner ID" value={booking?.clientId || selectedBankAccount?.clientId || 'N/A'} icon={FaUser} />
                  <InfoRow 
                    label="Payment Date" 
                    value={payment?.date ? new Date(payment.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    }) : 'N/A'} 
                    icon={FaCalendarAlt}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <h5 className="font-semibold text-gray-700 mb-2 text-sm">Amount Breakdown</h5>
                  <InfoRow 
                    label="Total Payment" 
                    value={`₹${getTotalPaidAmount().toLocaleString('en-IN')}`} 
                    icon={FaMoneyBillWave}
                  />
                  <InfoRow 
                    label="Platform Commission (5%)" 
                    value={`₹${getPlatformCommission().toLocaleString('en-IN')}`} 
                    icon={FaShieldAlt}
                  />
                  <InfoRow 
                    label="GST on Commission (18%)" 
                    value={`₹${transferAmounts.gstOnCommission.toLocaleString('en-IN')}`} 
                    icon={FaReceipt}
                  />
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <InfoRow 
                      label="Amount to Transfer" 
                      value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
                      highlight 
                      icon={FaExchangeAlt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!useRazorpay && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-yellow-600 text-xl" />
                <h4 className="font-bold text-yellow-800 text-lg">Manual Transfer Details</h4>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking ID *
                    </label>
                    <input
                      type="text"
                      value={manualTransferForm.bookingId}
                      onChange={(e) => setManualTransferForm({
                        ...manualTransferForm,
                        bookingId: e.target.value
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter booking ID"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Transfer (₹) *
                    </label>
                    <input
                      type="number"
                      value={manualTransferForm.originalAmount}
                      onChange={(e) => setManualTransferForm({
                        ...manualTransferForm,
                        originalAmount: parseFloat(e.target.value) || 0
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction Reference *
                    </label>
                    <input
                      type="text"
                      value={manualTransferForm.transactionReference}
                      onChange={(e) => setManualTransferForm({
                        ...manualTransferForm,
                        transactionReference: e.target.value
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter transaction reference"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UTR Number (*)
                    </label>
                    <input
                      type="text"
                      value={manualTransferForm.utrNumber}
                      onChange={(e) => setManualTransferForm({
                        ...manualTransferForm,
                        utrNumber: e.target.value
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter UTR number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={manualTransferForm.paymentMode}
                    onChange={(e) => setManualTransferForm({
                      ...manualTransferForm,
                      paymentMode: e.target.value
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash Deposit">Cash Deposit</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Screenshot URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={manualTransferForm.screenshotUrl}
                    onChange={(e) => setManualTransferForm({
                      ...manualTransferForm,
                      screenshotUrl: e.target.value
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter screenshot URL"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL of the transaction screenshot or proof
                  </p>
                </div>
              </div>
            </div>
          )}

          {transferStatus && (
            <div className={`p-4 rounded-lg mb-6 animate-fade-in ${
              transferStatus.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {transferStatus.type === 'success' ? (
                  <FaCheckCircle className="text-green-500 text-xl mt-1" />
                ) : (
                  <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    transferStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {transferStatus.message}
                  </p>
                  {transferStatus.details && (
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Amount:</span> 
                          <span className={`ml-2 ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{transferStatus.details.originalAmount?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-2 ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {transferStatus.details.status}
                          </span>
                        </div>
                      </div>
                      {transferStatus.details.transactionReference && (
                        <p className={`text-sm ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          Reference: {transferStatus.details.transactionReference}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 text-lg">Select Bank Account</h4>
              <span className="text-sm text-gray-500">
                {bankAccounts.length} account{bankAccounts.length !== 1 ? 's' : ''} found
              </span>
            </div>
            
            {bankAccountLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-600">Loading bank accounts...</p>
              </div>
            ) : bankAccounts.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {bankAccounts.map((account, index) => (
                  <div
                    key={account._id || index}
                    className={`border rounded-xl p-4 cursor-pointer transition-all transform hover:scale-[1.01] ${
                      selectedBankAccount?._id === account._id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => onSelectBankAccount(account)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <FaCreditCard className="text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {account.accountHolderName || 'N/A'}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {account.isVerified ? (
                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
                                  <FaCheckCircle className="text-xs" /> Verified
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-full">
                                  <FaExclamationTriangle className="text-xs" /> Unverified
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                Account: {account.accountNumber?.substring(0, 4)}****{account.accountNumber?.substring(account.accountNumber.length - 4)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm pl-12">
                          <div>
                            <p className="text-gray-600 text-xs">Bank Name</p>
                            <p className="font-medium">{account.bankName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">IFSC Code</p>
                            <p className="font-medium">{account.ifscCode || account.ifsc || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">Branch</p>
                            <p className="font-medium">{account.branchName || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs">Account Type</p>
                            <p className="font-medium">{account.accountType || 'Savings'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 pt-1">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedBankAccount?._id === account._id
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedBankAccount?._id === account._id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-xl">
                <FaExclamationTriangle className="text-yellow-500 text-3xl mx-auto mb-3" />
                <p className="text-yellow-800 font-semibold text-lg mb-2">No Bank Accounts Found</p>
                <p className="text-yellow-700 text-sm max-w-md mx-auto">
                  This property owner doesn't have any bank accounts registered yet.
                  Please ask them to add a bank account in their profile before proceeding with the transfer.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                >
                  Go Back and Request Bank Details
                </button>
              </div>
            )}
          </div>

          {bankAccounts.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Notes (Optional)
              </label>
              <textarea
                value={transferNotes}
                onChange={(e) => setTransferNotes(e.target.value)}
                placeholder="Add any notes about this transfer (e.g., UTR number, transaction reference, special instructions)..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                rows="3"
                disabled={transferLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                These notes will be visible to the property owner and in transfer records.
              </p>
            </div>
          )}

          {selectedBankAccount && bankAccounts.length > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-300 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaCheckCircle className="text-green-500 text-xl" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Transfer Confirmation</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-700 mb-3 text-sm border-b pb-2">Account Details</h5>
                  <div className="space-y-2">
                    <InfoRow label="Account Holder" value={selectedBankAccount.accountHolderName || 'N/A'} />
                    <InfoRow label="Account Number" value={
                      selectedBankAccount.accountNumber?.substring(0, 4) + 
                      '****' + 
                      selectedBankAccount.accountNumber?.substring(selectedBankAccount.accountNumber.length - 4)
                    } />
                    <InfoRow label="Bank Name" value={selectedBankAccount.bankName || 'N/A'} />
                    <InfoRow label="IFSC Code" value={selectedBankAccount.ifscCode || selectedBankAccount.ifsc || 'N/A'} />
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-700 mb-3 text-sm border-b pb-2">Transfer Details</h5>
                  <div className="space-y-2">
                    <InfoRow 
                      label="Transfer Amount" 
                      value={`₹${manualTransferForm.originalAmount?.toLocaleString('en-IN')}`} 
                      highlight 
                    />
                    <InfoRow 
                      label="Method" 
                      value={useRazorpay ? (isLiveMode ? 'Razorpay (LIVE - Real Money)' : 'Razorpay (TEST - Simulated)') : 'Manual Bank Transfer'} 
                    />
                    <InfoRow 
                      label="Verification Status" 
                      value={
                        <span className={`inline-flex items-center gap-1 ${selectedBankAccount.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                          {selectedBankAccount.isVerified ? (
                            <>
                              <FaCheckCircle /> Verified ✅
                            </>
                          ) : (
                            <>
                              <FaExclamationTriangle /> Unverified ⚠️
                            </>
                          )}
                        </span>
                      } 
                    />
                    {!useRazorpay && (
                      <>
                        <InfoRow 
                          label="Transaction Reference" 
                          value={manualTransferForm.transactionReference} 
                        />
                        <InfoRow 
                          label="Payment Mode" 
                          value={manualTransferForm.paymentMode} 
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {useRazorpay && isLiveMode && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="text-red-500 text-lg mt-1" />
                    <div>
                      <p className="text-red-700 font-medium text-sm">
                        ⚠️ LIVE TRANSFER WARNING
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        This is a LIVE transfer. Real money will be sent to the property owner's bank account.
                        Please double-check all details before confirming.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {!useRazorpay && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <FaBell className="text-blue-500 text-lg mt-1" />
                    <div>
                      <p className="text-blue-700 font-medium text-sm">
                        💡 Manual Transfer Note
                      </p>
                      <p className="text-blue-600 text-sm mt-1">
                        This action will record the transfer in the system. 
                        Please ensure the actual bank transfer has been completed externally 
                        and keep the UTR/transaction reference for verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={transferLoading}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
          
          {bankAccounts.length > 0 && (
            <button
              onClick={handleManualTransferSubmit}
              disabled={!selectedBankAccount || transferLoading}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                selectedBankAccount && !transferLoading
                  ? useRazorpay && isLiveMode
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {transferLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  {useRazorpay ? 'Processing Transfer...' : 'Recording Manual Transfer...'}
                </>
              ) : (
                <>
                  {useRazorpay ? <FaCreditCard /> : <FaExchangeAlt />}
                  {useRazorpay && isLiveMode
                    ? 'Confirm LIVE Transfer'
                    : useRazorpay
                      ? 'Confirm Test Transfer'
                      : 'Confirm Manual Transfer'
                  }
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Payment History Component
const PaymentHistorySection = ({ booking, onTransferClick }) => {
  const [expandedPayment, setExpandedPayment] = useState(null);

  const calculateTransferAmounts = (amount) => {
    const platformCommission = amount * 0.05;
    const gstOnCommission = platformCommission * 0.18;
    const totalPlatformEarnings = platformCommission + gstOnCommission;
    const clientAmount = amount - totalPlatformEarnings;
    
    return {
      clientAmount,
      platformCommission,
      gstOnCommission,
      totalPlatformEarnings,
      breakdown: {
        totalPayment: amount,
        platformCommissionRate: '5%',
        gstRate: '18%',
        platformCommission,
        gstOnCommission,
        clientAmount
      }
    };
  };

  if (!booking.payments || booking.payments.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FaHistory className="text-gray-800" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">Payment History</h3>
        </div>
        <div className="text-center py-8">
          <FaReceipt className="text-gray-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-500">No payment history available</p>
        </div>
      </div>
    );
  }

  const completedPayments = booking.payments.filter(p => p.status === 'completed');
  const totalAmount = completedPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const transferredAmount = completedPayments
    .filter(p => p.transferStatus === 'completed')
    .reduce((sum, p) => sum + (p.transferDetails?.clientAmount || 0), 0);
  const pendingAmount = totalAmount - transferredAmount;

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FaHistory className="text-gray-800 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Payment History</h3>
            <p className="text-gray-600 text-sm">
              {completedPayments.length} payment{completedPayments.length !== 1 ? 's' : ''} • 
              Total: ₹{totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm text-gray-600">Transfer Status</div>
            <StatusBadge status={booking.transferStatus || 'pending'} type="transfer" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <FaRupeeSign className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-blue-700 font-medium">Total Payments</div>
              <div className="text-xl font-bold text-blue-900">
                ₹{totalAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-blue-600">{completedPayments.length} payments</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <FaCheckCircle className="text-green-600" />
            </div>
            <div>
              <div className="text-sm text-green-700 font-medium">Transferred</div>
              <div className="text-xl font-bold text-green-900">
                ₹{transferredAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-green-600">
                {completedPayments.filter(p => p.transferStatus === 'completed').length} payments
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <FaExclamationTriangle className="text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-yellow-700 font-medium">Pending Transfer</div>
              <div className="text-xl font-bold text-yellow-900">
                ₹{pendingAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-yellow-600">
                {completedPayments.filter(p => p.transferStatus !== 'completed').length} payments
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {completedPayments.map((payment, index) => {
          const transferAmounts = payment.transferDetails?.clientAmount 
            ? {
                clientAmount: payment.transferDetails.clientAmount,
                platformCommission: payment.transferDetails.platformCommission,
                gstOnCommission: payment.transferDetails.gstOnCommission,
                totalPlatformEarnings: (payment.transferDetails.platformCommission || 0) + (payment.transferDetails.gstOnCommission || 0)
              }
            : calculateTransferAmounts(payment.amount || 0);
          
          const isExpanded = expandedPayment === payment._id;

          return (
            <div 
              key={payment._id || index} 
              className="border border-gray-200 rounded-xl p-4 hover:bg-white transition-all duration-200 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        Payment #{index + 1}
                      </span>
                      {payment.type && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {payment.type}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <StatusBadge status={payment.status} type="payment" />
                      <StatusBadge status={payment.transferStatus || 'pending'} type="transfer" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      {payment.date ? new Date(payment.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Date not available'}
                    </span>
                    {payment.transactionId && (
                      <span className="flex items-center gap-1">
                        <FaIdCard className="text-xs" />
                        {payment.transactionId.substring(0, 12)}...
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-xl">
                    ₹{(payment.amount || 0).toLocaleString('en-IN')}
                  </div>
                  {payment.transferStatus === 'completed' ? (
                    <div className="text-sm text-green-600 font-medium flex items-center gap-1 justify-end">
                      <FaCheckCircle className="text-xs" />
                      Transferred: ₹{transferAmounts.clientAmount?.toLocaleString('en-IN')}
                    </div>
                  ) : (
                    <div className="text-sm text-yellow-600 font-medium flex items-center gap-1 justify-end">
                      <FaExclamationTriangle className="text-xs" />
                      Pending: ₹{transferAmounts.clientAmount?.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-600 text-xs">Method</div>
                  <div className="font-medium">{payment.method || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-600 text-xs">Description</div>
                  <div className="font-medium">{payment.description || 'N/A'}</div>
                </div>
                {payment.month && (
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-600 text-xs">Period</div>
                    <div className="font-medium">{payment.month} {payment.year || ''}</div>
                  </div>
                )}
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-600 text-xs">Transfer Amount</div>
                  <div className="font-medium">₹{transferAmounts.clientAmount?.toLocaleString('en-IN')}</div>
                </div>
              </div>
              
              {payment.transferDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setExpandedPayment(isExpanded ? null : payment._id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mb-2"
                  >
                    {isExpanded ? (
                      <>
                        Hide Transfer Details
                        <FaTimes className="text-xs" />
                      </>
                    ) : (
                      <>
                        Show Transfer Details
                        <FaArrowLeft className="transform -rotate-90 text-xs" />
                      </>
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mt-2 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-blue-800 mb-2 text-sm">Amount Breakdown</h5>
                          <div className="space-y-2">
                            <InfoRow label="Client Amount" value={`₹${transferAmounts.clientAmount.toLocaleString('en-IN')}`} />
                            <InfoRow label="Platform Commission" value={`₹${transferAmounts.platformCommission.toLocaleString('en-IN')}`} />
                            <InfoRow label="GST on Commission" value={`₹${transferAmounts.gstOnCommission.toLocaleString('en-IN')}`} />
                            <InfoRow label="Total Platform" value={`₹${transferAmounts.totalPlatformEarnings.toLocaleString('en-IN')}`} />
                          </div>
                        </div>
                        
                        {payment.transferDetails.bankAccountUsed && (
                          <div>
                            <h5 className="font-semibold text-blue-800 mb-2 text-sm">Bank Account Used</h5>
                            <div className="bg-white rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <FaCreditCard className="text-blue-500" />
                                <span className="font-medium">{payment.transferDetails.bankAccountUsed.accountHolderName}</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                <div className="mb-1">{payment.transferDetails.bankAccountUsed.bankName}</div>
                                <div>Account: {payment.transferDetails.bankAccountUsed.accountNumber?.substring(0, 4)}****{payment.transferDetails.bankAccountUsed.accountNumber?.substring(payment.transferDetails.bankAccountUsed.accountNumber.length - 4)}</div>
                                <div>IFSC: {payment.transferDetails.bankAccountUsed.ifscCode}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {payment.transferDetails.transferNotes && (
                        <div className="mt-4 pt-3 border-t border-blue-200">
                          <div className="flex items-center gap-2 text-blue-700 text-sm">
                            <FaEnvelopeOpen className="text-xs" />
                            <span className="font-medium">Notes:</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1 pl-5">{payment.transferDetails.transferNotes}</p>
                        </div>
                      )}
                      
                      {payment.transferDetails.processedAt && (
                        <div className="mt-3 text-xs text-gray-500">
                          Processed on: {new Date(payment.transferDetails.processedAt).toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-4 flex justify-end gap-2">
                {payment.transferStatus !== 'completed' && payment.status === 'completed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTransferClick(booking, payment);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-sm hover:shadow-md text-sm"
                  >
                    <FaExchangeAlt className="text-xs" />
                    Transfer This Payment
                  </button>
                )}
                
                {payment.transferStatus === 'completed' && payment.transferDetails?.processedAt && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <FaCheckCircle />
                    Transferred on: {new Date(payment.transferDetails.processedAt).toLocaleDateString('en-IN')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Booking Detail View
const BookingDetailView = ({ booking, bookingType, onBack, onTransferClick }) => {
  const tenant = bookingType === "online"
    ? booking.user || {}
    : (typeof booking.tenant === "object" 
        ? booking.tenant 
        : { name: booking.tenant });
  
  const property = bookingType === "online" 
    ? booking.property || {} 
    : booking.propertyId || {};
    
  const room = bookingType === "online"
    ? booking.roomDetails?.[0] || {}
    : booking.roomDetails || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 bg-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md border border-gray-100"
          >
            <FaArrowLeft className="text-sm" /> Back to Bookings
          </button>
          <div className="flex items-center gap-3">
            <StatusBadge status={booking.status || booking.bookingStatus} />
            <StatusBadge status={booking.paymentInfo?.paymentStatus || 'pending'} type="payment" />
            <StatusBadge status={booking.transferStatus || 'pending'} type="transfer" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <p className="text-blue-100 mt-1">Booking ID: {booking._id || booking.id || "N/A"}</p>
                <p className="text-blue-100 text-sm mt-1">
                  Created: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <FaPrint /> Print Details
                </button>
                <button
                  onClick={() => {
                    if (booking.payments?.some(p => p.status === 'completed' && p.transferStatus !== 'completed')) {
                      onTransferClick(booking);
                    }
                  }}
                  disabled={!booking.payments?.some(p => p.status === 'completed' && p.transferStatus !== 'completed')}
                  className={`px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2 ${
                    booking.payments?.some(p => p.status === 'completed' && p.transferStatus !== 'completed')
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  <FaExchangeAlt />
                  Transfer Payments
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaUser className="text-gray-800 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Tenant Information</h3>
              </div>
              <div className="space-y-1">
                <InfoRow label="Name" value={tenant.name || "N/A"} icon={FaUser} />
                <InfoRow label="Email" value={tenant.email || "N/A"} icon={FaEnvelope} />
                <InfoRow label="Phone" value={tenant.phone || "N/A"} icon={FaPhone} />
                <InfoRow label="Tenant Client ID" value={tenant.clientId || "N/A"} icon={FaIdCard} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaHome className="text-gray-800 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Property Information</h3>
              </div>
              <div className="space-y-1">
                <InfoRow label="Property Name" value={property.name || "N/A"} icon={FaBuilding} />
                <InfoRow label="Address" value={property.locality || property.address || "N/A"} icon={FaMapMarkerAlt} />
                <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} icon={FaIdCard} />
                <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || booking.roomType || "N/A"} icon={FaHome} />
                <InfoRow label="Property Owner ID" value={property.clientId || "N/A"} icon={FaUser} />
                <InfoRow label="Property ID" value={property._id || property.id || "N/A"} icon={FaIdCard} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaCalendarAlt className="text-gray-800 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Booking Information</h3>
              </div>
              <div className="space-y-1">
                <InfoRow 
                  label="Move In" 
                  value={booking.checkInDate || booking.moveInDate 
                    ? new Date(booking.checkInDate || booking.moveInDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })
                    : "N/A"} 
                  icon={FaCalendarAlt}
                />
                <InfoRow 
                  label="Move Out" 
                  value={booking.checkOutDate || booking.moveOutDate 
                    ? new Date(booking.checkOutDate || booking.moveOutDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })
                    : "N/A"} 
                  icon={FaCalendarAlt}
                />
                <InfoRow label="Booking ID" value={booking._id || booking.id || "N/A"} icon={FaIdCard} />
                <InfoRow 
                  label="Approved At" 
                  value={booking.approvedAt 
                    ? new Date(booking.approvedAt).toLocaleString('en-IN') 
                    : "N/A"} 
                  icon={FaCalendarAlt}
                />
                <InfoRow label="Duration" value={
                  booking.durationMonths 
                    ? `${booking.durationMonths} month${booking.durationMonths > 1 ? 's' : ''}`
                    : booking.durationDays
                      ? `${booking.durationDays} day${booking.durationDays > 1 ? 's' : ''}`
                      : 'N/A'
                } icon={FaCalendarAlt} />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaMoneyBillWave className="text-gray-800 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Payment Information</h3>
              </div>
              <div className="space-y-1">
                <InfoRow label="Payment Status" value={
                  <StatusBadge status={booking.paymentInfo?.paymentStatus} type="payment" />
                } icon={FaCreditCard} />
                <InfoRow 
                  label="Amount Paid" 
                  value={booking.paymentInfo?.paidAmount 
                    ? `₹${booking.paymentInfo.paidAmount.toLocaleString('en-IN')}` 
                    : "₹0"} 
                  icon={FaRupeeSign}
                />
                <InfoRow 
                  label="Total Amount" 
                  value={booking.pricing?.totalAmount 
                    ? `₹${booking.pricing.totalAmount.toLocaleString('en-IN')}` 
                    : "₹0"} 
                  icon={FaRupeeSign}
                />
                <InfoRow label="Payment Method" value={booking.paymentInfo?.paymentMethod || "N/A"} icon={FaCreditCard} />
                <InfoRow label="Transaction ID" value={booking.paymentInfo?.transactionId || "N/A"} icon={FaIdCard} />
                <InfoRow 
                  label="Payment Date" 
                  value={
                    booking.paymentInfo?.paymentDate
                      ? new Date(booking.paymentInfo.paymentDate).toLocaleString('en-IN')
                      : "N/A"
                  }
                  icon={FaCalendarAlt}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <PaymentHistorySection 
              booking={booking}
              onTransferClick={onTransferClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, startIndex, endIndex, totalItems }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-2 gap-4">
      <div className="text-sm text-gray-700">
        Showing {startIndex + 1} to {endIndex} of{" "}
        {totalItems} entries
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          if (
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                {pageNum}
              </button>
            );
          } else if (
            pageNum === currentPage - 2 || 
            pageNum === currentPage + 2
          ) {
            return <span key={pageNum} className="px-1 text-gray-400">...</span>;
          }
          return null;
        })}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Main Bookings Component
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingType, setBookingType] = useState("online");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankAccountLoading, setBankAccountLoading] = useState(false);
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalRevenue: 0,
    pendingTransfers: 0
  });

  const fetchBookings = async (type = "online") => {
    try {
      setLoading(true);
      setError("");

      let response;
      if (type === "online") {
        response = await adminBookingsAPI.getAllBookings();
      } else {
        response = await adminBookingsAPI.getOfflineBookings();
      }

      console.log("Bookings API Response:", response);
      
      let bookingsData = [];
      if (response.data && Array.isArray(response.data)) {
        bookingsData = response.data;
      } else if (response.data && Array.isArray(response.data.bookings)) {
        bookingsData = response.data.bookings;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        bookingsData = response.data.data;
      } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
        bookingsData = response.data.data;
      }

      setBookings(bookingsData);

      const stats = {
        totalBookings: bookingsData.length,
        activeBookings: bookingsData.filter(b => 
          ['confirmed', 'approved', 'checked_in'].includes(b.status || b.bookingStatus)
        ).length,
        totalRevenue: bookingsData.reduce((sum, b) => 
          sum + (b.pricing?.totalAmount || b.amount || 0), 0
        ),
        pendingTransfers: bookingsData.filter(b => 
          ['pending', 'partial', 'manual_pending'].includes(b.transferStatus)
        ).length
      };
      setStats(stats);

    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to fetch bookings. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const extractAccountsFromResponse = (response) => {
    let accounts = [];
    if (response.data && response.data.success && Array.isArray(response.data.bankAccounts)) {
      accounts = response.data.bankAccounts;
    } else if (response.data && Array.isArray(response.data)) {
      accounts = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      accounts = response.data.data;
    } else if (response.data && response.data.success && Array.isArray(response.data.data)) {
      accounts = response.data.data;
    }
    return accounts;
  };

  const fetchBankAccountsWithFallback = async (booking) => {
    try {
      setBankAccountLoading(true);
      setBankAccounts([]);
      setSelectedBankAccount(null);

      const property = bookingType === "online" 
        ? booking.property || {} 
        : booking.property || booking.propertyId || {};
      
      const propertyId = property._id || property.id;
      const clientId = property.OwnerID || booking.approvedBy || booking.createdBy || booking.clientId;

      console.log("Trying with Property ID:", propertyId);
      console.log("Fallback Client ID:", clientId);

      let accounts = [];
      let lastError = null;

      if (propertyId) {
        try {
          const response = await adminBankAccountsAPI.getBankAccountsByProperty(propertyId);
          accounts = extractAccountsFromResponse(response);
          console.log("Found accounts with propertyId:", accounts.length);
        } catch (error) {
          console.log("Failed with propertyId:", error.message);
          lastError = error;
        }
      }

      if (accounts.length === 0 && clientId) {
        try {
          console.log("Trying fallback with Client ID:", clientId);
          const response = await adminBankAccountsAPI.getBankAccountsByClient(clientId);
          accounts = extractAccountsFromResponse(response);
          console.log("Found accounts with clientId:", accounts.length);
        } catch (error) {
          console.log("Failed with clientId:", error.message);
          lastError = error;
        }
      }

      const verifiedAccounts = accounts.filter(acc => acc.isVerified === true);
      const unverifiedAccounts = accounts.filter(acc => !acc.isVerified || acc.isVerified === false);
      const sortedAccounts = [...verifiedAccounts, ...unverifiedAccounts];

      setBankAccounts(sortedAccounts);

      if (sortedAccounts.length > 0) {
        const accountToSelect = verifiedAccounts[0] || sortedAccounts[0];
        setSelectedBankAccount(accountToSelect);
      }

      return sortedAccounts;

    } catch (err) {
      console.error("Error in fetchBankAccountsWithFallback:", err);
      setBankAccounts([]);
      throw err;
    } finally {
      setBankAccountLoading(false);
    }
  };

  const handleTransferClick = async (booking, payment = null) => {
    try {
      console.log("🔄 Transfer initiated:", {
        bookingId: booking._id || booking.id,
        booking: booking,
        payment: payment?._id || 'all payments'
      });

      setSelectedBooking(booking);
      setSelectedPayment(payment);
      setShowTransferPopup(true);
      
      await fetchBankAccountsWithFallback(booking);

    } catch (error) {
      console.error("❌ Transfer process failed:", error);
      alert(`Failed to fetch bank accounts: ${error.message}`);
      setShowTransferPopup(false);
    }
  };

  useEffect(() => {
    fetchBookings(bookingType);
  }, [bookingType]);

  // FIXED: This is the corrected filter function
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Safely get tenant info
    let tenant = {};
    if (bookingType === "online") {
      tenant = booking.user || {};
    } else {
      if (typeof booking.tenant === "object" && booking.tenant !== null) {
        tenant = booking.tenant;
      } else if (booking.tenant) {
        tenant = { name: booking.tenant };
      }
    }
    
    // Safely get property info
    let property = {};
    if (bookingType === "online") {
      property = booking.property || {};
    } else {
      property = booking.propertyId || {};
    }
    
    // Safely get all values for comparison
    const tenantName = tenant.name || "";
    const tenantEmail = tenant.email || "";
    const tenantPhone = tenant.phone || "";
    const tenantClientId = tenant.clientId || "";
    const propertyName = property.name || "";
    
    // Safely get property owner ID
    let propertyOwnerId = "";
    if (bookingType === "online") {
      propertyOwnerId = booking.clientId || "";
    } else {
      // For offline bookings, use property.clientId
      propertyOwnerId = (property && property.clientId) || "";
    }
    
    const bookingId = booking._id || "";
    const bookingRefId = booking.bookingId || "";
    
    // Now safely compare all values
    return (
      tenantName.toLowerCase().includes(searchLower) ||
      tenantEmail.toLowerCase().includes(searchLower) ||
      tenantPhone.toString().includes(searchTerm) ||
      propertyName.toLowerCase().includes(searchLower) ||
      tenantClientId.toLowerCase().includes(searchLower) ||
      propertyOwnerId.toLowerCase().includes(searchLower) ||
      bookingId.toLowerCase().includes(searchLower) ||
      bookingRefId.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length);
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRefresh = () => {
    fetchBookings(bookingType);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csvData = filteredBookings.map(booking => {
      const tenant = bookingType === "online" 
        ? booking.user || {} 
        : (typeof booking.tenant === "object" ? booking.tenant : { name: booking.tenant });
      
      const property = bookingType === "online" 
        ? booking.property || {} 
        : booking.propertyId || {};
      
      return {
        'Booking ID': booking._id || '',
        'Tenant Name': tenant.name || '',
        'Tenant Email': tenant.email || '',
        'Tenant Phone': tenant.phone || '',
        'Property Name': property.name || '',
        'Property Owner ID': booking.clientId || '',
        'Check-in Date': booking.checkInDate || booking.moveInDate || '',
        'Check-out Date': booking.checkOutDate || booking.moveOutDate || '',
        'Amount': booking.pricing?.totalAmount || booking.amount || 0,
        'Status': booking.status || booking.bookingStatus || '',
        'Payment Status': booking.paymentInfo?.paymentStatus || '',
        'Transfer Status': booking.transferStatus || '',
        'Created At': booking.createdAt || ''
      };
    });

    const headers = Object.keys(csvData[0] || {});
    const csv = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${bookingType}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingSpinner message="Loading bookings..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchBookings(bookingType)} />;
  }

  if (selectedBooking && !showTransferPopup) {
    return (
      <BookingDetailView 
        booking={selectedBooking}
        bookingType={bookingType}
        onBack={() => {
          setSelectedBooking(null);
          setSelectedPayment(null);
        }}
        onTransferClick={handleTransferClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bookings Management</h1>
            <p className="text-gray-600 text-sm mt-1">Manage all online and offline bookings</p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1 md:w-auto">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 px-10 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition text-sm shadow-sm w-full md:w-auto justify-center"
              >
                <FaBars className="text-gray-600" />
                {bookingType === "online" ? "Online Bookings" : "Offline Bookings"}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-full md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                  <button
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors ${
                      bookingType === "online" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setBookingType("online");
                      setMenuOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Online Bookings
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors ${
                      bookingType === "offline" ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setBookingType("offline");
                      setMenuOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Offline Bookings
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition text-sm shadow-sm"
            >
              <FaSync className="text-gray-600" />
              Refresh
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm shadow-sm"
            >
              <FaDownload />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            icon={FaCalendarAlt}
            color="from-blue-50 to-blue-100"
            subtitle={`${bookingType} bookings`}
          />
          <StatCard 
            title="Active Bookings" 
            value={stats.activeBookings} 
            icon={FaCheckCircle}
            color="from-green-50 to-green-100"
            subtitle="Confirmed/Checked-in"
          />
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`} 
            icon={FaRupeeSign}
            color="from-purple-50 to-purple-100"
            subtitle="From all bookings"
          />
          <StatCard 
            title="Pending Transfers" 
            value={stats.pendingTransfers} 
            icon={FaExchangeAlt}
            color="from-yellow-50 to-yellow-100"
            subtitle="Awaiting transfer"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Room Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedBookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center">
                      <div className="text-gray-400 text-5xl mb-4">📋</div>
                      <h2 className="text-lg text-gray-600 mb-2 font-semibold">No Bookings Found</h2>
                      <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                        {bookingType === "online" 
                          ? "No online bookings available. Try changing your search criteria." 
                          : "No offline bookings available. Try changing your search criteria."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking) => {
                    const room = bookingType === "online"
                      ? booking.roomDetails?.[0] || {}
                      : booking.roomDetails || {};
                    const property = bookingType === "online" 
                      ? booking.property || {} 
                      : booking.propertyId || {};
                    const tenant = bookingType === "online"
                      ? booking.user || {}
                      : (typeof booking.tenant === "object" 
                          ? booking.tenant 
                          : { name: booking.tenant });
                    
                    const tenantName = tenant.name || "N/A";
                    const propertyName = property.name || "N/A";
                    const roomDetails = room.roomNumber || room.roomIdentifier || room.sharingType || "N/A";
                    const amount = booking.pricing?.totalAmount || booking.amount || 0;
                    const hasPendingTransfers = booking.payments?.some(p => 
                      p.status === 'completed' && p.transferStatus !== 'completed'
                    );

                    return (
                      <tr 
                        key={booking._id || booking.id} 
                        className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                              <FaUser className="text-blue-600 text-sm" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{tenantName}</div>
                              <div className="text-xs text-gray-500">{tenant.phone || "No phone"}</div>
                              <div className="text-xs text-gray-400 truncate max-w-[150px]">{tenant.email || "No email"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-50 rounded-lg mr-3">
                              <FaHome className="text-green-600 text-sm" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{propertyName}</div>
                              <div className="text-xs text-gray-500">Owner: {booking.clientId?.substring(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{roomDetails}</div>
                          <div className="text-xs text-gray-500">{room.sharingType || booking.roomType || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1 text-gray-900">
                              <FaCalendarAlt className="text-xs text-gray-400" />
                              {new Date(booking.checkInDate || booking.moveInDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short'
                              })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              to {new Date(booking.checkOutDate || booking.moveOutDate).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">₹{amount.toLocaleString('en-IN')}</div>
                          {hasPendingTransfers && (
                            <div className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                              <FaExclamationTriangle className="text-xs" />
                              Pending transfer
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <StatusBadge status={booking.status || booking.bookingStatus} />
                            <StatusBadge status={booking.transferStatus || 'pending'} type="transfer" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBooking(booking);
                              }}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                            >
                              <FaEye className="text-xs" />
                              View
                            </button>
                            {hasPendingTransfers && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTransferClick(booking);
                                }}
                                className="text-green-600 hover:text-green-800 font-medium text-sm bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors text-center flex items-center justify-center gap-1"
                              >
                                <FaExchangeAlt className="text-xs" />
                                Transfer
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredBookings.length}
          />
        )}
      </div>

      {showTransferPopup && selectedBooking && (
        <TransferPopup
          booking={selectedBooking}
          payment={selectedPayment}
          bankAccounts={bankAccounts}
          bankAccountLoading={bankAccountLoading}
          selectedBankAccount={selectedBankAccount}
          onSelectBankAccount={setSelectedBankAccount}
          onClose={() => {
            setShowTransferPopup(false);
            setSelectedBankAccount(null);
            setSelectedPayment(null);
            if (!selectedBooking) {
              setSelectedBooking(null);
            }
          }}
          onTransferComplete={(transferDetails) => {
            console.log('Manual transfer completed:', transferDetails);
            fetchBookings(bookingType);
            
            const fetchBookingDetails = async () => {
              try {
                const response = bookingType === "online"
                  ? await adminBookingsAPI.getBookingById(selectedBooking._id)
                  : await adminBookingsAPI.getOfflineBookingById(selectedBooking._id);
                
                if (response.data) {
                  setSelectedBooking(response.data);
                }
              } catch (error) {
                console.error('Error refreshing booking:', error);
              }
            };
            fetchBookingDetails();
          }}
        />
      )}
    </div>
  );
};

export default Bookings;