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
  User
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
  const messagesEndRef = useRef(null);

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
      
      if (response.data.success) {
        console.log('✅ History loaded:', response.data.history.length, 'messages');
        setMessages(response.data.history);
        if (response.data.history.length > 0) {
          setHasWelcomeShown(true);
        }
      }
    } catch (error) {
      console.error('❌ Error loading history:', error);
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
      
      if (response.data.success) {
        const botMessage = {
          _id: `bot_${Date.now()}`,
          message: response.data.response,
          isBot: true,
          timestamp: new Date(),
          quickReplies: response.data.quickReplies,
          actions: response.data.actions,
          sender: 'Livy AI'
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      const errorMessage = {
        _id: `error_${Date.now()}`,
        message: "Sorry, I'm having trouble connecting. Please try again.",
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
    sendMessage(quickReply.text);
  };

  const clearChat = async () => {
    if (!isAuthenticated) {
      alert('Please login to clear chat');
      return;
    }

    console.log('🧹 Clearing chat');
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/chatbot/clear`, {
        sessionId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setMessages([]);
      setHasWelcomeShown(false);
      sendInitialGreeting();
    } catch (error) {
      console.error('❌ Error clearing chat:', error);
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
            
            {/* Quick Replies */}
            {isBot && message.quickReplies && message.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full text-xs text-gray-700 transition-colors"
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
                  <a
                    key={index}
                    href={action.url}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm rounded-lg text-center transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {action.label}
                  </a>
                ))}
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

  // Debug log for authentication status
  console.log('🔐 Current authentication status:', isAuthenticated);
  console.log('👤 Current user:', user);

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
        <div className="fixed bottom-14 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden z-50">
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