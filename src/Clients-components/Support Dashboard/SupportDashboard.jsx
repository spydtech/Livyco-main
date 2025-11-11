// import React, { useState, useRef, useEffect } from "react";
// import image1 from "../../assets/Contact-support/image-1.png";
// import image2 from "../../assets/Contact-support/image-2.png";
// import image3 from "../../assets/Contact-support/image-3.png";
// import image4 from "../../assets/Contact-support/image-4.png";
// import ClientNav from "../Client-Navbar/ClientNav";
// import { userAPI } from "../PropertyController";
// import axios from "axios";

// const supportOptions = [
//   { name: "Ticket Status", image: image1 },
//   { name: "Chat Support", image: image2 },
//   { name: "Email Support", image: image3 },
//   { name: "Voice Support", image: image4 },
// ];

// const SupportDashboard = () => {
//   const [selectedOption, setSelectedOption] = useState("Ticket Status");
//   const [tickets, setTickets] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [client, setClient] = useState(null);
  

//   const [newTicket, setNewTicket] = useState({
//     name: "",
//     email: "",
//     reason: "",
//     comment: "",
//   });

//   const [messages, setMessages] = useState([
//     { text: "Hello, I need help.", sender: "user" },
//     { text: "Sure, how can I assist you?", sender: "executive" },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const chatEndRef = useRef(null);

//   // Fetch client profile
//   useEffect(() => {
//   const fetchClient = async () => {
//     try {
//       const res = await userAPI.getUser();
//       setClient(res.data.user.role === "client" ? res.data.user : null);
//       console.log("Fetched client:", res.data.user.role); // <-- log client here
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchClient();
// }, []);


//   // Fetch tickets
//  useEffect(() => {
//   const fetchTickets = async () => {
//     try {
//       if (!client?.id) return; // wait until client is loaded

//       const res = await fetch(`http://localhost:5000/api/tickets/client/${client.id}`);
//       const data = await res.json();

//       setTickets(data);

//       console.log("Fetched tickets for client:", data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchTickets();
// }, [client]);


//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!inputValue.trim()) return;
//     setMessages([...messages, { text: inputValue, sender: "user" }]);
//     setInputValue("");

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Thanks for your message, we’ll get back to you shortly.", sender: "executive" },
//       ]);
//     }, 1000);
//   };

//   const handleCreateTicket = async (e) => {
//   e.preventDefault();

//   if (!newTicket.email || !newTicket.reason || !newTicket.comment) {
//     alert("Please fill out all fields");
//     return;
//   }

//   if (!client?.id) {
//     alert("Client info not loaded yet.");
//     return;
//   }

//   const payload = {
//     ticketId: Date.now(),
//     clientId: client.id,          // MongoDB ObjectId (User reference)
//     livycoId: client.clientId,    // Your custom LYVC00001 ID
//     name: client.name,
//     email: newTicket.email,
//     category: newTicket.reason,
//     comment: newTicket.comment,
//   };

//   console.log("Ticket payload:", payload);

//   try {
//     const res = await fetch("http://localhost:5000/api/tickets", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       console.error("Server error:", data);
//       alert("Failed to create ticket: " + (data.message || "Unknown error"));
//       return;
//     }

//     console.log("Created ticket:", data);
//     setTickets([data, ...tickets]);
//     setShowForm(false);
//     setNewTicket({ name: "", email: "", reason: "", comment: "" });
//   } catch (err) {
//     console.error(err);
//     alert("Failed to create ticket. Check console for details.");
//   }
// };


//   return (
//     <>
//       <ClientNav />
//       <div className="flex h-auto bg-gray-100 p-4">
//         {/* Sidebar */}
//         <aside className="w-1/5 bg-white p-4 rounded-lg shadow-md">
//           {supportOptions.map((option) => (
//             <div
//               key={option.name}
//               className={`p-4 mb-2 cursor-pointer border border-[#BCBCBC] rounded-lg ${
//                 selectedOption === option.name ? "bg-blue-200" : "bg-gray-50"
//               }`}
//               onClick={() => setSelectedOption(option.name)}
//             >
//               <img src={option.image} alt={option.name} className="w-full h-24 object-fill" />
//               <p className="text-center mt-2 font-semibold">{option.name}</p>
//             </div>
//           ))}
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 bg-white p-6 rounded-lg shadow-md ml-4">
//           {/* Ticket Status */}
//           {selectedOption === "Ticket Status" && (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Tickets</h2>
//                 <button
//                   onClick={() => setShowForm(true)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Create Ticket
//                 </button>
//               </div>

