// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';

// const dummyContacts = [
//   { id: 1, name: "Alice Johnson", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "UPI", DOP: "2/08/2025", rent: "8000", room: "201", bed: "A" },
//   { id: 2, name: "Bob Smith", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "Paytm", DOP: "31/07/2025", rent: "4000", room: "202", bed: "B" },
//   { id: 3, name: "Charlie Brown", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "VISA", DOP: "4/08/2025", rent: "8000", room: "203", bed: "C" },
// ];

// const initialMessages = {
//   1: [
//     { id: 1, sender: "Alice", text: "Hey there!", time: "10:00 AM", type: 'text' },
//     { id: 2, sender: "You", text: "Hi Alice!", time: "10:01 AM", type: 'text' },
//   ],
//   2: [
//     { id: 1, sender: "Bob", text: "Hey there!", time: "9:00 AM", type: 'text' },
//     { id: 2, sender: "You", text: "Hi Bob!", time: "9:02 AM", type: 'text' },
//   ],
//   3: [
//     { id: 1, sender: "Charlie", text: "Hey there!", time: "11:30 AM", type: 'text' },
//     { id: 2, sender: "You", text: "Hi Charlie!", time: "11:31 AM", type: 'text' },
//   ],
// };
// const getDaysLate = (dopString) => {
//   const [day, month, year] = dopString.split('/').map(Number);
//   const dopDate = new Date(year, month - 1, day);
//   const today = new Date();

//   const diffTime = today - dopDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays > 0 ? diffDays : 0;
// };


// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedContactId, setSelectedContactId] = useState(1);
//   const [messageInput, setMessageInput] = useState('');
//   const [messagesByContact, setMessagesByContact] = useState(initialMessages);
//   const [requestpay, setrequestpay] = useState(false);

//   const contact = dummyContacts.find(c => c.id === selectedContactId);
//   const messages = messagesByContact[selectedContactId] || [];

//   const handleSend = () => {
//     const newMessages = [];

//     if (requestpay) {
//       newMessages.push({
//         id: Date.now(),
//         sender: "You",
//         type: 'requestpay',
//         amount: contact?.rent || 0,
//         requestedTo: contact?.name || '',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         date: new Date().toLocaleDateString(),
//       });
//     }

//     if (messageInput.trim() !== '') {
//       newMessages.push({
//         id: Date.now() + 1,
//         sender: "You",
//         text: messageInput,
//         type: 'text',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         date: new Date().toLocaleDateString(),
//       });
//     }

//     if (newMessages.length > 0) {
//       setMessagesByContact(prev => ({
//         ...prev,
//         [selectedContactId]: [...(prev[selectedContactId] || []), ...newMessages],
//       }));
//     }

//     setMessageInput('');
//     setrequestpay(false);
//   };

//   const handlePayRefund = () => {
//     const newMessage = {
//       id: Date.now(),
//       sender: "You",
//       text: "₹2500 refunded successfully",
//       type: 'text',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toLocaleDateString(),
//     };
//     setMessagesByContact(prev => ({
//       ...prev,
//       [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//     }));
//   };

//   return (
//     <>
//     <ClientNav />
//       <div className="  bg-cover bg-center bg-no-repeat font-sans px-20 py-5" style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
//         {/* Top Buttons */}
//         <div className="flex gap-1 mb-4">
//           <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded <button></button>">Home</button>
//           <div className='flex items-center justify-center'>/</div>
//           <button className="flex items-center px-2 py-2 rounded <button>">Tenant List</button>
//         </div>

//         {/* Main Chat Layout */}
//         <div className="flex gap-16 h-screen">
//           {/* Contact List */}
//           <div className="w-1/4 bg-[#ffffff] border-r overflow-y-auto p-2 rounded-md shadow-md">
//             {dummyContacts.map((contact) => (
//               <div key={contact.id} onClick={() => setSelectedContactId(contact.id)} className={`p-4 cursor-pointer mb-4 rounded-md shadow-md hover:bg-[#AFD1FF] ${contact.id === selectedContactId ? 'bg-[#AFD1FF] font-semibold' : ''}`}>
//                 <div className="flex gap-2 items-center">
//                   <img src={contact.image} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
//                   <div className="flex flex-col text-sm w-full">
//                     <p className="font-bold mb-1">Payment From</p>
//                     <div className="flex justify-between w-full text-gray-800">
//                       <p>{contact.name}</p>
//                       <p className="text-medium text-gray-500 mt-1">₹{parseFloat(contact.rent).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex text-gray-500 items-center gap-2 text-xs mt-1">
//                   <p>Paid via</p>
//                   <span className="border px-1 py-[1px] rounded text-[10px] font-bold">{contact.mode}</span>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">{contact.DOP}</p>
//               </div>
//             ))}
//           </div>

//           {/* Chat Area */}
//           <div className="flex-1 flex flex-col bg-white rounded-md shadow-md">
//             <div className="border-b bg-[#AFD1FF] p-4 font-semibold flex items-center gap-4 justify-between">
//               <div className='flex items-center gap-2'>
//                 <img src={contact?.image} alt="profile" className="w-10 h-10 rounded-full object-cover" />
//                 <div>
//                   <p>{contact?.name}</p>
//                   <p className="text-xs text-gray-500">Room: {contact?.room} {contact?.bed}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MessageCircle className="w-4 h-4 text-white" /></button></div>
//                 <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><Phone className="w-4 h-4 text-white" /></button></div>
//                 <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MoreVertical className="w-4 h-4 text-white" /></button></div>
//               </div>
//             </div>

//             {!requestpay && (
//               <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg) => (
//                   <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                     <>
//                       {msg.type === 'requestpay' && (
//                         <div className='flex flex-col'>
//                           <div className="bg-[#AFD1FF] border border-blue-300 p-4 rounded-xl max-w-xs">
//                             <p className="text-sm">Request From You</p>
//                             <p className="text-2xl font-bold text-black">₹{msg.amount}/-</p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               almost {getDaysLate(contact.DOP)} day{getDaysLate(contact.DOP) !== 1 ? 's' : ''} are over...
//                             </p>

//                           </div>
//                           <div className='flex gap-2'>
//                             <p className="text-[11px] mt-1">On {msg.date}</p>
//                             <p className="text-[11px] mt-1">{msg.time}</p>
//                           </div>
//                         </div>
//                       )}
//                       {msg.type === 'text' && (
//                         <div className='flex flex-col'>
//                           <div className={`px-4 py-2 rounded-lg max-w-xs bg-[#AFD1FF]`}>
//                             <p className="text-sm">{msg.text}</p>
//                           </div>
//                           <div className='flex gap-2'>
//                             <p className="text-[11px] mt-1">{msg.date}</p>
//                             <p className="text-[11px] mt-1">{msg.time}</p>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {requestpay && (
//               <div className="flex-1 p-4">
//                 <div className="flex flex-col items-center justify-center h-full space-y-4">
//                   <img src={contact?.image} alt="profile" className="w-24 h-24 rounded-full object-cover mb-2" />
//                   <p className="text-center font-semibold">Requesting Rent From {contact?.name}</p>
//                   <div className="border-2 px-4 rounded-lg text-center text-2xl font-semibold">₹{contact?.rent}</div>
//                 </div>
//               </div>
//             )}

//             {!requestpay && (
//               <div className="border-t p-4 flex items-end gap-4">
//                 <button onClick={() => setrequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded">Request Pay</button>
//                 <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded">Pay Refund</button>
//               </div>
//             )}

