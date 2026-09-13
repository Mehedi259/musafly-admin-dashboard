'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Calendar, Globe, Search } from 'lucide-react';

export default function DealsPage() {
  const [items, setItems] = useState<any[]>([
    {
      id: 1,
      customerName: 'Rahim Uddin',
      phone: '+880 1712345678',
      category: 'ফ্লাইট টিকিট',
      destination: 'ঢাকা থেকে দুবাই',
      travelDate: '2024-05-15',
      source: 'WhatsApp',
      price: '45,000',
    },
    {
      id: 2,
      customerName: 'Karim Hasan',
      phone: '+880 1812345678',
      category: 'ভিসা প্রসেসিং',
      destination: 'মালয়েশিয়া ট্যুরিস্ট ভিসা',
      travelDate: '2024-06-10',
      source: 'Facebook Messenger',
      price: '8,500',
    },
    {
      id: 3,
      customerName: 'Abdul Alim',
      phone: '+880 1912345678',
      category: 'ওমরাহ প্যাকেজ',
      destination: 'ঢাকা থেকে মক্কা/মদিনা',
      travelDate: '2024-07-20',
      source: 'সরাসরি ফোন কল',
      price: '1,45,000',
    },
  ]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">অফলাইন ডিলস</h1>
          <p className="text-[#94a3b8]">সব অফলাইন বুকিং এবং ক্লায়েন্ট ডিল এখান থেকে ম্যানেজ করুন।</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ডিল খুঁজুন..."
            className="pl-10 pr-4 py-2 bg-[#1a1d24] border border-[#2e3340] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">ডিল তালিকা</h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#2e3340] text-[#94a3b8] rounded-lg border border-[#3e4455]">
            মোট: {items.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24]">
              <tr>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-16">আইডি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">কাস্টমার</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">ক্যাটাগরি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">রুট/গন্তব্য</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">ভ্রমণের তারিখ</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">প্রাইস (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#94a3b8]">কোনো ডিল পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((item, index) => (
                <tr key={index} className="hover:bg-[#252932] transition-colors group border-t border-[#2e3340]">
                  <td className="p-4 text-[#94a3b8]">#{item.id}</td>
                  <td className="p-4">
                    <div className="text-white font-medium">{item.customerName}</div>
                    <div className="text-xs text-[#94a3b8]">{item.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-400" />
                      <span className="text-white">{item.category}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-400" />
                      <span className="text-white">{item.destination}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-400" />
                      <span className="text-[#94a3b8]">{item.travelDate}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white font-bold">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
