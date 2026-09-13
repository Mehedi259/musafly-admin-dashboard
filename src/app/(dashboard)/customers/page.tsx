'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import ManualBookingForm from '@/components/forms/ManualBookingForm';

const API_URL = '/api/customers/';

export default function CustomersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Basic form for now to match the mock data creation
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    passport: '',
    source: 'WhatsApp',
    total_bookings: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', phone: '', passport: '', source: 'WhatsApp', total_bookings: 0 });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating customer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm('আপনি কি এটি মুছতে চান?')) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchData();
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">কোনো ক্লাইন্ট পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((cus, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">CUS-{cus.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{cus.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{cus.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{cus.passport || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold inline-flex items-center">
                      {cus.source || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      {cus.total_bookings}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{cus.joined_date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-gray-400">
                      <button onClick={() => handleDelete(cus.id)} className="p-1 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>{items.length} জন ক্লাইন্টের মধ্যে ১ থেকে {items.length} জন দেখানো হচ্ছে</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>পূর্ববর্তী</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>পরবর্তী</button>
          </div>
        </div>
      </div>

      {/* Modal Overlay for Add Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">নতুন ক্লাইন্ট যোগ করুন</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="ক্লায়েন্টের নাম" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ফোন</label>
                <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="+880..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পাসপোর্ট নম্বর</label>
                <input type="text" value={formData.passport} onChange={e => setFormData({...formData, passport: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="পাসপোর্ট নম্বর (ঐচ্ছিক)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">সোর্স</label>
                  <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none">
                    <option>WhatsApp</option>
                    <option>Messenger</option>
                    <option>Direct Call</option>
                    <option>Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">মোট বুকিং</label>
                  <input type="number" required value={formData.total_bookings} onChange={e => setFormData({...formData, total_bookings: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" min="0" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">বাতিল</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">
                  {loading ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
