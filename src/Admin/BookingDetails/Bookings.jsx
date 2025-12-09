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
  const [useRazorpay, setUseRazorpay] = useState(true);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Check if we're in live mode
  useEffect(() => {
    const checkLiveMode = async () => {
      try {
        const response = await adminPaymentsAPI.getPaymentHealth();
        if (response.data?.services?.mode === 'LIVE') {
          setIsLiveMode(true);
        }
      } catch (error) {
        console.log('Could not determine mode, assuming test mode');
      }
    };
    checkLiveMode();
  }, []);

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
    return payment?.amount || 0;
  };

  const handleProceedTransfer = async () => {
    if (!selectedBankAccount) {
      alert('Please select a bank account to proceed with the transfer.');
      return;
    }

    try {
      setTransferLoading(true);
      setTransferStatus(null);

      const transferData = {
        bookingId: booking._id || booking.id,
        paymentId: payment?._id || payment?.id,
        bankAccountId: selectedBankAccount._id,
        notes: transferNotes || `Transfer for payment ${payment?._id || payment?.id || booking._id}`,
      };

      console.log('🔄 Initiating transfer:', transferData);

      // Check if this is a live transfer
      if (useRazorpay && isLiveMode) {
        // Show confirmation for live transfers
        const confirmTransfer = window.confirm(
          `⚠️ LIVE TRANSFER CONFIRMATION\n\n` +
          `You are about to transfer REAL MONEY:\n` +
          `Amount: ₹${getTransferAmount().toLocaleString('en-IN')}\n` +
          `To: ${selectedBankAccount.accountHolderName}\n` +
          `Account: ${selectedBankAccount.accountNumber?.substring(0, 4)}****${selectedBankAccount.accountNumber?.substring(selectedBankAccount.accountNumber.length - 4)}\n\n` +
          `Bank: ${selectedBankAccount.bankName}\n` +
          `IFSC: ${selectedBankAccount.ifscCode || selectedBankAccount.ifsc}\n\n` +
          `This action cannot be undone. Proceed?`
        );
        
        if (!confirmTransfer) {
          setTransferLoading(false);
          return;
        }
      }

      let response;
      if (useRazorpay) {
        response = await adminPaymentsAPI.initiateRazorpayTransfer(transferData);
      } else {
        response = await adminPaymentsAPI.initiateManualTransfer(transferData);
      }

      console.log('✅ Transfer API response:', response.data);
      
      if (response.data && response.data.success) {
        setTransferStatus({
          type: 'success',
          message: response.data.message,
          details: response.data.transferDetails,
          isLiveTransfer: useRazorpay && isLiveMode
        });
        
        // Show success message
        if (useRazorpay && isLiveMode) {
          if (response.data.transferDetails.razorpayUTR) {
            alert(`✅ Payment Transfer Successful!\n\n` +
                  `Amount: ₹${response.data.transferDetails.amount.toLocaleString('en-IN')}\n` +
                  `UTR: ${response.data.transferDetails.razorpayUTR}\n` +
                  `Status: ${response.data.transferDetails.status}\n\n` +
                  `The money has been transferred to the property owner's bank account.`);
          } else {
            alert(`✅ Payment Transfer Initiated!\n\n` +
                  `Amount: ₹${response.data.transferDetails.amount.toLocaleString('en-IN')}\n` +
                  `Payout ID: ${response.data.transferDetails.razorpayPayoutId}\n` +
                  `Status: ${response.data.transferDetails.status}\n\n` +
                  `The transfer has been initiated. You will receive a notification when it's completed.`);
          }
        }
        
        // Refresh data
        setTimeout(() => {
          onClose();
          if (onTransferComplete) {
            onTransferComplete(response.data.transferDetails);
          }
          window.location.reload();
        }, 3000);
      } else {
        setTransferStatus({
          type: 'error',
          message: response.data?.message || 'Transfer failed',
          details: response.data?.error
        });
        
        alert(`Transfer Failed:\n${response.data?.message || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('🔥 Transfer process error:', error);
      
      setTransferStatus({
        type: 'error',
        message: error.response?.data?.message || 'Transfer process failed.',
        details: error.response?.data?.error || error.message
      });
      
      // Show specific error messages
      if (error.response?.status === 400) {
        alert(`Transfer Failed:\n${error.response.data.message}`);
      } else if (error.response?.status === 500) {
        alert('Server error occurred. Please try again or use manual transfer.');
      } else if (!error.response) {
        alert('Network error. Please check your connection.');
      }
    } finally {
      setTransferLoading(false);
    }
  };

  const transferAmounts = calculateTransferAmounts(getTotalPaidAmount());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
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
          {/* Transfer Method Selection */}
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

          {/* Transfer Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FaReceipt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-lg">Payment Transfer Summary</h4>
                <p className="text-blue-600 text-sm">Booking ID: {booking._id?.substring(0, 8)}...</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <InfoRow label="Booking ID" value={booking._id?.substring(0, 12)} icon={FaIdCard} />
                  <InfoRow label="Property Owner ID" value={booking.clientId || 'N/A'} icon={FaUser} />
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

          {/* Transfer Status Display */}
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
                            ₹{transferStatus.details.amount?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-2 ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {transferStatus.details.status}
                          </span>
                        </div>
                      </div>
                      {transferStatus.details.bankAccount && (
                        <p className={`text-sm ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          Account Holder: {transferStatus.details.bankAccount.holder}
                        </p>
                      )}
                      {transferStatus.details.razorpayUTR && (
                        <p className={`text-sm ${transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          UTR: {transferStatus.details.razorpayUTR}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bank Account Selection */}
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

          {/* Transfer Notes */}
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

          {/* Selected Account Summary */}
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
                      value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
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

        {/* Footer Actions */}
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
              onClick={handleProceedTransfer}
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
                  {useRazorpay ? 'Processing Transfer...' : 'Recording Transfer...'}
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

  // Filter only completed payments
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
      
      {/* Transfer Summary Cards */}
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
      
      {/* Payment List */}
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
            {/* Tenant Info */}
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

            {/* Property Info */}
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
                <InfoRow label="Property Owner ID" value={booking.clientId || "N/A"} icon={FaUser} />
                <InfoRow label="Property ID" value={property._id || property.id || "N/A"} icon={FaIdCard} />
              </div>
            </div>

            {/* Booking Info */}
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

            {/* Payment Info */}
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

          {/* Payment History Section - Full Width */}
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
        
        {/* Show first page, current page range, and last page */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          // Show only first page, last page, and pages around current page
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

      // Calculate stats
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
        booking: booking._id,
        payment: payment?._id || 'all payments'
      });

      // Show transfer popup
      setSelectedBooking(booking);
      setSelectedPayment(payment);
      setShowTransferPopup(true);
      
      // Use the enhanced function with fallbacks
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

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    
    const tenant = bookingType === "online" 
      ? booking.user || {} 
      : (typeof booking.tenant === "object" ? booking.tenant : { 
          name: booking.tenant,
          phone: booking.tenantPhone,
          email: booking.tenantEmail,
          clientId: booking.tenantClientId
        });
    
    const property = bookingType === "online" 
      ? booking.property || {} 
      : booking.propertyId || {};
    
    const tenantClientId = tenant.clientId || "";
    const propertyOwnerId = booking.clientId;

    return (
      (tenant.name || "").toLowerCase().includes(searchLower) ||
      (tenant.email || "").toLowerCase().includes(searchLower) ||
      (tenant.phone || "").toString().includes(searchTerm) ||
      (property.name || "").toLowerCase().includes(searchLower) ||
      tenantClientId.toLowerCase().includes(searchLower) ||
      propertyOwnerId.toLowerCase().includes(searchLower) ||
      (booking._id || "").toLowerCase().includes(searchLower) ||
      (booking.bookingId || "").toLowerCase().includes(searchLower)
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

  // Handle refresh
  const handleRefresh = () => {
    fetchBookings(bookingType);
    setCurrentPage(1);
  };

  // Handle export
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

        {/* Stats Cards */}
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

        {/* Bookings Table */}
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

        {/* Pagination */}
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

      {/* Transfer Popup */}
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
            // Only clear selectedBooking if we're not in detail view
            if (!selectedBooking) {
              setSelectedBooking(null);
            }
          }}
          onTransferComplete={(transferDetails) => {
            console.log('Transfer completed:', transferDetails);
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



// import React, { useEffect, useState } from "react";
// import { 
//   FaArrowLeft, 
//   FaBars, 
//   FaSearch, 
//   FaUser, 
//   FaHome, 
//   FaCalendarAlt, 
//   FaMoneyBillWave, 
//   FaAngleDoubleRight,
//   FaTimes,
//   FaSpinner,
//   FaCheckCircle,
//   FaExclamationTriangle
// } from "react-icons/fa";
// import image from "../../assets/payment-Icons/undraw_mobile-payments_uate.png"
// import { 
//   adminBookingsAPI, 
//   adminBankAccountsAPI, 
//   adminPaymentsAPI 
// } from "../adminController";

// const ITEMS_PER_PAGE = 5;

// // Helper component for detail view - MOVE TO TOP
// const InfoRow = ({ label, value, highlight = false }) => (
//   <div className="flex justify-between items-start">
//     <span className={`text-sm font-medium ${highlight ? 'text-blue-600' : 'text-gray-600'} min-w-[140px]`}>
//       {label}:
//     </span>
//     <span className={`text-sm ${highlight ? 'text-blue-600 font-semibold' : 'text-gray-800'} text-right flex-1 break-words max-w-[200px]`}>
//       {value}
//     </span>
//   </div>
// );

// // Transfer Popup Component - MOVE TO TOP
// const TransferPopup = ({
//   booking,
//   bankAccounts,
//   bankAccountLoading,
//   selectedBankAccount,
//   onSelectBankAccount,
//   onClose,
//   onTransferComplete
// }) => {
//   const [transferLoading, setTransferLoading] = useState(false);
//   const [transferStatus, setTransferStatus] = useState(null);
//   const [transferNotes, setTransferNotes] = useState('');

//   const handleProceedTransfer = async () => {
//     if (!selectedBankAccount) {
//       alert('Please select a bank account to proceed with the transfer.');
//       return;
//     }

//     try {
//       setTransferLoading(true);
//       setTransferStatus(null);

//       const transferData = {
//         bookingId: booking._id || booking.id,
//         bankAccountId: selectedBankAccount._id,
//         notes: transferNotes || `Manual transfer for booking ${booking._id || booking.id}`
//       };

//       console.log('🔄 Initiating manual transfer with data:', transferData);

//       // Call manual transfer API
//       const response = await adminPaymentsAPI.initiateManualTransfer(transferData);
      
//       console.log('Transfer API response:', response);
      
//       if (response.data && response.data.success) {
//         setTransferStatus({
//           type: 'success',
//           message: response.data.message || 'Manual transfer recorded successfully!',
//           details: response.data.transferDetails
//         });
        
//         // Callback to refresh parent component
//         if (onTransferComplete) {
//           onTransferComplete(response.data.transferDetails);
//         }

//         // Auto-close after success
//         setTimeout(() => {
//           onClose();
//         }, 3000);
//       } else {
//         setTransferStatus({
//           type: 'error',
//           message: response.data?.message || 'Transfer failed',
//           details: response.data?.error
//         });
//       }

//     } catch (error) {
//       console.error(' Transfer process error:', error);
//       setTransferStatus({
//         type: 'error',
//         message: 'Transfer process failed. Please try again.',
//         details: error.response?.data?.message || error.message
//       });
//     } finally {
//       setTransferLoading(false);
//     }
//   };

//   const getTransferAmount = () => {
//     return booking.transferDetails?.clientAmount || 0;
//   };

//   const getPlatformCommission = () => {
//     return booking.transferDetails?.platformCommission || 0;
//   };

//   const getTotalPaidAmount = () => {
//     return booking.paymentInfo?.paidAmount || 0;
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="bg-[#1e3b8a] p-6 text-white relative">
//           <h3 className="text-xl font-bold">Manual Transfer to Property Owner</h3>
//           <p className="text-blue-100 mt-1">
//             Transfer client amount to property owner's bank account
//           </p>
//           <button
//             onClick={onClose}
//             className="absolute right-4 top-4 text-white hover:text-blue-200 transition-colors"
//             disabled={transferLoading}
//           >
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           {/* Transfer Summary */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center gap-3 mb-3">
//               <FaMoneyBillWave className="text-blue-600 text-xl" />
//               <h4 className="font-semibold text-blue-800 text-lg">Transfer Summary</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div className="space-y-2">
//                 <InfoRow label="Booking ID" value={booking._id || booking.id} />
//                 <InfoRow label="Property" value={booking.property?.name || 'N/A'} />
//                 <InfoRow label="Property Owner ID" value={booking.clientId || 'N/A'} />
//               </div>
//               <div className="space-y-2">
//                 <InfoRow 
//                   label="Total Paid" 
//                   value={`₹${getTotalPaidAmount().toLocaleString('en-IN')}`} 
//                 />
//                 <InfoRow 
//                   label="Platform Commission" 
//                   value={`₹${getPlatformCommission().toLocaleString('en-IN')}`} 
//                 />
//                 <InfoRow 
//                   label="Amount to Transfer" 
//                   value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
//                   highlight 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Transfer Status Display */}
//           {transferStatus && (
//             <div className={`p-4 rounded-lg mb-6 ${
//               transferStatus.type === 'success' 
//                 ? 'bg-green-50 border border-green-200' 
//                 : 'bg-red-50 border border-red-200'
//             }`}>
//               <div className="flex items-center gap-3">
//                 {transferStatus.type === 'success' ? (
//                   <FaCheckCircle className="text-green-500 text-xl" />
//                 ) : (
//                   <FaExclamationTriangle className="text-red-500 text-xl" />
//                 )}
//                 <div className="flex-1">
//                   <p className={`font-semibold ${
//                     transferStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
//                   }`}>
//                     {transferStatus.message}
//                   </p>
//                   {transferStatus.details && (
//                     <div className="mt-2 space-y-1">
//                       <p className={`text-sm ${
//                         transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         Amount: ₹{transferStatus.details.amount?.toLocaleString('en-IN')}
//                       </p>
//                       <p className={`text-sm ${
//                         transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         Status: {transferStatus.details.status}
//                       </p>
//                       {transferStatus.details.bankAccount && (
//                         <p className={`text-sm ${
//                           transferStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           Account: {transferStatus.details.bankAccount.accountHolderName}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Bank Account Selection */}
//           <div className="mb-6">
//             <h4 className="font-semibold text-gray-800 mb-4">Select Property Owner's Bank Account</h4>
            
//             {bankAccountLoading ? (
//               <div className="text-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                 <p className="text-gray-600">Loading bank accounts...</p>
//               </div>
//             ) : bankAccounts.length > 0 ? (
//               <div className="space-y-3 max-h-60 overflow-y-auto">
//                 {bankAccounts.map((account, index) => (
//                   <div
//                     key={account._id || index}
//                     className={`border rounded-lg p-4 cursor-pointer transition-all ${
//                       selectedBankAccount?._id === account._id
//                         ? 'border-blue-500 bg-blue-50 shadow-sm'
//                         : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                     }`}
//                     onClick={() => onSelectBankAccount(account)}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h4 className="font-semibold text-gray-800">
//                             {account.accountHolderName || 'N/A'}
//                           </h4>
//                           {account.isVerified ? (
//                             <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
//                               Verified
//                             </span>
//                           ) : (
//                             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-full">
//                               Unverified
//                             </span>
//                           )}
//                         </div>
//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                           <InfoRow label="Account Number" value={account.accountNumber || 'N/A'} />
//                           <InfoRow label="Bank Name" value={account.bankName || 'N/A'} />
//                           <InfoRow label="Branch" value={account.branchName || 'N/A'} />
//                           <InfoRow label="IFSC Code" value={account.ifscCode || account.ifsc || 'N/A'} />
//                         </div>
//                       </div>
//                       <div className="ml-4 pt-1">
//                         <div
//                           className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                             selectedBankAccount?._id === account._id
//                               ? 'bg-blue-500 border-blue-500'
//                               : 'border-gray-300'
//                           }`}
//                         >
//                           {selectedBankAccount?._id === account._id && (
//                             <div className="w-2 h-2 bg-white rounded-full"></div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <FaExclamationTriangle className="text-yellow-500 text-2xl mx-auto mb-2" />
//                 <image src={image} className="" />
//                 <p className="text-yellow-800 font-semibold">No Bank Accounts Found</p>
//                 <p className="text-yellow-700 text-sm mt-1">
//                   This property owner doesn't have any bank accounts registered yet.
//                   Please ask them to add a bank account before proceeding with the transfer.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Transfer Notes */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Transfer Notes (Optional)
//             </label>
//             <textarea
//               value={transferNotes}
//               onChange={(e) => setTransferNotes(e.target.value)}
//               placeholder="Add any notes about this manual transfer (e.g., UTR number, transaction reference, etc.)..."
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//               rows="3"
//               disabled={transferLoading}
//             />
//           </div>

//           {/* Selected Account Summary */}
//           {selectedBankAccount && (
//             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
//               <h4 className="font-semibold text-gray-800 mb-3">Transfer Confirmation</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <InfoRow label="Account Holder" value={selectedBankAccount.accountHolderName || 'N/A'} />
//                   <InfoRow label="Account Number" value={selectedBankAccount.accountNumber || 'N/A'} />
//                   <InfoRow label="Bank Name" value={selectedBankAccount.bankName || 'N/A'} />
//                 </div>
//                 <div>
//                   <InfoRow label="IFSC Code" value={selectedBankAccount.ifscCode || selectedBankAccount.ifsc || 'N/A'} />
//                   <InfoRow 
//                     label="Transfer Amount" 
//                     value={`₹${getTransferAmount().toLocaleString('en-IN')}`} 
//                     highlight 
//                   />
//                   <InfoRow 
//                     label="Verification Status" 
//                     value={
//                       selectedBankAccount.isVerified 
//                         ? 'Verified ✅' 
//                         : 'Unverified ⚠️'
//                     } 
//                   />
//                 </div>
//               </div>
//               <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
//                 <p className="text-blue-700 text-sm font-medium">
//                   💡 Manual Transfer Note: This action will record the transfer in the system. 
//                   Please ensure the actual bank transfer has been completed externally.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer Actions */}
//         <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={onClose}
//             disabled={transferLoading}
//             className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Cancel
//           </button>
          
//           {bankAccounts.length > 0 && (
//             <button
//               onClick={handleProceedTransfer}
//               disabled={!selectedBankAccount || transferLoading}
//               className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
//                 selectedBankAccount && !transferLoading
//                   ? 'bg-[#1e3b8a] text-white hover:bg-blue-700 shadow-sm'
//                   : 'bg-gray-400 text-gray-200 cursor-not-allowed'
//               }`}
//             >
//               {transferLoading ? (
//                 <>
//                   <FaSpinner className="animate-spin" />
//                   Recording Transfer...
//                 </>
//               ) : (
//                 <>
//                   <FaMoneyBillWave />
//                   {selectedBankAccount && !selectedBankAccount.isVerified 
//                     ? 'Proceed with Unverified Account' 
//                     : 'Confirm Manual Transfer'
//                   }
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Bookings Component
// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [bookingType, setBookingType] = useState("online");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showTransferPopup, setShowTransferPopup] = useState(false);
//   const [bankAccounts, setBankAccounts] = useState([]);
//   const [bankAccountLoading, setBankAccountLoading] = useState(false);
//   const [selectedBankAccount, setSelectedBankAccount] = useState(null);
//   const [showMorePaymentInfo, setShowMorePaymentInfo] = useState(false);

//   const fetchBookings = async (type = "online") => {
//     try {
//       setLoading(true);
//       setError("");

//       let response;
//       if (type === "online") {
//         response = await adminBookingsAPI.getAllBookings();
//       } else {
//         response = await adminBookingsAPI.getOfflineBookings();
//       }

//       console.log("Bookings API Response:", response);
      
//       // Handle different response structures
//       if (response.data && Array.isArray(response.data)) {
//         setBookings(response.data);
//       } else if (response.data && Array.isArray(response.data.bookings)) {
//         setBookings(response.data.bookings);
//       } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
//         setBookings(response.data.data);
//       } else {
//         console.warn("Unexpected response structure:", response.data);
//         setBookings([]);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(
//         err.response?.data?.message || 
//         err.message || 
//         "Failed to fetch bookings. Please check your connection."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to extract accounts from response
//   const extractAccountsFromResponse = (response) => {
//     let accounts = [];
//     if (response.data && response.data.success && Array.isArray(response.data.bankAccounts)) {
//       accounts = response.data.bankAccounts;
//     } else if (response.data && Array.isArray(response.data)) {
//       accounts = response.data;
//     } else if (response.data && Array.isArray(response.data.data)) {
//       accounts = response.data.data;
//     }
//     return accounts;
//   };

//   const fetchBankAccountsWithFallback = async (booking) => {
//     try {
//       setBankAccountLoading(true);
//       setBankAccounts([]);
//       setSelectedBankAccount(null);

//       // Extract both propertyId and clientId as fallbacks
//       const property = bookingType === "online" 
//         ? booking.property || {} 
//         : booking.property || booking.propertyId || {};
      
//       const propertyId = property._id || property.id;
//       const clientId = property.OwnerID || booking.approvedBy || booking.createdBy;

//       console.log("Trying with Property ID:", propertyId);
//       console.log("Fallback Client ID:", clientId);

//       let accounts = [];
//       let lastError = null;

//       // Try propertyId first (primary approach)
//       if (propertyId) {
//         try {
//           const response = await adminBankAccountsAPI.getBankAccountsByProperty(propertyId);
//           accounts = extractAccountsFromResponse(response);
//           console.log("Found accounts with propertyId:", accounts.length);
//         } catch (error) {
//           console.log("Failed with propertyId:", error.message);
//           lastError = error;
//         }
//       }

//       // If no accounts found with propertyId, try clientId as fallback
//       if (accounts.length === 0 && clientId) {
//         try {
//           console.log("Trying fallback with Client ID:", clientId);
//           const response = await adminBankAccountsAPI.getBankAccountsByClient(clientId);
//           accounts = extractAccountsFromResponse(response);
//           console.log("Found accounts with clientId:", accounts.length);
//         } catch (error) {
//           console.log("Failed with clientId:", error.message);
//           lastError = error;
//         }
//       }

//       // Process the accounts
//       const verifiedAccounts = accounts.filter(acc => acc.isVerified === true);
//       const unverifiedAccounts = accounts.filter(acc => !acc.isVerified || acc.isVerified === false);
//       const sortedAccounts = [...verifiedAccounts, ...unverifiedAccounts];

//       setBankAccounts(sortedAccounts);

//       if (sortedAccounts.length > 0) {
//         const accountToSelect = verifiedAccounts[0] || sortedAccounts[0];
//         setSelectedBankAccount(accountToSelect);
//       }

//       return sortedAccounts;

//     } catch (err) {
//       console.error("Error in fetchBankAccountsWithFallback:", err);
//       setBankAccounts([]);
//       throw err;
//     } finally {
//       setBankAccountLoading(false);
//     }
//   };

//   const handleTransferClick = async (booking) => {
//     try {
//       console.log("Transfer initiated for booking:", booking);

//       // Show transfer popup
//       setSelectedBooking(booking);
//       setShowTransferPopup(true);
      
//       // Use the enhanced function with fallbacks
//       const accounts = await fetchBankAccountsWithFallback(booking);
      
//       if (accounts.length === 0) {
//         const property = bookingType === "online" 
//           ? booking.property || {} 
//           : booking.property || booking.propertyId || {};
//         const propertyName = property.name || "this property";
//         alert(`No bank accounts found for ${propertyName}`);
//       }

//     } catch (error) {
//       console.error("Transfer process failed:", error);
//       alert(`Failed to fetch bank accounts: ${error.message}`);
//     }
//   };

//   const handleProceedWithTransfer = async () => {
//     if (!selectedBankAccount) {
//       alert("Please select a bank account to proceed with the transfer.");
//       return;
//     }

//     try {
//       console.log("Proceeding with manual transfer to:", selectedBankAccount);
      
//       const transferData = {
//         bookingId: selectedBooking._id || selectedBooking.id,
//         bankAccountId: selectedBankAccount._id,
//         notes: `Manual transfer for booking ${selectedBooking._id || selectedBooking.id}`
//       };

//       // Call the manual transfer API
//       const response = await adminPaymentsAPI.initiateManualTransfer(transferData);
      
//       if (response.data && response.data.success) {
//         alert(`${response.data.message}\n\nAmount: ₹${response.data.transferDetails.amount}\nAccount: ${response.data.transferDetails.bankAccount.accountHolderName}\nStatus: ${response.data.transferDetails.status}`);
        
//         // Refresh bookings to update status
//         fetchBookings(bookingType);
        
//         setShowTransferPopup(false);
//         setSelectedBankAccount(null);
//         setSelectedBooking(null); // Go back to main list
//       } else {
//         alert(`Transfer failed: ${response.data?.message || 'Unknown error'}`);
//       }
      
//     } catch (error) {
//       console.error(" Transfer failed:", error);
//       alert(`Transfer failed: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(bookingType);
//   }, [bookingType]);

//   const getStatusBadge = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800";
    
//     const statusLower = status.toLowerCase();
//     switch (statusLower) {
//       case "approved":
//       case "confirmed":
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//       case "processing":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//       case "rejected":
//       case "failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Filter bookings based on search term
//   const filteredBookings = bookings.filter((booking) => {
//     const searchLower = searchTerm.toLowerCase();
    
//     // Tenant information
//     const tenant = bookingType === "online" 
//       ? booking.user || {} 
//       : (typeof booking.tenant === "object" ? booking.tenant : { 
//           name: booking.tenant,
//           phone: booking.tenantPhone,
//           email: booking.tenantEmail,
//           clientId: booking.tenantClientId
//         });
    
//     // Property information
//     const property = bookingType === "online" 
//       ? booking.property || {} 
//       : booking.propertyId || {};
    
//     // Client IDs for search
//     const tenantClientId = tenant.clientId || "";
//     const propertyOwnerId = booking.clientId;

//     return (
//       (tenant.name || "").toLowerCase().includes(searchLower) ||
//       (tenant.email || "").toLowerCase().includes(searchLower) ||
//       (tenant.phone || "").toString().includes(searchTerm) ||
//       (property.name || "").toLowerCase().includes(searchLower) ||
//       tenantClientId.toLowerCase().includes(searchLower) ||
//       propertyOwnerId.toLowerCase().includes(searchLower) ||
//       (booking._id || "").toLowerCase().includes(searchLower)
//     );
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//           <p className="text-gray-600 text-sm">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-sm">
//           {/* <div className="text-red-500 text-2xl mb-2">⚠️</div> */}
//           <div>
//             <image src={image} className="w-full h-auto" />
//           </div>
//           <h2 className="text-lg text-red-600 mb-2 font-semibold">Failed to load bookings</h2>
//           <p className="text-gray-600 mb-3 text-sm">{error}</p>
//           <button
//             onClick={() => fetchBookings(bookingType)}
//             className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!Array.isArray(bookings) || bookings.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
//           <div className="text-gray-400 text-4xl mb-4">📋</div>
//           <h2 className="text-lg text-gray-600 mb-2 font-semibold">No Bookings Found</h2>
//           <p className="text-gray-500 text-sm mb-4">
//             {bookingType === "online" 
//               ? "No online bookings available." 
//               : "No offline bookings available."}
//           </p>
//           <button
//             onClick={() => fetchBookings(bookingType)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ---------- View Details Card ----------
//   if (selectedBooking) {
//     const tenant = bookingType === "online"
//       ? selectedBooking.user || {}
//       : (typeof selectedBooking.tenant === "object" 
//           ? selectedBooking.tenant 
//           : { name: selectedBooking.tenant });
    
//     const property = bookingType === "online" 
//       ? selectedBooking.property || {} 
//       : selectedBooking.propertyId || {};
      
//     const room = bookingType === "online"
//       ? selectedBooking.roomDetails?.[0] || {}
//       : selectedBooking.roomDetails || {};

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={() => setSelectedBooking(null)}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200  px-4 py-2.5 rounded-lg  hover:shadow-md border border-gray-100"
//             >
//               <FaArrowLeft className="text-sm" /> Back to Bookings
//             </button>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleTransferClick(selectedBooking)}
//                 className="flex items-center gap-2 bg-[#1e3b8a] text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
//               >
//                 <FaAngleDoubleRight className="text-sm" />
//                 Transfer
//               </button>
//             </div>
//           </div>

//           <div className=" rounded-2xl  border-2 border-gray-200 overflow-hidden">
//             <div className="bg-[#1e3b8a] p-6 text-white">
//               <h2 className="text-2xl font-bold">Booking Details</h2>
//               <p className="text-blue-100 mt-1">Booking ID: {selectedBooking._id || selectedBooking.id || "N/A"}</p>
//             </div>

//             <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Tenant Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaUser className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Tenant Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Name" value={tenant.name || "N/A"} />
//                   <InfoRow label="Email" value={tenant.email || "N/A"} />
//                   <InfoRow label="Phone" value={tenant.phone || "N/A"} />
//                   <InfoRow label="Tenant Client ID" value={tenant.clientId || "N/A"} />
//                 </div>
//               </div>

//               {/* Property Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaHome className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Property Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow label="Property Name" value={property.name || "N/A"} />
//                   <InfoRow label="Address" value={property.locality || property.address || "N/A"} />
//                   <InfoRow label="Room No/ID" value={room.roomNumber || room.roomIdentifier || "N/A"} />
//                   <InfoRow label="Room Type/Sharing" value={room.sharingType || room.roomType || selectedBooking.roomType || "N/A"} />
//                   <InfoRow label="Property Owner ID" value={selectedBooking.clientId || "N/A"} />
//                   <InfoRow label="Property ID" value={property._id || property.id || "N/A"} />
//                 </div>
//               </div>

//               {/* Booking Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaCalendarAlt className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Booking Information</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <InfoRow 
//                     label="Move In" 
//                     value={new Date(selectedBooking.checkInDate || selectedBooking.moveInDate).toLocaleDateString()} 
//                   />
//                   <InfoRow 
//                     label="Move Out" 
//                     value={new Date(selectedBooking.checkOutDate || selectedBooking.moveOutDate).toLocaleDateString()} 
//                   />
//                   <InfoRow
//                     label="Status"
//                     value={
//                       <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusBadge(selectedBooking.status || selectedBooking.bookingStatus)}`}>
//                         {(selectedBooking.status || selectedBooking.bookingStatus || "N/A")?.toUpperCase()}
//                       </span>
//                     }
//                   />
//                   <InfoRow label="Booking ID" value={selectedBooking._id || selectedBooking.id || "N/A"} />
//                   <InfoRow 
//                     label="Approved At" 
//                     value={selectedBooking.approvedAt 
//                       ? new Date(selectedBooking.approvedAt).toLocaleString() 
//                       : "N/A"} 
//                   />
//                 </div>
//               </div>

//               {/* Payment & Additional Info */}
//               <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
//                     <FaMoneyBillWave className="text-gray-800" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 text-lg">Payment & Additional Info</h3>
//                 </div>

//                 <div className="space-y-3">
//                   <InfoRow label="Payment Status" value={selectedBooking.paymentStatus || "N/A"} />
//                   <InfoRow 
//                     label="Amount Paid" 
//                     value={selectedBooking.paymentInfo?.paidAmount 
//                       ? `₹${selectedBooking.paymentInfo.paidAmount}` 
//                       : "N/A"} 
//                   />
//                   <InfoRow 
//                     label="Total Amount" 
//                     value={selectedBooking.pricing?.totalAmount 
//                       ? `₹${selectedBooking.pricing.totalAmount}` 
//                       : "N/A"} 
//                   />
//                   <InfoRow label="Payment Method" value={selectedBooking.paymentInfo?.paymentMethod || "N/A"} />
//                   <InfoRow label="Transaction ID" value={selectedBooking.paymentInfo?.transactionId || "N/A"} />
//                   <InfoRow 
//                     label="Payment Date" 
//                     value={
//                       selectedBooking.paymentInfo?.paymentDate
//                         ? new Date(selectedBooking.paymentInfo.paymentDate).toLocaleString()
//                         : "N/A"
//                     }
//                   />

//                   {/* Additional fields - conditionally rendered */}
//                   {showMorePaymentInfo && (
//                     <div className="space-y-3 border-t border-gray-200 pt-3">
//                       <InfoRow label="Transfer Status" value={selectedBooking.transferStatus || "N/A"} />
//                       <InfoRow 
//                         label="Client Amount" 
//                         value={
//                           selectedBooking.transferDetails?.clientAmount
//                             ? `₹${selectedBooking.transferDetails.clientAmount}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="Platform Commission" 
//                         value={
//                           selectedBooking.transferDetails?.platformCommission
//                             ? `₹${selectedBooking.transferDetails.platformCommission}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="GST on Commission" 
//                         value={
//                           selectedBooking.transferDetails?.gstOnCommission
//                             ? `₹${selectedBooking.transferDetails.gstOnCommission}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow 
//                         label="Total Platform Earnings" 
//                         value={
//                           selectedBooking.transferDetails?.totalPlatformEarnings
//                             ? `₹${selectedBooking.transferDetails.totalPlatformEarnings}`
//                             : "N/A"
//                         } 
//                       />
//                       <InfoRow label="Transfer Notes" value={selectedBooking.transferDetails?.transferNotes || "N/A"} />
//                       <InfoRow label="Booking Source" value={bookingType} />
//                     </div>
//                   )}

//                   {/* Toggle button */}
//                   <button
//                     onClick={() => setShowMorePaymentInfo(!showMorePaymentInfo)}
//                     className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors mt-2"
//                   >
//                     {showMorePaymentInfo ? (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
//                         <span className="opacity-50 hover:opacity-100">Show Less</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                         </svg>
//                       </div>
//                     ) : (
//                       <div className="opacity-70 hover:opacity-100 flex gap-3 items-center">
//                         <span>Show More Payment Details</span>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                         </svg>
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Transfer Popup */}
//         {showTransferPopup && (
//           <TransferPopup
//             booking={selectedBooking}
//             bankAccounts={bankAccounts}
//             bankAccountLoading={bankAccountLoading}
//             selectedBankAccount={selectedBankAccount}
//             onSelectBankAccount={setSelectedBankAccount}
//             onProceed={handleProceedWithTransfer}
//             onClose={() => {
//               setShowTransferPopup(false);
//               setSelectedBankAccount(null);
//             }}
//             onTransferComplete={(transferDetails) => {
//               console.log('Transfer completed:', transferDetails);
//               // Refresh data
//               fetchBookings(bookingType);
//             }}
//           />
//         )}
//       </div>
//     );
//   }

//   // ---------- Main Page & Table ----------
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Bookings Management</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search bookings..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-72 border border-gray-300 px-10 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition text-sm"
//               >
//                 <FaBars className="text-gray-600" />
//                 {bookingType === "online" ? "Online Bookings" : "Offline Bookings"}
//               </button>
//               {menuOpen && (
//                 <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                   <button
//                     className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                       bookingType === "online" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                     }`}
//                     onClick={() => {
//                       setBookingType("online");
//                       setMenuOpen(false);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     Online Bookings
//                   </button>
//                   <button
//                     className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                       bookingType === "offline" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                     }`}
//                     onClick={() => {
//                       setBookingType("offline");
//                       setMenuOpen(false);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     Offline Bookings
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bookings Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Tenant Client ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Tenant Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Phone
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Property Owner ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Property
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     {bookingType === "online" ? "Room No" : "Room ID"}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     {bookingType === "online" ? "Room Type" : "Sharing"}
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Move In
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Move Out
//                   </th>
//                   <th className="px-6py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedBookings.map((booking) => {
//                   const room = bookingType === "online"
//                     ? booking.roomDetails?.[0] || {}
//                     : booking.roomDetails || {};
//                   const property = bookingType === "online" 
//                     ? booking.property || {} 
//                     : booking.propertyId || {};
//                   const tenant = bookingType === "online"
//                     ? booking.user || {}
//                     : (typeof booking.tenant === "object" 
//                         ? booking.tenant 
//                         : { name: booking.tenant });
                  
//                   const tenantClientId = tenant.clientId || "N/A";
//                   const propertyOwnerId = booking.clientId || "N/A";

//                   return (
//                     <tr 
//                       key={booking._id || booking.id} 
//                       className="hover:bg-gray-50 transition-colors cursor-pointer"
//                       onClick={() => setSelectedBooking(booking)}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenantClientId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenant.name || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {tenant.phone || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {propertyOwnerId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {property.name || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {room.roomNumber || room.roomIdentifier || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {room.sharingType || room.roomType || booking.roomType || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(booking.checkInDate || booking.moveInDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {new Date(booking.checkOutDate || booking.moveOutDate).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
//                             booking.status || booking.bookingStatus
//                           )}`}
//                         >
//                           {(booking.status || booking.bookingStatus || "N/A")?.toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setSelectedBooking(booking);
//                           }}
//                           className="text-blue-600 hover:text-blue-900 font-medium text-sm"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4 px-2">
//             <div className="text-sm text-gray-700">
//               Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length)} of{" "}
//               {filteredBookings.length} entries
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 text-sm rounded border ${
//                   currentPage === 1
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 Previous
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-3 py-1 text-sm rounded border ${
//                     currentPage === index + 1
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 text-sm rounded border ${
//                   currentPage === totalPages
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bookings;