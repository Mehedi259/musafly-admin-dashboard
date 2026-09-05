'use client';

import { useState } from 'react';
import { Package, Plane, Building, MoreVertical, Plus, Filter, Search, X } from 'lucide-react';

const mockInventory = [
  { id: 'INV-001', name: 'Cox\'s Bazar 3 Days Package', type: 'ট্যুর প্যাকেজ', typeIcon: Package, stock: 15, price: '৳ ১২,০০০', status: 'Available', statusColor: 'bg-green-100 text-green-700' },
  { id: 'INV-002', name: 'Saudia Airlines Block Seats', type: 'ফ্লাইট টিকিট', typeIcon: Plane, stock: 4, price: '৳ ৬৫,০০০', status: 'Low Stock', statusColor: 'bg-orange-100 text-orange-700' },
  { id: 'INV-003', name: 'Dubai 5 Days Visa & Tour', type: 'ট্যুর প্যাকেজ', typeIcon: Package, stock: 0, price: '৳ ৩৫,০০০', status: 'Out of Stock', statusColor: 'bg-red-100 text-red-700' },
  { id: 'INV-004', name: 'Makkah Clock Tower Hotel (Double)', type: 'হোটেল রুম', typeIcon: Building, stock: 8, price: '৳ ১৮,০০০/রাত', status: 'Available', statusColor: 'bg-green-100 text-green-700' },
  { id: 'INV-005', name: 'Singapore Airlines Biman Tickets', type: 'ফ্লাইট টিকিট', typeIcon: Plane, stock: 20, price: '৳ ৪২,০০০', status: 'Available', statusColor: 'bg-green-100 text-green-700' },
];

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ইনভেন্টরি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার প্যাকেজ, ব্লক টিকিট এবং হোটেল রুমের স্টক ট্র্যাক করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm"
        >
          <Plus size={18} /> নতুন ইনভেন্টরি যোগ করুন
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><Package size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">মোট প্যাকেজ</p>
            <h3 className="text-2xl font-bold text-gray-900">৪৫ টি</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><Plane size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">অ্যাভেইলেবল সিট/স্লট</p>
            <h3 className="text-2xl font-bold text-gray-900">১২০ টি</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600"><Building size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">লো-স্টক অ্যালার্ট</p>
            <h3 className="text-2xl font-bold text-gray-900">৩ টি</h3>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="প্যাকেজ বা টিকিটের নাম দিয়ে খুঁজুন..." 
            className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />
        </div>
        <button 
          onClick={() => alert('ফিল্টার অপশন (Development in progress)')}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Filter size={16} /> ফিল্টার
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">আইডি</th>
                <th className="px-6 py-4">প্যাকেজের নাম</th>
                <th className="px-6 py-4">ধরন</th>
                <th className="px-6 py-4">স্টক</th>
                <th className="px-6 py-4">প্রাইস</th>
                <th className="px-6 py-4">স্ট্যাটাস</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockInventory.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <item.typeIcon size={16} className="text-gray-400" />
                      {item.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => alert('এডিট/ডিলিট অপশন (Development in progress)')}
                      className="p-1 hover:text-gray-900 transition-colors text-gray-400"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Inventory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">নতুন ইনভেন্টরি যোগ করুন</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্যাকেজের নাম</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="Cox's Bazar 3 Days..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">স্টক</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">প্রাইস</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="৳ ১২,০০০" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors">বাতিল</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">সেভ করুন</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
