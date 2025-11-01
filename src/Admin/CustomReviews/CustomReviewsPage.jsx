import React, { useState, useEffect, useCallback } from "react";
import {
  FaStar,
  FaSearch,
  FaCheck,
  FaTimes,
  FaReply,
  FaCrown,
  FaEye,
  FaPlus,
  FaExclamationTriangle,
  FaSync,
  FaMale,
  FaFemale,
  FaUser
} from "react-icons/fa";
import { API_BASE_URL } from "../adminController";


// const API_BASE = "http://localhost:5000/api/custom-reviews";

// Predefined avatar images based on gender
const getAvatarByGender = (gender, name = "User") => {
  const encodedName = encodeURIComponent(name || "User");
  
  switch(gender) {
    case 'male':
      return `https://ui-avatars.com/api/?name=${encodedName}&background=1e3a8a&color=fff&bold=true&size=128`;
    case 'female':
      return `https://ui-avatars.com/api/?name=${encodedName}&background=EC4899&color=fff&bold=true&size=128`;
    case 'neutral':
    default:
      return `https://ui-avatars.com/api/?name=${encodedName}&background=6B7280&color=fff&bold=true&size=128`;
  }
};

// Alternative: Using random but gender-specific avatars from randomuser.me
const getRandomAvatarByGender = (gender) => {
  const maleAvatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=128&h=128&fit=crop&crop=face',
  ];
  
  const femaleAvatars = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face',
  ];
  
  const neutralAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=128&h=128&fit=crop&crop=face',
  ];

  const avatars = {
    male: maleAvatars,
    female: femaleAvatars,
    neutral: neutralAvatars
  };

  const genderAvatars = avatars[gender] || neutralAvatars;
  return genderAvatars[Math.floor(Math.random() * genderAvatars.length)];
};

