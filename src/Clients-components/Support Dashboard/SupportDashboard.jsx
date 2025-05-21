import React, { useState } from "react";
import image1 from "../../assets/Contact-support/image-1.png";
import image2 from "../../assets/Contact-support/image-2.png";
import image3 from "../../assets/Contact-support/image-3.png";
import image4 from "../../assets/Contact-support/image-4.png";
import ClientNav from "../Client-Navbar/ClientNav";


const supportOptions = [
  { name: "Ticket Status", image: image1 },
  { name: "Chat Support", image: image2 },
  { name: "Email Support", image: image3 },
  { name: "Voice Support", image: image4 },
];

const tickets = [
  { id: 45436, category: "Payment", date: "2-2-2021", status: "Resolved", assignedTo: "Name" },
  { id: 45436, category: "Payment", date: "2-2-2021", status: "Closed", assignedTo: "Name" },
  { id: 45436, category: "Payment", date: "2-2-2021", status: "Resolved", assignedTo: "Name" },
];

const SupportDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Ticket Status");

  return (
    <>
    <ClientNav />
    <div className="flex h-auto bg-gray-100 p-4">
      <aside className="w-1/5 bg-white p-4 rounded-lg shadow-md">
        {supportOptions.map((option) => (
          <div
            key={option.name}
            className={`p-4 mb-2 cursor-pointer border border-[#BCBCBC] rounded-lg ${selectedOption === option.name ? "bg-blue-200" : "bg-gray-50"}`}
            onClick={() => setSelectedOption(option.name)}
          >
            <img src={option.image} alt={option.name} className="w-full h-24 object-fill" />
            <p className="text-center mt-2 font-semibold">{option.name}</p>
          </div>
        ))}
      </aside>
      <main className="flex-1 bg-white p-6 rounded-lg shadow-md ml-4">
        {selectedOption === "Ticket Status" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Ticket</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Ticket No</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Assigned to</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-center">{ticket.id}</td>
                    <td className="p-2 text-center">{ticket.category}</td>
                    <td className="p-2 text-center">{ticket.date}</td>
                    <td className="p-2 text-center">
                      <span className={`px-3 py-1 rounded-full text-white ${ticket.status === "Resolved" ? "bg-green-400" : "bg-purple-400"}`}>{ticket.status}</span>
                    </td>
                    <td className="p-2 text-center">{ticket.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedOption === "Chat Support" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Executive Name</h2>
            <div className="bg-gray-100 p-4 rounded-lg h-80 flex flex-col justify-end">
              <div className="text-left bg-blue-200 p-3 rounded-lg max-w-xs">User's message</div>
              <div className="text-right bg-yellow-200 p-3 rounded-lg max-w-xs mt-2 ml-auto">Executive's response</div>
            </div>
            <div className="flex items-center mt-4 border p-2 rounded-lg">
              <input type="text" className="flex-1 p-2" placeholder="Type a message..." />
              <button className="ml-2 bg-yellow-500 text-white p-2 rounded">Send</button>
            </div>
          </div>
        )}

        {selectedOption === "Email Support" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Email Support</h2>
            <img src="/email-support.png" alt="Email Support" className="w-48 mx-auto mb-4" />
            <p className="text-lg">support@livyco.com</p>
          </div>
        )}

        {selectedOption === "Voice Support" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Voice Support</h2>
            <img src="/voice-support.png" alt="Voice Support" className="w-48 mx-auto mb-4" />
            <p className="text-lg">6958524871</p>
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default SupportDashboard;
