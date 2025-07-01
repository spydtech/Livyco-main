import React, { useState } from "react";
import Tracker from "./Tracker";
import HostelListing from "./HostelListing";
import ClientNav from "../Client-Navbar/ClientNav";

function Main() {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <div className="py-4 bg-[#f8f8ff] justify-center items-center mx-2">
      <ClientNav />
      <div className="header">Home / List Properties</div>

      {/* Show HostelListing OR Tracker based on showTracker state */}
      {!showTracker ? (
        <HostelListing setShowTracker={setShowTracker} />
      ) : (
        <Tracker />
      )}
    </div>
  );
}

export default Main;
