'use client';

import { DollarSign, TrendingUp, CreditCard, ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const areaData = [
  { name: 'জানু', revenue: 4000, profit: 2400 },
  { name: 'ফেব', revenue: 3000, profit: 1398 },
  { name: 'মার্চ', revenue: 2000, profit: 9800 },
  { name: 'এপ্রিল', revenue: 2780, profit: 3908 },
  { name: 'মে', revenue: 1890, profit: 4800 },
  { name: 'জুন', revenue: 2390, profit: 3800 },
  { name: 'জুল', revenue: 3490, profit: 4300 },
];

const transactions = [
  { id: 'TXN-101', date: '২৮ মে, ২০২৪', desc: 'Cox\'s Bazar Tour Package', amount: '৳ ১২,০০০', method: 'bKash', status: 'পেইড', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TXN-102', date: '২৭ মে, ২০২৪', desc: 'Dubai Visa Processing', amount: '৳ ১৫,০০০', method: 'Bank Transfer', status: 'পেইড', statusColor: 'bg-green-100 text-green-700' },
  { id: 'TXN-103', date: '২৬ মে, ২০২৪', desc: 'Saudia Flight Ticket', amount: '৳ ৬৫,০০০', method: 'Cash', status: 'পেন্ডিং', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 'TXN-104', date: '২৫ মে, ২০২৪', desc: 'Hotel Booking (Makkah)', amount: '৳ ১৮,০০০', method: 'Card', status: 'পেইড', statusColor: 'bg-green-100 text-green-700' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ফাইন্যান্সিয়াল রিপোর্টস</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার ব্যবসার আয়, ব্যয় এবং লাভের সম্পূর্ণ হিসাব।</p>
        </div>
        <button 
          onClick={() => alert('রিপোর্ট পিডিএফ জেনারেট হচ্ছে... (Development in progress)')}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm"
        >
          <Download size={18} /> রিপোর্ট ডাউনলোড
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><DollarSign size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md"><ArrowUpRight size={14} /> ১২.৫%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">মোট রেভিনিউ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ ১,৪৫,০০০</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><TrendingUp size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md"><ArrowUpRight size={14} /> ৮.২%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">নেট লাভ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ ৩২,৪০০</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600"><CreditCard size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md"><ArrowDownRight size={14} /> ২.৪%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">মোট খরচ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ ১২,৬০০</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">মাসিক রেভিনিউ এবং প্রফিট</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="রেভিনিউ" />
              <Area type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="প্রফিট" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক লেনদেন</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">লেনদেন আইডি</th>
                <th className="px-6 py-4">তারিখ</th>
                <th className="px-6 py-4">বিবরণ</th>
                <th className="px-6 py-4">পেমেন্ট মেথড</th>
                <th className="px-6 py-4">অ্যামাউন্ট</th>
                <th className="px-6 py-4 text-right">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 text-gray-600">{txn.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{txn.desc}</td>
                  <td className="px-6 py-4 text-gray-600">{txn.method}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${txn.statusColor}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
