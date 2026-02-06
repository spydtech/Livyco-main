// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   MessageCircle, 
//   X, 
//   Send, 
//   Mic, 
//   MicOff, 
//   Trash2,
//   Paperclip,
//   Camera,
//   ThumbsUp,
//   ThumbsDown,
//   Bot,
//   User,
//   Search
// } from 'lucide-react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const [hasWelcomeShown, setHasWelcomeShown] = useState(false);
//   const [filters, setFilters] = useState({});
//   const messagesEndRef = useRef(null);

//   // API base URL
//   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//   // Check authentication status
//   useEffect(() => {
//     const checkAuth = () => {
//       console.log('🔍 Checking authentication...');
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       console.log('Token exists:', !!token);
//       console.log('User data exists:', !!userData);
      
//       if (token && userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           console.log('User parsed successfully:', parsedUser);
//           setUser(parsedUser);
//           setIsAuthenticated(true);
          
//           // Initialize chatbot only if authenticated
//           initializeChatbot();
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       } else {
//         console.log('No token or user data found');
//         setIsAuthenticated(false);
//         setUser(null);
//         setMessages([]);
//         setIsOpen(false);
//         setSessionId(null);
//       }
//     };

//     // Check immediately on mount
//     checkAuth();
    
//     // Listen for storage changes (login/logout)
//     const handleStorageChange = () => {
//       console.log('📦 Storage changed, re-checking auth...');
//       checkAuth();
//     };
    
//     // Listen for custom auth change events
//     const handleCustomAuthChange = () => {
//       console.log('🔔 Custom auth event triggered');
//       checkAuth();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('authChange', handleCustomAuthChange);
    
//     // Also check on window focus (in case user logged in another tab)
//     const handleFocus = () => {
//       console.log('👀 Window focused, checking auth...');
//       checkAuth();
//     };
    
//     window.addEventListener('focus', handleFocus);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('authChange', handleCustomAuthChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, []);

//   // Initialize chatbot when authenticated
//   const initializeChatbot = () => {
//     console.log('🚀 Initializing chatbot for authenticated user');
    
//     // Auto-open on first login
//     const hasSeenChatbot = localStorage.getItem('has_seen_chatbot');
//     console.log('Has seen chatbot before:', hasSeenChatbot);
    
//     if (!hasSeenChatbot) {
//       console.log('📱 Auto-opening chat for first-time user');
//       setTimeout(() => {
//         setIsOpen(true);
//         localStorage.setItem('has_seen_chatbot', 'true');
//       }, 1500);
//     }

//     // Set up session
//     const storedSessionId = localStorage.getItem('chatbot_session_id');
//     if (storedSessionId) {
//       console.log('📝 Using existing session:', storedSessionId);
//       setSessionId(storedSessionId);
//       loadConversationHistory(storedSessionId);
//     } else {
//       const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       console.log('🆕 Creating new session:', newSessionId);
//       setSessionId(newSessionId);
//       localStorage.setItem('chatbot_session_id', newSessionId);
//     }
    
//     // Send initial greeting if no messages
//     if (messages.length === 0 && !hasWelcomeShown) {
//       console.log('👋 Sending initial greeting');
//       setTimeout(() => {
//         sendInitialGreeting();
//       }, 800);
//     }
//   };

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const loadConversationHistory = async (sessionId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('❌ No token found for loading history');
//         return;
//       }

//       console.log('📚 Loading conversation history for session:', sessionId);
//       const response = await axios.get(`${API_BASE}/chatbot/history/${sessionId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       console.log('History response:', response.data);
      
//       if (response.data && response.data.success !== false) {
//         const historyData = response.data.history || [];
//         console.log('✅ History loaded:', historyData.length, 'messages');
        
//         // Format history to match our message structure
//         const formattedHistory = historyData.map(msg => ({
//           _id: msg._id,
//           message: msg.message,
//           isBot: msg.isBot || (msg.sender === 'bot' || msg.sender === 'Livy AI'),
//           timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
//           sender: msg.sender || (msg.isBot ? 'Livy AI' : 'User'),
//           quickReplies: msg.quickReplies || [],
//           actions: msg.actions || [],
//           properties: msg.properties || [],
//           filters: msg.filters || {}
//         }));
        
//         setMessages(formattedHistory);
//         if (formattedHistory.length > 0) {
//           setHasWelcomeShown(true);
//         }
//       } else {
//         console.warn('History API returned error:', response.data);
//       }
//     } catch (error) {
//       console.error('❌ Error loading history:', error);
//       if (error.response) {
//         console.error('Response error:', error.response.data);
//       }
//     }
//   };

//   const sendInitialGreeting = () => {
//     console.log('🎯 Creating greeting for user:', user);
    
//     let greetingMessage = {
//       _id: `initial_greeting_${Date.now()}`,
//       message: "Hello! 👋 I'm Livy, your AI assistant for Livyco Hostels. How can I help you today?",
//       isBot: true,
//       timestamp: new Date(),
//       quickReplies: [
//         { text: "Find hostels", action: "find_hostels" },
//         { text: "Check prices", action: "check_prices" },
//         { text: "Book virtual tour", action: "virtual_tour" },
//         { text: "My bookings", action: "my_bookings" }
//       ],
//       actions: [
//         {
//           type: 'browse',
//           label: 'Browse properties',
//           action: 'browse_properties'
//         }
//       ]
//     };

//     // Personalize greeting based on user type
//     if (user) {
//       console.log('👤 Personalizing greeting for user role:', user.role);
//       if (user.role === 'student') {
//         greetingMessage = {
//           ...greetingMessage,
//           message: `Hello ${user.name || 'student'}! 👋 I'm Livy, your AI assistant for Livyco Hostels. Need help with student housing or bookings?`,
//           quickReplies: [
//             { text: "Student hostels", action: "student_hostels" },
//             { text: "My applications", action: "my_applications" },
//             { text: "Payment status", action: "payment_status" },
//             { text: "Contact warden", action: "contact_warden" }
//           ]
//         };
//       } else if (user.role === 'admin' || user.role === 'warden' || user.role === 'client') {
//         greetingMessage = {
//           ...greetingMessage,
//           message: `Hello ${user.name || 'admin'}! 👋 I'm Livy, your AI assistant for managing Livyco Hostels.`,
//           quickReplies: [
//             { text: "View bookings", action: "view_bookings" },
//             { text: "Check occupancy", action: "check_occupancy" },
//             { text: "Manage rooms", action: "manage_rooms" },
//             { text: "Generate reports", action: "generate_reports" }
//           ]
//         };
//       }
//     }

//     setMessages(prev => [...prev, greetingMessage]);
//     setHasWelcomeShown(true);
//   };

//   const toggleChat = () => {
//     console.log('🔘 Toggling chat from', isOpen, 'to', !isOpen);
//     setIsOpen(!isOpen);
//   };

//   const sendMessage = async (messageText = null) => {
//     if (!isAuthenticated) {
//       console.warn('⚠️ User not authenticated, cannot send message');
//       alert('Please login to send messages');
//       return;
//     }

//     const text = messageText || inputMessage.trim();
//     if (!text || !sessionId) {
//       console.warn('⚠️ Cannot send empty message or missing session');
//       return;
//     }

//     console.log('📤 Sending message:', text);
    
//     // Add user message
//     const userMessage = {
//       _id: `user_${Date.now()}`,
//       message: text,
//       isBot: false,
//       timestamp: new Date(),
//       sender: user?.name || 'User'
//     };

//     setMessages(prev => [...prev, userMessage]);
//     if (!messageText) setInputMessage('');
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem('token');
//       console.log('🔐 Using token for API request');
      
//       const response = await axios.post(`${API_BASE}/chatbot/chat`, {
//         message: text,
//         sessionId,
//         userId: user?.id,
//         userRole: user?.role
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('✅ Bot response received:', response.data);
      
//       // Check if response is successful
//       if (response.data && response.data.success !== false) {
//         const botMessage = {
//           _id: `bot_${Date.now()}`,
//           message: response.data.response || "I'm here to help!",
//           isBot: true,
//           timestamp: new Date(),
//           quickReplies: response.data.quickReplies || [],
//           actions: response.data.actions || [],
//           properties: response.data.properties || [],
//           intent: response.data.intent,
//           filters: response.data.filters || {},
//           sender: 'Livy AI'
//         };

//         console.log('Bot message created:', {
//           hasMessage: !!botMessage.message,
//           quickRepliesCount: botMessage.quickReplies.length,
//           actionsCount: botMessage.actions.length,
//           filters: botMessage.filters
//         });

//         setMessages(prev => [...prev, botMessage]);

//         // Update filters if provided - merge with existing filters
//         if (response.data.filters) {
//           setFilters(prevFilters => ({
//             ...prevFilters,
//             ...response.data.filters
//           }));
//         }

//         // Update session ID if provided
//         if (response.data.sessionId && response.data.sessionId !== sessionId) {
//           setSessionId(response.data.sessionId);
//           localStorage.setItem('chatbot_session_id', response.data.sessionId);
//         }

//       } else {
//         // Handle API error response
//         console.warn('API returned error:', response.data);
//         const errorMessage = {
//           _id: `error_${Date.now()}`,
//           message: response.data.error || response.data.message || "Sorry, I encountered an error. Please try again.",
//           isBot: true,
//           timestamp: new Date(),
//           sender: 'Livy AI'
//         };
//         setMessages(prev => [...prev, errorMessage]);
//       }
//     } catch (error) {
//       console.error('❌ Error sending message:', error);
      
//       // More detailed error logging
//       if (error.response) {
//         console.error('Response error:', error.response.data);
//         console.error('Response status:', error.response.status);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error setting up request:', error.message);
//       }
      
//       const errorMessage = {
//         _id: `error_${Date.now()}`,
//         message: "Sorry, I'm having trouble connecting to the server. Please check your connection and try again.",
//         isBot: true,
//         timestamp: new Date(),
//         sender: 'Livy AI'
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQuickReply = (quickReply) => {
//     console.log('⚡ Quick reply clicked:', quickReply.text);
//     const messageToSend = quickReply.action 
//       ? quickReply.action.startsWith('ACTION:') 
//         ? quickReply.action 
//         : `ACTION:${quickReply.action}`
//       : quickReply.text;
//     sendMessage(messageToSend);
//   };

//   const handleActionPress = (action) => {
//     console.log('🎯 Action button clicked:', action, 'Current filters:', filters);
    
//     // Handle browse properties action
//     if (action.action === 'browse_properties' || action.label === 'Browse properties') {
//       navigateToSearchPage(filters);
//       return;
//     }
    
//     // Handle navigation actions based on action type or label
//     const actionType = action.action || action.type || '';
//     const actionLabel = (action.label || '').toLowerCase();
    
//     // Start with existing filters
//     let filterData = { ...filters };

//     // Apply new filter based on action
//     // Price-based filters - set as range format
//     if (actionType.includes('under_5000') || actionLabel.includes('under 5000') || actionLabel.includes('under ₹5000')) {
//       filterData.budget = '0-5000';
//     } else if (actionType.includes('under_10000') || actionLabel.includes('under 10000') || actionLabel.includes('under ₹10000')) {
//       filterData.budget = '0-10000';
//     } else if (actionType.includes('under_15000') || actionLabel.includes('under 15000') || actionLabel.includes('under ₹15000')) {
//       filterData.budget = '0-15000';
//     } else if (actionType.includes('under_20000') || actionLabel.includes('under 20000') || actionLabel.includes('under ₹20000')) {
//       filterData.budget = '0-20000';
//     } else if (actionType.includes('5000_10000') || actionLabel.includes('5000-10000') || actionLabel.includes('₹5000-₹10000')) {
//       filterData.budget = '5000-10000';
//     } else if (actionType.includes('10000_15000') || actionLabel.includes('10000-15000') || actionLabel.includes('₹10000-₹15000')) {
//       filterData.budget = '10000-15000';
//     } else if (actionType.includes('15000_20000') || actionLabel.includes('15000-20000') || actionLabel.includes('₹15000-₹20000')) {
//       filterData.budget = '15000-20000';
//     }
//     // Gender-based filters
//     else if (actionType.includes('male') || actionLabel.includes('male') || actionLabel.includes('for him')) {
//       filterData.gender = 'Male';
//     } else if (actionType.includes('female') || actionLabel.includes('female') || actionLabel.includes('for her')) {
//       filterData.gender = 'Female';
//     } else if (actionType.includes('co_living') || actionLabel.includes('co-living') || actionLabel.includes('co living')) {
//       filterData.gender = 'Co-Living';
//     }
//     // Room type filters
//     else if (actionType.includes('single') || actionLabel.includes('single sharing')) {
//       filterData.roomType = 'Single Sharing';
//     } else if (actionType.includes('double') || actionLabel.includes('double sharing')) {
//       filterData.roomType = 'Double Sharing';
//     } else if (actionType.includes('triple') || actionLabel.includes('triple sharing')) {
//       filterData.roomType = 'Triple Sharing';
//     } else if (actionType.includes('four') || actionLabel.includes('four sharing')) {
//       filterData.roomType = 'Four Sharing';
//     }
//     // City filters (extracted from previous messages)
//     else if (filters.city) {
//       // City is already in filters from previous message
//       console.log('City filter already exists:', filters.city);
//     }
//     // General navigation actions
//     else if (actionType.includes('find_hostels') || actionLabel.includes('find hostels') || actionLabel.includes('view hostels')) {
//       // Navigate to search page with current filters
//       navigateToSearchPage(filterData);
//       return;
//     } else if (actionType.includes('student_hostels') || actionLabel.includes('student hostels')) {
//       filterData.category = 'student';
//       filterData.gender = filterData.gender || 'Male';
//     } else if (actionType.includes('my_bookings') || actionLabel.includes('my bookings')) {
//       window.location.href = '/bookings';
//       return;
//     } else if (actionType.includes('my_applications') || actionLabel.includes('my applications')) {
//       window.location.href = '/applications';
//       return;
//     } else if (actionType.includes('view_bookings') || actionLabel.includes('view bookings')) {
//       window.location.href = '/admin/bookings';
//       return;
//     } else if (actionType.includes('check_prices') || actionLabel.includes('check prices')) {
//       navigateToSearchPage(filterData);
//       return;
//     } else if (actionType.includes('virtual_tour') || actionLabel.includes('virtual tour')) {
//       window.location.href = '/virtual-tours';
//       return;
//     } else if (actionType.includes('payment_status') || actionLabel.includes('payment status')) {
//       window.location.href = '/payments';
//       return;
//     } else if (actionType.includes('contact_warden') || actionLabel.includes('contact warden')) {
//       window.location.href = '/contact';
//       return;
//     } else if (actionType.includes('contact_support') || actionLabel.includes('contact support')) {
//       window.location.href = '/support';
//       return;
//     } else if (actionType.includes('check_occupancy') || actionLabel.includes('check occupancy')) {
//       window.location.href = '/admin/occupancy';
//       return;
//     } else if (actionType.includes('manage_rooms') || actionLabel.includes('manage rooms')) {
//       window.location.href = '/admin/rooms';
//       return;
//     } else if (actionType.includes('generate_reports') || actionLabel.includes('generate reports')) {
//       window.location.href = '/admin/reports';
//       return;
//     }

//     // Update filters state with combined filters
//     if (Object.keys(filterData).length > 0) {
//       setFilters(filterData);
//       console.log('📝 Updated filters:', filterData);
//     }

//     // Navigate to search page with ALL accumulated filter data
//     if (Object.keys(filterData).length > 0) {
//       console.log('📍 Navigating with combined filter data:', filterData);
//       navigateToSearchPage(filterData);
//     } else if (action.url) {
//       // If action has a direct URL, use it
//       window.location.href = action.url;
//     }
//   };

//   const navigateToSearchPage = (filterData) => {
//     console.log('🔍 Navigating to search page with filters:', filterData);
    
//     // Convert filterData to query parameters
//     const queryParams = new URLSearchParams();
    
//     // Add city filter if available
//     if (filterData.city) {
//       queryParams.append('city', filterData.city);
//     }
    
//     // Handle budget filter - ensure it's in range format
//     if (filterData.budget) {
//       // If budget is a number like 5000, convert to range 0-5000
//       if (typeof filterData.budget === 'number') {
//         queryParams.append('budget', `0-${filterData.budget}`);
//       } 
//       // If budget is already a string range like "0-5000", use it as is
//       else if (typeof filterData.budget === 'string' && filterData.budget.includes('-')) {
//         queryParams.append('budget', filterData.budget);
//       }
//       // If it's just a string number, convert to range
//       else if (typeof filterData.budget === 'string') {
//         const budgetNum = parseInt(filterData.budget);
//         if (!isNaN(budgetNum)) {
//           queryParams.append('budget', `0-${budgetNum}`);
//         } else {
//           queryParams.append('budget', filterData.budget);
//         }
//       }
//     }
    
//     // Add gender filter if available
//     if (filterData.gender) {
//       queryParams.append('gender', filterData.gender);
//     }
    
//     // Add room type filter if available
//     if (filterData.roomType) {
//       queryParams.append('roomType', filterData.roomType);
//     }
    
//     // Add category filter if available
//     if (filterData.category) {
//       queryParams.append('category', filterData.category);
//     }
    
//     // Add other filters if they exist in your filter object
//     if (filterData.rating) {
//       queryParams.append('rating', filterData.rating);
//     }
    
//     if (filterData.recommended) {
//       queryParams.append('recommended', filterData.recommended.toString());
//     }
    
//     // Handle amenities array
//     if (filterData.amenities && Array.isArray(filterData.amenities) && filterData.amenities.length > 0) {
//       filterData.amenities.forEach(amenity => {
//         queryParams.append('amenities', amenity);
//       });
//     }
    
//     // Handle rules array
//     if (filterData.rules && Array.isArray(filterData.rules) && filterData.rules.length > 0) {
//       filterData.rules.forEach(rule => {
//         queryParams.append('rules', rule);
//       });
//     }
    
//     // Build the URL
//     const basePath = '/user/pgsearch';
//     const queryString = queryParams.toString();
//     const url = queryString ? `${basePath}?${queryString}` : basePath;
    
//     console.log('🌐 Navigating to:', url);
    
//     // Navigate to the search page
//     window.location.href = url;
//   };

//   const clearChat = async () => {
//     if (!isAuthenticated) {
//       alert('Please login to clear chat');
//       return;
//     }

//     console.log('🧹 Clearing chat');
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(`${API_BASE}/chatbot/clear`, {
//         sessionId
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('Clear response:', response.data);

//       // Generate new session ID
//       const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       setSessionId(newSessionId);
//       localStorage.setItem('chatbot_session_id', newSessionId);
      
//       // Clear messages, filters, and send new greeting
//       setMessages([]);
//       setFilters({});
//       setHasWelcomeShown(false);
      
//       setTimeout(() => {
//         sendInitialGreeting();
//       }, 300);
      
//     } catch (error) {
//       console.error('❌ Error clearing chat:', error);
//       // Still generate new session locally
//       const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       setSessionId(newSessionId);
//       localStorage.setItem('chatbot_session_id', newSessionId);
//       setMessages([]);
//       setFilters({});
//       setHasWelcomeShown(false);
//       sendInitialGreeting();
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const startRecording = () => {
//     if (!isAuthenticated) {
//       alert('Please login to use voice input');
//       return;
//     }

//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();
      
//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = 'en-US';

//       recognition.onstart = () => {
//         console.log('🎤 Recording started');
//         setIsRecording(true);
//       };

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         console.log('🎤 Voice transcript:', transcript);
//         setInputMessage(transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = (event) => {
//         console.error('🎤 Speech recognition error:', event.error);
//         setIsRecording(false);
//       };

//       recognition.start();
//     } else {
//       alert('Speech recognition is not supported in your browser.');
//     }
//   };

//   const renderMessage = (message) => {
//     const isBot = message.isBot;

//     return (
//       <div key={message._id} className={`flex ${isBot ? '' : 'flex-row-reverse'} mb-4`}>
//         {/* Avatar */}
//         <div className="flex-shrink-0 mx-2">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//             isBot 
//               ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
//               : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
//           }`}>
//             {isBot ? <Bot size={16} /> : <User size={16} />}
//           </div>
//         </div>
        
//         {/* Message Content */}
//         <div className={`${isBot ? 'mr-12' : 'ml-12'} max-w-[70%]`}>
//           {!isBot && user?.name && (
//             <div className="text-xs font-medium text-gray-600 mb-1 text-right">
//               {user.name}
//             </div>
//           )}
          
//           <div className={`rounded-2xl p-3 ${
//             isBot 
//               ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm' 
//               : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
//           }`}>
//             <p className="text-sm whitespace-pre-wrap">{message.message}</p>
            
//             {/* Properties Information */}
//             {isBot && message.properties && message.properties.length > 0 && (
//               <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-sm font-medium text-blue-800">
//                     Found {message.properties.length} properties matching your criteria
//                   </p>
//                   <Search size={16} className="text-blue-600" />
//                 </div>
//                 <p className="text-xs text-gray-600 mb-3">
//                   Click "Browse properties" below to view all matching properties
//                 </p>
//               </div>
//             )}
            
//             {/* Quick Replies */}
//             {isBot && message.quickReplies && message.quickReplies.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {message.quickReplies.map((reply, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleQuickReply(reply)}
//                     className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full text-xs text-gray-700 transition-colors"
//                     disabled={isLoading}
//                   >
//                     {reply.text}
//                   </button>
//                 ))}
//               </div>
//             )}
            
//             {/* Action Buttons */}
//             {isBot && message.actions && message.actions.length > 0 && (
//               <div className="flex flex-col gap-2 mt-3">
//                 {message.actions.map((action, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleActionPress(action)}
//                     className={`px-4 py-2 text-sm rounded-lg text-center transition-all duration-200 flex items-center justify-center gap-2 ${
//                       action.action === 'browse_properties' || action.label === 'Browse properties'
//                         ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
//                         : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
//                     }`}
//                   >
//                     {action.action === 'browse_properties' && <Search size={16} />}
//                     {action.label || action.text}
//                   </button>
//                 ))}
//               </div>
//             )}
            
//             {/* Filter summary */}
//             {isBot && Object.keys(message.filters || {}).length > 0 && (
//               <div className="mt-3 pt-3 border-t border-gray-200">
//                 <p className="text-xs text-gray-500 mb-2">Current filters:</p>
//                 <div className="flex flex-wrap gap-1">
//                   {message.filters.city && (
//                     <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
//                       City: {message.filters.city}
//                     </span>
//                   )}
//                   {message.filters.budget && (
//                     <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
//                       Budget: {typeof message.filters.budget === 'number' ? `₹0-${message.filters.budget}` : `₹${message.filters.budget}`}
//                     </span>
//                   )}
//                   {message.filters.gender && (
//                     <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
//                       {message.filters.gender}
//                     </span>
//                   )}
//                   {message.filters.roomType && (
//                     <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
//                       {message.filters.roomType}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Timestamp */}
//           <span className={`text-xs mt-1 block ${isBot ? 'text-gray-500' : 'text-blue-600 text-right'}`}>
//             {new Date(message.timestamp).toLocaleTimeString([], { 
//               hour: '2-digit', 
//               minute: '2-digit' 
//             })}
//           </span>
//         </div>
//       </div>
//     );
//   };

//   // Debug log for authentication status
//   console.log('🔐 Current authentication status:', isAuthenticated);
//   console.log('👤 Current user:', user);
//   console.log('🔍 Current filters:', filters);

//   // Don't render anything if not authenticated
//   if (!isAuthenticated) {
//     console.log('❌ Not rendering chatbot - user not authenticated');
//     return null;
//   }

//   console.log('✅ Rendering chatbot for authenticated user');

//   return (
//     <>
//       {/* Chatbot Trigger Button */}
//       {!isOpen && (
//         <button
//           onClick={toggleChat}
//           className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
//         >
//           <MessageCircle size={24} />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
//             Live
//           </span>
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-14 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//                   <Bot className="text-blue-600" size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg">Livy AI Assistant</h3>
//                   <p className="text-sm text-blue-100">
//                     {user ? `Connected as ${user.name}` : 'Online • Ready to help'}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 {user?.avatar && (
//                   <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
//                     <img 
//                       src={user.avatar} 
//                       alt={user.name} 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
                
//                 <button
//                   onClick={clearChat}
//                   className="p-2 hover:bg-white/20 rounded-full transition duration-200"
//                   title="Clear chat"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//                 <button
//                   onClick={toggleChat}
//                   className="p-2 hover:bg-white/20 rounded-full transition duration-200"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Messages Container */}
//           <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
//             {messages.length === 0 ? (
//               <div className="h-full flex flex-col items-center justify-center text-gray-400">
//                 <Bot size={48} className="mb-4" />
//                 <p className="text-lg font-medium">Your conversation with Livy</p>
//                 <p className="text-sm">Start by saying hello!</p>
//               </div>
//             ) : (
//               <>
//                 {messages.map(renderMessage)}
                
//                 {/* Typing Indicator */}
//                 {isLoading && (
//                   <div className="flex items-center space-x-3 mb-4">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                       <Bot size={16} className="text-white" />
//                     </div>
//                     <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                       </div>
//                       <span className="text-xs text-gray-500 mt-1">Livy is typing...</span>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="border-t border-gray-200 p-4 bg-white">
//             <div className="flex items-center space-x-2">
//               {/* Left Action Buttons */}
//               <div className="flex items-center space-x-1">
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
//                   <Paperclip size={18} className="text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
//                   <Camera size={18} className="text-gray-600" />
//                 </button>
//               </div>
              
//               {/* Input Field */}
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                   disabled={isLoading}
//                 />
//                 <button
//                   onClick={startRecording}
//                   disabled={!isAuthenticated}
//                   className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 ${
//                     !isAuthenticated 
//                       ? 'text-gray-300 cursor-not-allowed' 
//                       : isRecording 
//                         ? 'text-red-500 animate-pulse' 
//                         : 'text-gray-500 hover:text-blue-600'
//                   } transition duration-200`}
//                 >
//                   {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
//                 </button>
//               </div>
              
//               {/* Send Button */}
//               <button
//                 onClick={() => sendMessage()}
//                 disabled={!inputMessage.trim() || isLoading || !isAuthenticated}
//                 className={`p-3 rounded-full transition-all duration-300 ${
//                   inputMessage.trim() && !isLoading && isAuthenticated
//                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 <Send size={18} />
//               </button>
//             </div>
            
//             {/* Feedback Buttons */}
//             <div className="flex justify-center space-x-6 mt-3">
//               <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition duration-200">
//                 <ThumbsUp size={14} />
//                 <span className="text-xs">Helpful</span>
//               </button>
//               <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition duration-200">
//                 <ThumbsDown size={14} />
//                 <span className="text-xs">Not helpful</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Animation Styles */}
//       <style jsx="true">{`
//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
//         .animate-bounce {
//           animation: bounce 2s infinite;
//         }
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Chatbot;












import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Trash2,
  Paperclip,
  Camera,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Search,
  MapPin,
  IndianRupee
} from 'lucide-react';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [hasWelcomeShown, setHasWelcomeShown] = useState(false);
  const [filters, setFilters] = useState({});
  const [showCombinedFilter, setShowCombinedFilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const messagesEndRef = useRef(null);

  // City and Budget options
  const cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune', 'Kolkata', 'Ahmedabad'];
  const budgetOptions = [
    { value: '0-5000', label: '0 to 5000' },
    { value: '0-8000', label: '0 to 8000' },
    { value: '0-10000', label: '0 to 10000' },
    { value: '0-15000', label: '0 to 15000' },
    { value: '0-20000', label: '0 to 20000' },
    { value: '5000-10000', label: '5000 to 10000' },
    { value: '10000-15000', label: '10000 to 15000' },
    { value: '15000-20000', label: '15000 to 20000' }
  ];

  // API base URL
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      console.log('🔍 Checking authentication...');
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      console.log('Token exists:', !!token);
      console.log('User data exists:', !!userData);
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('User parsed successfully:', parsedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Initialize chatbot only if authenticated
          initializeChatbot();
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log('No token or user data found');
        setIsAuthenticated(false);
        setUser(null);
        setMessages([]);
        setIsOpen(false);
        setSessionId(null);
      }
    };

    // Check immediately on mount
    checkAuth();
    
    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      console.log('📦 Storage changed, re-checking auth...');
      checkAuth();
    };
    
    // Listen for custom auth change events
    const handleCustomAuthChange = () => {
      console.log('🔔 Custom auth event triggered');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleCustomAuthChange);
    
    // Also check on window focus (in case user logged in another tab)
    const handleFocus = () => {
      console.log('👀 Window focused, checking auth...');
      checkAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleCustomAuthChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Initialize chatbot when authenticated
  const initializeChatbot = () => {
    console.log('🚀 Initializing chatbot for authenticated user');
    
    // Auto-open on first login
    const hasSeenChatbot = localStorage.getItem('has_seen_chatbot');
    console.log('Has seen chatbot before:', hasSeenChatbot);
    
    if (!hasSeenChatbot) {
      console.log('📱 Auto-opening chat for first-time user');
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('has_seen_chatbot', 'true');
      }, 1500);
    }

    // Set up session
    const storedSessionId = localStorage.getItem('chatbot_session_id');
    if (storedSessionId) {
      console.log('📝 Using existing session:', storedSessionId);
      setSessionId(storedSessionId);
      loadConversationHistory(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('🆕 Creating new session:', newSessionId);
      setSessionId(newSessionId);
      localStorage.setItem('chatbot_session_id', newSessionId);
    }
    
    // Send initial greeting if no messages
    if (messages.length === 0 && !hasWelcomeShown) {
      console.log('👋 Sending initial greeting');
      setTimeout(() => {
        sendInitialGreeting();
      }, 800);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadConversationHistory = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No token found for loading history');
        return;
      }

      console.log('📚 Loading conversation history for session:', sessionId);
      const response = await axios.get(`${API_BASE}/chatbot/history/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('History response:', response.data);
      
      if (response.data && response.data.success !== false) {
        const historyData = response.data.history || [];
        console.log('✅ History loaded:', historyData.length, 'messages');
        
        // Format history to match our message structure
        const formattedHistory = historyData.map(msg => ({
          _id: msg._id,
          message: msg.message,
          isBot: msg.isBot || (msg.sender === 'bot' || msg.sender === 'Livy AI'),
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
          sender: msg.sender || (msg.isBot ? 'Livy AI' : 'User'),
          quickReplies: msg.quickReplies || [],
          actions: msg.actions || [],
          properties: msg.properties || [],
          filters: msg.filters || {}
        }));
        
        setMessages(formattedHistory);
        if (formattedHistory.length > 0) {
          setHasWelcomeShown(true);
        }
      } else {
        console.warn('History API returned error:', response.data);
      }
    } catch (error) {
      console.error('❌ Error loading history:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
    }
  };

  const sendInitialGreeting = () => {
    console.log('🎯 Creating greeting for user:', user);
    
    let greetingMessage = {
      _id: `initial_greeting_${Date.now()}`,
      message: "Hello! 👋 I'm Livy, your AI assistant for Livyco Hostels. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      quickReplies: [
        { text: "Find hostels", action: "find_hostels" },
        { text: "Check prices", action: "check_prices" },
        { text: "Book virtual tour", action: "virtual_tour" },
        { text: "My bookings", action: "my_bookings" }
      ],
      actions: [
        {
          type: 'browse',
          label: 'Browse properties',
          action: 'browse_properties'
        },
        {
          type: 'combined_filter',
          label: 'Search with city + budget',
          action: 'combined_filter'
        }
      ]
    };

    // Personalize greeting based on user type
    if (user) {
      console.log('👤 Personalizing greeting for user role:', user.role);
      if (user.role === 'student') {
        greetingMessage = {
          ...greetingMessage,
          message: `Hello ${user.name || 'student'}! 👋 I'm Livy, your AI assistant for Livyco Hostels. Need help with student housing or bookings?`,
          quickReplies: [
            { text: "Student hostels", action: "student_hostels" },
            { text: "My applications", action: "my_applications" },
            { text: "Payment status", action: "payment_status" },
            { text: "Contact warden", action: "contact_warden" }
          ]
        };
      } else if (user.role === 'admin' || user.role === 'warden' || user.role === 'client') {
        greetingMessage = {
          ...greetingMessage,
          message: `Hello ${user.name || 'admin'}! 👋 I'm Livy, your AI assistant for managing Livyco Hostels.`,
          quickReplies: [
            { text: "View bookings", action: "view_bookings" },
            { text: "Check occupancy", action: "check_occupancy" },
            { text: "Manage rooms", action: "manage_rooms" },
            { text: "Generate reports", action: "generate_reports" }
          ]
        };
      }
    }

    setMessages(prev => [...prev, greetingMessage]);
    setHasWelcomeShown(true);
  };

  const toggleChat = () => {
    console.log('🔘 Toggling chat from', isOpen, 'to', !isOpen);
    setIsOpen(!isOpen);
  };

  const sendMessage = async (messageText = null) => {
    if (!isAuthenticated) {
      console.warn('⚠️ User not authenticated, cannot send message');
      alert('Please login to send messages');
      return;
    }

    const text = messageText || inputMessage.trim();
    if (!text || !sessionId) {
      console.warn('⚠️ Cannot send empty message or missing session');
      return;
    }

    console.log('📤 Sending message:', text);
    
    // Add user message
    const userMessage = {
      _id: `user_${Date.now()}`,
      message: text,
      isBot: false,
      timestamp: new Date(),
      sender: user?.name || 'User'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      console.log('🔐 Using token for API request');
      
      const response = await axios.post(`${API_BASE}/chatbot/chat`, {
        message: text,
        sessionId,
        userId: user?.id,
        userRole: user?.role
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('✅ Bot response received:', response.data);
      
      // Check if response is successful
      if (response.data && response.data.success !== false) {
        const botMessage = {
          _id: `bot_${Date.now()}`,
          message: response.data.response || "I'm here to help!",
          isBot: true,
          timestamp: new Date(),
          quickReplies: response.data.quickReplies || [],
          actions: response.data.actions || [],
          properties: response.data.properties || [],
          intent: response.data.intent,
          filters: response.data.filters || {},
          sender: 'Livy AI'
        };

        console.log('Bot message created:', {
          hasMessage: !!botMessage.message,
          quickRepliesCount: botMessage.quickReplies.length,
          actionsCount: botMessage.actions.length,
          filters: botMessage.filters
        });

        setMessages(prev => [...prev, botMessage]);

        // Update filters if provided - merge with existing filters
        if (response.data.filters) {
          setFilters(prevFilters => ({
            ...prevFilters,
            ...response.data.filters
          }));
        }

        // Update session ID if provided
        if (response.data.sessionId && response.data.sessionId !== sessionId) {
          setSessionId(response.data.sessionId);
          localStorage.setItem('chatbot_session_id', response.data.sessionId);
        }

      } else {
        // Handle API error response
        console.warn('API returned error:', response.data);
        const errorMessage = {
          _id: `error_${Date.now()}`,
          message: response.data.error || response.data.message || "Sorry, I encountered an error. Please try again.",
          isBot: true,
          timestamp: new Date(),
          sender: 'Livy AI'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      
      const errorMessage = {
        _id: `error_${Date.now()}`,
        message: "Sorry, I'm having trouble connecting to the server. Please check your connection and try again.",
        isBot: true,
        timestamp: new Date(),
        sender: 'Livy AI'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (quickReply) => {
    console.log('⚡ Quick reply clicked:', quickReply.text);
    const messageToSend = quickReply.action 
      ? quickReply.action.startsWith('ACTION:') 
        ? quickReply.action 
        : `ACTION:${quickReply.action}`
      : quickReply.text;
    sendMessage(messageToSend);
  };

  const handleActionPress = (action) => {
    console.log('🎯 Action button clicked:', action, 'Current filters:', filters);
    
    // Handle browse properties action
    if (action.action === 'browse_properties' || action.label === 'Browse properties') {
      navigateToSearchPage(filters);
      return;
    }
    
    // Handle combined filter action
    if (action.action === 'combined_filter' || action.label === 'Search with city + budget') {
      setShowCombinedFilter(true);
      return;
    }
    
    // Handle navigation actions based on action type or label
    const actionType = action.action || action.type || '';
    const actionLabel = (action.label || '').toLowerCase();
    
    // Start with existing filters
    let filterData = { ...filters };

    // Apply new filter based on action
    // Price-based filters - set as range format
    if (actionType.includes('under_5000') || actionLabel.includes('under 5000') || actionLabel.includes('under ₹5000') || actionLabel.includes('0 to 5000')) {
      filterData.budget = '0-5000';
    } else if (actionType.includes('under_8000') || actionLabel.includes('under 8000') || actionLabel.includes('under ₹8000') || actionLabel.includes('0 to 8000')) {
      filterData.budget = '0-8000';
    } else if (actionType.includes('under_10000') || actionLabel.includes('under 10000') || actionLabel.includes('under ₹10000') || actionLabel.includes('0 to 10000')) {
      filterData.budget = '0-10000';
    } else if (actionType.includes('under_15000') || actionLabel.includes('under 15000') || actionLabel.includes('under ₹15000') || actionLabel.includes('0 to 15000')) {
      filterData.budget = '0-15000';
    } else if (actionType.includes('under_20000') || actionLabel.includes('under 20000') || actionLabel.includes('under ₹20000') || actionLabel.includes('0 to 20000')) {
      filterData.budget = '0-20000';
    } else if (actionType.includes('5000_10000') || actionLabel.includes('5000-10000') || actionLabel.includes('₹5000-₹10000')) {
      filterData.budget = '5000-10000';
    } else if (actionType.includes('10000_15000') || actionLabel.includes('10000-15000') || actionLabel.includes('₹10000-₹15000')) {
      filterData.budget = '10000-15000';
    } else if (actionType.includes('15000_20000') || actionLabel.includes('15000-20000') || actionLabel.includes('₹15000-₹20000')) {
      filterData.budget = '15000-20000';
    }
    // Gender-based filters
    else if (actionType.includes('male') || actionLabel.includes('male') || actionLabel.includes('for him')) {
      filterData.gender = 'Male';
    } else if (actionType.includes('female') || actionLabel.includes('female') || actionLabel.includes('for her')) {
      filterData.gender = 'Female';
    } else if (actionType.includes('co_living') || actionLabel.includes('co-living') || actionLabel.includes('co living')) {
      filterData.gender = 'Co-Living';
    }
    // Room type filters
    else if (actionType.includes('single') || actionLabel.includes('single sharing')) {
      filterData.roomType = 'Single Sharing';
    } else if (actionType.includes('double') || actionLabel.includes('double sharing')) {
      filterData.roomType = 'Double Sharing';
    } else if (actionType.includes('triple') || actionLabel.includes('triple sharing')) {
      filterData.roomType = 'Triple Sharing';
    } else if (actionType.includes('four') || actionLabel.includes('four sharing')) {
      filterData.roomType = 'Four Sharing';
    }
    // General navigation actions
    else if (actionType.includes('find_hostels') || actionLabel.includes('find hostels') || actionLabel.includes('view hostels')) {
      // Navigate to search page with current filters
      navigateToSearchPage(filterData);
      return;
    } else if (actionType.includes('student_hostels') || actionLabel.includes('student hostels')) {
      filterData.category = 'student';
      filterData.gender = filterData.gender || 'Male';
    } else if (actionType.includes('my_bookings') || actionLabel.includes('my bookings')) {
      window.location.href = '/bookings';
      return;
    } else if (actionType.includes('my_applications') || actionLabel.includes('my applications')) {
      window.location.href = '/applications';
      return;
    } else if (actionType.includes('view_bookings') || actionLabel.includes('view bookings')) {
      window.location.href = '/admin/bookings';
      return;
    } else if (actionType.includes('check_prices') || actionLabel.includes('check prices')) {
      navigateToSearchPage(filterData);
      return;
    } else if (actionType.includes('virtual_tour') || actionLabel.includes('virtual tour')) {
      window.location.href = '/virtual-tours';
      return;
    } else if (actionType.includes('payment_status') || actionLabel.includes('payment status')) {
      window.location.href = '/payments';
      return;
    } else if (actionType.includes('contact_warden') || actionLabel.includes('contact warden')) {
      window.location.href = '/contact';
      return;
    } else if (actionType.includes('contact_support') || actionLabel.includes('contact support')) {
      window.location.href = '/support';
      return;
    } else if (actionType.includes('check_occupancy') || actionLabel.includes('check occupancy')) {
      window.location.href = '/admin/occupancy';
      return;
    } else if (actionType.includes('manage_rooms') || actionLabel.includes('manage rooms')) {
      window.location.href = '/admin/rooms';
      return;
    } else if (actionType.includes('generate_reports') || actionLabel.includes('generate reports')) {
      window.location.href = '/admin/reports';
      return;
    }

    // Update filters state with combined filters
    if (Object.keys(filterData).length > 0) {
      setFilters(filterData);
      console.log('📝 Updated filters:', filterData);
    }

    // Navigate to search page with ALL accumulated filter data
    if (Object.keys(filterData).length > 0) {
      console.log('📍 Navigating with combined filter data:', filterData);
      navigateToSearchPage(filterData);
    } else if (action.url) {
      // If action has a direct URL, use it
      window.location.href = action.url;
    }
  };

  const handleCombinedFilterSubmit = () => {
    if (selectedCity && selectedBudget) {
      const filterData = {
        city: selectedCity,
        budget: selectedBudget
      };
      
      setFilters(filterData);
      setShowCombinedFilter(false);
      setSelectedCity('');
      setSelectedBudget('');
      
      // Add a bot message showing the selected filters
      const botMessage = {
        _id: `combined_filter_${Date.now()}`,
        message: `Great! I'll search for hostels in ${selectedCity} with budget ${formatBudgetDisplay(selectedBudget)}.`,
        isBot: true,
        timestamp: new Date(),
        actions: [
          {
            type: 'browse',
            label: 'Browse properties with these filters',
            action: 'browse_properties'
          }
        ],
        filters: filterData,
        sender: 'Livy AI'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } else {
      alert('Please select both city and budget');
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBudgetSelect = (budget) => {
    setSelectedBudget(budget);
  };

  const navigateToSearchPage = (filterData) => {
    console.log('🔍 Navigating to search page with filters:', filterData);
    
    // Convert filterData to query parameters
    const queryParams = new URLSearchParams();
    
    // Add city filter if available
    if (filterData.city) {
      queryParams.append('city', filterData.city);
    }
    
    // Handle budget filter - ensure it's in range format
    if (filterData.budget) {
      // If budget is a number like 5000, convert to range 0-5000
      if (typeof filterData.budget === 'number') {
        queryParams.append('budget', `0-${filterData.budget}`);
      } 
      // If budget is already a string range like "0-5000", use it as is
      else if (typeof filterData.budget === 'string' && filterData.budget.includes('-')) {
        queryParams.append('budget', filterData.budget);
      }
      // If it's just a string number, convert to range
      else if (typeof filterData.budget === 'string') {
        const budgetNum = parseInt(filterData.budget);
        if (!isNaN(budgetNum)) {
          queryParams.append('budget', `0-${budgetNum}`);
        } else {
          queryParams.append('budget', filterData.budget);
        }
      }
    }
    
    // Add gender filter if available
    if (filterData.gender) {
      queryParams.append('gender', filterData.gender);
    }
    
    // Add room type filter if available
    if (filterData.roomType) {
      queryParams.append('roomType', filterData.roomType);
    }
    
    // Add category filter if available
    if (filterData.category) {
      queryParams.append('category', filterData.category);
    }
    
    // Add other filters if they exist in your filter object
    if (filterData.rating) {
      queryParams.append('rating', filterData.rating);
    }
    
    if (filterData.recommended) {
      queryParams.append('recommended', filterData.recommended.toString());
    }
    
    // Handle amenities array
    if (filterData.amenities && Array.isArray(filterData.amenities) && filterData.amenities.length > 0) {
      filterData.amenities.forEach(amenity => {
        queryParams.append('amenities', amenity);
      });
    }
    
    // Handle rules array
    if (filterData.rules && Array.isArray(filterData.rules) && filterData.rules.length > 0) {
      filterData.rules.forEach(rule => {
        queryParams.append('rules', rule);
      });
    }
    
    // Build the URL
    const basePath = '/user/pgsearch';
    const queryString = queryParams.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;
    
    console.log('🌐 Navigating to:', url);
    
    // Navigate to the search page
    window.location.href = url;
  };

  const clearChat = async () => {
    if (!isAuthenticated) {
      alert('Please login to clear chat');
      return;
    }

    console.log('🧹 Clearing chat');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/chatbot/clear`, {
        sessionId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Clear response:', response.data);

      // Generate new session ID
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      localStorage.setItem('chatbot_session_id', newSessionId);
      
      // Clear messages, filters, and send new greeting
      setMessages([]);
      setFilters({});
      setShowCombinedFilter(false);
      setSelectedCity('');
      setSelectedBudget('');
      setHasWelcomeShown(false);
      
      setTimeout(() => {
        sendInitialGreeting();
      }, 300);
      
    } catch (error) {
      console.error('❌ Error clearing chat:', error);
      // Still generate new session locally
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      localStorage.setItem('chatbot_session_id', newSessionId);
      setMessages([]);
      setFilters({});
      setShowCombinedFilter(false);
      setSelectedCity('');
      setSelectedBudget('');
      setHasWelcomeShown(false);
      sendInitialGreeting();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startRecording = () => {
    if (!isAuthenticated) {
      alert('Please login to use voice input');
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('🎤 Recording started');
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Voice transcript:', transcript);
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('🎤 Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const renderMessage = (message) => {
    const isBot = message.isBot;

    return (
      <div key={message._id} className={`flex ${isBot ? '' : 'flex-row-reverse'} mb-4`}>
        {/* Avatar */}
        <div className="flex-shrink-0 mx-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
          }`}>
            {isBot ? <Bot size={16} /> : <User size={16} />}
          </div>
        </div>
        
        {/* Message Content */}
        <div className={`${isBot ? 'mr-12' : 'ml-12'} max-w-[70%]`}>
          {!isBot && user?.name && (
            <div className="text-xs font-medium text-gray-600 mb-1 text-right">
              {user.name}
            </div>
          )}
          
          <div className={`rounded-2xl p-3 ${
            isBot 
              ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
            
            {/* Properties Information */}
            {isBot && message.properties && message.properties.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-blue-800">
                    Found {message.properties.length} properties matching your criteria
                  </p>
                  <Search size={16} className="text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Click "Browse properties" below to view all matching properties
                </p>
              </div>
            )}
            
            {/* Quick Replies */}
            {isBot && message.quickReplies && message.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full text-xs text-gray-700 transition-colors"
                    disabled={isLoading}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            {/* Action Buttons */}
            {isBot && message.actions && message.actions.length > 0 && (
              <div className="flex flex-col gap-2 mt-3">
                {message.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleActionPress(action)}
                    className={`px-4 py-2 text-sm rounded-lg text-center transition-all duration-200 flex items-center justify-center gap-2 ${
                      action.action === 'browse_properties' || action.label === 'Browse properties'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
                        : action.action === 'combined_filter' || action.label === 'Search with city + budget'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'
                    }`}
                  >
                    {action.action === 'browse_properties' && <Search size={16} />}
                    {action.action === 'combined_filter' && <MapPin size={16} />}
                    {action.label || action.text}
                  </button>
                ))}
              </div>
            )}
            
            {/* Filter summary */}
            {isBot && Object.keys(message.filters || {}).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Current filters:</p>
                <div className="flex flex-wrap gap-1">
                  {message.filters.city && (
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded flex items-center gap-1">
                      <MapPin size={10} />
                      {message.filters.city}
                    </span>
                  )}
                  {message.filters.budget && (
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded flex items-center gap-1">
                      <IndianRupee size={10} />
                      {formatBudgetDisplay(message.filters.budget)}
                    </span>
                  )}
                  {message.filters.gender && (
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                      {message.filters.gender}
                    </span>
                  )}
                  {message.filters.roomType && (
                    <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">
                      {message.filters.roomType}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <span className={`text-xs mt-1 block ${isBot ? 'text-gray-500' : 'text-blue-600 text-right'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    );
  };

  const formatBudgetDisplay = (budget) => {
    if (typeof budget === 'number') {
      return `0 to ${budget}`;
    } else if (typeof budget === 'string') {
      if (budget.includes('-')) {
        const [min, max] = budget.split('-');
        if (min === '0') {
          return `0 to ₹${max}`;
        }
        return `₹${min} to ₹${max}`;
      }
      return `0 to ₹${budget}`;
    }
    return budget;
  };

  // Debug log for authentication status
  console.log('🔐 Current authentication status:', isAuthenticated);
  console.log('👤 Current user:', user);
  console.log('🔍 Current filters:', filters);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    console.log('❌ Not rendering chatbot - user not authenticated');
    return null;
  }

  console.log('✅ Rendering chatbot for authenticated user');

  return (
    <>
      {/* Chatbot Trigger Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
        >
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
            Live
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-14 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Livy AI Assistant</h3>
                  <p className="text-sm text-blue-100">
                    {user ? `Connected as ${user.name}` : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {user?.avatar && (
                  <div className="w-8 h-8 rounded-full bg-white overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-full transition duration-200"
                  title="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/20 rounded-full transition duration-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Bot size={48} className="mb-4" />
                <p className="text-lg font-medium">Your conversation with Livy</p>
                <p className="text-sm">Start by saying hello!</p>
              </div>
            ) : (
              <>
                {messages.map(renderMessage)}
                
                {/* Combined Filter Form - Show all options */}
                {showCombinedFilter && (
                  <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        <MapPin size={16} className="text-blue-600" />
                        Search with City + Budget
                      </h3>
                      <button
                        onClick={() => setShowCombinedFilter(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {/* City Selection - Show all cities as buttons */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select City
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {cities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleCitySelect(city)}
                            className={`px-3 py-2 text-sm rounded-md transition-colors ${
                              selectedCity === city
                                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                      {selectedCity && (
                        <p className="text-xs text-blue-600 mt-2">
                          Selected: <span className="font-medium">{selectedCity}</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Budget Selection - Show all budget options as buttons */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Budget Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetOptions.map((budget) => (
                          <button
                            key={budget.value}
                            onClick={() => handleBudgetSelect(budget.value)}
                            className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-1 ${
                              selectedBudget === budget.value
                                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <IndianRupee size={12} />
                            {budget.label}
                          </button>
                        ))}
                      </div>
                      {selectedBudget && (
                        <p className="text-xs text-blue-600 mt-2">
                          Selected: <span className="font-medium">{formatBudgetDisplay(selectedBudget)}</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleCombinedFilterSubmit}
                        disabled={!selectedCity || !selectedBudget}
                        className={`flex-1 px-4 py-2 text-white rounded-md transition flex items-center justify-center gap-2 ${
                          selectedCity && selectedBudget
                            ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <Search size={16} />
                        Confirm details
                      </button>
                      <button
                        onClick={() => setShowCombinedFilter(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">Livy is typing...</span>
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              {/* Left Action Buttons */}
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
                  <Paperclip size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
                  <Camera size={18} className="text-gray-600" />
                </button>
              </div>
              
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
                <button
                  onClick={startRecording}
                  disabled={!isAuthenticated}
                  className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 ${
                    !isAuthenticated 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : isRecording 
                        ? 'text-red-500 animate-pulse' 
                        : 'text-gray-500 hover:text-blue-600'
                  } transition duration-200`}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
              
              {/* Send Button */}
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading || !isAuthenticated}
                className={`p-3 rounded-full transition-all duration-300 ${
                  inputMessage.trim() && !isLoading && isAuthenticated
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            
            {/* Feedback Buttons */}
            <div className="flex justify-center space-x-6 mt-3">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition duration-200">
                <ThumbsUp size={14} />
                <span className="text-xs">Helpful</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition duration-200">
                <ThumbsDown size={14} />
                <span className="text-xs">Not helpful</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx="true">{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;