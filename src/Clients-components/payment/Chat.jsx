import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Phone, MoreVertical } from 'lucide-react';

const dummyContacts = [
  { id: 1, name: "Alice Johnson", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "UPI", DOP: "2/08/2025", rent: "8000", room: "201", bed: "A" },
  { id: 2, name: "Bob Smith", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "Paytm", DOP: "31/07/2025", rent: "4000", room: "202", bed: "B" },
  { id: 3, name: "Charlie Brown", image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", mode: "VISA", DOP: "4/08/2025", rent: "8000", room: "203", bed: "C" },
];

const initialMessages = {
  1: [
    { id: 1, sender: "Alice", text: "Hey there!", time: "10:00 AM", type: 'text' },
    { id: 2, sender: "You", text: "Hi Alice!", time: "10:01 AM", type: 'text' },
  ],
  2: [
    { id: 1, sender: "Bob", text: "Hey there!", time: "9:00 AM", type: 'text' },
    { id: 2, sender: "You", text: "Hi Bob!", time: "9:02 AM", type: 'text' },
  ],
  3: [
    { id: 1, sender: "Charlie", text: "Hey there!", time: "11:30 AM", type: 'text' },
    { id: 2, sender: "You", text: "Hi Charlie!", time: "11:31 AM", type: 'text' },
  ],
};
const getDaysLate = (dopString) => {
  const [day, month, year] = dopString.split('/').map(Number);
  const dopDate = new Date(year, month - 1, day);
  const today = new Date();

  const diffTime = today - dopDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};


export default function ChatApp() {
  const navigate = useNavigate();
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [messagesByContact, setMessagesByContact] = useState(initialMessages);
  const [requestpay, setrequestpay] = useState(false);

  const contact = dummyContacts.find(c => c.id === selectedContactId);
  const messages = messagesByContact[selectedContactId] || [];

  const handleSend = () => {
    const newMessages = [];

    if (requestpay) {
      newMessages.push({
        id: Date.now(),
        sender: "You",
        type: 'requestpay',
        amount: contact?.rent || 0,
        requestedTo: contact?.name || '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
      });
    }

    if (messageInput.trim() !== '') {
      newMessages.push({
        id: Date.now() + 1,
        sender: "You",
        text: messageInput,
        type: 'text',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
      });
    }

    if (newMessages.length > 0) {
      setMessagesByContact(prev => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), ...newMessages],
      }));
    }

    setMessageInput('');
    setrequestpay(false);
  };

  const handlePayRefund = () => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: "₹2500 refunded successfully",
      type: 'text',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
    };
    setMessagesByContact(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
    }));
  };

  return (
    <>
      <div className="  bg-cover bg-center bg-no-repeat font-sans px-20 py-5" style={{ backgroundImage: "url('./src/assets/images/image.png')" }}>
        {/* Top Buttons */}
        <div className="flex gap-1 mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center px-2 py-2 rounded <button></button>">Home</button>
          <div className='flex items-center justify-center'>/</div>
          <button className="flex items-center px-2 py-2 rounded <button>">Tenant List</button>
        </div>

        {/* Main Chat Layout */}
        <div className="flex gap-16 h-screen">
          {/* Contact List */}
          <div className="w-1/4 bg-[#ffffff] border-r overflow-y-auto p-2 rounded-md shadow-md">
            {dummyContacts.map((contact) => (
              <div key={contact.id} onClick={() => setSelectedContactId(contact.id)} className={`p-4 cursor-pointer mb-4 rounded-md shadow-md hover:bg-[#AFD1FF] ${contact.id === selectedContactId ? 'bg-[#AFD1FF] font-semibold' : ''}`}>
                <div className="flex gap-2 items-center">
                  <img src={contact.image} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col text-sm w-full">
                    <p className="font-bold mb-1">Payment From</p>
                    <div className="flex justify-between w-full text-gray-800">
                      <p>{contact.name}</p>
                      <p className="text-medium text-gray-500 mt-1">₹{parseFloat(contact.rent).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-gray-500 items-center gap-2 text-xs mt-1">
                  <p>Paid via</p>
                  <span className="border px-1 py-[1px] rounded text-[10px] font-bold">{contact.mode}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{contact.DOP}</p>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white rounded-md shadow-md">
            <div className="border-b bg-[#AFD1FF] p-4 font-semibold flex items-center gap-4 justify-between">
              <div className='flex items-center gap-2'>
                <img src={contact?.image} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p>{contact?.name}</p>
                  <p className="text-xs text-gray-500">Room: {contact?.room} {contact?.bed}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MessageCircle className="w-4 h-4 text-white" /></button></div>
                <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><Phone className="w-4 h-4 text-white" /></button></div>
                <div className='w-7 h-7 bg-[#0827B2] flex justify-center items-center rounded-full'><button className='cursor-pointer'><MoreVertical className="w-4 h-4 text-white" /></button></div>
              </div>
            </div>

            {!requestpay && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                    <>
                      {msg.type === 'requestpay' && (
                        <div className='flex flex-col'>
                          <div className="bg-[#AFD1FF] border border-blue-300 p-4 rounded-xl max-w-xs">
                            <p className="text-sm">Request From You</p>
                            <p className="text-2xl font-bold text-black">₹{msg.amount}/-</p>
                            <p className="text-xs text-gray-500 mt-1">
                              almost {getDaysLate(contact.DOP)} day{getDaysLate(contact.DOP) !== 1 ? 's' : ''} are over...
                            </p>

                          </div>
                          <div className='flex gap-2'>
                            <p className="text-[11px] mt-1">On {msg.date}</p>
                            <p className="text-[11px] mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                      {msg.type === 'text' && (
                        <div className='flex flex-col'>
                          <div className={`px-4 py-2 rounded-lg max-w-xs bg-[#AFD1FF]`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <div className='flex gap-2'>
                            <p className="text-[11px] mt-1">{msg.date}</p>
                            <p className="text-[11px] mt-1">{msg.time}</p>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            )}

            {requestpay && (
              <div className="flex-1 p-4">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <img src={contact?.image} alt="profile" className="w-24 h-24 rounded-full object-cover mb-2" />
                  <p className="text-center font-semibold">Requesting Rent From {contact?.name}</p>
                  <div className="border-2 px-4 rounded-lg text-center text-2xl font-semibold">₹{contact?.rent}</div>
                </div>
              </div>
            )}

            {!requestpay && (
              <div className="border-t p-4 flex items-end gap-4">
                <button onClick={() => setrequestpay(true)} className="flex-1 bg-[#FEE123] py-2 rounded">Request Pay</button>
                <button onClick={handlePayRefund} className="flex-1 border border-[#FEE123] text-[#FEE123] py-2 rounded">Pay Refund</button>
              </div>
            )}

            {requestpay && (
              <div className="border-t p-4 flex gap-2">
                <input type="text" placeholder="Type a message..." className="flex-1 border p-2 rounded" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded">Send</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
