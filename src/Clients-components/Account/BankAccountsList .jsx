import React, { useState, useEffect } from 'react';
import { bankAccountAPI } from '../PropertyController';
import ClientNav from '../Client-Navbar/ClientNav';
import AddBankAccount from './AddBankAccount'; // Import the AddBankAccount component

const BankAccountsList = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      setLoading(true);
      const response = await bankAccountAPI.getMyBankAccounts();
      if (response.data.success) {
        setBankAccounts(response.data.bankAccounts || []);
      }
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      setError('Failed to load bank accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuccess = (newAccount) => {
    setBankAccounts(prev => [newAccount, ...prev]);
    setShowAddForm(false); // Close the form after successful addition
    alert('Bank account added successfully!');
  };

  const handleCancelAdd = () => {
    setShowAddForm(false); // Close the form when cancel is clicked
  };

  const handleDeleteAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to delete this bank account?')) {
      return;
    }

    try {
      const response = await bankAccountAPI.deleteBankAccount(accountId);
      if (response.data.success) {
        setBankAccounts(prev => prev.filter(account => account._id !== accountId));
        alert('Bank account deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting bank account:', error);
      alert('Failed to delete bank account');
    }
  };

  const getStatusBadge = (status, isVerified) => {
    if (isVerified) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Verified</span>;
    }
    
    switch (status) {
      case 'verified':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Verified</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Unknown</span>;
    }
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    return 'X'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
  };

  // Show AddBankAccount component when showAddForm is true
  if (showAddForm) {
    return (
      <AddBankAccount 
        onSuccess={handleAddSuccess} 
        onCancel={handleCancelAdd} 
      />
    );
  }

  if (loading) {
    return (
      <>
        <ClientNav />
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading bank accounts...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bank Accounts</h1>
                <p className="text-gray-600 mt-1">Manage your bank accounts for receiving payments</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Bank Account</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="text-red-800">{error}</div>
              </div>
            )}

            {bankAccounts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bank Accounts</h3>
                <p className="text-gray-600 mb-6">
                  You haven't added any bank accounts yet. Add your first bank account to start receiving payments.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Bank Account
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bankAccounts.map((account) => (
                  <div key={account._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{account.accountHolderName}</h3>
                            <p className="text-sm text-gray-600">{account.bankName} • {account.accountType} Account</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Account Number:</span>
                            <span className="ml-2 font-mono">{maskAccountNumber(account.accountNumber)}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">IFSC Code:</span>
                            <span className="ml-2 font-mono">{account.ifscCode}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Branch:</span>
                            <span className="ml-2">{account.branchName}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Status:</span>
                            <span className="ml-2">{getStatusBadge(account.verificationStatus, account.isVerified)}</span>
                          </div>
                        </div>

                        {account.propertyId && (
                          <div className="mt-3">
                            <span className="font-medium text-gray-700">Linked Property:</span>
                            <span className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
                              {account.propertyId.name || 'Property'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteAccount(account._id)}
                          className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          disabled={account.isVerified}
                          title={account.isVerified ? "Cannot delete verified account" : "Delete account"}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {account.verificationStatus === 'pending' && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span>Verification pending. Your account will be verified within 24-48 hours.</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAccountsList;