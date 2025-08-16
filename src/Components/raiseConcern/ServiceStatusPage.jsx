import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header"; // Import Header component

const ServiceStatus = () => {
  const location = useLocation();
  const data = location.state;

  const [status, setStatus] = useState("raised");
  const [raisedAt] = useState(() => new Date());
  const [cancelledAt, setCancelledAt] = useState(null);

  if (!data) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No Request Found</h2>
        <p className="text-gray-500">Please raise a concern first.</p>
      </div>
    );
  }

  const {
    type,
    room,
    bed,
    sharing,
    floor,
    currentsharing,
    comment,
    currentRoom,
    currentBed,
    originalRoom,
    originalBed,
    originalSharing,
  } = data;

  const handleCancel = () => {
    if (status === "cancelled") return;
    const confirmed = window.confirm("Are you sure you want to cancel the request?");
    if (!confirmed) return;
    setStatus("cancelled");
    setCancelledAt(new Date());
  };

  const formatDate = (d) => {
    if (!d) return "";
    // show in locale with seconds
    return d.toLocaleString("en-IN", { hour12: false });
  };

  return (
    <>
    <Header />
      <div className="flex justify-between py-6 px-14">
        <div className="p-4 rounded-md  mt-10 ">
          <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-10">
            <p>Current Room/Bed Details :</p>
            <div className="flex flex-wrap gap-3">
              <p className="px-10 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
                Room {currentRoom}-Bed {currentBed}
              </p>
              <p className="px-16 text-center bg-[#AFD1FF] py-1 rounded-xl text-[#257FFB]">
                {currentsharing} Sharing
              </p>
            </div>
          </div>
          <div className="flex flex-col ">
            <p> Selected Service Type :</p>
            <div className="border flex justify-between px-2 text-gray-400">
              <p>{type}</p>
              <p className="rotate-[90deg]">&gt;</p>
            </div>
          </div>

          {type === "bed-change" && (
            <div className=" flex items-center gap-10 justify-start mt-5 space-y-3">
              <p>Preferred Bed :</p>
              <div className="relative flex items-center justify-center w-14 h-10 rounded-lg overflow-hidden   select-none transition">
                <div className={` bg-[#FFBD15] absolute inset-0 rounded-lg`} />
                <div className={`absolute z-20 text-sm font-medium   `}>
                  {room}-{bed}
                </div>
                <div
                  className={`absolute right-0 top-0 w-3 h-6 bg-[#BCBCBC]  rounded-sm`}
                  style={{ transform: "translate(0.30rem, 33%)" }}
                />
              </div>
              {originalRoom && originalBed && (
                <div className="ml-6">
                  <p className="text-sm text-gray-500">Original:</p>
                  <div className="text-xs">
                    Room {originalRoom}-Bed {originalBed}
                  </div>
                </div>
              )}
            </div>
          )}

          {type === "room-change" && (
            <>
              <div className="p-4 bg-white rounded-md">
                <h3 className="  mb-2">Preferred Sharing: </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Single", "Double", "Triple", "Four", "Five", "Six"].map(
                    (text) => (
                      <div
                        key={text}
                        className={`flex flex-col items-center justify-center h-20 border rounded-xl font-medium cursor-pointer transition
                          ${sharing === text
                            ? "bg-gray-300"
                            : "bg-white text-gray-500"
                          } `}
                      >
                        <p>{text}</p>
                        <p>Sharing</p>
                      </div>
                    )
                  )}
                </div>
                {floor != null && (
                  <div className="mt-4">
                    <p className="text-sm mb-1">Preferred Floor:</p>
                    <div className="inline-block px-3 py-1 bg-[#E5E7EB] rounded-full text-sm">
                      Floor {floor}
                    </div>
                  </div>
                )}
                {room && bed && (
                  <div className="mt-4 flex items-center gap-4">
                    <p className="text-sm">Preferred Bed:</p>
                    <div className="relative flex items-center justify-center w-14 h-10 rounded-lg overflow-hidden select-none transition">
                      <div
                        className={` bg-[#FFBD15] absolute inset-0 rounded-lg`}
                      />
                      <div className={`absolute z-20 text-sm font-medium   `}>
                        {room}-{bed}
                      </div>
                      <div
                        className={`absolute right-0 top-0 w-3 h-6 bg-[#BCBCBC]  rounded-sm`}
                        style={{ transform: "translate(0.30rem, 33%)" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {type === "other-services" && (
            <div>
              <div className="pt-5  bg-white rounded-md">
                <h3 className="mb-2">Reason for request</h3>
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your comment..."
                  value={comment}
                  rows={3}
                  disabled
                />
              </div>
             
            </div>
          )}
        </div>

        <div className="hidden md:flex flex-col items-start ml-10 mt-12 space-y-8 min-w-[220px]">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${status === "raised" ? "bg-green-600" : "bg-gray-400"
                }`}
            />
            <div>
              <p className="font-medium">Request raised</p>
              <p className="text-xs text-gray-500">{formatDate(raisedAt)}</p>
            </div>
          </div>
          <div className="border-l-2 border-dashed border-gray-400 h-8 ml-[7px]" />
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${status === "cancelled" ? "bg-red-600" : "bg-green-600"
                }`}
            />
            <p
              className={`font-medium ${status === "cancelled" ? "text-black" : " text-gray-600"
                }`}
            >
              {status === "cancelled" ? "Request Cancelled" : "Request Received"}
            </p>
          </div>
          {status === "cancelled" && (
            <>
              <div className="border-l-2 border-dashed border-gray-400 h-8 ml-[7px]" />
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
                <div>
                  <p className="font-medium">Final State</p>
                  <p className="text-xs text-gray-500">
                    Cancelled at {formatDate(cancelledAt)}
                  </p>
                </div>
              </div>
            </>
          )}
          {status === "raised" && (
            <>
              <div className="border-l-2 border-dashed border-gray-400 h-8 ml-[7px]" />
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
                <div>
                  <p className="font-medium"> Request approved  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(cancelledAt)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center items-center ">
        <button
          className="bg-[#0827B2] text-white px-8 py-2 rounded-xl w-full sm:w-auto"
          onClick={handleCancel}
          disabled={status === "cancelled"}
        >
          {status === "cancelled" ? "Request Cancelled" : "Cancel request"}
        </button>
      </div>
    </>
  );
};

export default ServiceStatus;
