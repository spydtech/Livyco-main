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
    const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState("August");
    const [barChartYear, setBarChartYear] = useState(new Date().getUTCFullYear().toString());
    const [checkoutRequestsCount, setCheckoutRequestsCount] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [activeIssuesCount, setActiveIssuesCount] = useState(0);
    const [currentOccupantsCount, setCurrentOccupantsCount] = useState(0);
    const [bedCounts, setBedCounts] = useState(0);
    const [totalBookingsCount, setTotalBookingsCount] = useState(0);
    const [totalAvailableBeds, setTotalAvailableBeds] = useState(0);
    const [propertiesData, setPropertiesData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);
    const [monthlyCheckIns, setMonthlyCheckIns] = useState([]);
    const [monthlyCheckOuts, setMonthlyCheckOuts] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [transitionYears, setTransitionYears] = useState([]);

    // Month names for display
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Fetch all properties and calculate total beds
    useEffect(() => {
        const fetchPropertiesAndCalculateBeds = async () => {
            try {
                console.log("Fetching properties data...");
                const response = await propertyAPI.getCompletePropertyData();
                console.log("Full Properties API Response:", response);

                if (response.data.success && Array.isArray(response.data.data)) {
                    const properties = response.data.data;
                    setPropertiesData(properties);

                    let totalBeds = 0;
                    let propertyDetails = [];

                    properties.forEach((propertyData, index) => {
                        const propertyId = propertyData.basicInfo?._id;
                        const propertyName = propertyData.basicInfo?.name;
                        const rooms = propertyData.rooms;

                        let propertyBedCount = 0;
                        let floorDetails = [];

                        if (rooms && rooms.floors && Array.isArray(rooms.floors.floors)) {
                            const floors = rooms.floors.floors;

                            floors.forEach((floor, floorIndex) => {
                                const floorNumber = floor.floor || floorIndex + 1;
                                let floorBedCount = 0;
                                let roomDetails = [];

                                if (floor.rooms && typeof floor.rooms === 'object') {
                                    const roomNumbers = Object.keys(floor.rooms);

                                    roomNumbers.forEach(roomNumber => {
                                        const beds = floor.rooms[roomNumber];

                                        if (Array.isArray(beds)) {
                                            const roomBedCount = beds.length;
                                            floorBedCount += roomBedCount;
                                            totalBeds += roomBedCount;
                                            propertyBedCount += roomBedCount;

                                            roomDetails.push({
                                                roomNumber,
                                                bedCount: roomBedCount,
                                                bedNames: beds
                                            });
                                        }
                                    });
                                }

                                floorDetails.push({
                                    floorNumber,
                                    bedCount: floorBedCount,
                                    rooms: roomDetails
                                });
                            });
                        }

                        propertyDetails.push({
                            propertyName,
                            propertyId,
                            totalBeds: propertyBedCount,
                            floors: floorDetails
                        });
                    });

                    console.log(`Total Available Beds Across All Properties: ${totalBeds}`);
                    setTotalAvailableBeds(totalBeds);

                } else {
                    console.log("❌ No properties found or invalid response structure");
                    setTotalAvailableBeds(0);
                }
            } catch (error) {
                console.error("❌ Error fetching properties data:", error);
                setTotalAvailableBeds(0);
            }
        };

        fetchPropertiesAndCalculateBeds();
    }, []);

    // Fetch all bookings data
    useEffect(() => {
        const fetchBookingsData = async () => {
            try {
                console.log("Fetching bookings data...");
                const response = await bookingAPI.getBookingsByProperty();
                console.log("Full Bookings API Response:", response);

                if (response.data.success && Array.isArray(response.data.bookings)) {
                    const bookings = response.data.bookings;
                    setBookingsData(bookings);
                    setTotalBookingsCount(bookings.length);
                    console.log("Total bookings:", bookings.length);

                    // Extract unique years from bookings data
                    const years = extractYearsFromBookings(bookings);
                    setAvailableYears(years);
                    setTransitionYears(years);

                    // Set default bar chart year to the latest year available
                    if (years.length > 0) {
                        const latestYear = years[0];
                        setBarChartYear(latestYear);
                        setSelectedYear(latestYear);

                        // Calculate monthly payments for the latest year
                        calculateMonthlyPayments(bookings, latestYear);
                    }

                    // Define statuses for filtering
                    const activeStatuses = ['confirmed', 'pending', 'active'];
                    const pendingStatuses = ['pending'];
                    const checkedOutStatuses = ['checked_out', 'cancelled', 'rejected'];

                    // Count active occupants (confirmed, pending, active but not checked_out)
                    const activeBookings = bookings.filter(booking => {
                        const status = booking.bookingStatus || booking.status;
                        return status &&
                            activeStatuses.includes(status.toLowerCase()) &&
                            !checkedOutStatuses.includes(status.toLowerCase());
                    });

                    console.log(`Active bookings: ${activeBookings.length}`);
                    setCurrentOccupantsCount(activeBookings.length);

                    // Count occupied beds from active bookings
                    const totalOccupiedBeds = activeBookings.reduce((total, booking) => {
                        if (booking.roomDetails && Array.isArray(booking.roomDetails)) {
                            return total + booking.roomDetails.length;
                        }
                        if (booking.bedCount) {
                            return total + booking.bedCount;
                        }
                        if (booking.roomDetails?.bedCount) {
                            return total + booking.roomDetails.bedCount;
                        }
                        return total + 1;
                    }, 0);

                    console.log(`Total occupied beds: ${totalOccupiedBeds}`);
                    setBedCounts(totalOccupiedBeds);

                    // Calculate monthly check-ins and check-outs for current year
                    calculateMonthlyStats(bookings, barChartYear);

                    // For pending requests, count only pending status bookings
                    const pendingBookings = bookings.filter(booking => {
                        const status = booking.bookingStatus || booking.status;
                        return status && pendingStatuses.includes(status.toLowerCase());
                    });

                    setPendingRequestsCount(pendingBookings.length);
                    console.log(`Pending bookings: ${pendingBookings.length}`);

                } else {
                    console.log("No bookings found or invalid response structure");
                    setCurrentOccupantsCount(0);
                    setBedCounts(0);
                    setTotalBookingsCount(0);
                    setPendingRequestsCount(0);
                    setAvailableYears([new Date().getUTCFullYear().toString()]);
                    setTransitionYears([new Date().getUTCFullYear().toString()]);
                }
            } catch (error) {
                console.error("Error fetching bookings data:", error);
                setCurrentOccupantsCount(0);
                setBedCounts(0);
                setTotalBookingsCount(0);
                setPendingRequestsCount(0);
                setAvailableYears([new Date().getUTCFullYear().toString()]);
                setTransitionYears([new Date().getUTCFullYear().toString()]);
            }
        };

        if (totalAvailableBeds > 0 || propertiesData.length > 0) {
            fetchBookingsData();
        }
    }, [totalAvailableBeds, propertiesData]);

    // Helper function to parse MongoDB date format
    const parseMongoDate = (dateField) => {
        if (!dateField) return null;

        if (dateField instanceof Date) {
            return dateField;
        }

        if (dateField.$date) {
            return new Date(dateField.$date);
        }

        return new Date(dateField);
    };

    // Extract unique years from bookings data
    const extractYearsFromBookings = (bookings) => {
        const yearsSet = new Set();

        bookings.forEach(booking => {
            // Check moveInDate
            if (booking.moveInDate) {
                try {
                    const moveInDate = parseMongoDate(booking.moveInDate);
                    if (moveInDate && !isNaN(moveInDate.getTime())) {
                        const moveInYear = moveInDate.getUTCFullYear();
                        yearsSet.add(moveInYear.toString());
                    }
                } catch (error) {
                    console.error("Error parsing moveInDate:", booking.moveInDate);
                }
            }

            // Check moveOutDate
            if (booking.moveOutDate) {
                try {
                    const moveOutDate = parseMongoDate(booking.moveOutDate);
                    if (moveOutDate && !isNaN(moveOutDate.getTime())) {
                        const moveOutYear = moveOutDate.getUTCFullYear();
                        yearsSet.add(moveOutYear.toString());
                    }
                } catch (error) {
                    console.error("Error parsing moveOutDate:", booking.moveOutDate);
                }
            }

            // Check createdAt
            if (booking.createdAt) {
                try {
                    const createdDate = parseMongoDate(booking.createdAt);
                    if (createdDate && !isNaN(createdDate.getTime())) {
                        const createdYear = createdDate.getUTCFullYear();
                        yearsSet.add(createdYear.toString());
                    }
                } catch (error) {
                    console.error("Error parsing createdAt:", booking.createdAt);
                }
            }

            // Check payment dates
            if (booking.payments && Array.isArray(booking.payments)) {
                booking.payments.forEach(payment => {
                    const paymentDateField = payment.date || payment.paidDate;
                    if (paymentDateField) {
                        try {
                            const paymentDate = parseMongoDate(paymentDateField);
                            if (paymentDate && !isNaN(paymentDate.getTime())) {
                                const paymentYear = paymentDate.getUTCFullYear();
                                yearsSet.add(paymentYear.toString());
                            }
                        } catch (error) {
                            console.error("Error parsing payment date:", paymentDateField);
                        }
                    }
                });
            }
        });

        // Convert to array and sort in descending order (latest first)
        const yearsArray = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));

        // If no years found, add current year
        if (yearsArray.length === 0) {
            yearsArray.push(new Date().getUTCFullYear().toString());
        }

        console.log("Available years from bookings:", yearsArray);
        return yearsArray;
    };

    // Function to calculate monthly check-ins and check-outs for a specific year
    const calculateMonthlyStats = (bookings, year) => {
        // Initialize arrays for each month (12 months)
        const monthlyCheckInCounts = new Array(12).fill(0);
        const monthlyCheckOutCounts = new Array(12).fill(0);

        console.log(`Calculating monthly stats for year: ${year}`);

        const selectedYearNum = parseInt(year);

        bookings.forEach(booking => {
            // Check-in date
            if (booking.moveInDate) {
                try {
                    const moveInDate = parseMongoDate(booking.moveInDate);
                    if (moveInDate && !isNaN(moveInDate.getTime())) {
                        const moveInYear = moveInDate.getUTCFullYear();
                        const moveInMonth = moveInDate.getUTCMonth();

                        // Only count if booking status is confirmed/active and matches selected year
                        const status = booking.bookingStatus || booking.status;
                        if (moveInYear === selectedYearNum && status && ['confirmed', 'active', 'checked_out'].includes(status.toLowerCase())) {
                            monthlyCheckInCounts[moveInMonth] += 1;
                            console.log(`Check-in: Booking ${booking.id} in ${fullMonthNames[moveInMonth]} ${moveInYear}`);
                        }
                    }
                } catch (error) {
                    console.error("Error parsing moveInDate:", booking.moveInDate);
                }
            }

            // Check-out date (for checked_out status)
            if (booking.moveOutDate && (booking.bookingStatus === 'checked_out' || booking.status === 'checked_out')) {
                try {
                    const moveOutDate = parseMongoDate(booking.moveOutDate);
                    if (moveOutDate && !isNaN(moveOutDate.getTime())) {
                        const moveOutYear = moveOutDate.getUTCFullYear();
                        const moveOutMonth = moveOutDate.getUTCMonth();

                        if (moveOutYear === selectedYearNum) {
                            monthlyCheckOutCounts[moveOutMonth] += 1;
                            console.log(`Check-out: Booking ${booking.id} in ${fullMonthNames[moveOutMonth]} ${moveOutYear}`);
                        }
                    }
                } catch (error) {
                    console.error("Error parsing moveOutDate:", booking.moveOutDate);
                }
            }
        });

        console.log(`Monthly Check-ins for ${year}:`, monthlyCheckInCounts);
        console.log(`Monthly Check-outs for ${year}:`, monthlyCheckOutCounts);

        // Set state with the calculated data
        setMonthlyCheckIns(monthlyCheckInCounts);
        setMonthlyCheckOuts(monthlyCheckOutCounts);
    };

    // Function to calculate monthly income and expenses from payments
    const calculateMonthlyPayments = (bookings, year) => {
        // Initialize arrays for each month (12 months)
        const monthlyIncomeData = new Array(12).fill(0);
        const monthlyExpensesData = new Array(12).fill(0);

        console.log(`=== CALCULATING MONTHLY PAYMENTS FOR ${year} ===`);
        console.log(`Number of bookings to process: ${bookings.length}`);

        let totalIncomeForYear = 0;
        let paymentCount = 0;
        let bookingsWithPayments = 0;

        const selectedYearNum = parseInt(year);

        bookings.forEach((booking, index) => {
            const bookingId = booking.id || booking._id;
            const bookingStatus = booking.bookingStatus || booking.status;

            console.log(`\n--- Processing Booking ${index + 1} ---`);
            console.log(`Booking ID: ${bookingId}`);
            console.log(`Booking Status: ${bookingStatus}`);
            console.log(`Has payments array: ${!!booking.payments}`);

            // Process payments array if it exists
            if (booking.payments && Array.isArray(booking.payments)) {
                console.log(`Number of payments in this booking: ${booking.payments.length}`);
                bookingsWithPayments++;

                booking.payments.forEach((payment, paymentIndex) => {
                    try {
                        // Handle MongoDB date format
                        const rawDate = payment.date || payment.paidDate;
                        // console.log("asdasdadasdhgkjshkagfakjgdkagfujfads",payment)
                        const paymentDate = parseMongoDate(rawDate);

                        if (!paymentDate || isNaN(paymentDate.getTime())) {
                            console.log(`    ❌ Invalid payment date:`, rawDate);
                            return;
                        }

                        const paymentYear = paymentDate.getUTCFullYear();
                        const paymentMonth = paymentDate.getUTCMonth();
                        const amount = parseFloat(payment.amount) || 0;
                        const paymentStatus = payment.status || '';
                        const paymentType = payment.type || '';

                        console.log(`\n  Payment ${paymentIndex + 1}:`);
                        console.log(`    Amount: ₹${amount}`);
                        console.log(`    Raw date field:`, rawDate);
                        console.log(`    Parsed date (UTC): ${paymentDate.toUTCString()}`);
                        console.log(`    UTC Year: ${paymentYear}, UTC Month: ${paymentMonth} (${fullMonthNames[paymentMonth]})`);
                        console.log(`    Status: ${paymentStatus}`);
                        console.log(`    Type: ${paymentType}`);

                        // Only process payments for the selected year
                        if (paymentYear === selectedYearNum) {
                            console.log(`    ✅ Year matches selected year (${selectedYearNum})`);

                            // Consider completed payments as income
                            if (paymentStatus.toLowerCase() === 'completed') {
                                console.log(`    ✅ Payment is completed`);
                                monthlyIncomeData[paymentMonth] += amount;
                                totalIncomeForYear += amount;
                                paymentCount++;

                                console.log(`    💰 Added ₹${amount} to ${fullMonthNames[paymentMonth]} income`);
                                console.log(`    Current month income for ${fullMonthNames[paymentMonth]}: ₹${monthlyIncomeData[paymentMonth]}`);
                            } else {
                                console.log(`    ❌ Payment status is not 'completed': ${paymentStatus}`);
                            }
                        } else {
                            console.log(`    ❌ Year doesn't match (${paymentYear} != ${selectedYearNum})`);
                        }
                    } catch (error) {
                        console.error(`    ❌ Error parsing payment:`, error);
                        console.error(`    Payment data:`, payment);
                    }
                });
            } else {
                console.log(`No payments array found for this booking`);

                // Check if we should use pricing.totalAmount as fallback
                if (booking.pricing && booking.pricing.totalAmount) {
                    const totalAmount = parseFloat(booking.pricing.totalAmount) || 0;
                    console.log(`Pricing totalAmount: ₹${totalAmount}`);

                    if (totalAmount > 0) {
                        try {
                            const rawBookingDate = booking.createdAt || booking.moveInDate;
                            const bookingDate = parseMongoDate(rawBookingDate);

                            if (!bookingDate || isNaN(bookingDate.getTime())) {
                                console.log(`Invalid booking date:`, rawBookingDate);
                                return;
                            }

                            const bookingYear = bookingDate.getUTCFullYear();
                            const bookingMonth = bookingDate.getUTCMonth();

                            console.log(`Booking date (UTC): ${bookingDate.toUTCString()}`);
                            console.log(`Booking UTC Year: ${bookingYear}, UTC Month: ${bookingMonth} (${fullMonthNames[bookingMonth]})`);

                            if (bookingYear === selectedYearNum) {
                                if (bookingStatus && ['confirmed', 'active', 'paid', 'checked_out'].includes(bookingStatus.toLowerCase())) {
                                    monthlyIncomeData[bookingMonth] += totalAmount;
                                    totalIncomeForYear += totalAmount;
                                    paymentCount++;

                                    console.log(`💡 Added booking total amount: ₹${totalAmount} to ${fullMonthNames[bookingMonth]} income`);
                                } else {
                                    console.log(`Booking status doesn't allow adding amount: ${bookingStatus}`);
                                }
                            } else {
                                console.log(`Booking year doesn't match (${bookingYear} != ${selectedYearNum})`);
                            }
                        } catch (error) {
                            console.error(`Error parsing booking date:`, error);
                        }
                    }
                }
            }
        });


        // 🔥 Calculate expenses using transferDetails.clientAmount
        bookings.forEach((booking) => {
            try {
                const bookingStatus = booking.bookingStatus || booking.status;

                if (!bookingStatus ||
                    !['confirmed', 'active', 'paid', 'checked_out']
                        .includes(bookingStatus.toLowerCase())
                ) return;

                const clientAmount = parseFloat(
                    booking.transferDetails?.clientAmount || 0
                );

                if (clientAmount <= 0) return;

                const rawDate = booking.createdAt || booking.moveInDate;
                const bookingDate = parseMongoDate(rawDate);

                if (!bookingDate || isNaN(bookingDate.getTime())) return;

                const bookingYear = bookingDate.getUTCFullYear();
                const bookingMonth = bookingDate.getUTCMonth();

                if (bookingYear === selectedYearNum) {
                    monthlyExpensesData[bookingMonth] += clientAmount;
                }

            } catch (error) {
                console.error("Error calculating expense:", error);
            }
        });


        // Log detailed monthly breakdown
        console.log(`\n=== MONTHLY BREAKDOWN FOR ${year} ===`);
        console.log(`Bookings with payments: ${bookingsWithPayments}/${bookings.length}`);
        console.log(`Total payments processed: ${paymentCount}`);

        console.log(`\n📊 INCOME BY MONTH:`);
        let hasIncome = false;
        monthlyIncomeData.forEach((amount, index) => {
            if (amount > 0) {
                hasIncome = true;
                console.log(`   ${fullMonthNames[index].padEnd(10)}: ₹${amount.toFixed(2)}`);
            }
        });
        if (!hasIncome) {
            console.log(`   No income recorded for ${year}`);
        }

        console.log(`\n📊 EXPENSES BY MONTH (20% of income):`);
        let hasExpenses = false;
        monthlyExpensesData.forEach((amount, index) => {
            if (amount > 0) {
                hasExpenses = true;
                console.log(`   ${fullMonthNames[index].padEnd(10)}: ₹${amount.toFixed(2)}`);
            }
        });
        if (!hasExpenses) {
            console.log(`   No expenses calculated for ${year}`);
        }

        console.log(`\n🎯 FINAL SUMMARY FOR ${year}:`);
        console.log(`   Total Income: ₹${totalIncomeForYear.toFixed(2)}`);
        const totalExpenseForYear = monthlyExpensesData.reduce((a, b) => a + b, 0);
        console.log(`   Total Expenses: ₹${totalExpenseForYear.toFixed(2)}`);

        console.log(`=== END CALCULATION ===\n`);

        // Set state with the calculated data
        setMonthlyIncome(monthlyIncomeData);
        setMonthlyExpenses(monthlyExpensesData);
    };

    // Handle bar chart year change
    const handleBarChartYearChange = (event) => {
        const newYear = event.target.value;
        setBarChartYear(newYear);

        // Recalculate monthly stats for the new year
        if (bookingsData.length > 0) {
            calculateMonthlyStats(bookingsData, newYear);
        }
    };

    // Handle transition chart year change
    const handleTransitionYearChange = (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);

        // Recalculate monthly payments for the new year
        if (bookingsData.length > 0) {
            calculateMonthlyPayments(bookingsData, newYear);
        }
    };

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

    // Fetch active issues count (service requests)
    useEffect(() => {
        const fetchActiveIssuesCount = async () => {
            try {
                console.log("Fetching active issues count...");

                if (propertiesData.length > 0) {
                    let totalActiveCount = 0;

                    for (const property of propertiesData) {
                        try {
                            const propertyId = property.property._id;
                            console.log(`Fetching concerns for property: ${propertyId}`);

                            const concernsResponse = await concernAPI.getPropertyConcerns(propertyId);
                            console.log(`Concerns for property ${propertyId}:`, concernsResponse);

                            if (concernsResponse.data.success && concernsResponse.data.concerns) {
                                const concerns = concernsResponse.data.concerns;
                                console.log(`Found ${concerns.length} concerns for property ${propertyId}`);

                                const activeConcerns = concerns.filter(concern =>
                                    concern.status === 'pending' || concern.status === 'approved'
                                );

                                console.log(`Active concerns for property ${propertyId}:`, activeConcerns.length);
                                totalActiveCount += activeConcerns.length;

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
                    console.log("No properties data available");
                    setActiveIssuesCount(0);
                }
            } catch (error) {
                console.error("Error fetching active issues count:", error);
                console.log("Error details:", error.response?.data);
            }
        };

        if (propertiesData.length > 0) {
            fetchActiveIssuesCount();
        }
    }, [propertiesData]);

    // Update donutData to use totalAvailableBeds
    const donutData = {
        labels: ["Occupied Beds", "Available Beds", "Active check-in's", "Checkouts"],
        datasets: [
            {
                data: [
                    bedCounts,
                    Math.max(0, totalAvailableBeds - bedCounts),
                    bedCounts,
                    Math.max(0, totalBookingsCount - bedCounts)
                ],
                backgroundColor: ["#2563EB", "#10B981", "#FACC15", "#EF4444"],
                hoverOffset: 10,
            },
        ],
    };

    // Update lineData to use actual monthly income and expenses
    const lineData = {
        labels: monthNames,
        datasets: [
            {
                label: "Total Income",
                data: monthlyIncome,
                borderColor: "#16A34A",
                backgroundColor: "rgba(22, 163, 74, 0.2)",
                borderWidth: 3,
                tension: 0.4,
                fill: true,
            },
            {
                label: "Total Expenses",
                data: monthlyExpenses,
                borderColor: "#DC2626",
                backgroundColor: "rgba(220, 38, 38, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Line chart options for better display
    const lineOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ₹';
                        }
                        const value = context.raw || 0;
                        label += value.toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                        return label;
                    }
                }
            },
            title: {
                display: true,
                text: `Monthly Income & Expenses for ${selectedYear}`,
                font: {
                    size: 14,
                    weight: 'bold'
                },
                padding: {
                    bottom: 10
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    callback: function (value) {
                        return '₹' + value.toLocaleString('en-IN', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        });
                    }
                },
                title: {
                    display: true,
                    text: 'Amount (₹)',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            }
        }
    };

    // Update barData to show monthly check-ins and check-outs
    const barData = {
        labels: monthNames,
        datasets: [
            {
                label: "Check-ins",
                data: monthlyCheckIns.slice(0, 12),
                backgroundColor: "#2563EB",
                borderRadius: 4,
            },
            {
                label: "Check-outs",
                data: monthlyCheckOuts.slice(0, 12),
                backgroundColor: "#EF4444",
                borderRadius: 4,
            },
        ],
    };

    // Bar chart options for better display
    const barOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.raw;
                        return label;
                    }
                }
            },
            title: {
                display: true,
                text: `Check-ins & Check-outs for ${barChartYear}`,
                font: {
                    size: 14,
                    weight: 'bold'
                },
                padding: {
                    bottom: 10
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    stepSize: 1,
                    precision: 0
                }
            }
        }
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
                        <StatCard title="Food Menu" value="" color="#AF5420" icon={<FaUtensils />} link="/client/foodmenu" />
                        <StatCard title="Rent to be collected" value="₹N / ₹00000" color="#4DAF20" icon={<FaWallet />} link="/rent-collection" />
                        <StatCard title="Active Bookings" value={currentOccupantsCount} color="#AFA120" icon={<FaUsers />} link="/current-occupants" />
                        <StatCard title="Occupied Beds" value={`${bedCounts} / ${totalAvailableBeds}`} color="#20A8AF" icon={<FaBed />} link="/bed-counts" />
                        <StatCard title="Total Bookings" value={totalBookingsCount} color="#8420AF" icon={<FaUsers />} link="/total-guests" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                        {/* Line Chart - Transition Analysis */}
                        <div className="bg-blue-200 p-4 rounded-lg shadow w-full h-auto min-h-[400px]">
                            <h3 className="text-lg font-semibold mb-4">Transition Analysis Chart</h3>
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <FormControl className="w-full sm:w-auto">
                                    <InputLabel className="bg-white p-2">Choose Year</InputLabel>
                                    <Select
                                        value={selectedYear}
                                        onChange={handleTransitionYearChange}
                                    >
                                        {transitionYears.map(year => (
                                            <MenuItem key={`transition-${year}`} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/* <FormControl className="w-full sm:w-auto">
                                    <InputLabel className="bg-white p-2">Choose Month</InputLabel>
                                    <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                        {monthNames.map((month, index) => (
                                            <MenuItem key={month} value={month}>
                                                {month}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}
                            </div>
                            <div className="h-64 md:h-80">
                                <Line data={lineData} options={lineOptions} />
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Note: Expenses are calculated as 20% of income for demonstration purposes.</p>

                            </div>
                        </div>

                        {/* Donut & Bar Chart */}
                        <div className="bg-blue-200 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Daily Reports</h3>
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <FormControl className="w-full sm:w-auto">
                                    <InputLabel className="bg-white p-2">Select Year</InputLabel>
                                    <Select
                                        value={barChartYear}
                                        onChange={handleBarChartYearChange}
                                    >
                                        {availableYears.map(year => (
                                            <MenuItem key={`bar-${year}`} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex justify-center w-full h-48 md:h-64">
                                    <Doughnut data={donutData} options={{ maintainAspectRatio: false }} />
                                </div>
                                <div className="flex justify-center w-full h-48 md:h-64">
                                    <Bar data={barData} options={barOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
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

export default ClientDashboard;