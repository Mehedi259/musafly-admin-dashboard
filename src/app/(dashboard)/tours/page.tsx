'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus } from 'lucide-react';

const API_URL = '/api/tours/';

export default function ToursPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({destination: '', duration: '', price: '', image_url: '', inclusions: ''});
  const [loading, setLoading] = useState(false);

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
      setFormData({destination: '', duration: '', price: '', image_url: '', inclusions: ''});
      fetchData();
    } catch (err) {
      console.error('Error creating item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm('Are you sure you want to delete this?')) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchData();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold text-white mb-8">Manage Tours</h1>
      
      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex items-center gap-2">
          <Plus className="text-[#F4B942]" size={20} />
          <h2 className="text-lg font-bold text-white">Add New Tour</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Destination</label>
            <input type="text" step="0.01" placeholder="Enter Destination" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Duration</label>
            <input type="text" step="0.01" placeholder="Enter Duration" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Price ($)</label>
            <input type="number" step="0.01" placeholder="Enter Price ($)" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Image URL</label>
            <input type="url" step="0.01" placeholder="Enter Image URL" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Inclusions</label>
            <textarea placeholder="Enter Inclusions" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors min-h-[100px]" required
              value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})} />
          </div>
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#5B9BD5] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Tour'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340]">
          <h2 className="text-lg font-bold text-white">Current Tours</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24]">
              <tr>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-16">ID</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">Destination</th>
<th className="p-4 text-left font-semibold text-[#94a3b8]">Duration</th>
<th className="p-4 text-left font-semibold text-[#94a3b8]">Price</th>

                <th className="p-4 text-right font-semibold text-[#94a3b8] w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-[#94a3b8]">No data found.</td>
                </tr>
              ) : items.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#252932] transition-colors group">
                  <td className="p-4 border-t border-[#2e3340] text-[#94a3b8]">#{item.id}</td>
                  <td className="p-4 border-t border-[#2e3340] text-white">{item.destination}</td>
<td className="p-4 border-t border-[#2e3340] text-white">{item.duration}</td>
<td className="p-4 border-t border-[#2e3340] text-white">{item.price}</td>

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
