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
import { adminTicketAPI, adminUserAPI } from "../adminController";

const supportOptions = [
  { name: "Ticket Status", image: image1 },
  { name: "Chat Support", image: image2 },
  { name: "Email Support", image: image3 },
  { name: "Voice Support", image: image4 },
];

const SupportDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Ticket Status");
  const [tickets, setTickets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [dateFilter, setDateFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [ticketTypeFilter, setTicketTypeFilter] = useState("All");

  // Chat state
  const [messages, setMessages] = useState([
    { text: "Hello, I need help.", sender: "user" },
    { text: "Sure, how can I assist you?", sender: "executive" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await adminUserAPI.getAllUsers();
        setAllUsers(response.data.users || []);
        console.log("Fetched users:", response.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        try {
          const response = await adminUserAPI.getUsers();
          setAllUsers(response.data || []);
        } catch (error) {
          console.error("Failed with alternative method:", error);
          setAllUsers([]);
        }
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await adminTicketAPI.getAllTickets();
        
        const ticketsData = response.data.tickets || [];
        setTickets(ticketsData);
        
        console.log("Fetched tickets with phone numbers:", ticketsData);
        
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        alert("Failed to load tickets: " + (err.message || "Unknown error"));
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

  // Get unique clients from tickets
  const getUniqueClients = () => {
    const clients = tickets.map(ticket => ticket.name || "Unknown Client");
    return ["All", ...new Set(clients)];
  };

  // Get unique assigned users from tickets
  const getUniqueUsers = () => {
    const users = tickets.map(ticket => ticket.assignedTo || "Unassigned");
    return ["All", ...new Set(users)];
  };

  // Determine if ticket is from client or user based on actual user data
  const getTicketType = (ticket) => {
    if (allUsers.length > 0) {
      // Check if ticket is from a CLIENT (admin-created)
      const userExistsById = allUsers.some(user => 
        user._id === ticket.clientId ||
        user.id === ticket.clientId
      );
      
      if (userExistsById) {
        const user = allUsers.find(u => u._id === ticket.clientId || u.id === ticket.clientId);
        if (user && user.role === "client") {
          return "Client";
        } else if (user && user.role === "user") {
          return "User";
        }
        return user ? "User" : "Client";
      }
      
      if (ticket.email) {
        const userExistsByEmail = allUsers.some(user => 
          user.email === ticket.email
        );
        
        if (userExistsByEmail) {
          const user = allUsers.find(u => u.email === ticket.email);
          if (user && user.role === "client") {
            return "Client";
          } else if (user && user.role === "user") {
            return "User";
          }
          return "User";
        }
      }
      
      if (ticket.name) {
        const userExistsByName = allUsers.some(user => 
          user.name === ticket.name
        );
        
        if (userExistsByName) {
          const user = allUsers.find(u => u.name === ticket.name);
          if (user && user.role === "client") {
            return "Client";
          } else if (user && user.role === "user") {
            return "User";
          }
          return "User";
        }
      }
      
      if (ticket.livycoId) {
        return "User";
      }
      
      return "Client";
    }
    
    if (ticket.clientId && ticket.livycoId && ticket.email) {
      return "User";
    }
    
    if (ticket.clientId && /^[0-9a-fA-F]{24}$/.test(ticket.clientId)) {
      return "User";
    }
    
    return "Client";
  };

  // Function to get the user's clientId (like "LYVC00007") for display
  const getUserClientId = (ticket) => {
    if (!allUsers.length) return ticket.clientId || "N/A";
    
    // Method 1: Find by ticket's clientId (which should match user's _id)
    if (ticket.clientId) {
      const user = allUsers.find(u => 
        u._id === ticket.clientId || 
        u.id === ticket.clientId
      );
      if (user && user.clientId) {
        return user.clientId; // Returns "LYVC00007"
      }
    }
    
    // Method 2: Find by email
    if (ticket.email) {
      const user = allUsers.find(u => u.email === ticket.email);
      if (user && user.clientId) {
        return user.clientId;
      }
    }
    
    // Method 3: Find by name
    if (ticket.name) {
      const user = allUsers.find(u => u.name === ticket.name);
      if (user && user.clientId) {
        return user.clientId;
      }
    }
    
    // Method 4: If ticket has its own clientId field that's not MongoDB ObjectId
    if (ticket.clientId && !/^[0-9a-fA-F]{24}$/.test(ticket.clientId)) {
      return ticket.clientId;
    }
    
    // Method 5: Use ticket's livycoId if available
    if (ticket.livycoId) {
      return ticket.livycoId;
    }
    
    // Fallback: Show whatever is in ticket.clientId
    return ticket.clientId || "N/A";
  };

  // Function to get phone number - first from ticket, then from user data
  const getPhoneNumber = (ticket) => {
    // FIRST: Check if ticket has phone number
    if (ticket.phone && ticket.phone.trim() !== "") {
      return ticket.phone;
    }
    
    // SECOND: Try to find phone number from user data
    if (allUsers.length > 0) {
      // Find user by ticket's clientId
      if (ticket.clientId) {
        const user = allUsers.find(u => 
          u._id === ticket.clientId || 
          u.id === ticket.clientId
        );
        if (user && user.phone) {
          return user.phone;
        }
      }
      
      // Find user by email
      if (ticket.email) {
        const user = allUsers.find(u => u.email === ticket.email);
        if (user && user.phone) {
          return user.phone;
        }
      }
      
      // Find user by name
      if (ticket.name) {
        const user = allUsers.find(u => u.name === ticket.name);
        if (user && user.phone) {
          return user.phone;
        }
      }
    }
    
    // THIRD: Return N/A if no phone number found
    return "N/A";
  };

  // Function to get user role (Client or User)
  const getUserRole = (ticket) => {
    if (allUsers.length > 0) {
      // Method 1: Find by ticket's clientId
      if (ticket.clientId) {
        const user = allUsers.find(u => 
          u._id === ticket.clientId || 
          u.id === ticket.clientId
        );
        if (user && user.role) {
          return user.role.charAt(0).toUpperCase() + user.role.slice(1); // Capitalize first letter
        }
      }
      
      // Method 2: Find by email
      if (ticket.email) {
        const user = allUsers.find(u => u.email === ticket.email);
        if (user && user.role) {
          return user.role.charAt(0).toUpperCase() + user.role.slice(1);
        }
      }
      
      // Method 3: Find by name
      if (ticket.name) {
        const user = allUsers.find(u => u.name === ticket.name);
        if (user && user.role) {
          return user.role.charAt(0).toUpperCase() + user.role.slice(1);
        }
      }
    }
    
    // Fallback: Use ticket type as role
    const ticketType = getTicketType(ticket);
    return ticketType === "User" ? "User" : "Client";
  };

  // Function to get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter Tickets by date, client, user AND ticket type
  const filterTickets = () => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let filtered = tickets;

    // Apply ticket type filter first (Client vs User)
    if (ticketTypeFilter !== "All") {
      filtered = filtered.filter((t) => {
        const type = getTicketType(t);
        return type === ticketTypeFilter;
      });
    }

    // Apply date filter
    if (dateFilter === "Today") {
      filtered = filtered.filter((t) => {
        const d = new Date(t.createdAt);
        return d >= todayStart && d < todayEnd;
      });
    } else if (dateFilter === "Weekly") {
      filtered = filtered.filter((t) => new Date(t.createdAt) >= startOfWeek);
    } else if (dateFilter === "Monthly") {
      filtered = filtered.filter((t) => new Date(t.createdAt) >= startOfMonth);
    }

    // Apply client filter
    if (clientFilter !== "All") {
      filtered = filtered.filter((t) => t.name === clientFilter);
    }

    // Apply user filter (assigned to)
    if (userFilter !== "All") {
      if (userFilter === "Unassigned") {
        filtered = filtered.filter((t) => !t.assignedTo || t.assignedTo === "Unassigned");
      } else {
        filtered = filtered.filter((t) => t.assignedTo === userFilter);
      }
    }

    return filtered;
  };

  // Update assignedTo
  const handleAssignChange = async (ticketId, newAssignee) => {
    try {
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, assignedTo: newAssignee } : t))
      );

      await adminTicketAPI.updateTicket(ticketId, { assignedTo: newAssignee });
      
      console.log("Assignment updated successfully");
    } catch (err) {
      console.error("Failed to update assignment", err);
      alert("Could not update assigned person: " + (err.message || "Unknown error"));
      
      const response = await adminTicketAPI.getAllTickets();
      setTickets(response.data.tickets || []);
    }
  };

  // Update status
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t))
      );

      await adminTicketAPI.updateTicket(ticketId, { status: newStatus });
      
      console.log("Status updated successfully to:", newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Could not update ticket status: " + (err.message || "Unknown error"));
      
      const response = await adminTicketAPI.getAllTickets();
      setTickets(response.data.tickets || []);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    const colorMap = {
      'Open': 'bg-yellow-400',
      'In Progress': 'bg-blue-400', 
      'Resolved': 'bg-green-400',
      'Closed': 'bg-purple-400'
    };
    return colorMap[status] || 'bg-gray-400';
  };

  const filteredTickets = filterTickets();
  const uniqueClients = getUniqueClients();
  const uniqueUsers = getUniqueUsers();

  return (
    <>
      <div className="flex h-auto bg-gray-100 p-4">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-4 rounded-lg border-2">
          {supportOptions.map((option) => (
            <div
              key={option.name}
              className={`p-4 mb-2 cursor-pointer border-2 border-[#BCBCBC] rounded-lg ${
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
        <main className="flex-1 bg-white p-6 rounded-lg border-2 ml-4">
          {/* Ticket Status */}
          {selectedOption === "Ticket Status" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tickets</h2>

                <div className="flex gap-4">
                  {/* Ticket Type Filter */}
                  <select
                    value={ticketTypeFilter}
                    onChange={(e) => setTicketTypeFilter(e.target.value)}
                    className="border px-3 py-1 rounded-lg"
                  >
                    <option value="All">All Tickets</option>
                    <option value="Client">Client Tickets</option>
                    <option value="User">User Tickets</option>
                  </select>

                  {/* Client Filter */}
                  <select
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    className="border px-3 py-1 rounded-lg"
                  >
                    {uniqueClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>

                  {/* User Filter */}
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="border px-3 py-1 rounded-lg"
                  >
                    {uniqueUsers.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>

                  {/* Date Filter */}
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border px-3 py-1 rounded-lg"
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="Weekly">This Week</option>
                    <option value="Monthly">This Month</option>
                  </select>
                </div>
              </div>

              {loadingUsers && (
                <p className="text-center py-2 text-sm text-gray-500">Loading user data...</p>
              )}

              {loading ? (
                <p className="text-center py-4">Loading tickets...</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-2 text-center">Name</th>
                      <th className="p-2 text-center">Ticket No</th>
                      <th className="p-2 text-center">Role</th> {/* Added Role column */}
                      <th className="p-2 text-center">Email</th>
                      <th className="p-2 text-center">ID</th>
                      <th className="p-2 text-center">Phone</th>
                      <th className="p-2 text-center">Category</th>
                      <th className="p-2 text-center">Date</th>
                      <th className="p-2 text-center">Status</th>
                      <th className="p-2 text-center">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket) => {
                        const ticketType = getTicketType(ticket);
                        const displayClientId = getUserClientId(ticket);
                        const phoneNumber = getPhoneNumber(ticket);
                        const userRole = getUserRole(ticket);
                        
                        return (
                          <tr key={ticket._id} className="border-b hover:bg-gray-50">
                            <td className="p-2 text-center font-medium">
                              {ticket.name || "Unknown"}
                            </td>
                            <td className="p-2 text-center font-bold">{ticket.ticketId}</td>
                            <td className="p-2 text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userRole)}`}>
                                {userRole || "Unknown"}
                              </span>
                            </td>
                            <td className="p-2 text-center">{ticket.email}</td>
                            <td className="p-2 text-center text-sm font-medium">
                              <span className="text-blue-700">
                                {displayClientId}
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <span className="text-gray-700 font-medium">
                                {phoneNumber}
                              </span>
                            </td>
                            <td className="p-2 text-center">{ticket.category}</td>
                            <td className="p-2 text-center">
                              {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}
                            </td>
                            <td className="p-2 text-center">
                              <select
                                value={ticket.status || "Open"}
                                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                className={`px-3 py-1 text-center rounded-full text-white ${getStatusColor(ticket.status)}`}
                              >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                              </select>
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
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10" className="p-4 text-center text-gray-500">
                          No {ticketTypeFilter !== "All" ? ticketTypeFilter.toLowerCase() : ""} tickets found
                          {clientFilter !== "All" ? ` for ${clientFilter}` : ""}
                          {userFilter !== "All" ? ` assigned to ${userFilter}` : ""}
                          {dateFilter !== "All" ? ` from ${dateFilter.toLowerCase()}` : ""}
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
              <div className="flex-1 bg-white p-4 rounded-lg overflow-y-auto flex flex-col-reverse">
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