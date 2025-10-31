import React, { useState } from "react";
import EditProfile from "./EditProfile";
import AccountSettings from "./AccountSettings";
import SocialAccounts from "./SocialAccounts";
import TeamMembers from "./TeamMembers";

const tabs = [
  { id: "editProfile", label: "Edit Profile", component: <EditProfile /> },
  { id: "accountSettings", label: "Account Settings", component: <AccountSettings /> },
  { id: "socialAccounts", label: "Social Accounts", component: <SocialAccounts /> },
  { id: "teamMembers", label: "Team Members", component: <TeamMembers /> },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("editProfile");

  return (
    <div className="mx-auto  bg-white rounded-lg shadow">
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 pt-6 border-b rounded-t-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-2 font-semibold border-b-4 transition-colors ${
              activeTab === tab.id
                ? "border-black text-blue-600"
                : "border-transparent hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 sm:p-6">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default Tabs;
