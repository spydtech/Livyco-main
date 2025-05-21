import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import ClientNav from "../Client-Navbar/ClientNav";

const users = [
  { id: 1, name: "Tenant Name 1", image: "/avatar1.jpg", status: "online" },
  { id: 2, name: "Tenant Name 2", image: "/avatar2.jpg", status: "away" },
  { id: 3, name: "Tenant Name 3", image: "/avatar3.jpg", status: "online" },
];

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState({
    1: [{ text: "Hello!", sender: "other" }, { text: "How are you?", sender: "self" }],
    2: [{ text: "Hey!", sender: "other" }],
    3: [{ text: "Good morning!", sender: "other" }],
  });

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser.id]: [...prevMessages[selectedUser.id], { text: input, sender: "self" }],
      }));
      setInput("");
    }
  };

  return (
    <>
    <ClientNav />
    <div className="flex h-screen bg-[#F8F8FF]">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 border-r border-[#727070]">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 rounded cursor-pointer ${
              selectedUser.id === user.id ? "bg-[#FEE123]" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm text-gray-500">
                {messages[user.id]?.length > 0
                  ? messages[user.id][messages[user.id].length - 1].text
                  : "No messages yet"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-[#727070] shadow-b-lg">
          <div className="flex items-center">
            <img src={selectedUser.image} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
            <h3 className="font-bold">{selectedUser.name}</h3>
          </div>
          <button className="text-[#FEE123] text-xl">
            <FaPhoneAlt />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages[selectedUser.id]?.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg max-w-xs ${
                msg.sender === "self"
                  ? "bg-[#AFD1FF] text-white self-end ml-auto"
                  : "bg-[#FEE123] text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 flex items-center bg-white border-t">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="ml-2 text-yellow-500 text-xl">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatApp;
