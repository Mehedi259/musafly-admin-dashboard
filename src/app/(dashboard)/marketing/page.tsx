'use client';

import { Megaphone, Users, Target, Plus, Play, Pause, Share2, Mail, MessageSquare } from 'lucide-react';

const campaigns = [
  { id: 'CMP-001', name: 'Hajj Promo 2024', platform: 'Facebook Ads', icon: Share2, iconColor: 'text-blue-600', budget: '৳ ৫০,০০০', spent: '৳ ৩৪,৫০০', reach: '১২৪,০০০', status: 'চলমান (Active)', statusColor: 'bg-green-100 text-green-700' },
  { id: 'CMP-002', name: 'Dubai Visa Offer', platform: 'Email Newsletter', icon: Mail, iconColor: 'text-orange-500', budget: '৳ ৫,০০০', spent: '৳ ৫,০০০', reach: '১৫,০০০', status: 'সম্পন্ন (Completed)', statusColor: 'bg-gray-100 text-gray-700' },
  { id: 'CMP-003', name: 'Eid Holiday Packages', platform: 'SMS Marketing', icon: MessageSquare, iconColor: 'text-green-500', budget: '৳ ১০,০০০', spent: '৳ ۴,২০০', reach: '১০,০০০', status: 'চলমান (Active)', statusColor: 'bg-green-100 text-green-700' },
  { id: 'CMP-004', name: 'Umrah Package Discount', platform: 'Facebook Ads', icon: Share2, iconColor: 'text-blue-600', budget: '৳ ২৫,০০০', spent: '৳ ১২,৪০০', reach: '৪৫,০০০', status: 'স্থগিত (Paused)', statusColor: 'bg-orange-100 text-orange-700' },
];

export default function MarketingPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">মার্কেটিং ও ক্যাম্পেইন</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার বিজ্ঞাপন এবং প্রোমোশনাল ক্যাম্পেইনগুলো পরিচালনা করুন।</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm">
          <Plus size={18} /> নতুন ক্যাম্পেইন শুরু করুন
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4"><Megaphone size={24} /></div>
          <p className="text-sm font-medium text-gray-500">অ্যাক্টিভ ক্যাম্পেইন</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">২ টি</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4"><Users size={24} /></div>
          <p className="text-sm font-medium text-gray-500">মোট মানুষের কাছে পৌঁছেছে (Reach)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">১,৯৪,০০০</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-4"><Target size={24} /></div>
          <p className="text-sm font-medium text-gray-500">বাজেট খরচ হয়েছে (এই মাসে)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ ৫৬,১০০</h3>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">ক্যাম্পেইন তালিকা</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ক্যাম্পেইনের নাম</th>
                <th className="px-6 py-4">প্ল্যাটফর্ম</th>
                <th className="px-6 py-4">মোট বাজেট</th>
                <th className="px-6 py-4">খরচ হয়েছে</th>
                <th className="px-6 py-4">রিচ (Reach)</th>
                <th className="px-6 py-4">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((camp, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{camp.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <camp.icon size={16} className={camp.iconColor} />
                      <span className="text-gray-700 font-medium">{camp.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{camp.budget}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{camp.spent}</td>
                  <td className="px-6 py-4 text-gray-600">{camp.reach}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${camp.statusColor}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 text-gray-500 rounded-md transition-colors" title="Start/Pause">
                        {camp.status.includes('Active') ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </div>
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
