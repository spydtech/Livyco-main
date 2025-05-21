import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const DashboardPage = () => {
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
        data: [15, 16, 14, 18, 20, 22, 21, 19, 23, 24, 22, 25],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  const revenueData = {
    labels: ["Expired Listings", "Rejected Listings", "Pending Approvals", "Active Listings", "Total Listings"],
    datasets: [
      {
        data: [13.83, 25.62, 21.57, 24.86, 14.32],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8D4DE8", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Core Performance Indicators */}
      <h2 className="text-xl font-bold mb-4">Core Performance Indicators</h2>
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,000", color: "bg-purple-100" },
          { label: "Active Listings", value: "1,000", color: "bg-yellow-100" },
          { label: "Monthly Revenue", value: "₹1,000", color: "bg-green-100" },
          { label: "Total Bookings", value: "1,000", color: "bg-red-100" },
        ].map((stat, index) => (
          <div key={index} className={`p-4 ${stat.color} rounded-lg shadow-md`}>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-xs text-blue-500">+8% from yesterday</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">User Growth</h3>
          <Bar data={userGrowthData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Revenue Insights</h3>
          <Pie data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
