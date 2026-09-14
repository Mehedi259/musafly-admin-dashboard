'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Briefcase, Plane, Building2, Users, Map, FileText, Moon,
  ArrowUpRight, ArrowDownRight, CheckCircle2, 
  Clock, XCircle, MoreHorizontal
} from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

export default function DashboardHome() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('this_month');

  useEffect(() => {
    fetchDashboardData(timeFilter);
  }, [timeFilter]);

  const fetchDashboardData = async (filter: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/dashboard/stats/?time_filter=${filter}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (name: string) => {
    if (name === 'Briefcase') return Briefcase;
    if (name === 'Plane') return Plane;
    if (name === 'Building2') return Building2;
    if (name === 'Users') return Users;
    if (name === 'Map') return Map;
    if (name === 'FileText') return FileText;
    if (name === 'Moon') return Moon;
    return Briefcase;
  };

  if (!data) {
    return <div className="flex h-[80vh] items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">
      
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {data.topStats?.map((stat: any, i: number) => {
          const Icon = getIcon(stat.icon);
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={28} className={stat.iconColor} />
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
          );
        })}
      </div>

      {/* 2. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {loading && <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center rounded-2xl"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">বুকিং ওভারভিউ (ফ্লাইট)</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button onClick={() => setTimeFilter('this_month')} className={`px-4 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${timeFilter === 'this_month' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>এই মাস</button>
              <button onClick={() => setTimeFilter('last_month')} className={`px-4 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${timeFilter === 'last_month' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>গত মাস</button>
              <button onClick={() => setTimeFilter('last_3_months')} className={`px-4 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${timeFilter === 'last_3_months' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}>গত ৩ মাস</button>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-sm text-gray-600 font-medium">ফ্লাইট</span></div>
          </div>
          <div className="h-[250px] w-full">
            {data.areaData && data.areaData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="flights" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorFlights)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">কোনো ডাটা পাওয়া যায়নি</div>
            )}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative">
          <h2 className="text-lg font-bold text-gray-900 mb-6">কাস্টমার সোর্স</h2>
          <div className="relative flex-1 min-h-[200px] flex items-center justify-center">
            {data.donutData && data.donutData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.donutData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900">
                    {data.donutData?.reduce((acc: number, curr: any) => acc + curr.value, 0)}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">মোট ক্লাইন্ট</span>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">কোনো ডাটা পাওয়া যায়নি</div>
            )}
          </div>
          {/* Legend */}
          <div className="mt-6 space-y-3">
            {data.donutData?.map((item: any, i: number) => {
              const total = data.donutData.reduce((acc: number, curr: any) => acc + curr.value, 0);
              const percent = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
              return (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{percent}%</span>
                    <span className="text-gray-400 text-xs">({item.value})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MIDDLE TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক বুকিং (ক্যাটালগ)</h2>
            <a href="/bookings" className="text-blue-600 text-sm font-semibold hover:underline">সব দেখুন</a>
          </div>
          <div className="overflow-x-auto">
            {data.recentBookings && data.recentBookings.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">আইডি</th>
                    <th className="px-6 py-4">বিবরণ</th>
                    <th className="px-6 py-4">সার্ভিস</th>
                    <th className="px-6 py-4">তারিখ/সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.recentBookings?.map((bk: any, i: number) => {
                    const Icon = getIcon(bk.icon);
                    return (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">#{bk.id}</td>
                        <td className="px-6 py-4 text-gray-600">{bk.customer}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Icon size={16} className="text-blue-500" />
                            <span>{bk.service}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{bk.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-gray-400 text-sm">কোনো বুকিং পাওয়া যায়নি</div>
            )}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">জনপ্রিয় ট্যুর গন্তব্য</h2>
            <a href="/tours" className="text-blue-600 text-sm font-semibold hover:underline">সব দেখুন</a>
          </div>
          <div className="space-y-6">
            {data.topDestinations && data.topDestinations.length > 0 ? data.topDestinations?.map((dest: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-10 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative border border-gray-100 shadow-sm">
                  {dest.image ? <Image src={dest.image} alt={dest.name} fill className="object-cover" /> : null}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{dest.name}</p>
                      <p className="text-xs text-gray-500">{dest.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-400 text-sm py-10">কোনো গন্তব্য পাওয়া যায়নি</div>
            )}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        
        {/* Upcoming Flights */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">আসন্ন ফ্লাইট</h2>
            <a href="/deals" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
          </div>
          {data.upcomingFlights && data.upcomingFlights.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-5 py-3">এয়ারলাইন</th>
                  <th className="px-5 py-3">রুট</th>
                  <th className="px-5 py-3">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.upcomingFlights?.map((fl: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">{fl.flight}</td>
                    <td className="px-5 py-3 text-gray-600">{fl.route}</td>
                    <td className="px-5 py-3 text-gray-600">{fl.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-gray-400 text-sm">কোনো ফ্লাইট পাওয়া যায়নি</div>
          )}
        </div>

        {/* Recent Visas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">সাম্প্রতিক ভিসা</h2>
            <a href="/visas" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
          </div>
          {data.recentVisas && data.recentVisas.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-5 py-3">দেশ</th>
                  <th className="px-5 py-3">ধরন</th>
                  <th className="px-5 py-3">সময়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.recentVisas?.map((vs: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-medium text-gray-900">{vs.visa}</td>
                    <td className="px-5 py-3 text-gray-600">{vs.type}</td>
                    <td className="px-5 py-3 text-gray-600">{vs.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-gray-400 text-sm">কোনো ভিসা পাওয়া যায়নি</div>
          )}
        </div>

        {/* Customer Growth */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">কাস্টমার বৃদ্ধি</h2>
            <a href="/customers" className="text-blue-600 text-xs font-semibold hover:underline">সব দেখুন</a>
          </div>
          <div className="flex-1 min-h-[150px]">
            {data.barData && data.barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.barData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">কোনো ডাটা পাওয়া যায়নি</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