//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="p-2">Ticket No</th>
//                     <th className="p-2">LivycoId</th>
//                     <th className="p-2">Category</th>
//                     <th className="p-2">E-mail</th>
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Status</th>
                   
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tickets.map((ticket) => (
//                     <tr key={ticket._id} className="border-b">
//                       <td className="p-2 text-center">{ticket.ticketId}</td>
//                       <td className="p-2 text-center">{ticket.livycoId}</td>
//                       <td className="p-2 text-center">{ticket.category}</td>
//                       <td className="p-2 text-center">{ticket.email}</td>
//                       <td className="p-2 text-center">
//                         {new Date(ticket.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="p-2 text-center">
//                         <span
//                           className={`px-3 py-1 rounded-full text-white ${
//                             ticket.status === "Resolved"
//                               ? "bg-green-400"
//                               : ticket.status === "Closed"
//                               ? "bg-purple-400"
//                               : "bg-yellow-400"
//                           }`}
//                         >
//                           {ticket.status}
//                         </span>
//                       </td>
                     
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Chat Support */}
//           {selectedOption === "Chat Support" && (
//             <div className="flex flex-col h-full">
//               <h2 className="text-lg font-semibold mb-4">Executive Name</h2>
//               <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto flex flex-col-reverse">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 rounded-lg max-w-xs mt-2 ${
//                       msg.sender === "user"
//                         ? "bg-blue-200 text-left self-start"
//                         : "bg-yellow-200 text-right self-end"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 ))}
//                 <div ref={chatEndRef} />
//               </div>
//               <div className="mt-4 border p-2 rounded-lg flex items-center">
//                 <input
//                   type="text"
//                   className="flex-1 p-2 outline-none"
//                   placeholder="Type a message..."
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 />
//                 <button
//                   onClick={handleSend}
//                   className="ml-2 bg-yellow-500 text-white p-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Email Support */}
//           {selectedOption === "Email Support" && (
//             <div className="text-center">
//               <h2 className="text-lg font-semibold mb-4">Email Support</h2>
//               <p className="text-lg">support@livyco.com</p>
//             </div>
//           )}

//           {/* Voice Support */}
//           {selectedOption === "Voice Support" && (
//             <div className="text-center">
//               <h2 className="text-lg font-semibold mb-4">Voice Support</h2>
//               <p className="text-lg">6958524871</p>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Create Ticket Popup */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Create New Ticket</h2>
//             <form onSubmit={handleCreateTicket}>
//               <div className="mb-3">
//                 <label className="block font-medium mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={client.name}
//                   disabled
//                   //onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
//                   className="w-full border px-3 py-2 rounded"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={newTicket.email}
//                   onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
//                   className="w-full border px-3 py-2 rounded"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block font-medium mb-1">Reason</label>
//                 <select
//                   value={newTicket.reason}
//                   onChange={(e) => setNewTicket({ ...newTicket, reason: e.target.value })}
//                   className="w-full border px-3 py-2 rounded"
//                 >
//                   <option value="">Select a reason</option>
//                   <option value="Payment">Payment</option>
//                   <option value="Technical Issue">Technical Issue</option>
//                   <option value="Account Support">Account Support</option>
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="block font-medium mb-1">Comment</label>
//                 <textarea
//                   value={newTicket.comment}
//                   onChange={(e) => setNewTicket({ ...newTicket, comment: e.target.value })}
//                   className="w-full border px-3 py-2 rounded"
//                   placeholder="Describe your issue..."
//                 />
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
               

//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SupportDashboard;





import React, { useState, useRef, useEffect } from "react";
import image1 from "../../assets/Contact-support/image-1.png";
import image2 from "../../assets/Contact-support/image-2.png";
import image3 from "../../assets/Contact-support/image-3.png";
import image4 from "../../assets/Contact-support/image-4.png";
import ClientNav from "../Client-Navbar/ClientNav";
import { userAPI, ticketAPI } from "../PropertyController";

const supportOptions = [
  { name: "Ticket Status", image: image1 },
  { name: "Chat Support", image: image2 },
  { name: "Email Support", image: image3 },
  { name: "Voice Support", image: image4 },
];

const SupportDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Ticket Status");
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    reason: "",
    comment: "",
  });

  const [messages, setMessages] = useState([
    { text: "Hello, I need help.", sender: "user" },
    { text: "Sure, how can I assist you?", sender: "executive" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Fetch client profile
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await userAPI.getUser();
        setClient(res.data.user);
        console.log("Fetched client:", res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClient();
  }, []);

  // Fetch tickets using ticketAPI
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!client?.id) return;

        setLoading(true);
        const response = await ticketAPI.getTicketsByClient(client.id);
        setTickets(response.data.tickets || []);
        console.log("Fetched tickets for client:", response.data.tickets);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        alert("Failed to load tickets: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [client]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for your message, we'll get back to you shortly.", sender: "executive" },
      ]);
    }, 1000);
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    // Validate required fields first
    if (!newTicket.email || !newTicket.reason || !newTicket.comment) {
      alert("Please fill in all required fields");
      return;
    }

    if (!client?.id) {
      alert("Client info not loaded yet.");
      return;
    }

    // Create payload with ALL required fields from backend
    const payload = {
      clientId: client.id,
      livycoId: client.livycoId || client.id.toString(),
      name: client.name || "Unknown",
      email: newTicket.email,
      category: newTicket.reason,
      comment: newTicket.comment,
      priority: "Medium",
    };

    console.log("Ticket payload:", payload);

    try {
      setFormSubmitting(true);
      const response = await ticketAPI.createTicket(payload);
      console.log("Created ticket:", response.data);

      // Refresh tickets list
      const ticketsResponse = await ticketAPI.getTicketsByClient(client.id);
      setTickets(ticketsResponse.data.tickets || []);

      setShowForm(false);
      setNewTicket({ name: "", email: "", reason: "", comment: "" });
      alert("Ticket created successfully!");
    } catch (err) {
      console.error("Failed to create ticket:", err);
      alert("Failed to create ticket: " + err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setNewTicket({ name: "", email: "", reason: "", comment: "" });
  };

  return (
    <>
      <ClientNav />
      <div className="flex h-auto bg-gray-50 p-4">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {supportOptions.map((option) => (
            <div
              key={option.name}
              className={`p-4 mb-3 cursor-pointer border rounded-xl transition-all duration-200 hover:shadow-md ${
                selectedOption === option.name 
                  ? "bg-blue-50 border-blue-200 shadow-sm" 
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedOption(option.name)}
            >
              <img 
                src={option.image} 
                alt={option.name} 
                className="w-full h-24 object-cover rounded-lg" 
              />
              <p className={`text-center mt-3 font-medium ${
                selectedOption === option.name ? "text-blue-700" : "text-gray-700"
              }`}>
                {option.name}
              </p>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 ml-4">
          {/* Ticket Status */}
          {selectedOption === "Ticket Status" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Support Tickets</h2>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-800 text-white px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  Create Ticket
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 text-left font-semibold text-gray-700">Ticket No</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Category</th>
                        <th className="p-4 text-left font-semibold text-gray-700">E-mail</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Date</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                          <tr key={ticket._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="p-4 text-gray-600 font-medium">{ticket.ticketId || ticket._id}</td>
                            <td className="p-4 text-gray-600">{ticket.category}</td>
                            <td className="p-4 text-gray-600">{ticket.email}</td>
                            <td className="p-4 text-gray-600">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  ticket.status === "Resolved"
                                    ? "bg-green-100 text-green-800"
                                    : ticket.status === "Closed"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  ticket.priority === "High" 
                                    ? "bg-red-100 text-red-800"
                                    : ticket.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {ticket.priority}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="p-8 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-lg font-medium text-gray-600">No tickets found</p>
                              <p className="text-sm text-gray-500 mt-1">Create your first support ticket to get started</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Chat Support */}
          {selectedOption === "Chat Support" && (
            <div className="flex flex-col h-[600px]">
              <div className="bg-blue-800 p-4 rounded-t-xl">
                <h2 className="text-lg font-semibold text-white">Executive Name</h2>
                <p className="text-blue-100 text-sm">Online</p>
              </div>
              <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="border-t border-gray-200 p-4 bg-white rounded-b-xl">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Support */}
          {selectedOption === "Email Support" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Support</h2>
              <p className="text-lg text-gray-600 mb-4">We're here to help you via email</p>
              <a 
                href="mailto:support@livyco.com" 
                className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-200 font-medium"
              >
                support@livyco.com
              </a>
            </div>
          )}

          {/* Voice Support */}
          {selectedOption === "Voice Support" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice Support</h2>
              <p className="text-lg text-gray-600 mb-4">Call us for immediate assistance</p>
              <a 
                href="tel:6958524871" 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                +1 (695) 852-4871
              </a>
            </div>
          )}
        </main>
      </div>

      {/* Create Ticket Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all">
            {/* Header */}
            <div className="bg-blue-800 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Support Ticket</h2>
                </div>
                <button
                  onClick={handleCloseForm}
                  className="text-white text-2xl hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateTicket} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={client?.name || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newTicket.email}
                    onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Reason Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Category
                </label>
                <select
                  value={newTicket.reason}
                  onChange={(e) => setNewTicket({ ...newTicket, reason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select issue category</option>
                  <option value="Payment">Payment Issue</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Account Support">Account Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Comment Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTicket.comment}
                  onChange={(e) => setNewTicket({ ...newTicket, comment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Please describe your issue in detail..."
                  rows="5"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-8 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formSubmitting ? "Creating Ticket..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportDashboard;