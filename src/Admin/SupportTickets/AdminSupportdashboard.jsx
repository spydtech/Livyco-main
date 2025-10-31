// import React, { useState, useRef, useEffect } from "react";
// import image1 from "../../assets/Contact-support/image-1.png";
// import image2 from "../../assets/Contact-support/image-2.png";
// import image3 from "../../assets/Contact-support/image-3.png";
// import image4 from "../../assets/Contact-support/image-4.png";
// import ClientNav from "../../Clients-components/Client-Navbar/ClientNav";

// const supportOptions = [
//   { name: "Ticket Status", image: image1 },
//   { name: "Chat Support", image: image2 },
//   { name: "Email Support", image: image3 },
//   { name: "Voice Support", image: image4 },
// ];

// const SupportDashboard = () => {
//   const [selectedOption, setSelectedOption] = useState("Ticket Status");

//   // ---- Tickets from backend ----
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ---- Filters ----
//   const [filter, setFilter] = useState("All");

//   // ---- Chat ----
//   const [messages, setMessages] = useState([
//     { text: "Hello, I need help.", sender: "user" },
//     { text: "Sure, how can I assist you?", sender: "executive" },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const chatEndRef = useRef(null);

//   // ---- Fetch tickets from backend ----
//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:5000/api/tickets"); // Admin route
//         const data = await res.json();
//         setTickets(data);
//         console.log("Fetched tickets for client:", data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, []);

//   // ---- Auto-scroll in chat ----
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

//   // ---- Filter Tickets ----
//   const filterTickets = () => {
//     const today = new Date();
//     const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const todayEnd = new Date(todayStart);
//     todayEnd.setDate(todayEnd.getDate() + 1);

//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - 7);

//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//     if (filter === "Today") {
//       return tickets.filter((t) => {
//         const d = new Date(t.createdAt);
//         return d >= todayStart && d < todayEnd;
//       });
//     }
//     if (filter === "Weekly") {
//       return tickets.filter((t) => new Date(t.createdAt) >= startOfWeek);
//     }
//     if (filter === "Monthly") {
//       return tickets.filter((t) => new Date(t.createdAt) >= startOfMonth);
//     }
//     return tickets;
//   };

//   // ---- Update assignedTo ----
//   const handleAssignChange = async (ticketId, newAssignee) => {
//     try {
//       // Optimistic UI update
//       setTickets((prev) =>
//         prev.map((t) => (t._id === ticketId ? { ...t, assignedTo: newAssignee } : t))
//       );

//       // Send update to backend
//       const res = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ assignedTo: newAssignee }),
//       });

//       const data = await res.json();
//       if (!data.success) {
//         throw new Error(data.message);
//       }
//     } catch (err) {
//       console.error("Failed to update assignment", err);
//       alert("Could not update assigned person");
//     }
//   };
//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       // Optimistic UI update
//       setTickets((prev) =>
//         prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t))
//       );

//       // Send update to backend
//       const res = await fetch(`http://localhost:5000/api/tickets/${ticketId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const data = await res.json();
//       if (!data.success) throw new Error(data.message);

//     } catch (err) {
//       console.error("Failed to update status:", err);
//       alert("Could not update ticket status");
//     }
//   };


//   return (
//     <>
//       {/* <ClientNav /> */}

//       <div className="flex h-auto bg-gray-100 p-4">
//         {/* Sidebar */}
//         <aside className="w-1/5 bg-white p-4 rounded-lg shadow-md">
//           {supportOptions.map((option) => (
//             <div
//               key={option.name}
//               className={`p-4 mb-2 cursor-pointer border border-[#BCBCBC] rounded-lg ${selectedOption === option.name ? "bg-blue-200" : "bg-gray-50"
//                 }`}
//               onClick={() => setSelectedOption(option.name)}
//             >
//               <img src={option.image} alt={option.name} className="w-full h-24 object-fill" />
//               <p className="text-center mt-2 font-semibold">{option.name}</p>
//             </div>
//           ))}
//         </aside>

//         {/* Main */}
//         <main className="flex-1 bg-white p-6 rounded-lg shadow-md ml-4">
//           {/* ---------- Ticket Status ---------- */}
//           {selectedOption === "Ticket Status" && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold">Tickets</h2>

//                 <select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   className="border px-3 py-1 rounded-lg"
//                 >
//                   <option value="All">All Tickets</option>
//                   <option value="Today">Today’s Tickets</option>
//                   <option value="Weekly">Weekly Tickets</option>
//                   <option value="Monthly">Monthly Tickets</option>
//                 </select>
//               </div>

//               {loading ? (
//                 <p>Loading tickets...</p>
//               ) : (
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="p-2 text-center">Name</th>
//                       <th className="p-2 text-center">ID</th>
//                       <th className="p-2">Ticket No</th>
//                       <th className="p-2">E-mail</th>
//                       <th className="p-2">Category</th>
//                       <th className="p-2">Date</th>
//                       <th className="p-2">Status</th>
//                       <th className="p-2">Assigned To</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filterTickets().map((ticket) => (
//                       <tr key={ticket._id} className="border-b">
//                         <td className="p-2 text-center">{ticket.name}</td>
//                         <td className="p-2 text-center">{ticket.livycoId}</td>
//                         <td className="p-2 text-center">{ticket.ticketId}</td>
//                         <td className="p-2 text-center">{ticket.email}</td>
//                         <td className="p-2 text-center">{ticket.category}</td>
//                         <td className="p-2 text-center">
//                           {ticket.createdAt ? new Date(ticket.createdAt).toISOString().slice(0, 10) : "—"}
//                         </td>
//                         <td className="p-2 text-center">
//                           <select
//                             value={ticket.status}
//                             onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
//                             className={`px-3 py-1 text-center rounded-full text-white ${ticket.status === "Resolved"
//                                 ? "bg-green-400"
//                                 : ticket.status === "Closed"
//                                   ? "bg-purple-400"
//                                   : "bg-yellow-400"
//                               }`}
//                           >
//                             <option value="Open">Open</option>
//                             <option value="Resolved">Resolved</option>
//                             <option value="Closed">Closed</option>
//                           </select>
//                         </td>

//                         <td className="p-2 text-center">
//                           <select
//                             value={ticket.assignedTo || ""}
//                             onChange={(e) => handleAssignChange(ticket._id, e.target.value)}
//                             className="border px-2 py-1 rounded"
//                           >
//                             <option value="">Unassigned</option>
//                             <option value="Jo">Jo</option>
//                             <option value="Joe">Joe</option>
//                             <option value="Donald">Donald</option>
//                             <option value="David">David</option>
//                             <option value="Sam">Sam</option>
//                           </select>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           )}

//           {/* ---------- Chat Support ---------- */}
//           {selectedOption === "Chat Support" && (
//             <div className="flex flex-col h-full">
//               <h2 className="text-lg font-semibold mb-4">Executive Name</h2>
//               <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto flex flex-col-reverse">
//                 {messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-3 rounded-lg max-w-xs mt-2 ${msg.sender === "user"
//                       ? "bg-blue-200 text-left self-start"
//                       : "bg-yellow-200 text-right self-end"
//                       }`}
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

//           {/* ---------- Email Support ---------- */}
//           {selectedOption === "Email Support" && (
//             <div className="text-center">
//               <h2 className="text-lg font-semibold mb-4">Email Support</h2>
//               <p className="text-lg">support@livyco.com</p>
//             </div>
//           )}

//           {/* ---------- Voice Support ---------- */}
//           {selectedOption === "Voice Support" && (
//             <div className="text-center">
//               <h2 className="text-lg font-semibold mb-4">Voice Support</h2>
//               <p className="text-lg">6958524871</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </>
//   );
// };

// export default SupportDashboard;



import React, { useState, useRef, useEffect } from "react";
import image1 from "../../assets/Contact-support/image-1.png";
import image2 from "../../assets/Contact-support/image-2.png";
import image3 from "../../assets/Contact-support/image-3.png";
import image4 from "../../assets/Contact-support/image-4.png";
import { adminTicketAPI } from "../adminController";

const supportOptions = [
  { name: "Ticket Status", image: image1 },
  { name: "Chat Support", image: image2 },
  { name: "Email Support", image: image3 },
  { name: "Voice Support", image: image4 },
];

const SupportDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Ticket Status");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  // Chat state
  const [messages, setMessages] = useState([
    { text: "Hello, I need help.", sender: "user" },
    { text: "Sure, how can I assist you?", sender: "executive" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Fetch tickets using ticketAPI
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await adminTicketAPI.getAllTickets();
        setTickets(response.data.tickets || []);
        console.log("Fetched all tickets:", response.data.tickets);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        alert("Failed to load tickets: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Auto-scroll in chat
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

  // Filter Tickets
  const filterTickets = () => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (filter === "Today") {
      return tickets.filter((t) => {
        const d = new Date(t.createdAt);
        return d >= todayStart && d < todayEnd;
      });
    }
    if (filter === "Weekly") {
      return tickets.filter((t) => new Date(t.createdAt) >= startOfWeek);
    }
    if (filter === "Monthly") {
      return tickets.filter((t) => new Date(t.createdAt) >= startOfMonth);
    }
    return tickets;
  };

  // Update assignedTo
  const handleAssignChange = async (ticketId, newAssignee) => {
    try {
      // Optimistic UI update
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, assignedTo: newAssignee } : t))
      );

      // Send update to backend using ticketAPI
      await adminTicketAPI.updateTicket(ticketId, { assignedTo: newAssignee });
    } catch (err) {
      console.error("Failed to update assignment", err);
      alert("Could not update assigned person: " + err.message);
      
      // Revert optimistic update on error
      const response = await adminTicketAPI.getAllTickets();
      setTickets(response.data.tickets || []);
    }
  };

  // Update status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      // Optimistic UI update
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t))
      );

      // Send update to backend using ticketAPI
      await adminTicketAPI.updateTicket(ticketId, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Could not update ticket status: " + err.message);
      
      // Revert optimistic update on error
      const response = await adminTicketAPI.getAllTickets();
      setTickets(response.data.tickets || []);
    }
  };

  return (
    <>
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

        {/* Main */}
        <main className="flex-1 bg-white p-6 rounded-lg shadow-md ml-4">
          {/* Ticket Status */}
          {selectedOption === "Ticket Status" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tickets</h2>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border px-3 py-1 rounded-lg"
                >
                  <option value="All">All Tickets</option>
                  <option value="Today">Today's Tickets</option>
                  <option value="Weekly">Weekly Tickets</option>
                  <option value="Monthly">Monthly Tickets</option>
                </select>
              </div>

              {loading ? (
                <p>Loading tickets...</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-center">Name</th>
                      <th className="p-2 text-center">Ticket No</th>
                      <th className="p-2">E-mail</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Priority</th>
                      <th className="p-2">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterTickets().length > 0 ? (
                      filterTickets().map((ticket) => (
                        <tr key={ticket._id} className="border-b">
                          <td className="p-2 text-center">{ticket.name}</td>
                          <td className="p-2 text-center">{ticket.ticketId || ticket._id}</td>
                          <td className="p-2 text-center">{ticket.email}</td>
                          <td className="p-2 text-center">{ticket.category}</td>
                          <td className="p-2 text-center">
                            {ticket.createdAt ? new Date(ticket.createdAt).toISOString().slice(0, 10) : "-"}
                          </td>
                          <td className="p-2 text-center">
                            <select
                              value={ticket.status || "open"}
                              onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                              className={`px-3 py-1 text-center rounded-full text-white ${
                                ticket.status === "resolved"
                                  ? "bg-green-400"
                                  : ticket.status === "closed"
                                  ? "bg-purple-400"
                                  : "bg-yellow-400"
                              }`}
                            >
                              <option value="open">Open</option>
                              <option value="in_progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="closed">Closed</option>
                            </select>
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
                          <td className="p-2 text-center">
                            <select
                              value={ticket.assignedTo || ""}
                              onChange={(e) => handleAssignChange(ticket._id, e.target.value)}
                              className="border px-2 py-1 rounded"
                            >
                              <option value="">Unassigned</option>
                              <option value="Jo">Jo</option>
                              <option value="Joe">Joe</option>
                              <option value="Donald">Donald</option>
                              <option value="David">David</option>
                              <option value="Sam">Sam</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="p-4 text-center text-gray-500">
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
    </>
  );
};

export default SupportDashboard;