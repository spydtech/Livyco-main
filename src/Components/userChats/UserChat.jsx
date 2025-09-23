// import { useState } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// // import ClientNav from "../Client-Navbar/ClientNav";
// import Header from "../Header";

// const users = [
//   { id: 1, name: "owner Name 1", image: "/avatar1.jpg", status: "online" },
//   { id: 2, name: "owner Name 2", image: "/avatar2.jpg", status: "away" },
//   { id: 3, name: "owner Name 3", image: "/avatar3.jpg", status: "online" },
// ];

// const UserChat = () => {
//   const [selectedUser, setSelectedUser] = useState(users[0]);
//   const [messages, setMessages] = useState({
//     1: [{ text: "Hello!", sender: "other" }, { text: "How are you?", sender: "self" }],
//     2: [{ text: "Hey!", sender: "other" }],
//     3: [{ text: "Good morning!", sender: "other" }],
//   });

//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (input.trim()) {
//       setMessages((prevMessages) => ({
//         ...prevMessages,
//         [selectedUser.id]: [...prevMessages[selectedUser.id], { text: input, sender: "self" }],
//       }));
//       setInput("");
//     }
//   };

//   return (
//     <>
//     <Header />
//     <div className="flex h-screen bg-[#F8F8FF] py-20">
//       {/* Sidebar */}
//       <div className="w-1/3 bg-white p-4 border-r border-[#727070]">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className={`flex items-center p-3 rounded cursor-pointer ${
//               selectedUser.id === user.id ? "bg-[#FEE123]" : "hover:bg-gray-200"
//             }`}
//             onClick={() => setSelectedUser(user)}
//           >
//             <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
//             <div>
//               <h3 className="font-bold">{user.name}</h3>
//               <p className="text-sm text-gray-500">
//                 {messages[user.id]?.length > 0
//                   ? messages[user.id][messages[user.id].length - 1].text
//                   : "No messages yet"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Window */}
//       <div className="w-2/3 flex flex-col">
//         {/* Chat Header */}
//         <div className="flex items-center justify-between p-4 bg-white border-b border-[#727070] shadow-b-lg">
//           <div className="flex items-center">
//             <img src={selectedUser.image} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
//             <h3 className="font-bold">{selectedUser.name}</h3>
//           </div>
//           <button className="text-[#FEE123] text-xl">
//             <FaPhoneAlt />
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages[selectedUser.id]?.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-2 p-3 rounded-lg max-w-xs ${
//                 msg.sender === "self"
//                   ? "bg-[#AFD1FF] text-white self-end ml-auto"
//                   : "bg-[#FEE123] text-gray-900"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="p-4 flex items-center bg-white border-t">
//           <input
//             type="text"
//             className="flex-1 p-2 border rounded-lg"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button onClick={sendMessage} className="ml-2 text-yellow-500 text-xl">
//             <IoSend />
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default UserChat;


import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import { FaPhoneAlt, FaBars } from 'react-icons/fa';
import { IoSend, IoClose } from 'react-icons/io5';
import Header from '../Header';
import { chatAPI } from '../../Clients-components/PropertyController';

const UserChat = () => {
  const { user, selectedChat, setSelectedChat, messages, setMessages, socket } = useChat();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Initialize chat from location state if available
  useEffect(() => {
    if (location.state?.recipientId) {
      setSelectedChat({
        recipientId: location.state.recipientId,
        recipientName: location.state.recipientName,
        propertyId: location.state.propertyId,
        propertyName: location.state.propertyName,
        clientId: location.state.clientId
      });
      console.log('Chat initialized from location state:', location.state);
      // Close sidebar on mobile when chat is selected
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  }, [location.state, setSelectedChat]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setError(null);
        const data = await chatAPI.getConversations();
        setConversations(data.conversations || []);
      } catch (err) {
        setError(err.message || 'Failed to load conversations');
        console.error('Fetch conversations error:', err);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Fetch messages when chat is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await chatAPI.getMessages(
          selectedChat.recipientId, 
          selectedChat.propertyId
        );
        setMessages(data.messages || []);
        
        // Mark messages as read
        const unreadMessages = (data.messages || [])
          .filter(msg => !msg.read && msg.sender._id !== user.id)
          .map(msg => msg._id);
          
        if (unreadMessages.length > 0) {
          await chatAPI.markAsRead(unreadMessages);
        }
      } catch (err) {
        setError(err.message || 'Failed to load messages');
        console.error('Fetch messages error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat, setMessages, user]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (
        message.sender._id === selectedChat?.recipientId &&
        message.property === selectedChat?.propertyId
      ) {
        setMessages(prev => [...prev, message]);
        chatAPI.markAsRead([message._id]);
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, selectedChat, setMessages]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedChat) return;

    try {
      setError(null);
      const response = await chatAPI.sendMessage({
        recipientId: selectedChat.recipientId,
        propertyId: selectedChat.propertyId,
        content: input
      });

      setMessages(prev => [...prev, response.message]);
      setInput('');
      
      if (socket) {
        socket.emit('sendMessage', response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message');
      console.error('Send message error:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Handle responsive sidebar behavior
  const handleConversationSelect = (conversation) => {
    setSelectedChat({
      recipientId: conversation.user._id,
      recipientName: conversation.user.name,
      propertyId: conversation.property._id,
      propertyName: conversation.property.name
    });
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row h-screen bg-[#F8F8FF] pt-16 md:pt-20">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#727070]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl text-gray-700"
          >
            {sidebarOpen ? <IoClose /> : <FaBars />}
          </button>
          {selectedChat && (
            <div className="flex items-center">
              <img
                src="https://placehold.co/150x150"
                alt={selectedChat.recipientName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-semibold">{selectedChat.recipientName}</span>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className={`
          absolute md:relative z-10 w-full md:w-1/3 lg:w-1/4 bg-white border-r border-[#727070] 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          h-full md:h-auto
        `}>
          <div className="p-4 sticky top-0 bg-white border-b border-[#727070] z-10">
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          
          <div className="overflow-y-auto h-full pb-20 md:pb-4">
            {error && (
              <div className="p-2 m-4 text-red-500 bg-red-100 rounded text-sm">
                {error}
              </div>
            )}
            
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations yet
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.user._id}
                  className={`flex items-center p-3 border-b border-gray-100 cursor-pointer ${
                    selectedChat?.recipientId === conversation.user._id
                      ? 'bg-[#FEE123]'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleConversationSelect(conversation)}
                >
                  <img
                    src={conversation.user.profileImage || 'https://placehold.co/150x150'}
                    alt={conversation.user.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate text-sm md:text-base">{conversation.user.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      {conversation.lastMessage?.content || 'No messages yet'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0 ml-2">
                    <span className="text-xs text-gray-500">
                      {conversation.lastMessage?.createdAt
                        ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : ''}
                    </span>
                    {conversation.lastMessage?.read === false && 
                     conversation.lastMessage?.sender !== user.id && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat Window */}
        <div className="flex-1 flex flex-col min-h-0">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 md:p-4 bg-white border-b border-[#727070] shadow-sm">
                <div className="flex items-center">
                  <img
                    src="https://placehold.co/150x150"
                    alt={selectedChat.recipientName}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{selectedChat.recipientName}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate max-w-[150px] md:max-w-none">
                      {selectedChat.clientId}
                    </p>
                  </div>
                </div>
                <button className="text-[#FEE123] text-lg md:text-xl p-2">
                  <FaPhoneAlt />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 text-center px-4">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.sender._id === user.id
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                            message.sender._id === user.id
                              ? 'bg-[#AFD1FF] text-white'
                              : 'bg-[#FEE123] text-gray-900'
                          }`}
                        >
                          <p className="text-sm md:text-base break-words">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-3 md:p-4 flex items-center bg-white border-t border-[#727070]">
                <input
                  type="text"
                  className="flex-1 p-2 md:p-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:border-[#FEE123]"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 md:ml-3 text-[#FEE123] text-xl md:text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={!input.trim()}
                >
                  <IoSend />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center p-4 text-center">
              <div className="max-w-md mx-auto">
                <p className="text-gray-500 text-lg mb-4">
                  {conversations.length === 0 ? 'No conversations available' : 'Select a conversation to start chatting'}
                </p>
                {conversations.length === 0 && (
                  <button 
                    className="bg-[#FEE123] text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserChat;
// import { useState, useEffect, useRef, useCallback } from "react";
// import { FaPhoneAlt, FaPaperclip } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import Header from "../Header";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { chatAPI } from "../../Clients-components/PropertyController";

// const UserChat = () => {
//   const { chatId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);
  
//   const [recipient, setRecipient] = useState(location.state?.recipient || null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [attachments, setAttachments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isTyping, setIsTyping] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));

//   const fetchChatData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Fetch conversation data if recipient isn't available
//       if (!recipient) {
//         const convResponse = await chatAPI.getUserConversations();
//         const currentConv = convResponse.data.conversations.find(
//           conv => conv._id === chatId
//         );
        
//         if (!currentConv) {
//           throw new Error("Conversation not found");
//         }
        
//         // Find the other participant (not the current user)
//         const otherUser = currentConv.participants.find(
//           p => p._id !== user._id
//         );
        
//         if (!otherUser) {
//           throw new Error("Could not find chat participant");
//         }
        
//         setRecipient(otherUser);
//       }

//       // Fetch messages
//       const msgResponse = await chatAPI.getMessages(chatId);
//       const formattedMessages = (msgResponse.data?.messages || []).map(msg => ({
//         ...msg,
//         text: msg.content || msg.text || "", // Handle both content and text fields
//         sender: msg.sender?._id || msg.sender // Handle nested sender object
//       }));
      
//       setMessages(formattedMessages);
      
//       // Mark messages as read
//       try {
//         await chatAPI.markAsRead(chatId);
//       } catch (readError) {
//         console.warn("Could not mark as read:", readError);
//       }
//     } catch (err) {
//       console.error("Error fetching chat data:", err);
//       setError(err.message || "Failed to load chat. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [chatId, user, recipient]);

//   useEffect(() => {
//     if (!user) {
//       navigate("/user/login", { 
//         state: { from: `/user/chat/${chatId}`, message: "Please login to continue chatting" }
//       });
//       return;
//     }

//     if (!chatId) {
//       setError("Invalid chat ID");
//       setLoading(false);
//       return;
//     }

//     fetchChatData();

//     // Set up polling for new messages
//     const pollInterval = setInterval(fetchChatData, 15000);
//     return () => clearInterval(pollInterval);
//   }, [chatId, user, navigate, fetchChatData]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleFileChange = (e) => {
//     setAttachments([...e.target.files]);
//   };

//   const sendMessage = async () => {
//     const messageText = input.trim();
//     if (!messageText && attachments.length === 0) return;

//     try {
//       const tempId = Date.now().toString();
//       const newMessage = {
//         content: messageText,
//         text: messageText, // Include both for consistency
//         sender: user._id,
//         conversationId: chatId,
//         _id: tempId,
//         createdAt: new Date().toISOString(),
//         ...(attachments.length > 0 && { 
//           attachments: attachments.map(file => ({
//             url: URL.createObjectURL(file),
//             type: file.type.split('/')[0],
//             name: file.name
//           }))
//         })
//       };

//       // Optimistic update
//       setMessages(prev => [...prev, newMessage]);
//       setInput("");
//       setAttachments([]);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       // Send to server
//       const response = await chatAPI.sendMessage({
//         conversationId: chatId,
//         content: messageText,
//         attachments
//       });
      
//       // Replace temp message with server response
//       if (response.data?.message) {
//         setMessages(prev => [
//           ...prev.filter(m => m._id !== tempId),
//           {
//             ...response.data.message,
//             text: response.data.message.content || response.data.message.text
//           }
//         ]);
//       }
//     } catch (err) {
//       console.error("Error sending message:", err);
//       alert(err.message || "Failed to send message. Please try again.");
//       setMessages(prev => prev.filter(m => m._id !== tempId));
//     }
//   };

//   const handlePhoneClick = () => {
//     if (recipient?.phone) {
//       window.location.href = `tel:${recipient.phone}`;
//     } else {
//       alert("Phone number not available");
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-pulse text-lg">Loading chat...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//         <div className="flex flex-col justify-center items-center h-screen p-4">
//           <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Chat</h2>
//             <p className="text-gray-700 mb-4">{error}</p>
//             <div className="flex space-x-3">
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
//               >
//                 Retry
//               </button>
//               <button 
//                 onClick={() => navigate('/user/chats')}
//                 className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition"
//               >
//                 Back to Chats
//               </button>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!recipient) {
//     return (
//       <>
//         <Header />
//         <div className="flex justify-center items-center h-screen">
//           <div className="text-gray-500">Chat participant not found</div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col h-screen bg-gray-100 pt-16">
//         {/* Chat Header */}
//         <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
//           <div className="flex items-center">
//             <img 
//               src={recipient.profileImage || "/default-avatar.jpg"} 
//               alt={recipient.name} 
//               className="w-10 h-10 rounded-full mr-3 object-cover"
//               onError={(e) => {
//                 e.target.src = "/default-avatar.jpg";
//               }}
//             />
//             <div>
//               <h3 className="font-bold">{recipient.name}</h3>
//               <p className="text-xs text-gray-500">
//                 {recipient.online ? (
//                   <span className="flex items-center">
//                     <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
//                     Online
//                   </span>
//                 ) : "Offline"}
//                 {isTyping && (
//                   <span className="ml-2 text-blue-500">typing...</span>
//                 )}
//               </p>
//             </div>
//           </div>
//           <button 
//             onClick={handlePhoneClick}
//             className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
//             title="Call"
//           >
//             <FaPhoneAlt size={18} />
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//           {messages.length === 0 ? (
//             <div className="flex flex-col justify-center items-center h-full text-gray-500">
//               <p>No messages yet</p>
//               <p className="text-sm">Start the conversation!</p>
//             </div>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg._id || msg.id}
//                 className={`mb-3 flex ${
//                   msg.sender === user._id ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                     msg.sender === user._id
//                       ? "bg-blue-500 text-white"
//                       : "bg-white border border-gray-200"
//                   }`}
//                 >
//                   <p>{msg.content || msg.text}</p>
                  
//                   {/* Display attachments if any */}
//                   {msg.attachments?.map((attachment, idx) => (
//                     <div key={idx} className="mt-2">
//                       {attachment.type === 'image' ? (
//                         <img 
//                           src={attachment.url} 
//                           alt={attachment.name} 
//                           className="max-w-full h-auto rounded"
//                           onError={(e) => {
//                             e.target.src = "/file-placeholder.png";
//                           }}
//                         />
//                       ) : (
//                         <a 
//                           href={attachment.url} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="text-blue-500 hover:underline flex items-center"
//                         >
//                           <span className="truncate">{attachment.name}</span>
//                         </a>
//                       )}
//                     </div>
//                   ))}
                  
//                   <p className={`text-xs mt-1 ${
//                     msg.sender === user._id ? "text-blue-100" : "text-gray-500"
//                   }`}>
//                     {new Date(msg.createdAt).toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit',
//                       hour12: true 
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Message Input */}
//         <div className="p-4 bg-white border-t">
//           {/* Show selected files */}
//           {attachments.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-2">
//               {attachments.map((file, idx) => (
//                 <div key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center">
//                   <span className="truncate max-w-xs">{file.name}</span>
//                   <button 
//                     onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
//                     className="ml-1 text-red-500"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="flex items-center">
//             <button 
//               onClick={() => fileInputRef.current?.click()}
//               className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
//               title="Attach file"
//             >
//               <FaPaperclip size={18} />
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 multiple
//                 className="hidden"
//               />
//             </button>
            
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               disabled={loading}
//             />
            
//             <button 
//               onClick={sendMessage}
//               disabled={(!input.trim() && attachments.length === 0) || loading}
//               className={`p-2 px-4 rounded-r-lg transition-colors ${
//                 (input.trim() || attachments.length > 0)
//                   ? "bg-blue-500 text-white hover:bg-blue-600" 
//                   : "bg-gray-200 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               <IoSend size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserChat;

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import Header from "../Header";
// import { chatAPI } from "../../Clients-components/PropertyController";
// import { useAuth } from "../../context/AuthContext";
// import io from 'socket.io-client';

// const UserChat = () => {
//   const { user } = useAuth();
//   const { conversationId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [socketError, setSocketError] = useState(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // Get recipient from location state or find in conversation
//   const recipient = location.state?.recipient || 
//     conversations.find(c => c._id === conversationId)?.participants?.find(p => p._id !== user?._id);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Initialize socket and load data
//   useEffect(() => {
//     if (!user) {
//       navigate('/user/login');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/user/login');
//       return;
//     }

//     const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
//     try {
//       console.log('Initializing socket connection...');
//       socketRef.current = io(socketUrl, {
//         auth: { token },
//         transports: ['websocket', 'polling'],
//         reconnection: true,
//         reconnectionAttempts: Infinity,
//         reconnectionDelay: 1000,
//         reconnectionDelayMax: 5000,
//         randomizationFactor: 0.5,
//       });

//       socketRef.current.on('connect', () => {
//         console.log('Socket.IO connected successfully');
//         setSocketError(null);
//       });

//       socketRef.current.on('connect_error', (err) => {
//         console.error('Socket.IO connection error:', err);
//         setSocketError('Failed to connect to chat server. Please refresh the page.');
//       });

//       socketRef.current.on('disconnect', (reason) => {
//         console.log('Disconnected:', reason);
//         if (reason === 'io server disconnect') {
//           socketRef.current.connect();
//         }
//       });

//       socketRef.current.on('reconnect_attempt', (attempt) => {
//         console.log('Reconnection attempt:', attempt);
//       });

//       socketRef.current.on('reconnect_error', (error) => {
//         console.log('Reconnection error:', error);
//       });

//       socketRef.current.on('reconnect_failed', () => {
//         console.log('Reconnection failed');
//         setSocketError('Failed to reconnect to chat server. Please refresh the page.');
//       });

//       const loadData = async () => {
//         try {
//           const [convRes, msgRes] = await Promise.all([
//             chatAPI.getUserConversations(),
//             conversationId ? chatAPI.getConversationMessages(conversationId) : null
//           ]);
          
//           setConversations(convRes.data.conversations || []);
//           if (msgRes) setMessages(msgRes.data.messages || []);
//         } catch (error) {
//           console.error("Failed to load chat data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadData();

//       // Message handlers
//       socketRef.current.on('newMessage', handleNewMessage);
//       socketRef.current.on('typing', () => setIsTyping(true));
//       socketRef.current.on('stopTyping', () => setIsTyping(false));

//     } catch (err) {
//       console.error("Socket initialization error:", err);
//       setSocketError('Failed to initialize chat connection');
//     }

//     return () => {
//       console.log('Cleaning up socket...');
//       if (socketRef.current) {
//         socketRef.current.off('connect');
//         socketRef.current.off('connect_error');
//         socketRef.current.off('disconnect');
//         socketRef.current.off('reconnect_attempt');
//         socketRef.current.off('reconnect_error');
//         socketRef.current.off('reconnect_failed');
//         socketRef.current.off('newMessage');
//         socketRef.current.off('typing');
//         socketRef.current.off('stopTyping');
//         socketRef.current.disconnect();
//         console.log('Socket disconnected during cleanup');
//       }
//     };
//   }, [conversationId, user, navigate]);

//   const handleNewMessage = (message) => {
//     if (message.conversation === conversationId) {
//       setMessages(prev => [...prev, message]);
//       scrollToBottom();
//     }
//     setConversations(prev => prev.map(c => 
//       c._id === message.conversation ? {...c, lastMessage: message} : c
//     ));
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || !conversationId) return;
    
//     if (!socketRef.current?.connected) {
//       console.log('Attempting to reconnect...');
//       socketRef.current.connect();
//       return;
//     }

//     const tempId = Date.now().toString();
//     const tempMessage = {
//       _id: tempId,
//       content: input,
//       sender: user,
//       createdAt: new Date(),
//       read: false
//     };

//     setMessages(prev => [...prev, tempMessage]);
//     setInput("");
//     socketRef.current.emit('stopTyping', { conversationId });

//     try {
//       socketRef.current.emit('sendMessage', {
//         conversationId,
//         content: input,
//         sender: user._id
//       });

//       const res = await chatAPI.sendTextMessage(conversationId, input);
//       setMessages(prev => prev.map(m => m._id === tempId ? res.data.message : m));
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       setMessages(prev => prev.filter(m => m._id !== tempId));
//     }
//   };

//   const handleTyping = () => {
//     if (!socketRef.current?.connected) return;
    
//     if (input.trim()) {
//       socketRef.current.emit('typing', { conversationId });
//     } else {
//       socketRef.current.emit('stopTyping', { conversationId });
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Header />
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//         </div>
//       </>
//     );
//   }

//   if (socketError) {
//     return (
//       <>
//         <Header />
//         <div className="flex justify-center items-center h-screen">
//           <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
//             <h3 className="text-xl font-semibold text-red-600 mb-2">Connection Error</h3>
//             <p className="text-gray-700 mb-4">{socketError}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
//             >
//               Refresh Page
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex h-screen bg-gray-50 pt-20">
        
//         {/* Conversations List */}
//         <div className="w-full md:w-1/3 bg-white border-r overflow-y-auto">
//           <h2 className="p-4 text-xl font-bold border-b">Messages</h2>
//           {conversations.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               No conversations yet
//             </div>
//           ) : (
//             conversations.map(conv => {
//               const otherUser = conv.participants.find(p => p._id !== user._id);
//               const isActive = conv._id === conversationId;
              
//               return (
//                 <div 
//                   key={conv._id}
//                   className={`p-4 border-b cursor-pointer transition-colors ${
//                     isActive ? 'bg-yellow-50' : 'hover:bg-gray-50'
//                   }`}
//                   onClick={() => navigate(`/user/chat/${conv._id}`, {
//                     state: { recipient: otherUser }
//                   })}
//                 >
//                   <div className="flex items-center">
//                     <img 
//                       src={otherUser?.profileImage || '/default-avatar.jpg'} 
//                       alt={otherUser?.name}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between">
//                         <h3 className="font-medium truncate">{otherUser?.name}</h3>
//                         <span className="text-xs text-gray-500">
//                           {conv.lastMessage?.createdAt ? 
//                             new Date(conv.lastMessage.createdAt).toLocaleTimeString([], {timeStyle: 'short'}) : ''
//                           }
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-500 truncate">
//                         {conv.lastMessage?.content || "No messages yet"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Chat Area */}
//         {conversationId ? (
//           <div className="hidden md:flex flex-col flex-1">
//             {/* Chat Header */}
//             <div className="p-4 bg-white border-b flex items-center justify-between">
//               <div className="flex items-center">
//                 <img 
//                   src={recipient?.profileImage || '/default-avatar.jpg'} 
//                   alt={recipient?.name}
//                   className="w-10 h-10 rounded-full mr-3 object-cover"
//                 />
//                 <div>
//                   <h3 className="font-bold">{recipient?.name}</h3>
//                   <p className="text-xs text-gray-500">
//                     {recipient?.online ? 'Online' : 'Offline'}
//                   </p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => window.location.href = `tel:${recipient?.phone}`}
//                 className="p-2 text-yellow-600 hover:text-yellow-700 rounded-full hover:bg-yellow-50"
//                 title="Call"
//               >
//                 <FaPhoneAlt size={18} />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//               {messages.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-gray-500">
//                   <p className="text-lg">No messages yet</p>
//                   <p>Start the conversation!</p>
//                 </div>
//               ) : (
//                 messages.map(msg => (
//                   <div 
//                     key={msg._id} 
//                     className={`mb-3 flex ${
//                       msg.sender._id === user._id ? 'justify-end' : 'justify-start'
//                     }`}
//                   >
//                     <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                       msg.sender._id === user._id 
//                         ? 'bg-yellow-400 text-white rounded-br-none' 
//                         : 'bg-white border rounded-bl-none'
//                     }`}>
//                       {msg.content}
//                       <div className={`text-xs mt-1 flex items-center ${
//                         msg.sender._id === user._id ? 'text-yellow-100' : 'text-gray-500'
//                       }`}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], {timeStyle: 'short'})}
//                         {msg.sender._id === user._id && (
//                           <span className="ml-1">
//                             {msg.read ? '✓✓' : '✓'}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//               {isTyping && (
//                 <div className="flex justify-start mb-3">
//                   <div className="bg-white px-4 py-2 rounded-lg border">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area - Fixed at bottom */}
//             <div className="p-4 bg-white border-t sticky bottom-0">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => {
//                     setInput(e.target.value);
//                     handleTyping();
//                   }}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type a message..."
//                   className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//                 <button 
//                   onClick={sendMessage}
//                   disabled={!input.trim()}
//                   className="bg-yellow-400 text-white p-3 rounded-r-lg disabled:opacity-50 hover:bg-yellow-500 transition"
//                 >
//                   <IoSend size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="hidden md:flex flex-1 items-center justify-center">
//             <div className="text-center text-gray-500">
//               <p className="text-xl">Select a conversation</p>
//               <p>or start a new one</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserChat;
// import { useState, useEffect, useRef } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import Header from "../Header";
// import { useAuth } from "../../context/AuthContext";
// import { chatAPI } from "../../Clients-components/PropertyController";
// import { ChatSocket } from "../../soket/socket";

// const UserChat = () => {
//   const { user, logout } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const socketRef = useRef(null);

//   // Fetch chat users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const response = await chatAPI.getChatUsers();
//         setUsers(response.data);
//         if (response.data.length > 0) {
//           setSelectedUser(response.data[0]);
//         }
//       } catch (err) {
//         setError("Failed to load chat users");
//         console.error(err);
//         if (err.response?.status === 401) {
//           logout();
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [logout]);

//   // Fetch messages when selected user changes
//   useEffect(() => {
//     if (!selectedUser) return;

//     const fetchMessages = async () => {
//       try {
//         setLoading(true);
//         const response = await chatAPI.getMessages(selectedUser._id);
//         setMessages(response.data);
        
//         // Mark unread messages as read
//         const unreadMessages = response.data.filter(
//           msg => !msg.read && msg.recipient._id === user._id
//         );
        
//         if (unreadMessages.length > 0) {
//           await Promise.all(
//             unreadMessages.map(msg => chatAPI.markAsRead(msg._id))
//           );
//         }
//       } catch (err) {
//         setError("Failed to load messages");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, user._id]);

//   // Setup WebSocket connection
//   useEffect(() => {
//     if (!user || !user.token) return;

//     const handleNewMessage = (message) => {
//       setMessages(prev => [...prev, message]);
      
//       // If message is for current chat, mark as read
//       if (message.sender._id === selectedUser?._id || 
//           message.recipient._id === selectedUser?._id) {
//         chatAPI.markAsRead(message._id);
//       }
//     };

//     const handleSocketError = (error) => {
//       console.error('Socket error:', error);
//       setError("Connection error. Try refreshing the page.");
//     };

//     socketRef.current = new ChatSocket(
//       user._id,
//       user.token,
//       handleNewMessage,
//       handleSocketError
//     );

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [user, selectedUser]);

//   const handleSendMessage = async () => {
//     if (!input.trim() || !selectedUser) return;
    
//     try {
//       const newMessage = {
//         sender: user._id,
//         recipient: selectedUser._id,
//         text: input.trim(),
//         createdAt: new Date().toISOString(),
//         read: false
//       };

//       // Optimistic update
//       setMessages(prev => [...prev, {
//         ...newMessage,
//         sender: { _id: user._id, name: user.name, avatar: user.avatar },
//         recipient: selectedUser
//       }]);
//       setInput("");

//       // Send via WebSocket
//       if (socketRef.current) {
//         socketRef.current.sendMessage(newMessage);
//       }

//       // Also send via HTTP as fallback
//       await chatAPI.sendMessage(selectedUser._id, input.trim());
//     } catch (err) {
//       setError("Failed to send message");
//       console.error(err);
//       // Rollback optimistic update
//       setMessages(prev => prev.slice(0, -1));
//     }
//   };

//   if (loading && !selectedUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl">Loading chat...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex h-screen bg-[#F8F8FF] py-20">
//         {/* Sidebar */}
//         <div className="w-1/3 bg-white p-4 border-r border-[#727070] overflow-y-auto">
//           {users.map((chatUser) => (
//             <div
//               key={chatUser._id}
//               className={`flex items-center p-3 rounded cursor-pointer mb-2 ${
//                 selectedUser?._id === chatUser._id 
//                   ? "bg-[#FEE123]" 
//                   : "hover:bg-gray-200"
//               }`}
//               onClick={() => setSelectedUser(chatUser)}
//             >
//               <div className="relative">
//                 <img 
//                   src={chatUser.avatar || "/default-avatar.jpg"} 
//                   alt={chatUser.name} 
//                   className="w-12 h-12 rounded-full mr-3" 
//                 />
//                 {chatUser.online && (
//                   <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold truncate">{chatUser.name}</h3>
//                 <p className="text-sm text-gray-500 truncate">
//                   {chatUser.lastMessage || "No messages yet"}
//                 </p>
//               </div>
//               {messages.some(m => 
//                 (m.sender._id === chatUser._id || m.recipient._id === chatUser._id) && 
//                 !m.read && 
//                 m.recipient._id === user._id
//               ) && (
//                 <div className="ml-2 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Chat Window */}
//         <div className="w-2/3 flex flex-col">
//           {selectedUser ? (
//             <>
//               <div className="flex items-center justify-between p-4 bg-white border-b border-[#727070]">
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <img 
//                       src={selectedUser.avatar || "/default-avatar.jpg"} 
//                       alt={selectedUser.name} 
//                       className="w-10 h-10 rounded-full mr-3" 
//                     />
//                     {selectedUser.online && (
//                       <div className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-bold">{selectedUser.name}</h3>
//                     <p className="text-xs text-gray-500">
//                       {selectedUser.online ? "Online" : "Offline"}
//                     </p>
//                   </div>
//                 </div>
//                 <button 
//                   className="text-[#FEE123] text-xl hover:bg-yellow-100 p-2 rounded-full"
//                   title="Call"
//                 >
//                   <FaPhoneAlt />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {messages.length === 0 ? (
//                   <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">No messages yet. Start the conversation!</p>
//                   </div>
//                 ) : (
//                   messages.map((msg) => (
//                     <div
//                       key={msg._id || msg.createdAt}
//                       className={`mb-3 p-3 rounded-lg max-w-xs md:max-w-md ${
//                         msg.sender._id === user._id
//                           ? "bg-[#AFD1FF] text-white ml-auto"
//                           : "bg-[#FEE123] text-gray-900"
//                       }`}
//                     >
//                       <p>{msg.text}</p>
//                       <p className={`text-xs mt-1 ${
//                         msg.sender._id === user._id 
//                           ? "text-blue-100" 
//                           : "text-gray-600"
//                       }`}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                         {msg.sender._id === user._id && (
//                           <span className="ml-2">
//                             {msg.read ? '✓✓' : '✓'}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="p-4 bg-white border-t flex items-center">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                   placeholder="Type a message..."
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <button 
//                   onClick={handleSendMessage}
//                   disabled={!input.trim()}
//                   className={`ml-2 p-2 rounded-full ${
//                     input.trim() 
//                       ? "text-yellow-500 hover:bg-yellow-100" 
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <IoSend size={20} />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">Select a user to start chatting</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserChat;





// import { useState, useEffect, useRef } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import Header from "../Header";
// import { useAuth } from "../../context/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import { chatAPI } from "../../Clients-components/PropertyController";
// import { ChatSocket } from "../../soket/socket";

// const UserChat = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const socketRef = useRef(null);

//   // Check authentication and handle navigation state
//   useEffect(() => {
//     if (!user) {
//       navigate("/user/login");
//       return;
//     }

//     if (location.state?.recipientId) {
//       const recipient = {
//         _id: location.state.recipientId,
//         name: location.state.recipientName,
//         avatar: "",
//         online: false,
//         propertyId: location.state.propertyId
//       };
//       setSelectedUser(recipient);
      
//       setUsers(prevUsers => {
//         const exists = prevUsers.some(u => u._id === recipient._id);
//         return exists ? prevUsers : [...prevUsers, recipient];
//       });
//     }
//   }, [user, navigate, location.state]);

//   // Fetch chat users
//   useEffect(() => {
//     if (!user) return;

//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching users...");
//         const response = await chatAPI.getChatUsers();
//         console.log("API Response:", response);
        
//         // Handle different response structures
//         let usersData = [];
//         if (Array.isArray(response)) {
//           usersData = response;
//         } else if (Array.isArray(response?.data)) {
//           usersData = response.data;
//         } else if (response?.data?.users) {
//           usersData = response.data.users;
//         }

//         console.log("Processed users data:", usersData);
//         setUsers(usersData || []);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load chat users. Please try again.");
//         setUsers([]);
//         if (err.response?.status === 401) {
//           logout();
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [user, logout]);

//   // Fetch messages when selected user changes
//   useEffect(() => {
//     if (!selectedUser || !user) return;

//     const fetchMessages = async () => {
//       try {
//         setLoading(true);
//         const response = await chatAPI.getMessages(selectedUser._id);
//         const messagesData = Array.isArray(response?.data) ? response.data : [];
//         setMessages(messagesData);
        
//         const unreadMessages = messagesData.filter(
//           msg => !msg.read && msg.recipient._id === user._id
//         );
        
//         if (unreadMessages.length > 0) {
//           await Promise.all(
//             unreadMessages.map(msg => chatAPI.markAsRead(msg._id))
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//         setError("Failed to load messages");
//         setMessages([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, user]);

//   // Setup WebSocket connection
//   useEffect(() => {
//     if (!user || !user.token) return;

//     const handleNewMessage = (message) => {
//       setMessages(prev => [...prev, message]);
      
//       if (message.sender._id === selectedUser?._id || 
//           message.recipient._id === selectedUser?._id) {
//         chatAPI.markAsRead(message._id);
//       }
//     };

//     const handleSocketError = (error) => {
//       console.error('Socket error:', error);
//       setError("Connection error. Try refreshing the page.");
//     };

//     socketRef.current = new ChatSocket(
//       user._id,
//       user.token,
//       handleNewMessage,
//       handleSocketError
//     );

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [user, selectedUser]);

//  const handleSendMessage = async () => {
//   if (!input.trim() || !selectedUser || !user) return;
  
//   const tempId = Date.now();
//   const inputSnapshot = input;

//   try {
//     // Optimistic update
//     setMessages(prev => [...prev, {
//       _id: tempId,
//       text: input.trim(),
//       // ... other message fields
//     }]);
//     setInput("");

//     // WebSocket
//     if (socketRef.current) {
//       socketRef.current.sendMessage({
//         sender: user._id,
//         recipient: selectedUser._id,
//         text: input.trim()
//       });
//     }

//     // API call - ensure path matches backend
//     const response = await chatAPI.sendMessage(
//       selectedUser._id, 
//       input.trim()
//     );

//     // Update with server response
//     setMessages(prev => [
//       ...prev.filter(msg => msg._id !== tempId),
//       response.data
//     ]);

//   } catch (err) {
//     console.error("Send error:", err);
//     setMessages(prev => prev.filter(msg => msg._id !== tempId));
//     setInput(inputSnapshot);
//   }
// };

//   const retryFetchUsers = async () => {
//     setError(null);
//     setLoading(true);
//     try {
//       const response = await chatAPI.getChatUsers();
//       const usersData = Array.isArray(response?.data) ? response.data : [];
//       setUsers(usersData);
//     } catch (err) {
//       console.error("Retry failed:", err);
//       setError("Still unable to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && users.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl">Loading chat...</div>
//       </div>
//     );
//   }

//   if (error && users.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen flex-col">
//         <div className="text-xl text-red-500 mb-4">{error}</div>
//         <button 
//           onClick={retryFetchUsers}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex h-screen bg-[#F8F8FF] py-20">
//         {/* Sidebar */}
//         <div className="w-1/3 bg-white p-4 border-r border-[#727070] overflow-y-auto">
//           {users.length > 0 ? (
//             users.map((chatUser) => (
//               <div
//                 key={chatUser._id}
//                 className={`flex items-center p-3 rounded cursor-pointer mb-2 ${
//                   selectedUser?._id === chatUser._id 
//                     ? "bg-[#FEE123]" 
//                     : "hover:bg-gray-200"
//                 }`}
//                 onClick={() => setSelectedUser(chatUser)}
//               >
//                 <div className="relative">
//                   <img 
//                     src={chatUser.avatar || "/default-avatar.jpg"} 
//                     alt={chatUser.name} 
//                     className="w-12 h-12 rounded-full mr-3" 
//                   />
//                   {chatUser.online && (
//                     <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-bold truncate">{chatUser.name}</h3>
//                   <p className="text-sm text-gray-500 truncate">
//                     {chatUser.lastMessage || "No messages yet"}
//                   </p>
//                 </div>
//                 {messages.some(m => 
//                   (m.sender._id === chatUser._id || m.recipient._id === chatUser._id) && 
//                   !m.read && 
//                   m.recipient._id === user._id
//                 ) && (
//                   <div className="ml-2 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10">
//               <p className="text-gray-500">No chat users available</p>
//               <button 
//                 onClick={retryFetchUsers}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Refresh
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Chat Window */}
//         <div className="w-2/3 flex flex-col">
//           {selectedUser ? (
//             <>
//               <div className="flex items-center justify-between p-4 bg-white border-b border-[#727070]">
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <img 
//                       src={selectedUser.avatar || "/default-avatar.jpg"} 
//                       alt={selectedUser.name} 
//                       className="w-10 h-10 rounded-full mr-3" 
//                     />
//                     {selectedUser.online && (
//                       <div className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-bold">{selectedUser.name}</h3>
//                     <p className="text-xs text-gray-500">
//                       {selectedUser.online ? "Online" : "Offline"}
//                     </p>
//                   </div>
//                 </div>
//                 <button 
//                   className="text-[#FEE123] text-xl hover:bg-yellow-100 p-2 rounded-full"
//                   title="Call"
//                   onClick={() => window.location.href = `tel:${selectedUser.phone || ''}`}
//                 >
//                   <FaPhoneAlt />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {messages.length === 0 ? (
//                   <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">No messages yet. Start the conversation!</p>
//                   </div>
//                 ) : (
//                   messages.map((msg) => (
//                     <div
//                       key={msg._id || msg.createdAt}
//                       className={`mb-3 p-3 rounded-lg max-w-xs md:max-w-md ${
//                         msg.sender._id === user._id
//                           ? "bg-[#AFD1FF] text-white ml-auto"
//                           : "bg-[#FEE123] text-gray-900"
//                       }`}
//                     >
//                       <p>{msg.text}</p>
//                       <p className={`text-xs mt-1 ${
//                         msg.sender._id === user._id 
//                           ? "text-blue-100" 
//                           : "text-gray-600"
//                       }`}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                         {msg.sender._id === user._id && (
//                           <span className="ml-2">
//                             {msg.read ? '✓✓' : '✓'}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="p-4 bg-white border-t flex items-center">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                   placeholder="Type a message..."
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 />
//                 <button 
//                   onClick={handleSendMessage}
//                   disabled={!input.trim()}
//                   className={`ml-2 p-2 rounded-full ${
//                     input.trim() 
//                       ? "text-yellow-500 hover:bg-yellow-100" 
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <IoSend size={20} />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">
//                 {users.length > 0 
//                   ? "Select a user to start chatting" 
//                   : "No users available to chat with"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserChat;







// import { useState, useEffect, useRef, useCallback } from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import Header from "../Header";
// import { useAuth } from "../../context/AuthContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import { chatAPI } from "../../Clients-components/PropertyController";
// import { ChatSocket } from "../../soket/socket";

// const UserChat = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     users: [],
//     selectedUser: null,
//     messages: [],
//     input: "",
//     loading: true,
//     error: null,
//   });
//   const [isSending, setIsSending] = useState(false);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const inputRef = useRef(null);

//   const { users, selectedUser, messages, input, loading, error } = state;

//   const updateState = (newState) => {
//     setState(prev => ({ ...prev, ...newState }));
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (!user) {
//       navigate("/user/login");
//       return;
//     }

//     // Handle when coming from property page with owner details
//     if (location.state?.recipient) {
//       const { recipient } = location.state;
      
//       const newRecipient = {
//         _id: recipient._id,
//         name: recipient.name || "Property Owner",
//         avatar: recipient.avatar || "/default-avatar.jpg",
//         phone: recipient.phone || "",
//         online: false,
//         propertyId: recipient.propertyId || null,
//         isOwner: true
//       };

//       const existingUserIndex = users.findIndex(u => u._id === newRecipient._id);
      
//       if (existingUserIndex === -1) {
//         updateState({
//           users: [...users, newRecipient],
//           selectedUser: newRecipient
//         });
//       } else {
//         // Update existing user with any new info
//         const updatedUsers = [...users];
//         updatedUsers[existingUserIndex] = { 
//           ...updatedUsers[existingUserIndex], 
//           ...newRecipient 
//         };
//         updateState({
//           users: updatedUsers,
//           selectedUser: updatedUsers[existingUserIndex]
//         });
//       }
      
//       // Clear the location state to prevent re-adding on refresh
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, [user, navigate, location.state]);

//   const fetchUsers = useCallback(async () => {
//     if (!user) return;

//     try {
//       updateState({ loading: true, error: null });
//       const response = await chatAPI.getChatOwners();
      
//       let usersData = [];
//       if (Array.isArray(response?.data?.users)) {
//         usersData = response.data.users;
//       } else if (Array.isArray(response?.users)) {
//         usersData = response.users;
//       } else if (Array.isArray(response)) {
//         usersData = response;
//       }

//       // Merge with any existing users (like from location.state)
//       const mergedUsers = [...usersData];
//       if (selectedUser && !usersData.some(u => u._id === selectedUser._id)) {
//         mergedUsers.push(selectedUser);
//       }

//       updateState({ users: mergedUsers });
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       updateState({ 
//         error: "Failed to load chat users. Please try again.",
//         users: []
//       });
//       if (err.response?.status === 401) logout();
//     } finally {
//       updateState({ loading: false });
//     }
//   }, [user, selectedUser, logout]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const fetchMessages = useCallback(async () => {
//     if (!selectedUser || !user) return;

//     try {
//       updateState({ loading: true });
//       const response = await chatAPI.getMessages(selectedUser._id);
      
//       let messagesData = [];
//       if (Array.isArray(response?.messages)) {
//         messagesData = response.messages;
//       } else if (Array.isArray(response?.data?.messages)) {
//         messagesData = response.data.messages;
//       } else if (Array.isArray(response?.data)) {
//         messagesData = response.data;
//       } else if (Array.isArray(response)) {
//         messagesData = response;
//       }

//       const formattedMessages = messagesData.map(msg => ({
//         _id: msg._id,
//         text: msg.text,
//         read: msg.read,
//         createdAt: msg.createdAt,
//         sender: {
//           _id: msg.sender?._id || user._id,
//           name: msg.sender?.name || 'Unknown',
//           avatar: msg.sender?.avatar || '/default-avatar.jpg'
//         },
//         recipient: {
//           _id: msg.recipient?._id || selectedUser._id,
//           name: msg.recipient?.name || 'Unknown',
//           avatar: msg.recipient?.avatar || '/default-avatar.jpg'
//         }
//       }));

//       updateState({ messages: formattedMessages });
      
//       const unreadMessages = formattedMessages.filter(
//         msg => !msg.read && msg.recipient._id === user._id
//       );
      
//       if (unreadMessages.length > 0) {
//         await Promise.all(
//           unreadMessages.map(msg => chatAPI.markAsRead(msg._id))
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//       updateState({ 
//         error: "Failed to load messages",
//         messages: [] 
//       });
//     } finally {
//       updateState({ loading: false });
//     }
//   }, [selectedUser, user]);

//   useEffect(() => {
//     fetchMessages();
//     scrollToBottom();
//   }, [fetchMessages]);

//   useEffect(() => {
//     if (!user?._id || !user?.token) return;

//     const handleNewMessage = (message) => {
//       const formattedMessage = {
//         _id: message._id || Date.now().toString(),
//         text: message.text,
//         read: message.read || false,
//         createdAt: message.createdAt || new Date().toISOString(),
//         sender: {
//           _id: message.sender?._id || user._id,
//           name: message.sender?.name || 'Unknown',
//           avatar: message.sender?.avatar || '/default-avatar.jpg'
//         },
//         recipient: {
//           _id: message.recipient?._id || selectedUser?._id,
//           name: message.recipient?.name || 'Unknown',
//           avatar: message.recipient?.avatar || '/default-avatar.jpg'
//         }
//       };

//       updateState(prev => ({
//         messages: [...prev.messages, formattedMessage]
//       }));
      
//       if (formattedMessage.recipient._id === user._id) {
//         chatAPI.markAsRead(formattedMessage._id);
//       }
//     };

//     const handleSocketError = (error) => {
//       console.error('Socket error:', error);
//       updateState({ error: "Connection error. Try refreshing the page." });
//     };

//     socketRef.current = new ChatSocket(
//       user._id,
//       user.token,
//       handleNewMessage,
//       handleSocketError
//     );

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [user, selectedUser]);

//   const handleSendMessage = async () => {
//     if (!input.trim() || !selectedUser || !user || isSending) return;
    
//     const tempId = Date.now().toString();
//     const messageText = input.trim();

//     setState(prev => ({ ...prev, input: "" }));
//     setIsSending(true);

//     try {
//       const tempMessage = {
//         _id: tempId,
//         text: messageText,
//         sender: {
//           _id: user._id,
//           name: user.name,
//           avatar: user.avatar || '/default-avatar.jpg'
//         },
//         recipient: {
//           _id: selectedUser._id,
//           name: selectedUser.name,
//           avatar: selectedUser.avatar || '/default-avatar.jpg'
//         },
//         createdAt: new Date().toISOString(),
//         read: false
//       };

//       setState(prev => ({
//         ...prev,
//         messages: [...prev.messages, tempMessage]
//       }));

//       if (socketRef.current) {
//         socketRef.current.sendMessage({
//           sender: user._id,
//           recipient: selectedUser._id,
//           text: messageText
//         });
//       }

//       await chatAPI.sendMessage(selectedUser._id, messageText);

//     } catch (err) {
//       console.error("Send error:", err);
//       setState(prev => ({
//         ...prev,
//         messages: prev.messages.filter(msg => msg._id !== tempId),
//         input: messageText
//       }));
//     } finally {
//       setIsSending(false);
//       scrollToBottom();
//       if (inputRef.current) {
//         inputRef.current.focus();
//         inputRef.current.value = "";
//       }
//     }
//   };

//   const retryFetchUsers = async () => {
//     updateState({ error: null, loading: true });
//     try {
//       await fetchUsers();
//     } catch (err) {
//       console.error("Retry failed:", err);
//       updateState({ error: "Still unable to load users" });
//     }
//   };

//   if (loading && users.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl">Loading chat...</div>
//       </div>
//     );
//   }

//   if (error && users.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-screen flex-col">
//         <div className="text-xl text-red-500 mb-4">{error}</div>
//         <button 
//           onClick={retryFetchUsers}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex h-screen bg-[#F8F8FF] py-20">
//         {/* Sidebar - User List */}
//         <div className="w-1/3 bg-white p-4 border-r border-[#727070] overflow-y-auto">
//           {users.length > 0 ? (
//             users.map((chatUser) => {
//               const unreadCount = messages.filter(m => 
//                 (m.sender._id === chatUser._id || m.recipient._id === chatUser._id) && 
//                 !m.read && 
//                 m.recipient._id === user._id
//               ).length;

//               const isSelected = selectedUser?._id === chatUser._id;

//               return (
//                 <div
//                   key={chatUser._id}
//                   className={`flex items-center p-3 rounded cursor-pointer mb-2 ${
//                     isSelected ? "bg-[#FEE123]" : "hover:bg-gray-200"
//                   }`}
//                   onClick={() => updateState({ selectedUser: chatUser })}
//                 >
//                   <div className="relative">
//                     <img 
//                       src={chatUser.avatar} 
//                       alt={chatUser.name} 
//                       className="w-12 h-12 rounded-full mr-3 object-cover" 
//                       onError={(e) => {
//                         e.target.src = "/default-avatar.jpg";
//                       }}
//                     />
//                     {chatUser.online && (
//                       <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-bold truncate">{chatUser.name}</h3>
//                     <p className="text-sm text-gray-500 truncate">
//                       {chatUser.isOwner ? "Property Owner" : "Chat User"}
//                     </p>
//                     <p className="text-xs text-gray-400 truncate">
//                       {messages
//                         .filter(m => m.sender._id === chatUser._id || m.recipient._id === chatUser._id)
//                         .slice(-1)[0]?.text || "No messages yet"}
//                     </p>
//                   </div>
//                   {unreadCount > 0 && (
//                     <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
//                       {unreadCount}
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-10">
//               <p className="text-gray-500">No chat users available</p>
//               <button 
//                 onClick={retryFetchUsers}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Refresh
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Main Chat Area */}
//         <div className="w-2/3 flex flex-col">
//           {selectedUser ? (
//             <>
//               <div className="flex items-center justify-between p-4 bg-white border-b border-[#727070]">
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <img 
//                       src={selectedUser.avatar} 
//                       alt={selectedUser.name} 
//                       className="w-10 h-10 rounded-full mr-3 object-cover"
//                       onError={(e) => {
//                         e.target.src = "/default-avatar.jpg";
//                       }}
//                     />
//                     {selectedUser.online && (
//                       <div className="absolute bottom-0 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="font-bold">{selectedUser.name}</h3>
//                     <p className="text-xs text-gray-500">
//                       {selectedUser.online ? "Online" : "Offline"}
//                       {selectedUser.isOwner && " • Property Owner"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {selectedUser.propertyId && (
//                     <button
//                       className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
//                       onClick={() => navigate(`/property/${selectedUser.propertyId}`)}
//                     >
//                       View Property
//                     </button>
//                   )}
//                   {selectedUser.phone && (
//                     <button 
//                       className="text-[#FEE123] text-xl hover:bg-yellow-100 p-2 rounded-full"
//                       title={`Call ${selectedUser.name}`}
//                       onClick={() => window.location.href = `tel:${selectedUser.phone}`}
//                     >
//                       <FaPhoneAlt />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {messages.length === 0 ? (
//                   <div className="flex items-center justify-center h-full">
//                     <p className="text-gray-500">No messages yet. Start the conversation!</p>
//                   </div>
//                 ) : (
//                   messages.map((msg) => (
//                     <div
//                       key={msg._id}
//                       className={`mb-3 p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
//                         msg.sender._id === user._id
//                           ? "bg-[#AFD1FF] text-white ml-auto"
//                           : "bg-[#FEE123] text-gray-900"
//                       }`}
//                     >
//                       <p className="break-words">{msg.text}</p>
//                       <p className={`text-xs mt-1 ${
//                         msg.sender._id === user._id 
//                           ? "text-blue-100" 
//                           : "text-gray-600"
//                       }`}>
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                         {msg.sender._id === user._id && (
//                           <span className="ml-2">
//                             {msg.read ? '✓✓' : '✓'}
//                           </span>
//                         )}
//                       </p>
//                     </div>
//                   ))
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="p-4 bg-white border-t flex items-center">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                   placeholder="Type a message..."
//                   value={input}
//                   onChange={(e) => {
//                     setState(prev => ({ ...prev, input: e.target.value }));
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && input.trim() && !isSending) {
//                       e.preventDefault();
//                       handleSendMessage();
//                     }
//                   }}
//                   disabled={isSending}
//                 />
//                 <button 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleSendMessage();
//                   }}
//                   disabled={!input.trim() || isSending}
//                   className={`ml-2 p-2 rounded-full flex items-center justify-center ${
//                     input.trim() && !isSending
//                       ? "text-yellow-500 hover:bg-yellow-100" 
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                   aria-label="Send message"
//                 >
//                   {isSending ? (
//                     <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
//                   ) : (
//                     <IoSend size={20} />
//                   )}
//                 </button>
//                 {isSending && (
//                   <div className="ml-2 text-gray-500">Sending...</div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">
//                 {users.length > 0 
//                   ? "Select a user to start chatting" 
//                   : "No users available to chat with"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserChat;


