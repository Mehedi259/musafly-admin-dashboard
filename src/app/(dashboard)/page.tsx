'use client';

import { 
  Briefcase, Plane, Building2, Users, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, 
  Clock, XCircle, MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

// --- MOCK DATA ---
const areaData = [
  { name: '১ জানু', flights: 100, hotels: 40, tours: 20 },
  { name: '৫ জানু', flights: 140, hotels: 60, tours: 15 },
  { name: '১০ জানু', flights: 120, hotels: 75, tours: 30 },
  { name: '১৫ জানু', flights: 180, hotels: 80, tours: 40 },
  { name: '২০ জানু', flights: 220, hotels: 110, tours: 50 },
  { name: '২৫ জানু', flights: 200, hotels: 90, tours: 60 },
  { name: '৩০ জানু', flights: 260, hotels: 130, tours: 80 },
];

const donutData = [
  { name: 'WhatsApp', value: 650, color: '#25D366' },
  { name: 'Messenger', value: 320, color: '#0084FF' },
  { name: 'Direct Call', value: 150, color: '#F59E0B' },
  { name: 'Website', value: 128, color: '#8B5CF6' },
];

const barData = [
  { name: 'জানু', value: 400 },
  { name: 'ফেব', value: 600 },
  { name: 'মার্চ', value: 750 },
  { name: 'এপ্রিল', value: 900 },
  { name: 'মে', value: 1100 },
];

const recentBookings = [
  { id: 'TBK1001', customer: 'John Doe', service: 'ফ্লাইট', icon: Plane, date: '২৮ মে, ২০২৪', status: 'কনফার্মড', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TBK1002', customer: 'Sarah Khan', service: 'হোটেল', icon: Building2, date: '২৮ মে, ২০২৪', status: 'পেন্ডিং', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 'TBK1003', customer: 'Mike Smith', service: 'ট্যুর', icon: Briefcase, date: '২৭ মে, ২০২৪', status: 'কনফার্মড', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TBK1004', customer: 'Ayesha Rahman', service: 'ফ্লাইট', icon: Plane, date: '২৭ মে, ২০২৪', status: 'ক্যানসেলড', statusColor: 'bg-red-100 text-red-700' },
  { id: 'TBK1005', customer: 'David Lee', service: 'ট্রান্সফার', icon: Briefcase, date: '২৬ মে, ২০২৪', status: 'কনফার্মড', statusColor: 'bg-green-100 text-green-700' },
];

const topDestinations = [
  { name: 'ব্যাংকক', country: 'থাইল্যান্ড', percent: 18, image: '/destinations/bangkok.jpg' },
  { name: 'দুবাই', country: 'ইউএই (UAE)', percent: 15, image: '/destinations/dubai.jpg' },
  { name: 'নিউ ইয়র্ক', country: 'যুক্তরাষ্ট্র (USA)', percent: 12, image: '/destinations/newyork.jpg' },
  { name: 'সিঙ্গাপুর', country: 'সিঙ্গাপুর', percent: 10, image: '/destinations/singapore.jpg' },
  { name: 'লন্ডন', country: 'যুক্তরাজ্য (UK)', percent: 8, image: '/destinations/london.jpg' },
];

const upcomingFlights = [
  { flight: 'BG102', route: 'ঢাকা → ব্যাংকক', date: '২৯ মে, ২০২৪', status: 'অন টাইম', statusColor: 'bg-green-100 text-green-700' },
  { flight: 'EK584', route: 'দুবাই → নিউ ইয়র্ক', date: '২৯ মে, ২০২৪', status: 'অন টাইম', statusColor: 'bg-green-100 text-green-700' },
  { flight: 'SQ317', route: 'সিঙ্গাপুর → ঢাকা', date: '৩০ মে, ২০২৪', status: 'ডিলেড', statusColor: 'bg-red-100 text-red-700' },
];

const recentHotels = [
  { hotel: 'Grand Hyatt', guest: 'John Doe', date: '২৮ মে', status: 'কনফার্মড', statusColor: 'bg-green-100 text-green-700' },
  { hotel: 'Marina Bay Sands', guest: 'Sarah Khan', date: '২৯ মে', status: 'পেন্ডিং', statusColor: 'bg-orange-100 text-orange-700' },
  { hotel: 'The Ritz London', guest: 'Mike Smith', date: '৩০ মে', status: 'কনফার্মড', statusColor: 'bg-green-100 text-green-700' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'মোট বুকিং', value: '১,২৪৮', inc: '১২.৫%', icon: Briefcase, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
          { label: 'বুক করা ফ্লাইট', value: '৫২৪', inc: '১০.২%', icon: Plane, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
          { label: 'বুক করা হোটেল', value: '৪১২', inc: '১৪.৮%', icon: Building2, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
          { label: 'অ্যাক্টিভ কাস্টমার', value: '৮৯২', inc: '৮.৪%', icon: Users, iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
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
                <span className="text-xs text-gray-400 ml-1">গত মাসের তুলনায়</span>
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
            <h2 className="text-lg font-bold text-gray-900">বুকিং ওভারভিউ</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm">এই মাস</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700">গত মাস</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700">গত ৩ মাস</button>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-sm text-gray-600 font-medium">ফ্লাইট</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-sm text-gray-600 font-medium">হোটেল</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-sm text-gray-600 font-medium">ট্যুর</span></div>
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
          <h2 className="text-lg font-bold text-gray-900 mb-6">কাস্টমার সোর্স</h2>
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
              <span className="text-3xl font-bold text-gray-900">১,২৪৮</span>
              <span className="text-xs text-gray-500 font-medium">মোট ক্লাইন্ট</span>
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
            <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক বুকিং</h2>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">সব দেখুন</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">বুকিং আইডি</th>
                  <th className="px-6 py-4">কাস্টমার</th>
                  <th className="px-6 py-4">সার্ভিস</th>
                  <th className="px-6 py-4">তারিখ</th>
                  <th className="px-6 py-4">স্ট্যাটাস</th>
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
            <h2 className="text-lg font-bold text-gray-900">জনপ্রিয় গন্তব্য</h2>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">সব দেখুন</a>
          </div>
          <div className="space-y-6">
            {topDestinations.map((dest, i) => (
              <div key={i} className="flex items-center gap-4">
                {/* Destination Image */}
                <div className="w-12 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative border border-gray-100 shadow-sm">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
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
            <h2 className="text-base font-bold text-gray-900">আসন্ন ফ্লাইট</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">ফ্লাইট</th>
                <th className="px-5 py-3">রুট</th>
                <th className="px-5 py-3">তারিখ</th>
                <th className="px-5 py-3 text-right">স্ট্যাটাস</th>
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
            <h2 className="text-base font-bold text-gray-900">সাম্প্রতিক হোটেল বুকিং</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">হোটেল</th>
                <th className="px-5 py-3">গেস্ট</th>
                <th className="px-5 py-3">তারিখ</th>
                <th className="px-5 py-3 text-right">স্ট্যাটাস</th>
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
            <h2 className="text-base font-bold text-gray-900">কাস্টমার বৃদ্ধি</h2>
            <a href="#" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
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