//             {requestpay && (
//               <div className="border-t p-4 flex gap-2">
//                 <input type="text" placeholder="Type a message..." className="flex-1 border p-2 rounded" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
//                 <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded">Send</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';
// import { bookingAPI, paymentAPI } from '../PropertyController';

// const getDaysLate = (dopString) => {
//   if (!dopString) return 0;
//   const [day, month, year] = dopString.split('/').map(Number);
//   const dopDate = new Date(year, month - 1, day);
//   const today = new Date();

//   const diffTime = today - dopDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays > 0 ? diffDays : 0;
// };

// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedContactId, setSelectedContactId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [messagesByContact, setMessagesByContact] = useState({});
//   const [requestpay, setRequestpay] = useState(false);
//   const [bookingUsers, setBookingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookingUsers();
//   }, []);

//   const fetchBookingUsers = async () => {
//     try {
//       setLoading(true);
//       // Get property ID from your state or context
//       const propertyId = localStorage.getItem('currentPropertyId') || 'default-property-id';
      
//       const response = await bookingAPI.getAllBookings(propertyId);
      
//       if (response.data.success) {
//         setBookingUsers(response.data.users);
//         if (response.data.users.length > 0) {
//           setSelectedContactId(response.data.users[0]._id);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching booking users:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contact = bookingUsers.find(c => c._id === selectedContactId);

//   const handleSendPaymentRequest = async () => {
//     if (!contact) return;

//     try {
//       const response = await paymentAPI.sendPaymentRequest({
//         userId: contact._id,
//         amount: contact.outstandingAmount || contact.rent,
//         description: 'Rent payment request',
//         dueDate: new Date().toISOString()
//       });

//       if (response.data.success) {
//         const newMessage = {
//           id: Date.now(),
//           sender: "You",
//           type: 'requestpay',
//           amount: contact.outstandingAmount || contact.rent,
//           requestedTo: contact.name,
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           date: new Date().toLocaleDateString(),
//         };

//         setMessagesByContact(prev => ({
//           ...prev,
//           [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//         }));

//         setRequestpay(false);
//         setMessageInput('');
//       }
//     } catch (error) {
//       console.error('Error sending payment request:', error);
//       alert('Failed to send payment request');
//     }
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim() === '') return;

//     const newMessage = {
//       id: Date.now(),
//       sender: "You",
//       text: messageInput,
//       type: 'text',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toLocaleDateString(),
//     };

//     setMessagesByContact(prev => ({
//       ...prev,
//       [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//     }));

//     setMessageInput('');
//   };

//   const handlePayRefund = async () => {
//     if (!contact) return;

//     try {
//       // Navigate to refund page for this user
//       navigate(`/client/vacate-request/${contact.bookingId}`, {
//         state: {
//           user: contact,
//           booking: contact.bookingDetails
//         }
//       });
//     } catch (error) {
//       console.error('Error processing refund:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading users...</div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
//       <div className="bg-cover bg-center bg-no-repeat font-sans px-20 py-5" style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
//         {/* Top Buttons */}
//         <div className="flex gap-1 mb-4">
//           <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded">Home</button>
//           <div className='flex items-center justify-center'>/</div>
//           <button className="flex items-center px-2 py-2 rounded">Tenant List</button>
//         </div>

//         {/* Main Chat Layout */}
//         <div className="flex gap-16 h-screen">
//           {/* Contact List */}
//           <div className="w-1/4 bg-[#ffffff] border-r overflow-y-auto p-2 rounded-md shadow-md">
//             {bookingUsers.map((contact) => (
//               <div key={contact._id} onClick={() => setSelectedContactId(contact._id)} className={`p-4 cursor-pointer mb-4 rounded-md shadow-md hover:bg-[#AFD1FF] ${contact._id === selectedContactId ? 'bg-[#AFD1FF] font-semibold' : ''}`}>
//                 <div className="flex gap-2 items-center">
//                   <img src={contact.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
//                   <div className="flex flex-col text-sm w-full">
//                     <p className="font-bold mb-1">Payment From</p>
//                     <div className="flex justify-between w-full text-gray-800">
//                       <p>{contact.name}</p>
//                       <p className="text-medium text-gray-500 mt-1">₹{contact.outstandingAmount || contact.rent}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex text-gray-500 items-center gap-2 text-xs mt-1">
//                   <p>Room: {contact.roomNumber}</p>
//                   <span className="border px-1 py-[1px] rounded text-[10px] font-bold">{contact.bed}</span>
//                 </div>
//                 {contact.lastPaymentDate && (
//                   <p className="text-xs text-gray-500 mt-1">Last paid: {new Date(contact.lastPaymentDate).toLocaleDateString()}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Chat Area */}
//           {contact && (
//             <div className="flex-1 flex flex-col bg-white rounded-md shadow-md">
//               <div className="border-b bg-[#AFD1FF] p-4 font-semibold flex items-center gap-4 justify-between">
//                 <div className='flex items-center gap-2'>
//                   <img src={contact.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"} alt="profile" className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p>{contact.name}</p>
//                     <p className="text-xs text-gray-500">Room: {contact.roomNumber} {contact.bed}</p>
//                     <p className="text-xs text-gray-500">Outstanding: ₹{contact.outstandingAmount || 0}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MessageCircle className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><Phone className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MoreVertical className="w-4 h-4 text-white" /></button></div>
//                 </div>
//               </div>

