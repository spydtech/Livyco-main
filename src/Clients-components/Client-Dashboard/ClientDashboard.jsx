import React, { useState } from "react";
import { FaUtensils, FaBed, FaUsers, FaWallet } from "react-icons/fa";
import { MdError, MdOutlineLogout, MdCheckCircle } from "react-icons/md";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line, Doughnut, Bar } from "react-chartjs-2";
  import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import ClientNav from "../Client-Navbar/ClientNav";
  
  // Register Chart.js components
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    Title
  );

const ClientDashboard = () => {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [selectedMonth, setSelectedMonth] = useState("August");
  
    const lineData = {
      labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
      datasets: [
        {
          label: "Total Income",
          data: [150000, 180000, 200000, 190000, 220000, 250000, 230000, 228121],
          borderColor: "#16A34A",
          backgroundColor: "rgba(22, 163, 74, 0.2)",
          borderWidth: 3,
          tension: 0.4,
        },
        {
          label: "Total Expenses",
          data: [100000, 120000, 140000, 130000, 150000, 170000, 160000, 126169],
          borderColor: "#DC2626",
          backgroundColor: "rgba(220, 38, 38, 0.2)",
          borderWidth: 0,
          tension: 0.4,
        },  
      ],
    };
  
    const donutData = {
      labels: ["Occupied Beds", "Ready to Fill", "Present Tenants", "Absent Tenants"],
      datasets: [
        {
          data: [270, 30, 73, 17],
          backgroundColor: ["#2563EB", "#FACC15", "#10B981", "#EF4444"],
          hoverOffset: 10,
        },
      ],
    };
  
    const barData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Check-ins",
          data: [20, 30, 40, 25, 50, 35, 45],
          backgroundColor: "#2563EB",
        },
        {
          label: "Check-outs",
          data: [10, 15, 20, 10, 25, 15, 20],
          backgroundColor: "#93C5FD",
        },
      ],
    };

  return (
    <div>
        <ClientNav />
        <h2 className="text-xl font-semibold mb-6 p-6">Home / Tenant Request</h2>
    <div className="p-6 bg-white  min-h-screen flex flex-col-2">
      {/* Heading */}
      
      <div>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mb-10">
        <StatCard title="Pending Request" value="N" color="#204CAF" icon={<MdError />} />
        <StatCard title="Active Issues" value="N" color="#9B3536" icon={<MdError />} />
        <StatCard title="Check Out Requests" value="N" color="#AF2078" icon={<MdOutlineLogout />} />
        <StatCard title="Food Menu" value="N" color="#AF5420" icon={<FaUtensils />} />
        <StatCard title="Rent to be collected" value="₹N / ₹00000" color="#4DAF20" icon={<FaWallet />} />
        <StatCard title="Current Occupants" value="N" color="#AFA120" icon={<FaUsers />} />
        <StatCard title="Bed Counts" value="N" color="#20A8AF" icon={<FaBed />} />
        <StatCard title="Total Guests" value="N" color="#8420AF" icon={<FaUsers />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
        {/* Line Chart */}
        <div className="bg-blue-200 p-4 rounded-lg shadow w-[500px] h-[400px]">
          <h3 className="text-lg font-semibold mb-4">Transition Analysis Chart</h3>
          <FormControl className="mr-4 gap-2">
            <InputLabel className="bg-white p-2">Choose Year</InputLabel>
            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel className="bg-white p-2">Choose Month</InputLabel>
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
            </Select>
          </FormControl>
          <Line data={lineData} />
        </div>

       
         {/* Donut & Bar Chart */}
         <div className="bg-blue-200 p-0 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 p-4">Daily Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 p-4">
            <div className="flex justify-center w-[200px] h-[250px]">
              <Doughnut data={donutData} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="flex justify-center w-[200px] h-[250px]">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      
  {/* <style jsx>
    {`
    .chart-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  justify-items: center;
}

@media (min-width: 768px) {
  .chart-container {
    grid-template-columns: 1fr 1fr;
  }
}

.chart-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 250px;
//   background: white;
  padding: 10px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

    `}
  </style> */}
      </div>

     

       
      
      </div>

     
       {/* Payment Section */}
      <div className=" mx-auto gap-y-10 py-4 space-y-10">
        <TenantCard name="Tenant Name" amount="₹10,000" status="Received" />
        <TenantCard name="Tenant Name" amount="₹10,000" status="Received" />
        <TenantCard name="Tenant Name" amount="₹10,000" status="Pending" />
        <TenantCard name="Tenant Name" amount="₹10,000" status="Pending" />
      </div>
    
    </div>
    </div>
  );
};

// Component: Statistics Card
const StatCard = ({ title, value, color, icon }) => (
  <div
    className="text-white p-4 rounded-lg flex flex-col items-center justify-center h-[150px] w-[230px] shadow-lg"
    style={{ backgroundColor: color }}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-xl">{value}</p>
  </div>
);

// Component: Tenant Payment Card
const TenantCard = ({ name, amount, status }) => (
  <div className={`p-4 h-[100px] w-[350px]   rounded-lg shadow flex justify-between items-center ${status === "Pending" ? "bg-blue-100" : "bg-green-100"}`}>
    <div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm">Amount: {amount}</p>
    </div>
    {status === "Pending" ? (
      <button className="bg-red-500 text-white px-3 py-1 rounded">Notify</button>
    ) : (
      <MdCheckCircle className="text-green-500 text-2xl" />
    )}
  </div>
);

export default ClientDashboard;
