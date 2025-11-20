import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { vacateAPI, concernAPI, propertyAPI, bookingAPI } from "../PropertyController";

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
    const [checkoutRequestsCount, setCheckoutRequestsCount] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [activeIssuesCount, setActiveIssuesCount] = useState(0);

    // Fetch checkout requests count
    useEffect(() => {
        const fetchCheckoutRequestsCount = async () => {
            try {
                const response = await vacateAPI.getVacateRequests();
                if (response.data?.success && response.data.requests) {
                    setCheckoutRequestsCount(response.data.requests.length);
                }
            } catch (error) {
                console.error("Error fetching checkout requests count:", error);
            }
        };

        fetchCheckoutRequestsCount();
    }, []);

    // Fetch pending tenant requests count (from booking API)
    useEffect(() => {
        const fetchPendingTenantRequests = async () => {
            try {
                console.log("Fetching pending tenant requests...");
                const response = await bookingAPI.getBookingsByProperty();
                console.log("Full Bookings API Response:", response);
                
                if (response.data.success && Array.isArray(response.data.bookings)) {
                    // Count ALL bookings since TenantRequestTable shows all of them
                    const totalBookings = response.data.bookings.length;
                    
                    console.log(`Total bookings: ${totalBookings}`);
                    setPendingRequestsCount(totalBookings);
                } else {
                    console.log("No bookings found or invalid response structure");
                    setPendingRequestsCount(0);
                }
            } catch (error) {
                console.error("Error fetching pending tenant requests:", error);
            }
        };

        fetchPendingTenantRequests();
    }, []);

    // Fetch active issues count (service requests) - FIXED VERSION
    useEffect(() => {
        const fetchActiveIssuesCount = async () => {
            try {
                console.log("Fetching active issues count...");
                const propertiesResponse = await propertyAPI.getProperty();
                console.log("Properties API Response:", propertiesResponse);
                
                if (propertiesResponse.data.success && propertiesResponse.data.data) {
                    const properties = propertiesResponse.data.data;
                    console.log("Client Properties:", properties);
                    
                    let totalActiveCount = 0;
                    
                    // Fetch concerns for each property and count active issues
                    for (const property of properties) {
                        try {
                            const propertyId = property.property._id;
                            console.log(`Fetching concerns for property: ${propertyId}`);
                            
                            const concernsResponse = await concernAPI.getPropertyConcerns(propertyId);
                            console.log(`Concerns for property ${propertyId}:`, concernsResponse);
                            
                            if (concernsResponse.data.success && concernsResponse.data.concerns) {
                                const concerns = concernsResponse.data.concerns;
                                console.log(`Found ${concerns.length} concerns for property ${propertyId}`);
                                
                                // Count active issues - based on ServiceRequests page logic
                                // Active issues are: pending + approved (but not completed/rejected/cancelled)
                                const activeConcerns = concerns.filter(concern => 
                                    concern.status === 'pending' || concern.status === 'approved'
                                );
                                
                                console.log(`Active concerns for property ${propertyId}:`, activeConcerns.length);
                                totalActiveCount += activeConcerns.length;
                                
                                // Log status breakdown for debugging
                                const statusCount = {};
                                concerns.forEach(concern => {
                                    statusCount[concern.status] = (statusCount[concern.status] || 0) + 1;
                                });
                                console.log(`Status breakdown for property ${propertyId}:`, statusCount);
                            } else {
                                console.log(`No concerns found for property ${propertyId}`);
                            }
                        } catch (error) {
                            console.error(`Error fetching concerns for property ${property.property._id}:`, error);
                            console.log("Error details:", error.response?.data);
                        }
                    }
                    
                    console.log(`Total active issues across all properties: ${totalActiveCount}`);
                    setActiveIssuesCount(totalActiveCount);
                } else {
                    console.log("No properties found or invalid response structure");
                    setActiveIssuesCount(0);
                }
            } catch (error) {
                console.error("Error fetching active issues count:", error);
                console.log("Error details:", error.response?.data);
            }
        };

        fetchActiveIssuesCount();
    }, []);

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
        <div className="min-h-screen bg-white">
            <ClientNav />
            <h2 className="text-xl font-semibold mb-6 p-4 md:p-6">Home / Tenant Request</h2>
        
        <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
            {/* Stats Grid */}
            <div className="max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Pending Request" value={pendingRequestsCount} color="#204CAF" icon={<MdError />} link="/client/tenantrequest" />
                <StatCard title="Active Issues" value={activeIssuesCount} color="#9B3536" icon={<MdError />} link="/client/servicerequests" />
                <StatCard title="Check Out Requests" value={checkoutRequestsCount} color="#AF2078" icon={<MdOutlineLogout />} link="/client/checkoutrequest" />
                <StatCard title="Food Menu" value="N" color="#AF5420" icon={<FaUtensils />} link="/client/foodmenu" />
                <StatCard title="Rent to be collected" value="₹N / ₹00000" color="#4DAF20" icon={<FaWallet />} link="/rent-collection" />
                <StatCard title="Current Occupants" value="N" color="#AFA120" icon={<FaUsers />} link="/current-occupants" />
                <StatCard title="Bed Counts" value="N" color="#20A8AF" icon={<FaBed />} link="/bed-counts" />
                <StatCard title="Total Guests" value="N" color="#8420AF" icon={<FaUsers />} link="/total-guests" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                {/* Line Chart */}
                <div className="bg-blue-200 p-4 rounded-lg shadow w-full h-auto min-h-[400px]">
                <h3 className="text-lg font-semibold mb-4">Transition Analysis Chart</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <FormControl className="w-full sm:w-auto">
                    <InputLabel className="bg-white p-2">Choose Year</InputLabel>
                    <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <MenuItem value="2024">2024</MenuItem>
                        <MenuItem value="2025">2025</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl className="w-full sm:w-auto">
                    <InputLabel className="bg-white p-2">Choose Month</InputLabel>
                    <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        <MenuItem value="August">August</MenuItem>
                        <MenuItem value="September">September</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <div className="h-64 md:h-80">
                    <Line data={lineData} options={{ maintainAspectRatio: false }} />
                </div>
                </div>

                {/* Donut & Bar Chart */}
                <div className="bg-blue-200 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Daily Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-center w-full h-48 md:h-64">
                    <Doughnut data={donutData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <div className="flex justify-center w-full h-48 md:h-64">
                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Payment Section */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4">
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
const StatCard = ({ title, value, color, icon, link }) => (
    <Link to={link} className="no-underline">
        <div
        className="text-white p-4 rounded-lg flex flex-col items-center justify-center h-32 w-full shadow-lg cursor-pointer transition-transform transform hover:scale-105"
        style={{ backgroundColor: color }}
        >
        <div className="text-2xl md:text-3xl mb-2">{icon}</div>
        <h4 className="text-sm md:text-lg font-semibold text-center">{title}</h4>
        <p className="text-base md:text-xl">{value}</p>
        </div>
    </Link>
);

// Component: Tenant Payment Card
const TenantCard = ({ name, amount, status }) => (
    <div className={`p-4 w-full rounded-lg shadow flex justify-between items-center ${status === "Pending" ? "bg-blue-100" : "bg-green-100"}`}>
        <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm">Amount: {amount}</p>
        </div>
        {status === "Pending" ? (
        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Notify</button>
        ) : (
        <MdCheckCircle className="text-green-500 text-2xl" />
        )}
    </div>
);

export default ClientDashboard;