//               {!requestpay && (
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                   {(messagesByContact[selectedContactId] || []).map((msg) => (
//                     <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                       <>
//                         {msg.type === 'requestpay' && (
//                           <div className='flex flex-col'>
//                             <div className="bg-[#AFD1FF] border border-blue-300 p-4 rounded-xl max-w-xs">
//                               <p className="text-sm">Request From You</p>
//                               <p className="text-2xl font-bold text-black">₹{msg.amount}/-</p>
//                               <p className="text-xs text-gray-500 mt-1">
//                                 almost {getDaysLate(contact.lastPaymentDate)} day{getDaysLate(contact.lastPaymentDate) !== 1 ? 's' : ''} are over...
//                               </p>
//                             </div>
//                             <div className='flex gap-2'>
//                               <p className="text-[11px] mt-1">On {msg.date}</p>
//                               <p className="text-[11px] mt-1">{msg.time}</p>
//                             </div>
//                           </div>
//                         )}
//                         {msg.type === 'text' && (
//                           <div className='flex flex-col'>
//                             <div className={`px-4 py-2 rounded-lg max-w-xs bg-[#AFD1FF]`}>
//                               <p className="text-sm">{msg.text}</p>
//                             </div>
//                             <div className='flex gap-2'>
//                               <p className="text-[11px] mt-1">{msg.date}</p>
//                               <p className="text-[11px] mt-1">{msg.time}</p>
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="flex-1 p-4">
//                   <div className="flex flex-col items-center justify-center h-full space-y-4">
//                     <img src={contact.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"} alt="profile" className="w-24 h-24 rounded-full object-cover mb-2" />
//                     <p className="text-center font-semibold">Requesting Rent From {contact.name}</p>
//                     <div className="border-2 px-4 rounded-lg text-center text-2xl font-semibold">₹{contact.outstandingAmount || contact.rent}</div>
//                   </div>
//                 </div>
//               )}

//               {!requestpay && (
//                 <div className="border-t p-4 flex items-end gap-4">
//                   <button onClick={() => setRequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded">Request Pay</button>
//                   <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded">Process Refund</button>
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="border-t p-4 flex gap-2">
//                   <input type="text" placeholder="Add a message (optional)..." className="flex-1 border p-2 rounded" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
//                   <button onClick={handleSendPaymentRequest} className="bg-blue-600 text-white px-4 rounded">Send Request</button>
//                   <button onClick={() => setRequestpay(false)} className="bg-gray-500 text-white px-4 rounded">Cancel</button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';
// import { bookingAPI, paymentAPI } from '../PropertyController';

// const getDaysLate = (dopString) => {
//   if (!dopString) return 0;
//   const [day, month, year] = dopString.split('/').map(Number);
//   const dopDate = new Date(year, month - 1, day);
//   const today = new Date();

//   const diffTime = today - dopDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays > 0 ? diffDays : 0;
// };

// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedContactId, setSelectedContactId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [messagesByContact, setMessagesByContact] = useState({});
//   const [requestpay, setRequestpay] = useState(false);
//   const [bookingUsers, setBookingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBookingUsers();
//   }, []);

//   const fetchBookingUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Get property ID from your state or context
//       const propertyId = localStorage.getItem('currentPropertyId') || 'default-property-id';
      
//       const response = await bookingAPI.getAllBookings();
      
//       if (response.data?.success) {
//         // The response structure might be different - adjust based on actual API response
//         const users = response.data.bookings || response.data.data || response.data.users || [];
        
//         // Transform the bookings data into the format needed for the UI
//         const transformedUsers = users.map(booking => ({
//           _id: booking.userId?._id || booking._id,
//           name: booking.userId?.name || booking.customerDetails?.name || 'Unknown User',
//           email: booking.userId?.email || booking.customerDetails?.email || '',
//           phone: booking.userId?.phone || booking.customerDetails?.mobile || '',
//           profileImage: booking.userId?.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
//           roomNumber: booking.roomDetails?.[0]?.roomNumber || 'N/A',
//           bed: booking.roomDetails?.[0]?.bed || 'N/A',
//           rent: booking.pricing?.monthlyRent || 0,
//           outstandingAmount: booking.outstandingAmount || 0,
//           lastPaymentDate: booking.payments?.find(p => p.status === 'completed')?.date,
//           bookingId: booking._id
//         }));
        
//         setBookingUsers(transformedUsers);
//         if (transformedUsers.length > 0) {
//           setSelectedContactId(transformedUsers[0]._id);
//         }
//       } else {
//         setError('Failed to fetch booking users');
//       }
//     } catch (error) {
//       console.error('Error fetching booking users:', error);
//       setError(error.response?.data?.message || 'Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contact = bookingUsers.find(c => c._id === selectedContactId);

//   const handleSendPaymentRequest = async () => {
//     if (!contact) return;

//     try {
//       const response = await paymentAPI.sendPaymentRequest({
//         userId: contact._id,
//         amount: contact.outstandingAmount || contact.rent,
//         description: 'Rent payment request',
//         dueDate: new Date().toISOString(),
//         bookingId: contact.bookingId
//       });

//       if (response.data.success) {
//         const newMessage = {
//           id: Date.now(),
//           sender: "You",
//           type: 'requestpay',
//           amount: contact.outstandingAmount || contact.rent,
//           requestedTo: contact.name,
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           date: new Date().toLocaleDateString(),
//         };

//         setMessagesByContact(prev => ({
//           ...prev,
//           [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//         }));

//         setRequestpay(false);
//         setMessageInput('');
        
//         alert('Payment request sent successfully!');
//       }
//     } catch (error) {
//       console.error('Error sending payment request:', error);
//       alert('Failed to send payment request: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim() === '') return;

//     const newMessage = {
//       id: Date.now(),
//       sender: "You",
//       text: messageInput,
//       type: 'text',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toLocaleDateString(),
//     };

//     setMessagesByContact(prev => ({
//       ...prev,
//       [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//     }));

//     setMessageInput('');
//   };

//   const handlePayRefund = async () => {
//     if (!contact) return;

//     try {
//       // Navigate to refund page for this user
//       navigate(`/client/vacate-request/${contact.bookingId}`, {
//         state: {
//           user: contact,
//           booking: contact
//         }
//       });
//     } catch (error) {
//       console.error('Error processing refund:', error);
//       alert('Error navigating to refund page: ' + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading users...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center justify-center">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={fetchBookingUsers}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
//       <div className="bg-cover bg-center bg-no-repeat font-sans px-20 py-5" style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
//         {/* Top Buttons */}
//         <div className="flex gap-1 mb-4">
//           <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded">Home</button>
//           <div className='flex items-center justify-center'>/</div>
//           <button className="flex items-center px-2 py-2 rounded">Tenant List</button>
//         </div>

//         {/* Main Chat Layout */}
//         <div className="flex gap-16 h-screen">
//           {/* Contact List */}
//           <div className="w-1/4 bg-[#ffffff] border-r overflow-y-auto p-2 rounded-md shadow-md">
//             {bookingUsers.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 No tenants found
//               </div>
//             ) : (
//               bookingUsers.map((contact) => (
//                 <div key={contact._id} onClick={() => setSelectedContactId(contact._id)} className={`p-4 cursor-pointer mb-4 rounded-md shadow-md hover:bg-[#AFD1FF] ${contact._id === selectedContactId ? 'bg-[#AFD1FF] font-semibold' : ''}`}>
//                   <div className="flex gap-2 items-center">
//                     <img src={contact.profileImage} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
//                     <div className="flex flex-col text-sm w-full">
//                       <p className="font-bold mb-1">Payment From</p>
//                       <div className="flex justify-between w-full text-gray-800">
//                         <p>{contact.name}</p>
//                         <p className="text-medium text-gray-500 mt-1">₹{contact.outstandingAmount || contact.rent}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex text-gray-500 items-center gap-2 text-xs mt-1">
//                     <p>Room: {contact.roomNumber}</p>
//                     <span className="border px-1 py-[1px] rounded text-[10px] font-bold">{contact.bed}</span>
//                   </div>
//                   {contact.lastPaymentDate && (
//                     <p className="text-xs text-gray-500 mt-1">Last paid: {new Date(contact.lastPaymentDate).toLocaleDateString()}</p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Chat Area */}
//           {contact ? (
//             <div className="flex-1 flex flex-col bg-white rounded-md shadow-md">
//               <div className="border-b bg-[#AFD1FF] p-4 font-semibold flex items-center gap-4 justify-between">
//                 <div className='flex items-center gap-2'>
//                   <img src={contact.profileImage} alt="profile" className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p>{contact.name}</p>
//                     <p className="text-xs text-gray-500">Room: {contact.roomNumber} {contact.bed}</p>
//                     <p className="text-xs text-gray-500">Outstanding: ₹{contact.outstandingAmount || 0}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MessageCircle className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><Phone className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MoreVertical className="w-4 h-4 text-white" /></button></div>
//                 </div>
//               </div>

//               {!requestpay && (
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                   {(messagesByContact[selectedContactId] || []).map((msg) => (
//                     <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                       <>
//                         {msg.type === 'requestpay' && (
//                           <div className='flex flex-col'>
//                             <div className="bg-[#AFD1FF] border border-blue-300 p-4 rounded-xl max-w-xs">
//                               <p className="text-sm">Request From You</p>
//                               <p className="text-2xl font-bold text-black">₹{msg.amount}/-</p>
//                               <p className="text-xs text-gray-500 mt-1">
//                                 almost {getDaysLate(contact.lastPaymentDate)} day{getDaysLate(contact.lastPaymentDate) !== 1 ? 's' : ''} are over...
//                               </p>
//                             </div>
//                             <div className='flex gap-2'>
//                               <p className="text-[11px] mt-1">On {msg.date}</p>
//                               <p className="text-[11px] mt-1">{msg.time}</p>
//                             </div>
//                           </div>
//                         )}
//                         {msg.type === 'text' && (
//                           <div className='flex flex-col'>
//                             <div className={`px-4 py-2 rounded-lg max-w-xs bg-[#AFD1FF]`}>
//                               <p className="text-sm">{msg.text}</p>
//                             </div>
//                             <div className='flex gap-2'>
//                               <p className="text-[11px] mt-1">{msg.date}</p>
//                               <p className="text-[11px] mt-1">{msg.time}</p>
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="flex-1 p-4">
//                   <div className="flex flex-col items-center justify-center h-full space-y-4">
//                     <img src={contact.profileImage} alt="profile" className="w-24 h-24 rounded-full object-cover mb-2" />
//                     <p className="text-center font-semibold">Requesting Rent From {contact.name}</p>
//                     <div className="border-2 px-4 rounded-lg text-center text-2xl font-semibold">₹{contact.outstandingAmount || contact.rent}</div>
//                   </div>
//                 </div>
//               )}

//               {!requestpay && (
//                 <div className="border-t p-4 flex items-end gap-4">
//                   <button onClick={() => setRequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded">Request Pay</button>
//                   <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded">Process Refund</button>
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="border-t p-4 flex gap-2">
//                   <input type="text" placeholder="Add a message (optional)..." className="flex-1 border p-2 rounded" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
//                   <button onClick={handleSendPaymentRequest} className="bg-blue-600 text-white px-4 rounded">Send Request</button>
//                   <button onClick={() => setRequestpay(false)} className="bg-gray-500 text-white px-4 rounded">Cancel</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-white rounded-md shadow-md">
//               <div className="text-gray-500 text-center">
//                 {bookingUsers.length === 0 ? 'No tenants available' : 'Select a tenant to start chatting'}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';
// import { bookingAPI, paymentAPI } from '../PropertyController';

// const getDaysLate = (dopString) => {
//   if (!dopString) return 0;
//   const [day, month, year] = dopString.split('/').map(Number);
//   const dopDate = new Date(year, month - 1, day);
//   const today = new Date();

//   const diffTime = today - dopDate;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays > 0 ? diffDays : 0;
// };

// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedContactId, setSelectedContactId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [messagesByContact, setMessagesByContact] = useState({});
//   const [requestpay, setRequestpay] = useState(false);
//   const [bookingUsers, setBookingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBookingUsers();
//   }, []);

//   const fetchBookingUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Get property ID from your state or context
//       const propertyId = localStorage.getItem('currentPropertyId') || 'default-property-id';
      
//       const response = await bookingAPI.getAllBookings();
      
//       if (response.data?.success) {
//         // The response structure might be different - adjust based on actual API response
//         const users = response.data.bookings || response.data.data || response.data.users || [];
        
//         // Transform the bookings data into the format needed for the UI
//         const transformedUsers = users.map(booking => ({
//           _id: booking.userId?._id || booking._id,
//           name: booking.userId?.name || booking.customerDetails?.name || 'Unknown User',
//           email: booking.userId?.email || booking.customerDetails?.email || '',
//           phone: booking.userId?.phone || booking.customerDetails?.mobile || '',
//           profileImage: booking.userId?.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
//           roomNumber: booking.roomDetails?.[0]?.roomNumber || 'N/A',
//           bed: booking.roomDetails?.[0]?.bed || 'N/A',
//           rent: booking.pricing?.monthlyRent || 0,
//           outstandingAmount: booking.outstandingAmount || 0,
//           lastPaymentDate: booking.payments?.find(p => p.status === 'completed')?.date,
//           bookingId: booking._id
//         }));
        
//         setBookingUsers(transformedUsers);
//         if (transformedUsers.length > 0) {
//           setSelectedContactId(transformedUsers[0]._id);
//         }
//       } else {
//         setError('Failed to fetch booking users');
//       }
//     } catch (error) {
//       console.error('Error fetching booking users:', error);
//       setError(error.response?.data?.message || 'Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contact = bookingUsers.find(c => c._id === selectedContactId);

//   const handleSendPaymentRequest = async () => {
//     if (!contact) return;

//     try {
//       const response = await paymentAPI.sendPaymentRequest({
//         userId: contact._id,
//         amount: contact.outstandingAmount || contact.rent,
//         description: 'Rent payment request',
//         dueDate: new Date().toISOString(),
//         bookingId: contact.bookingId
//       });

//       if (response.data.success) {
//         const newMessage = {
//           id: Date.now(),
//           sender: "You",
//           type: 'requestpay',
//           amount: contact.outstandingAmount || contact.rent,
//           requestedTo: contact.name,
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           date: new Date().toLocaleDateString(),
//         };

//         setMessagesByContact(prev => ({
//           ...prev,
//           [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//         }));

//         setRequestpay(false);
//         setMessageInput('');
        
//         alert('Payment request sent successfully!');
//       }
//     } catch (error) {
//       console.error('Error sending payment request:', error);
//       alert('Failed to send payment request: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleSendMessage = () => {
//     if (messageInput.trim() === '') return;

//     const newMessage = {
//       id: Date.now(),
//       sender: "You",
//       text: messageInput,
//       type: 'text',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toLocaleDateString(),
//     };

//     setMessagesByContact(prev => ({
//       ...prev,
//       [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
//     }));

//     setMessageInput('');
//   };

//   const handlePayRefund = async () => {
//     if (!contact) return;

//     try {
//       // Navigate to refund page for this user
//       navigate(`/client/vacate-request/${contact.bookingId}`, {
//         state: {
//           user: contact,
//           booking: contact
//         }
//       });
//     } catch (error) {
//       console.error('Error processing refund:', error);
//       alert('Error navigating to refund page: ' + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading users...</div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center justify-center">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button 
//             onClick={fetchBookingUsers}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <ClientNav />
//       <div className="bg-cover bg-center bg-no-repeat font-sans px-20 py-5" style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
//         {/* Top Buttons */}
//         <div className="flex gap-1 mb-4">
//           <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded">Home</button>
//           <div className='flex items-center justify-center'>/</div>
//           <button className="flex items-center px-2 py-2 rounded">Tenant List</button>
//         </div>

//         {/* Main Chat Layout */}
//         <div className="flex gap-16 h-screen">
//           {/* Contact List */}
//           <div className="w-1/4 bg-[#ffffff] border-r overflow-y-auto p-2 rounded-md shadow-md">
//             {bookingUsers.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 No tenants found
//               </div>
//             ) : (
//               bookingUsers.map((contact) => (
//                 <div key={contact._id} onClick={() => setSelectedContactId(contact._id)} className={`p-4 cursor-pointer mb-4 rounded-md shadow-md hover:bg-[#AFD1FF] ${contact._id === selectedContactId ? 'bg-[#AFD1FF] font-semibold' : ''}`}>
//                   <div className="flex gap-2 items-center">
//                     <img src={contact.profileImage} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
//                     <div className="flex flex-col text-sm w-full">
//                       <p className="font-bold mb-1">Payment From</p>
//                       <div className="flex justify-between w-full text-gray-800">
//                         <p>{contact.user?.name}</p>
//                         <p className="text-medium text-gray-500 mt-1">₹{contact.outstandingAmount || contact.rent}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex text-gray-500 items-center gap-2 text-xs mt-1">
//                     <p>Room: {contact.roomNumber}</p>
//                     <span className="border px-1 py-[1px] rounded text-[10px] font-bold">{contact.bed}</span>
//                   </div>
//                   {contact.lastPaymentDate && (
//                     <p className="text-xs text-gray-500 mt-1">Last paid: {new Date(contact.lastPaymentDate).toLocaleDateString()}</p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Chat Area */}
//           {contact ? (
//             <div className="flex-1 flex flex-col bg-white rounded-md shadow-md">
//               <div className="border-b bg-[#AFD1FF] p-4 font-semibold flex items-center gap-4 justify-between">
//                 <div className='flex items-center gap-2'>
//                   <img src={contact.profileImage} alt="profile" className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p>{contact.name}</p>
//                     <p className="text-xs text-gray-500">Room: {contact.roomNumber} {contact.bed}</p>
//                     <p className="text-xs text-gray-500">Outstanding: ₹{contact.outstandingAmount || 0}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MessageCircle className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><Phone className="w-4 h-4 text-white" /></button></div>
//                   <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MoreVertical className="w-4 h-4 text-white" /></button></div>
//                 </div>
//               </div>

//               {!requestpay && (
//                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                   {(messagesByContact[selectedContactId] || []).map((msg) => (
//                     <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                       {msg.type === 'requestpay' && (
//                         <div className='flex flex-col'>
//                           <div className="bg-[#AFD1FF] border border-blue-300 p-4 rounded-xl max-w-xs">
//                             <p className="text-sm">Request From You</p>
//                             <p className="text-2xl font-bold text-black">₹{msg.amount}/-</p>
//                             <p className="text-xs text-gray-500 mt-1">
//                               almost {getDaysLate(contact.lastPaymentDate)} day{getDaysLate(contact.lastPaymentDate) !== 1 ? 's' : ''} are over...
//                             </p>
//                           </div>
//                           <div className='flex gap-2'>
//                             <p className="text-[11px] mt-1">On {msg.date}</p>
//                             <p className="text-[11px] mt-1">{msg.time}</p>
//                           </div>
//                         </div>
//                       )}
//                       {msg.type === 'text' && (
//                         <div className='flex flex-col'>
//                           <div className={`px-4 py-2 rounded-lg max-w-xs bg-[#AFD1FF]`}>
//                             <p className="text-sm">{msg.text}</p>
//                           </div>
//                           <div className='flex gap-2'>
//                             <p className="text-[11px] mt-1">{msg.date}</p>
//                             <p className="text-[11px] mt-1">{msg.time}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="flex-1 p-4">
//                   <div className="flex flex-col items-center justify-center h-full space-y-4">
//                     <img src={contact.profileImage} alt="profile" className="w-24 h-24 rounded-full object-cover mb-2" />
//                     <p className="text-center font-semibold">Requesting Rent From {contact.name}</p>
//                     <div className="border-2 px-4 rounded-lg text-center text-2xl font-semibold">₹{contact.outstandingAmount || contact.rent}</div>
//                   </div>
//                 </div>
//               )}

//               {!requestpay && (
//                 <div className="border-t p-4 flex items-end gap-4">
//                   <button onClick={() => setRequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded">Request Pay</button>
//                   <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded">Process Refund</button>
//                 </div>
//               )}

//               {requestpay && (
//                 <div className="border-t p-4 flex gap-2">
//                   <input type="text" placeholder="Add a message (optional)..." className="flex-1 border p-2 rounded" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
//                   <button onClick={handleSendPaymentRequest} className="bg-blue-600 text-white px-4 rounded">Send Request</button>
//                   <button onClick={() => setRequestpay(false)} className="bg-gray-500 text-white px-4 rounded">Cancel</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-white rounded-md shadow-md">
//               <div className="text-gray-500 text-center">
//                 {bookingUsers.length === 0 ? 'No tenants available' : 'Select a tenant to start chatting'}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
// import ClientNav from '../Client-Navbar/ClientNav';
// import { bookingAPI } from '../PropertyController';
// import axios from 'axios';
 
// const getDaysLate = (dateString) => {
//   if (!dateString) return 0;
//   const date = new Date(dateString);
//   const today = new Date();
//   const diffTime = today - date;
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays > 0 ? diffDays : 0;
// };
 
// export default function PaymentChat() {
//   const navigate = useNavigate();
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [messagesByBooking, setMessagesByBooking] = useState({});
//   const [requestpay, setRequestpay] = useState(false);
//   const [bookingUsers, setBookingUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     fetchBookingUsers();
//   }, []);
 
//   const fetchBookingUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem("token");
//       const response = await bookingAPI.getAllBookings({
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data?.success) {
//         const bookings = response.data.bookings || [];
//         const transformedUsers = bookings.map((booking) => ({
//           _id: booking.user?.clientId || booking._id,
//           name: booking.property?.name || "Unknown Property",
//           email: booking.user?.email || "",
//           phone: booking.user?.phone || "",
//           profileImage:
//             "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
//           roomNumber: booking.roomNumber || "N/A",
//           bed: booking.bed || "N/A",
//           rent: booking.pricing?.monthlyRent || 0,
//           outstandingAmount: booking.outstandingAmount || 0,
//           lastPaymentDate: booking.moveInDate,
//           bookingId: booking.id,
//         }));
//         setBookingUsers(transformedUsers);
//         if (transformedUsers.length > 0) {
//           setSelectedBookingId(transformedUsers[0].bookingId);
//         }
//       } else {
//         setError("Failed to fetch bookings.");
//       }
//     } catch (error) {
//       console.error(" Error fetching bookings:", error);
//       setError(error.response?.data?.message || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const selectedBooking = bookingUsers.find(
//     (b) => b.bookingId === selectedBookingId
//   );
 
//   // ✅ Send payment request message
//   const handleSendPaymentRequest = async () => {
//     if (!selectedBooking) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/payments/send-message",
//         {
//           bookingId: selectedBooking.bookingId,
//           userId: selectedBooking._id,
//           message: `Payment request for ₹${
//             selectedBooking.outstandingAmount || selectedBooking.rent
//           }`,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
 
//       const newMessage = {
//         id: Date.now(),
//         sender: "You",
//         type: "requestpay",
//         amount: selectedBooking.outstandingAmount || selectedBooking.rent,
//         requestedTo: selectedBooking.name,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         date: new Date().toLocaleDateString(),
//       };
 
//       setMessagesByBooking((prev) => ({
//         ...prev,
//         [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
//       }));
//       setRequestpay(false);
//       setMessageInput("");
//       alert("Payment request sent successfully!");
//     } catch (error) {
//       console.error("❌ Error sending payment request:", error);
//       alert("Failed to send payment request: " + (error.response?.data?.message || error.message));
//     }
//   };
 
//   // ✅ Send  text message
//   const handleSendMessage = async () => {
//     if (messageInput.trim() === "" || !selectedBookingId) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/payments/send-message",
//         {
//           bookingId: selectedBooking.bookingId,
//           userId: selectedBooking._id,
//           message: messageInput,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
 
//       const newMessage = {
//         id: Date.now(),
//         sender: "You",
//         text: messageInput,
//         type: "text",
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         date: new Date().toLocaleDateString(),
//       };
//       setMessagesByBooking((prev) => ({
//         ...prev,
//         [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
//       }));
//       setMessageInput("");
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//       alert("Failed to send message: " + (error.response?.data?.message || error.message));
//     }
//   };
 
//   const handlePayRefund = () => {
//     if (!selectedBooking) return;
//     navigate(`/client/vacate-request/${selectedBooking.bookingId}`, {
//       state: { user: selectedBooking, booking: selectedBooking },
//     });
//   };
 
//   const getValidMessages = () => {
//     const messages = messagesByBooking[selectedBookingId] || [];
//     return messages.filter((msg) => msg.type === "requestpay" || msg.type === "text");
//   };
 
//   if (loading) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
//           <div className="text-gray-600">Loading users...</div>
//         </div>
//       </>
//     );
//   }
 
//   if (error) {
//     return (
//       <>
//         <ClientNav />
//         <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center justify-center">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//           <button
//             onClick={fetchBookingUsers}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Retry
//           </button>
//         </div>
//       </>
//     );
//   }
 
//   return (
//     <>
//       <ClientNav />
//       <div className="bg-cover bg-center bg-no-repeat font-sans px-4 sm:px-8 md:px-12 lg:px-20 py-5 min-h-screen"
//         style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
       
//         <div className="flex flex-wrap gap-1 mb-4 text-sm sm:text-base">
//           <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded">Home</button>
//           <div className="flex items-center justify-center">/</div>
//           <button className="flex items-center px-2 py-2 rounded">Tenant List</button>
//         </div>
 
//         {/* Main */}
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto">
//           {/* Sidebar */}
//           <div className="w-full lg:w-1/4 bg-white border rounded-md shadow-md p-3 overflow-y-auto max-h-[400px] lg:max-h-[80vh]">
//             {bookingUsers.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">No tenants found</div>
//             ) : (
//               bookingUsers.map((booking) => (
//                 <div
//                   key={booking.bookingId}
//                   onClick={() => setSelectedBookingId(booking.bookingId)}
//                   className={`p-4 cursor-pointer mb-3 rounded-md shadow-md hover:bg-[#AFD1FF] transition ${
//                     booking.bookingId === selectedBookingId ? "bg-[#AFD1FF] font-semibold" : ""
//                   }`}
//                 >
//                   <div className="flex gap-2 items-center">
//                     <img
//                       src={booking.profileImage}
//                       alt={booking.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div className="flex flex-col text-sm w-full">
//                       <p className="font-bold mb-1">Payment From</p>
//                       <div className="flex justify-between w-full text-gray-800">
//                         <p>{booking.name}</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                           ₹{booking.outstandingAmount || booking.rent}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
 
//           {/* Chat Section */}
//           {selectedBooking ? (
//             <div className="flex-1 flex flex-col bg-white rounded-md shadow-md h-auto">
//               <div className="border-b bg-[#AFD1FF] p-3 sm:p-4 font-semibold flex items-center justify-between flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <img src={selectedBooking.profileImage} alt="profile"
//                     className="w-10 h-10 rounded-full object-cover" />
//                   <div>
//                     <p className="text-sm sm:text-base">{selectedBooking.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Room: {selectedBooking.roomNumber} {selectedBooking.bed}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Outstanding: ₹{selectedBooking.outstandingAmount || 0}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
//                   {[MessageCircle, Phone, MoreVertical].map((Icon, i) => (
//                     <div key={i} className="w-8 h-8 bg-[#0827B2] flex justify-center items-center rounded-full">
//                       <Icon className="w-4 h-4 text-white" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
 
//               {/* Chat Messages */}
//               <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
//                 {getValidMessages().map((msg) => (
//                   <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                     <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
//                       {msg.type === "requestpay" ? (
//                         <div className="bg-[#AFD1FF] border border-blue-300 p-3 sm:p-4 rounded-xl">
//                           <p className="text-sm">Request From You</p>
//                           <p className="text-xl sm:text-2xl font-bold text-black">₹{msg.amount}/-</p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             almost {getDaysLate(selectedBooking.lastPaymentDate)} day
//                             {getDaysLate(selectedBooking.lastPaymentDate) !== 1 ? "s" : ""} are over...
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="px-4 py-2 rounded-lg bg-[#AFD1FF]">
//                           <p className="text-sm">{msg.text}</p>
//                         </div>
//                       )}
//                       <div className="flex gap-2 text-[11px] mt-1">
//                         <p>{msg.date}</p>
//                         <p>{msg.time}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
 
//               {/* Input Controls */}
//               {!requestpay ? (
//                 <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
//                   <button onClick={() => setRequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded text-sm sm:text-base">Request Pay</button>
//                   <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded text-sm sm:text-base">Process Refund</button>
//                 </div>
//               ) : (
//                 <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-2">
//                   <input
//                     type="text"
//                     placeholder="Add a message (optional)..."
//                     className="flex-1 border p-2 rounded text-sm"
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                   />
//                   <button onClick={handleSendPaymentRequest} className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm">
//                     Send Request
//                   </button>
//                   <button onClick={handleSendMessage} className="bg-[#fad914] text-white px-3 sm:px-4 py-2 rounded text-sm">
//                     Send Message
//                   </button>
//                   <button onClick={() => setRequestpay(false)} className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded text-sm">
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-white rounded-md shadow-md p-5">
//               <div className="text-gray-500 text-center">
//                 {bookingUsers.length === 0 ? "No tenants available" : "Select a tenant to start chatting"}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Phone, MoreVertical } from 'lucide-react';
import ClientNav from '../Client-Navbar/ClientNav';
import { bookingAPI } from '../PropertyController';
import axios from 'axios';

const getDaysLate = (dateString) => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export default function PaymentChat() {
  const navigate = useNavigate();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messagesByBooking, setMessagesByBooking] = useState({});
  const [requestpay, setRequestpay] = useState(false);
  const [bookingUsers, setBookingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchBookingUsers();
  }, []);

  // Add useEffect to fetch booking by ID when selectedBookingId changes
  useEffect(() => {
    if (selectedBookingId) {
      fetchBookingById(selectedBookingId);
    }
  }, [selectedBookingId]);

  // Function to fetch booking by ID and extract payment requests
  const fetchBookingById = async (bookingId) => {
    try {
      console.log(`Fetching booking details for ID: ${bookingId}`);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Using the bookingAPI method to get booking by ID
      const response = await bookingAPI.getBookingById(bookingId);
      
      if (response.data?.success) {
        console.log('✅ Booking details fetched successfully:', response.data);
        const booking = response.data.booking;
        
        // Store booking details
        setBookingDetails(prev => ({
          ...prev,
          [bookingId]: booking
        }));

        // Extract payment requests and convert to chat messages
        if (booking.paymentrequest && booking.paymentrequest.length > 0) {
          const paymentRequests = booking.paymentrequest.map(payment => ({
            id: payment._id,
            sender: "You",
            type: "requestpay",
            amount: payment.amount,
            requestedTo: booking.user?.name || "Tenant",
            note: payment.message,
            time: new Date(payment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: new Date(payment.date).toLocaleDateString(),
            status: payment.status,
            originalData: payment
          }));

          console.log('📋 Converted payment requests:', paymentRequests);

          // Update messages state
          setMessagesByBooking(prev => ({
            ...prev,
            [bookingId]: paymentRequests
          }));
        } else {
          // No payment requests found
          setMessagesByBooking(prev => ({
            ...prev,
            [bookingId]: []
          }));
        }
        
      } else {
        console.error('❌ Failed to fetch booking details:', response.data?.message);
      }
    } catch (error) {
      console.error('❌ Error fetching booking by ID:', error);
      console.error('Error details:', error.response?.data || error.message);
    }
  };

  const fetchBookingUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await bookingAPI.getAllBookings({
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data?.success) {
        const bookings = response.data.bookings || [];
        const transformedUsers = bookings.map((booking) => ({
          _id: booking.user?.clientId || booking._id,
          name: booking.user?.name || booking.property?.name || "Unknown Property",
          email: booking.user?.email || "",
          phone: booking.user?.phone || "",
          profileImage: booking.user?.profileImage || "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
          roomNumber: booking.roomNumber || "N/A",
          bed: booking.bed || "N/A",
          rent: booking.pricing?.monthlyRent || 0,
          outstandingAmount: booking.outstandingAmount || 0,
          lastPaymentDate: booking.lastPaymentDate || booking.moveInDate,
          bookingId: booking._id || booking.id,
          userId: booking.user?._id, // User ID for notifications
          propertyName: booking.property?.name || "Property",
        }));
        
        setBookingUsers(transformedUsers);
        if (transformedUsers.length > 0 && !selectedBookingId) {
          setSelectedBookingId(transformedUsers[0].bookingId);
        }
      } else {
        setError("Failed to fetch bookings: " + (response.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to load users. Please check your connection.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedBooking = bookingUsers.find(
    (b) => b.bookingId === selectedBookingId
  );

  // Get complete booking details for the selected booking
  const getCompleteBookingDetails = () => {
    if (!selectedBookingId) return null;
    return bookingDetails[selectedBookingId];
  };

  // ✅ Create notification for user when payment request is sent
  const createUserNotification = async (bookingData, amount, message) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token found for notification");
        return false;
      }

      // Get the complete booking details to ensure we have the user ID
      const completeBooking = getCompleteBookingDetails();
      if (!completeBooking || !completeBooking.user?._id) {
        console.warn('⚠️ No user ID found for tenant notification in complete booking data');
        console.log('Complete booking data:', completeBooking);
        return false;
      }

      const notificationData = {
        userId: completeBooking.user._id, // Use the user ID from complete booking data
        type: 'payment_request',
        title: 'Payment Request Received 💰',
        message: `You have a payment request of ₹${amount} for ${bookingData.propertyName}. ${message ? `Note: ${message}` : ''}`,
        priority: 'high',
        metadata: {
          amount: amount,
          bookingId: bookingData.bookingId,
          propertyName: bookingData.propertyName,
          paymentType: 'payment_request',
          timestamp: new Date().toISOString(),
          clientNote: message || '',
          requestedBy: 'Client'
        },
        isRead: false
      };

      console.log('📧 Creating user notification:', notificationData);

      // Try the main POST endpoint first
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/notifications`,
          notificationData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data?.success) {
          console.log('✅ User notification created successfully via main endpoint');
          return true;
        }
      } catch (mainError) {
        console.log('⚠️ Main endpoint failed, trying test endpoint...');
        
        // Fallback to test endpoint
        const testResponse = await axios.post(
          `${API_BASE_URL}/api/notifications/test/user`,
          notificationData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (testResponse.data?.success) {
          console.log('✅ User notification created successfully via test endpoint');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error creating user notification:', error);
      return false;
    }
  };

  // ✅ Send payment request and create user notification
  const handleSendPaymentRequest = async () => {
    if (!selectedBooking) {
      alert("No tenant selected");
      return;
    }

    if (sending) return;

    const amount = selectedBooking.outstandingAmount || selectedBooking.rent;
    if (!amount || amount <= 0) {
      alert("Invalid amount to request");
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const payload = {
        bookingId: selectedBooking.bookingId,
        userId: selectedBooking._id,
        message: messageInput.trim() || `Payment request for ₹${amount}`,
        amount: amount
      };

      console.log('Sending payment request with payload:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/payments/request`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Payment request response:', response.data);

      if (response.data?.success) {
        // Add to local state
        const newMessage = {
          id: response.data.paymentRequest?._id || Date.now(),
          sender: "You",
          type: "requestpay",
          amount: amount,
          requestedTo: selectedBooking.name,
          note: messageInput.trim() || `Payment request for ₹${amount}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date().toLocaleDateString(),
          status: 'pending'
        };

        setMessagesByBooking((prev) => ({
          ...prev,
          [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
        }));
        
        // ✅ CREATE NOTIFICATION FOR USER
        console.log('💰 Payment request successful, creating user notification...');
        
        // Create notification for the user (tenant)
        const notificationSent = await createUserNotification(selectedBooking, amount, messageInput.trim());
        
        setRequestpay(false);
        setMessageInput("");
        setSending(false);
        
        if (notificationSent) {
          alert("Payment request sent successfully! Notification has been sent to the tenant.");
        } else {
          alert("Payment request sent successfully! (Notification failed to send)");
        }
        
        // Refresh the booking data to get the updated payment requests from server
        fetchBookingById(selectedBookingId);
      } else {
        throw new Error(response.data?.message || 'Failed to send payment request');
      }
      
    } catch (error) {
      setSending(false);
      console.error("❌ Error sending payment request:", error);
      
      let errorMessage = "Failed to send payment request";
      
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        
        if (error.response.status === 404) {
          errorMessage = "Payment request endpoint not found. Please check the server route.";
        } else if (error.response.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || "Invalid request data";
        } else if (error.response.status === 500) {
          errorMessage = error.response.data?.message || "Server error. Please try again later.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        console.error('No response received');
        errorMessage = "No response from server. Please check if the server is running.";
      } else {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  // Alternative endpoint attempt if the main one fails
  const handleSendPaymentRequestAlternative = async () => {
    if (!selectedBooking) {
      alert("No tenant selected");
      return;
    }

    if (sending) return;

    const amount = selectedBooking.outstandingAmount || selectedBooking.rent;
    if (!amount || amount <= 0) {
      alert("Invalid amount to request");
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const payload = {
        bookingId: selectedBooking.bookingId,
        amount: amount,
        message: messageInput.trim() || `Payment request for ₹${amount}`
      };

      console.log('Trying alternative endpoint with payload:', payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/payments/send-payment-request`,
        payload,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      console.log('Alternative payment request response:', response.data);

      if (response.data?.success) {
        // Add to local state
        const newMessage = {
          id: response.data.paymentRequest?._id || Date.now(),
          sender: "You",
          type: "requestpay",
          amount: amount,
          requestedTo: selectedBooking.name,
          note: messageInput.trim() || `Payment request for ₹${amount}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: new Date().toLocaleDateString(),
          status: 'pending'
        };

        setMessagesByBooking((prev) => ({
          ...prev,
          [selectedBookingId]: [...(prev[selectedBookingId] || []), newMessage],
        }));
        
        // ✅ CREATE NOTIFICATION FOR USER
        console.log('💰 Alternative payment request successful, creating user notification...');
        
        // Create notification for the user (tenant)
        const notificationSent = await createUserNotification(selectedBooking, amount, messageInput.trim());
        
        setRequestpay(false);
        setMessageInput("");
        setSending(false);
        
        if (notificationSent) {
          alert("Payment request sent successfully! Notification has been sent to the tenant.");
        } else {
          alert("Payment request sent successfully! (Notification failed to send)");
        }
        
        // Refresh the booking data to get the updated payment requests from server
        fetchBookingById(selectedBookingId);
      } else {
        throw new Error(response.data?.message || 'Failed to send payment request');
      }
      
    } catch (error) {
      setSending(false);
      console.error("❌ Error sending payment request via alternative endpoint:", error);
      alert("Failed to send payment request. Please try again or contact support.");
    }
  };

  const handlePayRefund = () => {
    if (!selectedBooking) {
      alert("Please select a tenant first");
      return;
    }
    navigate(`/client/vacate-request/${selectedBooking.bookingId}`, {
      state: { user: selectedBooking, booking: selectedBooking },
    });
  };

  const getValidMessages = () => {
    const messages = messagesByBooking[selectedBookingId] || [];
    return messages.filter((msg) => msg.type === "requestpay");
  };

  if (loading) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex justify-center items-center">
          <div className="text-gray-600">Loading users...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientNav />
        <div className="p-6 bg-[#F8F8FF] min-h-screen flex flex-col items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
            <strong>Error:</strong> {error}
          </div>
          <button
            onClick={fetchBookingUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientNav />
      <div className="bg-cover bg-center bg-no-repeat font-sans px-4 sm:px-8 md:px-12 lg:px-20 py-5 min-h-screen"
        style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
       
        <div className="flex flex-wrap gap-1 mb-4 text-sm sm:text-base">
          <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded hover:bg-gray-100 transition">Home</button>
          <div className="flex items-center justify-center">/</div>
          <button className="flex items-center px-2 py-2 rounded hover:bg-gray-100 transition">Tenant List</button>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-auto">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-white border rounded-md shadow-md p-3 overflow-y-auto max-h-[400px] lg:max-h-[80vh]">
            {bookingUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No tenants found</div>
            ) : (
              bookingUsers.map((booking) => (
                <div
                  key={booking.bookingId}
                  onClick={() => setSelectedBookingId(booking.bookingId)}
                  className={`p-4 cursor-pointer mb-3 rounded-md shadow-md hover:bg-[#AFD1FF] transition ${
                    booking.bookingId === selectedBookingId ? "bg-[#AFD1FF] font-semibold" : "bg-white"
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={booking.profileImage}
                      alt={booking.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-sm w-full">
                      <p className="font-bold mb-1">Payment From</p>
                      <div className="flex justify-between w-full text-gray-800">
                        <p className="truncate">{booking.name}</p>
                        <p className="text-sm text-gray-500 whitespace-nowrap ml-2">
                          ₹{booking.outstandingAmount || booking.rent}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Room {booking.roomNumber} • {getDaysLate(booking.lastPaymentDate)} days late
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Section */}
          {selectedBooking ? (
            <div className="flex-1 flex flex-col bg-white rounded-md shadow-md h-auto min-h-[500px]">
              <div className="border-b bg-[#AFD1FF] p-3 sm:p-4 font-semibold flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-2">
                  <img src={selectedBooking.profileImage} alt="profile"
                    className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm sm:text-base">{selectedBooking.name}</p>
                    <p className="text-xs text-gray-500">
                      Room: {selectedBooking.roomNumber} • Bed: {selectedBooking.bed}
                    </p>
                    <p className="text-xs text-gray-500">
                      Outstanding: ₹{selectedBooking.outstandingAmount || 0}
                    </p>
                    <p className="text-xs text-red-500 font-semibold">
                      {getDaysLate(selectedBooking.lastPaymentDate)} days overdue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                  {[MessageCircle, Phone, MoreVertical].map((Icon, i) => (
                    <div key={i} className="w-8 h-8 bg-[#0827B2] flex justify-center items-center rounded-full cursor-pointer hover:bg-blue-800 transition">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Request Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 min-h-[300px] max-h-[400px]">
                {getValidMessages().length === 0 ? (
                  <div className="flex justify-center items-center h-32 text-gray-500">
                    No payment requests sent yet. Send your first request!
                  </div>
                ) : (
                  getValidMessages().map((msg) => (
                    <div key={msg.id} className="flex justify-end">
                      <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
                        <div className="bg-[#AFD1FF] border border-blue-300 p-3 sm:p-4 rounded-xl">
                          <p className="text-sm font-semibold">Payment Request Sent</p>
                          <p className="text-xl sm:text-2xl font-bold text-black">₹{msg.amount}/-</p>
                          {msg.note && (
                            <p className="text-sm mt-2 p-2 bg-blue-50 rounded">
                              <strong>Note:</strong> {msg.note}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Status: <span className={msg.status === 'pending' ? 'text-orange-500 font-semibold' : 'text-green-500 font-semibold'}>
                              {msg.status || 'pending'}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {getDaysLate(selectedBooking.lastPaymentDate)} day
                            {getDaysLate(selectedBooking.lastPaymentDate) !== 1 ? "s" : ""} overdue
                          </p>
                        </div>
                        <div className="flex gap-2 text-[11px] mt-1 text-gray-500 justify-end">
                          <p>{msg.date}</p>
                          <p>{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Controls */}
              {!requestpay ? (
                <div className="border-t p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setRequestpay(true)} 
                    className="flex-1 bg-[#FEE123] py-2 rounded text-sm sm:text-base hover:bg-yellow-400 transition font-semibold"
                    disabled={sending}
                  >
                    Request Payment
                  </button>
                  <button 
                    onClick={handlePayRefund} 
                    className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded text-sm sm:text-base hover:bg-yellow-50 transition font-semibold"
                  >
                    Process Refund
                  </button>
                </div>
              ) : (
                <div className="border-t p-3 sm:p-4 bg-gray-50">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-2">Send Payment Request</h3>
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <p className="text-sm">
                        <strong>Amount:</strong> ₹{selectedBooking.outstandingAmount || selectedBooking.rent}
                      </p>
                      <p className="text-sm">
                        <strong>Tenant:</strong> {selectedBooking.name}
                      </p>
                      <p className="text-sm text-red-500">
                        <strong>Overdue:</strong> {getDaysLate(selectedBooking.lastPaymentDate)} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Add a note (optional)..."
                      className="flex-1 border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendPaymentRequest();
                        }
                      }}
                      disabled={sending}
                    />
                    <button 
                      onClick={handleSendPaymentRequest} 
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
                      disabled={sending}
                    >
                      {sending ? 'Sending...' : 'Send Payment Request'}
                    </button>
                    <button 
                      onClick={() => {
                        setRequestpay(false);
                        setMessageInput("");
                      }} 
                      className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition font-semibold"
                      disabled={sending}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>If the main endpoint fails, <button 
                      onClick={handleSendPaymentRequestAlternative} 
                      className="text-blue-600 underline hover:text-blue-800"
                      disabled={sending}
                    >
                      try alternative endpoint
                    </button></p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white rounded-md shadow-md p-5">
              <div className="text-gray-500 text-center">
                {bookingUsers.length === 0 ? "No tenants available" : "Select a tenant to send payment requests"}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}