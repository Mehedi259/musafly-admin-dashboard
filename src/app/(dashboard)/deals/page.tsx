'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Calendar, Globe, Search, Plus } from 'lucide-react';
import ManualBookingForm from '@/components/forms/ManualBookingForm';

export default function DealsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [editingDeal, setEditingDeal] = useState<any>(null);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/deals/');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch deals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("আপনি কি নিশ্চিত যে আপনি এই ডিলটি ডিলিট করতে চান?")) {
      try {
        await axios.delete(`/api/deals/${id}/`);
        setSelectedDeal(null);
        fetchDeals();
      } catch (err) {
        console.error("Failed to delete deal:", err);
        alert("ডিলিট করতে সমস্যা হয়েছে।");
      }
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">অফলাইন ডিলস</h1>
          <p className="text-gray-500">সব অফলাইন বুকিং এবং ক্লায়েন্ট ডিল এখান থেকে ম্যানেজ করুন।</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ডিল খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm flex-shrink-0"
          >
            <Plus size={18} />
            <span>নতুন ডিল</span>
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">ডিল তালিকা</h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-white text-gray-600 rounded-lg border border-gray-200 shadow-sm">
            মোট: {items.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600 w-16">আইডি</th>
                <th className="p-4 font-semibold text-gray-600">কাস্টমার</th>
                <th className="p-4 font-semibold text-gray-600">রুট/গন্তব্য</th>
                <th className="p-4 font-semibold text-gray-600">ভ্রমণের তারিখ</th>
                <th className="p-4 font-semibold text-gray-600">বিমানের নাম</th>
                <th className="p-4 font-semibold text-gray-600">প্রাইস</th>
                <th className="p-4 font-semibold text-gray-600">ক্যাটাগরি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">লোড হচ্ছে...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">কোনো ডিল পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((item, index) => (
                <tr key={item.id || index} onClick={() => setSelectedDeal(item)} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                  <td className="p-4 text-gray-500 font-medium">#{item.id}</td>
                  <td className="p-4">
                    <div className="text-gray-900 font-bold">{item.customer_name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.phone_number}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-green-500" />
                      <span className="text-gray-700 font-medium">{item.route_destination}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-500" />
                      <span className="text-gray-600">{item.travel_date}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-800">{item.airline_name || "-"}</div>
                  </td>
                  <td className="p-4 text-gray-900 font-bold">{item.deal_price} {item.currency || "BDT"}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-500" />
                      <span className="text-gray-700 font-medium">{item.service_category}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <ManualBookingForm onClose={() => setIsModalOpen(false)} onSuccess={fetchDeals} />
          </div>
        </div>
      )}

      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">ডিল বিস্তারিত - #{selectedDeal.id}</h2>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">কাস্টমার তথ্য</h3>
                
                <div>
                  <p className="text-xs text-gray-500">নাম</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.customer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ফোন নম্বর</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.phone_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">পাসপোর্ট নম্বর</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.passport_number || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ইমেইল</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ঠিকানা</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.address || 'N/A'}</p>
                </div>
              </div>

              {/* Deal Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">বুকিং তথ্য</h3>
                
                <div>
                  <p className="text-xs text-gray-500">ক্যাটাগরি</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.service_category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">রুট/গন্তব্য</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.route_destination}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ভ্রমণের তারিখ</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.travel_date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">লিড সোর্স</p>
                  <p className="font-semibold text-gray-900">{selectedDeal.lead_source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">প্রাইস</p>
                  <p className="text-lg font-bold text-blue-600">{selectedDeal.deal_price} {selectedDeal.currency || "BDT"}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-3">
                <button 
                  onClick={() => { setEditingDeal(selectedDeal); setSelectedDeal(null); }}
                  className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-semibold transition-colors text-sm border border-blue-200"
                >
                  এডিট করুন
                </button>
                <button 
                  onClick={() => handleDelete(selectedDeal.id)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-semibold transition-colors text-sm border border-red-200"
                >
                  ডিলিট করুন
                </button>
              </div>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors text-sm"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
      {editingDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <ManualBookingForm 
              onClose={() => setEditingDeal(null)} 
              initialData={editingDeal} 
              isEditMode={true} 
              onSuccess={fetchDeals} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
