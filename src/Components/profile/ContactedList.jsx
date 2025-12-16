import React, { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { contactAPI } from "../../Clients-components/PropertyController";

const ContactedList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await contactAPI.getUserContacts();
        setContacts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* TAB BAR */}
      <div className="pt-24 bg-white px-4">
        <div className="flex items-center justify-center gap-12 border-b">
          <button
            onClick={() => navigate("/user/chats")}
            className="text-gray-600 py-4 text-lg"
          >
            Chat
          </button>

          <button className="text-black font-semibold py-4 border-b-4 border-black text-lg">
            Contacted
          </button>
        </div>
      </div>

      {/* CONTACT LIST */}
      <div className="px-4 mt-4">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No Contacts Found</p>
        ) : (
          contacts.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        item.ownerImage ||
                        item.clientPhoto || // Use clientPhoto from the contact
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      className="w-14 h-14 rounded-full object-cover"
                      alt="owner"
                      onError={(e) => {
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.clientName || "Owner Name"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.contactedAt
                        ? new Date(item.contactedAt).toLocaleDateString() +
                          " " +
                          new Date(item.contactedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "DD/MM/YYYY HH:MM"}
                    </p>
                  </div>
                </div>

                {/* Right Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (item.clientPhone)
                        window.location.href = `tel:${item.clientPhone}`;
                    }}
                    className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <Phone className="w-6 h-6 text-black" />
                  </button>

                  <button
                    onClick={() => navigate("/user/chats")}
                    className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <MessageCircle className="w-6 h-6 text-black" />
                  </button>
                </div>
              </div>

              <hr className="mt-4" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactedList;