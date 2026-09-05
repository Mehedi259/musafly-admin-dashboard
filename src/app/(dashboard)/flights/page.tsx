'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, X } from 'lucide-react';

const API_URL = '/api/flights/';

export default function FlightsPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({airline: '', price: '', origin: '', destination: '', departure_time: '', arrival_time: ''});
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({airline: '', price: '', origin: '', destination: '', departure_time: '', arrival_time: ''});
      fetchData();
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error creating item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm('আপনি কি এটি মুছতে চান?')) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchData();
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">ফ্লাইট ম্যানেজমেন্ট</h1>
        <button type="button" onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center gap-2 px-4 py-2 bg-[#252932] hover:bg-[#2e3340] text-white rounded-xl transition-all border border-[#2e3340] shadow-sm">
          {isFormVisible ? <X size={20} className="text-red-400" /> : <Plus size={20} className="text-[#F4B942]" />}
          <span className="font-semibold">{isFormVisible ? 'বাতিল' : 'নতুন ফ্লাইট যোগ করুন'}</span>
        </button>
      </div>
      
      {isFormVisible && (
      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex items-center gap-2">
          <Plus className="text-[#F4B942]" size={20} />
          <h2 className="text-lg font-bold text-white">নতুন ফ্লাইট যোগ করুন</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">এয়ারলাইন</label>
            <input type="text" step="0.01" placeholder="এয়ারলাইন লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.airline} onChange={e => setFormData({...formData, airline: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">প্রাইস (OMR)</label>
            <input type="number" step="0.01" placeholder="প্রাইস লিখুন (OMR)" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">অরিজিন (শুরু)</label>
            <input type="text" step="0.01" placeholder="অরিজিন লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">গন্তব্য</label>
            <input type="text" step="0.01" placeholder="গন্তব্য লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">যাত্রার সময়</label>
            <input type="datetime-local" step="0.01" placeholder="যাত্রার সময় লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.departure_time} onChange={e => setFormData({...formData, departure_time: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">পৌঁছানোর সময়</label>
            <input type="datetime-local" step="0.01" placeholder="পৌঁছানোর সময় লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.arrival_time} onChange={e => setFormData({...formData, arrival_time: e.target.value})} />
          </div>
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#5B9BD5] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'সেভ হচ্ছে...' : 'ফ্লাইট সেভ করুন'}
            </button>
          </div>
        </form>
      </div>

      )}

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340]">
          <h2 className="text-lg font-bold text-white">বর্তমান ফ্লাইটসমূহ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24]">
              <tr>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-16">আইডি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">এয়ারলাইন</th>
<th className="p-4 text-left font-semibold text-[#94a3b8]">রুট</th>
<th className="p-4 text-left font-semibold text-[#94a3b8]">প্রাইস</th>

                <th className="p-4 text-right font-semibold text-[#94a3b8] w-24">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-[#94a3b8]">কোনো তথ্য পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#252932] transition-colors group">
                  <td className="p-4 border-t border-[#2e3340] text-[#94a3b8]">#{item.id}</td>
                  <td className="p-4 border-t border-[#2e3340] text-white">{item.airline}</td>
                  <td className="p-4 border-t border-[#2e3340] text-white">{item.origin} → {item.destination}</td>
                  <td className="p-4 border-t border-[#2e3340] text-white">OMR {item.price}</td>

                  <td className="p-4 border-t border-[#2e3340] text-right">
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-[#94a3b8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
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
