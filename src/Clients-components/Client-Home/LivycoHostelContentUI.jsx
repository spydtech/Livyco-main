import React from "react";
// Install first: npm install react-icons --save[citation:1]
import { 
  FaBuilding, FaUserGraduate, FaMoneyBillWave, FaShieldAlt, 
  FaUtensils, FaWifi, FaPaintBrush, FaBed, FaUserCheck, 
  FaCalendarCheck, FaTools, FaClipboardList, FaUserFriends,
  FaFileMedical, FaCreditCard, FaReceipt, FaBell, FaChartLine,
  FaUserSecret, FaVideo, FaKey, FaExclamationTriangle, 
  FaBook, FaCalendarAlt, FaClipboard, FaSearch, FaFilter,
  FaCog, FaMobileAlt, FaDesktop, FaTabletAlt, FaCheckCircle
} from "react-icons/fa";

export default function LivycoHostelContentUI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="bg-[#FEE123] rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaBuilding className="text-3xl" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  Livyco Hostel Management System
                </h1>
              </div>
              <p className="text-gray-900 text-lg">
                Comprehensive digital solution for modern hostel administration
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="font-semibold">8 Modules</span>
              <span className="mx-2">•</span>
              <span>40+ Features</span>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-gray-900">
            <StatItem className="text-gray-900"   icon={<FaCheckCircle className="text-gray-900" />} value="100%" label="System Uptime" />
            <StatItem icon={<FaMobileAlt className="text-gray-900" />} value="24/7" label="Mobile Access" />
            <StatItem icon={<FaUserCheck className="text-gray-900" />} value="99%" label="Satisfaction" />
            <StatItem icon={<FaShieldAlt className="text-gray-900" />} value="Secure" label="Data Protection" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room Management */}
          <FeatureCard
            title="Room Management"
            icon={<FaBed className="text-xl" />}
            color="blue"
            description="Efficient room allocation and maintenance tracking"
          >
            <FeatureItem icon={<FaClipboardList />}>Room allocation and transfer</FeatureItem>
            <FeatureItem icon={<FaBuilding />}>Vacancy management</FeatureItem>
            <FeatureItem icon={<FaCog />}>Room type configuration</FeatureItem>
            <FeatureItem icon={<FaCalendarCheck />}>Maintenance scheduling</FeatureItem>
            <FeatureItem icon={<FaClipboard />}>Amenities tracking</FeatureItem>
          </FeatureCard>

          {/* User Management */}
          <FeatureCard
            title="User Management"
            icon={<FaUserGraduate className="text-xl" />}
            color="green"
            description="Complete user lifecycle management"
          >
            <FeatureItem icon={<FaUserCheck />}>User registration with documents</FeatureItem>
            <FeatureItem icon={<FaCalendarAlt />}>Check-in and check-out processes</FeatureItem>
            <FeatureItem icon={<FaClipboardList />}>Attendance tracking</FeatureItem>
            <FeatureItem icon={<FaUserFriends />}>Parent / Guardian details</FeatureItem>
            <FeatureItem icon={<FaFileMedical />}>Medical records management</FeatureItem>
          </FeatureCard>

          {/* Fee & Finance Management */}
          <FeatureCard
            title="Fee & Finance"
            icon={<FaMoneyBillWave className="text-xl" />}
            color="amber"
            description="Automated financial management system"
          >
            <FeatureItem icon={<FaCreditCard />}>Multiple fee types (rent, mess, laundry)</FeatureItem>
            <FeatureItem icon={<FaMoneyBillWave />}>Online payment integration</FeatureItem>
            <FeatureItem icon={<FaReceipt />}>Automated receipt generation</FeatureItem>
            <FeatureItem icon={<FaBell />}>Due date alerts</FeatureItem>
            <FeatureItem icon={<FaChartLine />}>Expense tracking</FeatureItem>
          </FeatureCard>

          {/* Security & Access Control */}
          <FeatureCard
            title="Security & Access"
            icon={<FaShieldAlt className="text-xl" />}
            color="red"
            description="Advanced security and monitoring systems"
          >
            <FeatureItem icon={<FaUserSecret />}>Visitor management system</FeatureItem>
            <FeatureItem icon={<FaVideo />}>CCTV integration</FeatureItem>
            <FeatureItem icon={<FaKey />}>Gate pass system</FeatureItem>
            <FeatureItem icon={<FaExclamationTriangle />}>Emergency alerts</FeatureItem>
            <FeatureItem icon={<FaShieldAlt />}>Biometric access</FeatureItem>
          </FeatureCard>

          {/* Mess & Food Management */}
          <FeatureCard
            title="Mess & Food"
            icon={<FaUtensils className="text-xl" />}
            color="purple"
            description="Complete food service management"
          >
            <FeatureItem icon={<FaBook />}>Menu planning</FeatureItem>
            <FeatureItem icon={<FaClipboardList />}>Meal attendance tracking</FeatureItem>
            <FeatureItem icon={<FaClipboard />}>Inventory management</FeatureItem>
            <FeatureItem icon={<FaUserCheck />}>Feedback system</FeatureItem>
            <FeatureItem icon={<FaBuilding />}>Vendor management</FeatureItem>
          </FeatureCard>

          {/* Amenities Management */}
          <FeatureCard
            title="Amenities"
            icon={<FaWifi className="text-xl" />}
            color="indigo"
            description="Additional services and facilities management"
          >
            <FeatureItem icon={<FaWifi />}>WiFi management</FeatureItem>
            <FeatureItem icon={<FaTools />}>Laundry service tracking</FeatureItem>
            <FeatureItem icon={<FaBuilding />}>Transport service management</FeatureItem>
            <FeatureItem icon={<FaCog />}>Gym and recreation booking</FeatureItem>
            <FeatureItem icon={<FaBook />}>Study room booking</FeatureItem>
          </FeatureCard>

          {/* UI Features - Full Width */}
          <div className="lg:col-span-3">
            <FeatureCard
              title="UI Features"
              icon={<FaPaintBrush className="text-xl" />}
              color="teal"
              description="Modern, responsive user interface components"
              fullWidth
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <FeatureItem icon={<FaCog />}>Tab-based navigation</FeatureItem>
                <FeatureItem icon={<FaClipboard />}>Expandable specifications</FeatureItem>
                <FeatureItem icon={<FaTabletAlt />}>Interactive tables</FeatureItem>
                <FeatureItem icon={<FaChartLine />}>Quick stats overview</FeatureItem>
                <FeatureItem icon={<FaSearch />}>Search and filters</FeatureItem>
                <FeatureItem icon={<FaCog />}>Action buttons</FeatureItem>
                <FeatureItem icon={<FaCheckCircle />}>Status indicators</FeatureItem>
                <FeatureItem icon={<FaDesktop />}>Responsive design</FeatureItem>
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Installation Instructions */}
       
      </div>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ title, icon, color, children, description, fullWidth = false }) {
  const colorClasses = {
    blue: "border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:border-blue-300",
    green: "border-green-200 bg-gradient-to-br from-green-50 to-white hover:border-green-300",
    amber: "border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:border-amber-300",
    red: "border-red-200 bg-gradient-to-br from-red-50 to-white hover:border-red-300",
    purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:border-purple-300",
    indigo: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-white hover:border-indigo-300",
    teal: "border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:border-teal-300",
  };

  const iconColorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    teal: "bg-teal-100 text-teal-600",
  };

  return (
    <div className={`border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${colorClasses[color]} ${fullWidth ? '' : 'h-full'}`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColorClasses[color]}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            {description && (
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
}

// Component: Feature Item with Icon
function FeatureItem({ children, icon }) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors duration-200">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <span className="text-gray-700 text-sm leading-relaxed flex-1">
        {children}
      </span>
    </div>
  );
}

// Component: Stat Item
function StatItem({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-white/80">{icon}</div>
      <div>
        <div className="text-xl font-bold">{value}</div>
        <div className="text-blue-100 text-sm">{label}</div>
      </div>
    </div>
  );
}