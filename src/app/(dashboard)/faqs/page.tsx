"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}faqs/` : '/api/faqs/';

export default function FAQsPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({question: '', answer: '', category: 'general'});
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({question: '', answer: '', category: 'general'});
      fetchData();
      setIsFormVisible(false);
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
      setIsFormVisible(false);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Manage FAQs</h1>
        <button type="button" onClick={() => setIsFormVisible(!isFormVisible)} className="flex items-center gap-2 px-4 py-2 bg-[#252932] hover:bg-[#2e3340] text-white rounded-xl transition-all border border-[#2e3340] shadow-sm">
          {isFormVisible ? <X size={20} className="text-red-400" /> : <Plus size={20} className="text-[#F4B942]" />}
          <span className="font-semibold">{isFormVisible ? 'Cancel' : 'Add New FAQ'}</span>
        </button>
      </div>
      
      {isFormVisible && (
      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl mb-8 overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex items-center gap-2">
          <Plus className="text-[#F4B942]" size={20} />
          <h2 className="text-lg font-bold text-white">Add New FAQ</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Question</label>
            <input type="text" placeholder="Enter Question" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.question} onChange={e => setFormData({...formData, question: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Category</label>
            <select className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors" required
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="general">General</option>
              <option value="visa">Visa</option>
              <option value="tours">Tours</option>
              <option value="flights">Flights</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">Answer</label>
            <textarea placeholder="Enter Answer" className="bg-[#0f1115] border border-[#2e3340] p-3 rounded-xl text-white focus:outline-none focus:border-[#5B9BD5] transition-colors min-h-[100px]" required
              value={formData.answer} onChange={e => setFormData({...formData, answer: e.target.value})} />
          </div>
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-[#5B9BD5] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </form>
      </div>

      )}

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340]">
          <h2 className="text-lg font-bold text-white">Current FAQs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24] border-b border-[#2e3340]">
              <tr>
                <th className="text-left px-6 py-4 text-[#94a3b8] font-semibold tracking-wider">Question</th>
                <th className="text-left px-6 py-4 text-[#94a3b8] font-semibold tracking-wider">Category</th>
                <th className="text-right px-6 py-4 text-[#94a3b8] font-semibold tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e3340]">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#252932] transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{item.question}</td>
                  <td className="px-6 py-4 text-[#94a3b8]">{item.category}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-[#94a3b8]">No FAQs found. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
