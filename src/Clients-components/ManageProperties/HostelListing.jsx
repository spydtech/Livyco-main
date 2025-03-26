import React, { useState, useEffect } from "react";

const HostelListing = ({ setShowTracker }) => {
  const [hostelData, setHostelData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePostPopup, setdeletePostPopup] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    // Check if propertyData exists in localStorage
    const savedPropertyData = JSON.parse(localStorage.getItem("propertyData"));
    const savedImages = JSON.parse(localStorage.getItem("images"));

    if (savedPropertyData) {
      setHostelData({ ...savedPropertyData, images: savedImages || [] });
    } else {
      setHostelData(null); // Ensure no empty object is set
    }
  }, []);

  return (
    <div className="text-black min-h-screen p-4 space-y-6">
      {/* Active Hostel Listing */}
      {!isDeleted && hostelData ? (
        <div className="border border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{hostelData.name}</h2>
              <p className="text-sm text-gray-400 flex items-center">
                📍 {hostelData.street}, {hostelData.locality}, {hostelData.city}
              </p>
            </div>
            {hostelData.images.length > 0 ? (
              <img
                src={hostelData.images[0]} // Show first image
                alt="Hostel"
                className="w-16 h-16 rounded"
              />
            ) : (
              <div className="w-16 h-16 border border-gray-500 flex items-center justify-center">
                <span className="text-gray-500">🖼️</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowTracker(true)}
            className="bg-blue-600 text-black py-2 px-4 rounded w-full mt-3"
          >
            Update
          </button>
          <div className="flex justify-between items-center mt-3">
            <span className="text-green-500">● Active</span>
            <button
              className="text-blue-400 border border-blue-400 px-3 py-1 rounded"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Listing
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No hostel listing available.</p>
      )}

      {/* Inactive Hostel Listing */}
      <div>
        <button className="flex items-center text-gray-400">
          <span className="text-xl mr-2">➕</span> Add a new branch
        </button>
        <h3 className="text-lg font-semibold mt-4">
          Pick Up where you left (1)
        </h3>
        <div className="border border-gray-700 rounded-lg p-4 mt-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Abc Boys Hostel</h2>
              <p className="text-sm text-gray-400 flex items-center">
                📍 P,No 123,abc, dfg xxxx, Hyd 5xxxxx
              </p>
            </div>
            <div className="w-16 h-16 border border-gray-500 flex items-center justify-center">
              <span className="text-gray-500">🖼️</span>
            </div>
          </div>
          <button className="border border-blue-400 text-blue-400 py-2 px-4 rounded w-full mt-3">
            EDIT
          </button>
          <div className="mt-3 text-gray-400">● Inactive</div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 font-medium">
              You have successfully listed your property.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Delete Confirmation"
              className="mx-auto mb-4"
            />
            <p className="text-gray-700 font-medium">
              Do you wish to delete this post?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setShowDeletePopup(false);
                  setdeletePostPopup(true);
                }}
              >
                YES
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowDeletePopup(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {deletePostPopup && (
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/a526/496f/ad3822a3a9f22aeab19bf9f6438a4c1a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mjq20rC~PIpgGRcXCUGptoaYV6FzM1BMUidxYgm~NDXE9EVipSKITIkJR7C13ezgglrY5XHw7-X6oHr8n1HFRflXCZ8PefYrLKXY-OomEBCjKxzrQRQ49yRCQd2XtnTkUYK7kr-pIY5~oY0Azho~k~PU6fY9-nOaWVUkxUCOUssZ7WbtYOc07R1JuUD49vY87yyG28oXxhMf4C0u0YcxvSog3vgOqmHiTFAHgIOM3TYX~Uio0-Jra~6Ra3nEgN2PScEWRd822djMdJoi-Q6w8mg1CYO7FVyft16pvd7WYh8tB4lVrGriz~DovM9mt~9~FGIkjs02ouLafMFiDG8XRw__"
              alt="Success"
              className="mx-auto w-24 h-24 mb-4"
            />
            <p className="text-gray-700 font-medium">
              Post deleted successfully!
            </p>
            {/* <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => setdeletePostPopup(false)}
            >
              OK
            </button> */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => {
                setdeletePostPopup(false);
                setIsDeleted(true);
                localStorage.removeItem("propertyData"); // Remove hostel data
                localStorage.removeItem("images"); // Remove images
                setHostelData(null); // Ensure the UI updates immediately
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="justify-center items-center flex w-full">
        <button
          className="bg-[#fee123] text-black px-10 py-3 rounded-md"
          onClick={() => setShowTracker(true)} // Ensure tracker is shown
        >
          List New Property
        </button>
      </div>
    </div>
  );
};

export default HostelListing;
