'use client';

import { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import ManualBookingForm from '@/components/forms/ManualBookingForm';

const mockCustomers = [
  { id: 'CUS-001', name: 'Rashedul Islam', phone: '+880 1711-223344', passport: 'A12345678', source: 'WhatsApp', totalBookings: 2, joined: 'Jan 15, 2024' },
  { id: 'CUS-002', name: 'Jamil Ahmed', phone: '+880 1922-334455', passport: 'B98765432', source: 'Messenger', totalBookings: 1, joined: 'Feb 10, 2024' },
  { id: 'CUS-003', name: 'Sabbir Rahman', phone: '+880 1833-445566', passport: 'C45678912', source: 'Direct Call', totalBookings: 4, joined: 'Mar 05, 2024' },
  { id: 'CUS-004', name: 'Hasibul Hasan', phone: '+968 9876 5432', passport: 'D34567890', source: 'WhatsApp', totalBookings: 1, joined: 'Mar 22, 2024' },
];

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">কাস্টমার সিআরএম (CRM)</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার অফলাইন এবং অনলাইন ক্লাইন্টদের ম্যানেজ করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm"
        >
          <UserPlus size={18} /> নতুন ক্লাইন্ট যোগ করুন
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="নাম, ফোন বা পাসপোর্ট নম্বর দিয়ে খুঁজুন..." 
            className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter size={16} /> ফিল্টার
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">ক্লাইন্ট আইডি</th>
                <th className="px-6 py-4">নাম ও যোগাযোগ</th>
                <th className="px-6 py-4">পাসপোর্ট</th>
                <th className="px-6 py-4">সোর্স</th>
                <th className="px-6 py-4 text-center">বুকিং</th>
                <th className="px-6 py-4">যোগদানের তারিখ</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomers.map((cus, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{cus.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{cus.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{cus.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{cus.passport}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold inline-flex items-center">
                      {cus.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      {cus.totalBookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{cus.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-gray-400">
                      <button className="p-1 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                      <button className="p-1 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                      <button className="p-1 hover:text-gray-900 transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>৪ জন ক্লাইন্টের মধ্যে ১ থেকে ৪ জন দেখানো হচ্ছে</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>পূর্ববর্তী</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>পরবর্তী</button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl custom-scrollbar">
            <ManualBookingForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
