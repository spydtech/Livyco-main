import React, { useState, useRef, useEffect } from "react";
import image1 from "../../assets/Contact-support/image-1.png";
import image2 from "../../assets/Contact-support/image-2.png";
import Header from "../Header";
import { userAPI, ticketAPI } from "../../Clients-components/PropertyController";

// User-only support options (Ticket Status and Chat Support only)
const userSupportOptions = [
  { name: "Ticket Status", image: image1 },
  { name: "Chat Support", image: image2 },
];

const UserSupportPage = () => {
  const [selectedOption, setSelectedOption] = useState("Ticket Status");
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    phone: "",
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
      phone: newTicket.phone || "", // Added phone field
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
      setNewTicket({ name: "", email: "", phone: "", reason: "", comment: "" });
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
    setNewTicket({ name: "", email: "", phone: "", reason: "", comment: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6 pt-24">
        <div className="flex h-[calc(100vh-96px)] gap-6">
          {/* Sidebar - Only shows 2 options for users */}
          <aside className="w-1/5 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            {userSupportOptions.map((option) => (
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
          <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-auto">
            {/* Ticket Status */}
            {selectedOption === "Ticket Status" && (
              <div className="h-full flex flex-col">
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
                  <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-gray-200 flex-1">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-4 text-left font-semibold text-gray-700">Ticket No</th>
                          <th className="p-4 text-left font-semibold text-gray-700">Category</th>
                          <th className="p-4 text-left font-semibold text-gray-700">E-mail</th>
                          <th className="p-4 text-left font-semibold text-gray-700">Phone</th>
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
                              <td className="p-4 text-gray-600">{ticket.phone || "N/A"}</td>
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
                            <td colSpan="7" className="p-8 text-center text-gray-500">
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
              <div className="flex flex-col h-full">
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
          </main>
        </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Email Address *
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

                {/* Phone Field - NEW */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={newTicket.phone}
                    onChange={(e) => setNewTicket({ ...newTicket, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Reason Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Category *
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
                  Description *
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
    </div>
  );
};

export default UserSupportPage;