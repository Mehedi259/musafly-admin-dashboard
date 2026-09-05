'use client';

import { 
  Briefcase, Plane, Building2, Users, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, 
  Clock, XCircle, MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

// --- MOCK DATA ---
const areaData = [
  { name: 'Jan 1', flights: 100, hotels: 40, tours: 20 },
  { name: 'Jan 5', flights: 140, hotels: 60, tours: 15 },
  { name: 'Jan 10', flights: 120, hotels: 75, tours: 30 },
  { name: 'Jan 15', flights: 180, hotels: 80, tours: 40 },
  { name: 'Jan 20', flights: 220, hotels: 110, tours: 50 },
  { name: 'Jan 25', flights: 200, hotels: 90, tours: 60 },
  { name: 'Jan 30', flights: 260, hotels: 130, tours: 80 },
];

const donutData = [
  { name: 'Confirmed', value: 848, color: '#3B82F6' },
  { name: 'Pending', value: 225, color: '#F59E0B' },
  { name: 'Cancelled', value: 100, color: '#EF4444' },
  { name: 'Others', value: 75, color: '#9CA3AF' },
];

const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 750 },
  { name: 'Apr', value: 900 },
  { name: 'May', value: 1100 },
];

const recentBookings = [
  { id: 'TBK1001', customer: 'John Doe', service: 'Flight', icon: Plane, date: 'May 28, 2024', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TBK1002', customer: 'Sarah Khan', service: 'Hotel', icon: Building2, date: 'May 28, 2024', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 'TBK1003', customer: 'Mike Smith', service: 'Tour', icon: Briefcase, date: 'May 27, 2024', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TBK1004', customer: 'Ayesha Rahman', service: 'Flight', icon: Plane, date: 'May 27, 2024', status: 'Cancelled', statusColor: 'bg-red-100 text-red-700' },
  { id: 'TBK1005', customer: 'David Lee', service: 'Transfer', icon: Briefcase, date: 'May 26, 2024', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
];

const topDestinations = [
  { name: 'Bangkok', country: 'Thailand', percent: 18 },
  { name: 'Dubai', country: 'UAE', percent: 15 },
  { name: 'New York', country: 'USA', percent: 12 },
  { name: 'Singapore', country: 'Singapore', percent: 10 },
  { name: 'London', country: 'UK', percent: 8 },
];

const upcomingFlights = [
  { flight: 'BG102', route: 'Dhaka → Bangkok', date: 'May 29, 2024', status: 'On Time', statusColor: 'bg-green-100 text-green-700' },
  { flight: 'EK584', route: 'Dubai → New York', date: 'May 29, 2024', status: 'On Time', statusColor: 'bg-green-100 text-green-700' },
  { flight: 'SQ317', route: 'Singapore → Dhaka', date: 'May 30, 2024', status: 'Delayed', statusColor: 'bg-red-100 text-red-700' },
];

const recentHotels = [
  { hotel: 'Grand Hyatt', guest: 'John Doe', date: 'May 28', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
  { hotel: 'Marina Bay Sands', guest: 'Sarah Khan', date: 'May 29', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700' },
  { hotel: 'The Ritz London', guest: 'Mike Smith', date: 'May 30', status: 'Confirmed', statusColor: 'bg-green-100 text-green-700' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: '1,248', inc: '12.5%', icon: Briefcase, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
          { label: 'Flights Booked', value: '524', inc: '10.2%', icon: Plane, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
          { label: 'Hotels Booked', value: '412', inc: '14.8%', icon: Building2, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
          { label: 'Active Customers', value: '892', inc: '8.4%', icon: Users, iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon size={28} className={stat.iconColor} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight size={14} className="text-green-500" />
                <span className="text-xs font-semibold text-green-600">{stat.inc}</span>
                <span className="text-xs text-gray-400 ml-1">vs. last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Bookings Overview</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm">This Month</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700">Last Month</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700">Last 3 Months</button>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-sm text-gray-600 font-medium">Flights</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-sm text-gray-600 font-medium">Hotels</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-sm text-gray-600 font-medium">Tours</span></div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHotels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="flights" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorFlights)" />
                <Area type="monotone" dataKey="hotels" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorHotels)" />
                <Area type="monotone" dataKey="tours" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorTours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Booking Status</h2>
          <div className="relative flex-1 min-h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900">1,248</span>
              <span className="text-xs text-gray-500 font-medium">Total Bookings</span>
            </div>
          </div>
          {/* Legend */}
          <div className="mt-6 space-y-3">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{((item.value / 1248) * 100).toFixed(0)}%</span>
                  <span className="text-gray-400 text-xs">({item.value})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MIDDLE TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((bk, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{bk.id}</td>
                    <td className="px-6 py-4 text-gray-600">{bk.customer}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <bk.icon size={16} className="text-blue-500" />
                        <span>{bk.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{bk.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${bk.statusColor}`}>
                        {bk.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Top Destinations</h2>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">View All</a>
          </div>
          <div className="space-y-6">
            {topDestinations.map((dest, i) => (
              <div key={i} className="flex items-center gap-4">
                {/* Image Placeholder */}
                <div className="w-12 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-blue-100/50 flex items-center justify-center text-[10px] text-blue-800 font-bold">IMG</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.country}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{dest.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${dest.percent}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Flights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Upcoming Flights</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">View All</a>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">Flight</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {upcomingFlights.map((fl, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-900">{fl.flight}</td>
                  <td className="px-5 py-3 text-gray-600">{fl.route}</td>
                  <td className="px-5 py-3 text-gray-600">{fl.date}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${fl.statusColor}`}>{fl.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Hotels */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Recent Hotels Bookings</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">View All</a>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">Hotel</th>
                <th className="px-5 py-3">Guest</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentHotels.map((ht, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-medium text-gray-900 truncate max-w-[100px]">{ht.hotel}</td>
                  <td className="px-5 py-3 text-gray-600">{ht.guest}</td>
                  <td className="px-5 py-3 text-gray-600">{ht.date}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${ht.statusColor}`}>{ht.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Growth */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">Customer Growth</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">View All</a>
          </div>
          <div className="flex-1 min-h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
