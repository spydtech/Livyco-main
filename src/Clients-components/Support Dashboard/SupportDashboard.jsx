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

    // Validate ticket data
    const validation = ticketAPI.validateTicketData({
      title: newTicket.reason,
      description: newTicket.comment,
      category: newTicket.reason,
      priority: "medium"
    });

    if (!validation.isValid) {
      alert(validation.errors.join(", "));
      return;
    }

    if (!client?.id) {
      alert("Client info not loaded yet.");
      return;
    }

    const payload = {
      title: newTicket.reason,
      description: newTicket.comment,
      category: newTicket.reason,
      priority: "medium",
      clientId: client.id,
      email: newTicket.email,
      name: client.name
    };

    console.log("Ticket payload:", payload);

    try {
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
    }
  };

  return (
    <>
      <ClientNav />
      <div className="flex h-auto bg-gray-100 p-4">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-4 rounded-lg shadow-md">
          {supportOptions.map((option) => (
            <div
              key={option.name}
              className={`p-4 mb-2 cursor-pointer border border-[#BCBCBC] rounded-lg ${
                selectedOption === option.name ? "bg-blue-200" : "bg-gray-50"
              }`}
              onClick={() => setSelectedOption(option.name)}
            >
              <img src={option.image} alt={option.name} className="w-full h-24 object-fill" />
              <p className="text-center mt-2 font-semibold">{option.name}</p>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 rounded-lg shadow-md ml-4">
          {/* Ticket Status */}
          {selectedOption === "Ticket Status" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tickets</h2>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Ticket
                </button>
              </div>

              {loading ? (
                <p>Loading tickets...</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Ticket No</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">E-mail</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.length > 0 ? (
                      tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b">
                          <td className="p-2 text-center">{ticket.ticketId || ticket._id}</td>
                          <td className="p-2 text-center">{ticket.category}</td>
                          <td className="p-2 text-center">{ticket.email}</td>
                          <td className="p-2 text-center">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-2 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-white ${
                                ticket.status === "resolved"
                                  ? "bg-green-400"
                                  : ticket.status === "closed"
                                  ? "bg-purple-400"
                                  : "bg-yellow-400"
                              }`}
                            >
                              {ticketAPI.formatTicketStatus(ticket.status)}
                            </span>
                          </td>
                          <td className="p-2 text-center">
                            <span
                              className={`px-2 py-1 rounded ${
                                ticket.priority === "high" 
                                  ? "bg-red-100 text-red-800"
                                  : ticket.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {ticketAPI.formatPriority(ticket.priority)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4 text-center text-gray-500">
                          No tickets found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Chat Support */}
          {selectedOption === "Chat Support" && (
            <div className="flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4">Executive Name</h2>
              <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto flex flex-col-reverse">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs mt-2 ${
                      msg.sender === "user"
                        ? "bg-blue-200 text-left self-start"
                        : "bg-yellow-200 text-right self-end"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="mt-4 border p-2 rounded-lg flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 outline-none"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="ml-2 bg-yellow-500 text-white p-2 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Email Support */}
          {selectedOption === "Email Support" && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Email Support</h2>
              <p className="text-lg">support@livyco.com</p>
            </div>
          )}

          {/* Voice Support */}
          {selectedOption === "Voice Support" && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Voice Support</h2>
              <p className="text-lg">6958524871</p>
            </div>
          )}
        </main>
      </div>

      {/* Create Ticket Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create New Ticket</h2>
            <form onSubmit={handleCreateTicket}>
              <div className="mb-3">
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={client?.name || ""}
                  disabled
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newTicket.email}
                  onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Reason</label>
                <select
                  value={newTicket.reason}
                  onChange={(e) => setNewTicket({ ...newTicket, reason: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Payment">Payment</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Account Support">Account Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-medium mb-1">Comment</label>
                <textarea
                  value={newTicket.comment}
                  onChange={(e) => setNewTicket({ ...newTicket, comment: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Describe your issue..."
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
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