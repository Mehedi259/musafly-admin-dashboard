'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, X, Edit2 } from 'lucide-react';

const API_URL = '/api/visas/';

export default function VisasPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({country: '', visa_type: '', processing_time: '', price: '', requirements: '', image: null as File | null | string});
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

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
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          if (key === 'image' && typeof value === 'string') return;
          data.append(key, value as string | Blob);
        }
      });
      
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (editId) {
        await axios.put(`${API_URL}${editId}/`, data, config);
      } else {
        await axios.post(API_URL, data, config);
      }
      
      setFormData({country: '', visa_type: '', processing_time: '', price: '', requirements: '', image: null});
      setEditId(null);
      fetchData();
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error creating/updating item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      country: item.country,
      visa_type: item.visa_type,
      processing_time: item.processing_time,
      price: item.price,
      requirements: item.requirements,
      image: item.image
    });
    setEditId(item.id);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    if (isFormVisible && !editId) {
      setIsFormVisible(false);
    } else {
      setFormData({country: '', visa_type: '', processing_time: '', price: '', requirements: '', image: null});
      setEditId(null);
      setIsFormVisible(true);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditId(null);
    setFormData({country: '', visa_type: '', processing_time: '', price: '', requirements: '', image: null});
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
        <h1 className="text-4xl font-bold text-white">ভিসা ম্যানেজমেন্ট</h1>
        {items.length === 0 || !isFormVisible || editId ? (
          <button type="button" onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-[#252932] hover:bg-[#2e3340] text-white rounded-xl transition-all border border-[#2e3340] shadow-sm">
            {isFormVisible && !editId ? <X size={20} className="text-red-400" /> : <Plus size={20} className="text-[#F4B942]" />}
            <span className="font-semibold">{isFormVisible && !editId ? 'বাতিল' : 'নতুন ভিসা যোগ করুন'}</span>
          </button>
        ) : (
          <button type="button" onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 bg-[#252932] hover:bg-[#2e3340] text-white rounded-xl transition-all border border-[#2e3340] shadow-sm">
            <X size={20} className="text-red-400" />
            <span className="font-semibold">বাতিল</span>
          </button>
        )}
      </div>
      
      {isFormVisible && (
      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {editId ? <Edit2 className="text-[#F4B942]" size={20} /> : <Plus className="text-[#F4B942]" size={20} />}
            <h2 className="text-lg font-bold text-white">{editId ? 'Edit Visa' : 'নতুন ভিসা যোগ করুন'}</h2>
          </div>
          <button type="button" onClick={handleCancel} className="text-[#94a3b8] hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">দেশ</label>
            <input type="text" step="0.01" placeholder="দেশ লিখুন" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Visa Type</label>
            <input type="text" step="0.01" placeholder="Enter Visa Type" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.visa_type} onChange={e => setFormData({...formData, visa_type: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">প্রসেসিং সময়</label>
            <input type="text" step="0.01" placeholder="Enter Processing Time" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.processing_time} onChange={e => setFormData({...formData, processing_time: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">প্রাইস (OMR)</label>
            <input type="number" step="0.01" placeholder="প্রাইস লিখুন (OMR)" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Image</label>
            <input type="file" accept="image/*" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" onChange={e => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})} />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Requirements</label>
            <textarea placeholder="Enter Requirements" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors min-h-[100px]" required
              value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} />
          </div>
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#5B9BD5] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'সেভ হচ্ছে...' : (editId ? 'আপডেট করুন' : 'ভিসা সেভ করুন')}
            </button>
          </div>
        </form>
      </div>

      )}

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340]">
          <h2 className="text-lg font-bold text-white">বর্তমান ভিসাসমূহ</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24]">
              <tr>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-16">আইডি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">ছবি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">দেশ</th>
<th className="p-4 text-left font-semibold text-[#94a3b8]">Type</th>
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
                  <td className="p-4 border-t border-[#2e3340] text-white">
                    {item.image ? <img src={item.image.replace("http://46.225.103.236:8001", "").replace("https://admin.musafly.com", "")} alt={item.country} className="w-12 h-12 object-cover rounded-lg border border-[#2e3340]" /> : <div className="w-12 h-12 bg-[#252932] rounded-lg border border-[#2e3340] flex items-center justify-center text-xs text-[#94a3b8]">N/A</div>}
                  </td>
                  <td className="p-4 border-t border-[#2e3340] text-white">{item.country}</td>
<td className="p-4 border-t border-[#2e3340] text-white">{item.visa_type}</td>
<td className="p-4 border-t border-[#2e3340] text-white">OMR {item.price}</td>

                  <td className="p-4 border-t border-[#2e3340] text-right">
                    <button onClick={() => handleEdit(item)} className="p-2 text-[#94a3b8] hover:text-[#5B9BD5] hover:bg-[#5B9BD5]/10 rounded-lg transition-colors mr-2">
                      <Edit2 size={18} />
                    </button>
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