const CustomReviewsPage = () => {
  const [customReviews, setCustomReviews] = useState([]);
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [activeTab, setActiveTab] = useState("manage");
  const [avatarType, setAvatarType] = useState("generated");

  // Infinite scroll states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);

  // New review form state
  const [newReview, setNewReview] = useState({
    propertyId: "",
    userName: "",
    userAvatar: "",
    gender: "neutral",
    rating: 5,
    comment: "",
    images: []
  });

  // Fetch data from APIs
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1, loadMore = false) => {
    if (loadMore) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
      setCurrentPage(1);
      setHasMore(true);
    }
    
    setError(null);
    try {
      console.log("Fetching data from API:", API_BASE_URL);
      
      const endpoints = [
        `${API_BASE_URL}/custom-reviews/admin/all?page=${page}&limit=20`,
        `${API_BASE_URL}/custom-reviews/admin/properties`, 
        page === 1 ? `${API_BASE_URL}/custom-reviews/admin/approved?limit=20` : null // Only load approved on first page
      ].filter(Boolean);

      const responses = await Promise.all(
        endpoints.map(url => 
          fetch(url).then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
        )
      );

      const [reviewsData, propertiesData, approvedData] = page === 1 
        ? [responses[0], responses[1], responses[2]] 
        : [responses[0], responses[1], null];

      if (reviewsData.success) {
        if (loadMore) {
          setCustomReviews(prev => [...prev, ...reviewsData.data]);
        } else {
          setCustomReviews(reviewsData.data || []);
        }
        
        // Update pagination info
        setTotalReviews(reviewsData.pagination?.total || 0);
        setHasMore(page < reviewsData.pagination?.pages);
        setCurrentPage(page);
      } else {
        throw new Error(reviewsData.message || "Failed to fetch reviews");
      }

      if (propertiesData.success) {
        setProperties(propertiesData.data || []);
      } else {
        throw new Error(propertiesData.message || "Failed to fetch properties");
      }

      if (approvedData && approvedData.success) {
        setApprovedReviews(approvedData.data || []);
      } else if (approvedData && !approvedData.success) {
        throw new Error(approvedData.message || "Failed to fetch approved reviews");
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Failed to load data: ${error.message}`);
      if (!loadMore) {
        setCustomReviews([]);
        setProperties([]);
        setApprovedReviews([]);
      }
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Infinite scroll handler
  const loadMoreReviews = useCallback(() => {
    if (!hasMore || isLoadingMore || loading) return;
    fetchData(currentPage + 1, true);
  }, [currentPage, hasMore, isLoadingMore, loading]);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          !== document.documentElement.offsetHeight) return;
      loadMoreReviews();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreReviews]);

  // Update avatar when name, gender, or avatar type changes
  useEffect(() => {
    if (newReview.userName || newReview.gender) {
      let generatedAvatar;
      
      if (avatarType === "random") {
        generatedAvatar = getRandomAvatarByGender(newReview.gender);
      } else {
        generatedAvatar = getAvatarByGender(newReview.gender, newReview.userName || "User");
      }
      
      setNewReview(prev => ({
        ...prev,
        userAvatar: generatedAvatar
      }));
    }
  }, [newReview.userName, newReview.gender, avatarType]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/custom-reviews/admin/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCustomReviews(prev =>
          prev.map(r => (r._id === id ? { ...r, status: "approved" } : r))
        );
        alert("Review approved successfully!");
      } else {
        alert("Failed to approve review: " + data.message);
      }
    } catch (error) {
      console.error("Error approving review:", error);
      alert("Failed to approve review. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/custom-reviews/admin/reject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCustomReviews(prev =>
          prev.map(r => (r._id === id ? { ...r, status: "rejected" } : r))
        );
        alert("Review rejected successfully!");
      } else {
        alert("Failed to reject review: " + data.message);
      }
    } catch (error) {
      console.error("Error rejecting review:", error);
      alert("Failed to reject review. Please try again.");
    }
  };

  const handleAddResponse = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/custom-reviews/admin/response/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: responseText })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCustomReviews(prev =>
          prev.map(r => (r._id === id ? { ...r, adminResponse: responseText } : r))
        );
        setShowModal(false);
        setResponseText("");
        alert("Response added successfully!");
      } else {
        alert("Failed to add response: " + data.message);
      }
    } catch (error) {
      console.error("Error adding response:", error);
      alert("Failed to add response. Please try again.");
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/custom-reviews/admin/featured/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCustomReviews(prev =>
          prev.map(r =>
            r._id === id ? { ...r, isFeatured: !r.isFeatured } : r
          )
        );
        alert(data.message);
      } else {
        alert("Failed to toggle featured status: " + data.message);
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Failed to toggle featured status. Please try again.");
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/custom-reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview)
      });
      
      const data = await response.json();
      console.log("Create review response:", data);
      
      if (data.success) {
        setCustomReviews(prev => [data.data, ...prev]);
        setShowCreateModal(false);
        setNewReview({
          propertyId: "",
          userName: "",
          userAvatar: "",
          gender: "neutral",
          rating: 5,
          comment: "",
          images: []
        });
        alert("Review created successfully!");
      } else {
        alert("Failed to create review: " + data.message);
      }
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Failed to create review. Please try again.");
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          onClick={() => interactive && onRatingChange && onRatingChange(star)}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
        />
      ))}
      {!interactive && <span className="ml-2 text-sm text-gray-600">({rating})</span>}
    </div>
  );

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status] || 'bg-gray-100 text-gray-800'}`}>
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
      </span>
    );
  };

  const getGenderIcon = (gender) => {
    switch(gender) {
      case 'male': return <FaMale className="w-3 h-3 text-blue-900" />;
      case 'female': return <FaFemale className="w-3 h-3 text-pink-500" />;
      default: return <FaUser className="w-3 h-3 text-gray-500" />;
    }
  };

  const openResponseModal = (review) => {
    setSelectedReview(review);
    setResponseText(review.adminResponse || "");
    setShowModal(true);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const renderUserReviewCard = (review) => (
    <div key={review._id} className="bg-white rounded-lg shadow-md border p-4 sm:p-6 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <img 
            src={review.userAvatar || getAvatarByGender(review.gender || 'neutral', review.userName)} 
            alt={review.userName} 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border" 
            onError={(e) => {
              e.target.src = getAvatarByGender(review.gender || 'neutral', review.userName);
            }}
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{review.userName}</h3>
              {getGenderIcon(review.gender)}
            </div>
            <div className="flex items-center space-x-2">
              {renderStars(review.rating)}
              {review.isFeatured && <FaCrown className="w-4 h-4 text-purple-500" />}
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'No date'}
        </span>
      </div>
      <h4 className="font-medium text-gray-700 mb-1">Property Reviewed:</h4>
      <p className="text-gray-900 font-semibold mb-3 text-sm sm:text-base">
        {review.propertyId?.name || "Unknown Property"}
      </p>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">{review.comment}</p>
      
      {review.images && review.images.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.images.map((img, index) => (
            <img key={index} src={img} alt={`Review ${index + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 flex-col space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        <p className="text-gray-600">Loading reviews and properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
          <FaExclamationTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-bold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-2 text-sm sm:text-base">{error}</p>
          <button
            onClick={() => fetchData()}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mx-auto text-sm sm:text-base"
          >
            <FaSync className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Manage Custom Reviews</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {totalReviews} total reviews • {customReviews.length} loaded • {properties.length} properties • {approvedReviews.length} approved
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => fetchData()}
            className="flex items-center justify-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm sm:text-base"
          >
            <FaSync className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm sm:text-base"
          >
            <FaPlus className="w-4 h-4" />
            <span>Create Review</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
        <div className="flex min-w-max">
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-3 font-medium ${
              activeTab === "manage"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-500"
            }`}
          >
            <FaSearch className="w-4 h-4" />
            <span>Manage Reviews ({totalReviews})</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-3 font-medium ${
              activeTab === "preview"
                ? "text-blue-900 border-b-2 border-blue-900"
                : "text-gray-500"
            }`}
          >
            <FaEye className="w-4 h-4" />
            <span>Preview User View ({approvedReviews.length})</span>
          </button>
        </div>
      </div>

      {/* Manage Tab */}
      {activeTab === "manage" ? (
        <div>
          {customReviews.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-lg border">
              <FaExclamationTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No Reviews Found</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">There are no custom reviews in the system yet.</p>
              <button
                onClick={openCreateModal}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 text-sm sm:text-base"
              >
                Create Your First Review
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {customReviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="p-3 sm:p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={review.userAvatar || getAvatarByGender(review.gender || 'neutral', review.userName)} 
                          alt={review.userName} 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" 
                          onError={(e) => {
                            e.target.src = getAvatarByGender(review.gender || 'neutral', review.userName);
                          }}
                        />
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{review.userName}</h3>
                          {getGenderIcon(review.gender)}
                        </div>
                      </div>
                      {getStatusBadge(review.status)}
                    </div>

                    <div className="p-3 sm:p-4">
                      {renderStars(review.rating)}
                      <p className="text-gray-700 mt-2 mb-4 text-sm sm:text-base">{review.comment}</p>

                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">Property:</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">
                        {review.propertyId?.name || "Unknown Property"}
                      </p>

                      {review.adminResponse && (
                        <div className="p-2 sm:p-3 bg-blue-50 rounded-md text-xs sm:text-sm text-blue-900">
                          <strong>Admin:</strong> {review.adminResponse}
                        </div>
                      )}
                    </div>

                    <div className="px-3 sm:px-4 py-3 bg-gray-50 border-t flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap gap-2">
                        {review.status === "pending" && (
                          <>
                            <button onClick={() => handleApprove(review._id)} className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs hover:bg-green-600 flex items-center">
                              <FaCheck className="w-3 h-3 mr-1" /> Approve
                            </button>
                            <button onClick={() => handleReject(review._id)} className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs hover:bg-red-600 flex items-center">
                              <FaTimes className="w-3 h-3 mr-1" /> Reject
                            </button>
                          </>
                        )}
                        <button onClick={() => openResponseModal(review)} className="bg-blue-900 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs hover:bg-blue-800 flex items-center">
                          <FaReply className="w-3 h-3 mr-1" /> Respond
                        </button>
                      </div>
                      <button
                        onClick={() => handleToggleFeatured(review._id)}
                        className={`p-2 rounded ${review.isFeatured ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"} self-start sm:self-auto`}
                      >
                        <FaCrown />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="flex justify-center items-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-900"></div>
                  <span className="ml-3 text-gray-600 text-sm sm:text-base">Loading more reviews...</span>
                </div>
              )}

              {/* No More Reviews Indicator */}
              {!hasMore && customReviews.length > 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                  No more reviews to load
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        // Preview Tab
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Preview - User View</h2>
          {approvedReviews.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-lg border">
              <FaEye className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No Approved Reviews</h3>
              <p className="text-gray-500 text-sm sm:text-base">There are no approved reviews to preview.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {approvedReviews.map(renderUserReviewCard)}
            </div>
          )}
        </div>
      )}

      {/* Create Review Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Review</h3>
            <form onSubmit={handleCreateReview} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Select Property *</label>
                <select
                  required
                  value={newReview.propertyId}
                  onChange={(e) => setNewReview({ ...newReview, propertyId: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                >
                  <option value="">Choose a property</option>
                  {properties.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} - {p.city} ({p.locality})
                    </option>
                  ))}
                </select>
                {properties.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">No properties available.</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">User Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                    placeholder="Enter reviewer name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Gender *</label>
                  <select
                    required
                    value={newReview.gender}
                    onChange={(e) => setNewReview({ ...newReview, gender: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  >
                    <option value="neutral">Neutral</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Avatar Type Selection */}
              <div>
                <label className="block text-sm mb-2">Avatar Type</label>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="generated"
                      checked={avatarType === "generated"}
                      onChange={(e) => setAvatarType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Generated Avatar</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="random"
                      checked={avatarType === "random"}
                      onChange={(e) => setAvatarType(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Random Photo</span>
                  </label>
                </div>
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded border">
                <img 
                  src={newReview.userAvatar || getAvatarByGender(newReview.gender, newReview.userName)} 
                  alt="Avatar preview" 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow"
                  onError={(e) => {
                    e.target.src = getAvatarByGender(newReview.gender, newReview.userName);
                  }}
                />
                <div>
                  <p className="text-sm font-medium">Avatar Preview</p>
                  <p className="text-xs text-gray-500">
                    {avatarType === "generated" 
                      ? "Generated based on name and gender" 
                      : "Random photo based on gender"}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getGenderIcon(newReview.gender)}
                    <span className="text-xs text-gray-600 capitalize">{newReview.gender}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Rating *</label>
                {renderStars(newReview.rating, true, (r) => setNewReview({ ...newReview, rating: r }))}
              </div>

              <div>
                <label className="block text-sm mb-2">Comment *</label>
                <textarea
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  rows="3"
                  placeholder="Enter the review comment..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="bg-gray-300 px-4 py-2 rounded text-sm sm:text-base order-2 sm:order-1">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-blue-700 text-sm sm:text-base order-1 sm:order-2"
                  disabled={properties.length === 0}
                >
                  {properties.length === 0 ? 'No Properties Available' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Add Response</h3>
            <p className="text-sm italic mb-3 text-gray-600">"{selectedReview.comment}"</p>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              rows="4"
              className="w-full border rounded px-3 py-2 mb-4 text-sm sm:text-base"
              placeholder="Type your response here..."
            ></textarea>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded text-sm sm:text-base order-2 sm:order-1">
                Cancel
              </button>
              <button onClick={() => handleAddResponse(selectedReview._id)} className="bg-blue-900 text-white px-4 py-2 rounded text-sm sm:text-base order-1 sm:order-2">
                Save Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReviewsPage;