'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plane, Building, MoreVertical, Plus, Filter, Search, X, Trash2 } from 'lucide-react';

const API_URL = '/api/inventory/';

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    item_type: 'ট্যুর প্যাকেজ',
    stock: '',
    price: '',
    status: 'Available'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', item_type: 'ট্যুর প্যাকেজ', stock: '', price: '', status: 'Available' });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating inventory item:', err);
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
      console.error('Error deleting inventory item:', err);
    }
  };

  const getIcon = (type: string) => {
    if (type === 'ফ্লাইট টিকিট') return <Plane size={16} className="text-blue-500" />;
    if (type === 'হোটেল রুম') return <Building size={16} className="text-orange-500" />;
    return <Package size={16} className="text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Low Stock') return 'bg-orange-100 text-orange-700';
    if (status === 'Out of Stock') return 'bg-red-100 text-red-700';
    return 'bg-green-100 text-green-700'; // Available
  };

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
            <p className="text-sm font-medium text-gray-500">মোট আইটেম</p>
            <h3 className="text-2xl font-bold text-gray-900">{items.length} টি</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><Plane size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">অ্যাভেইলেবল সিট/স্লট</p>
            <h3 className="text-2xl font-bold text-gray-900">{items.reduce((acc, curr) => acc + (curr.stock || 0), 0)} টি</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600"><Building size={24} /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">লো-স্টক অ্যালার্ট</p>
            <h3 className="text-2xl font-bold text-gray-900">{items.filter(i => i.status === 'Low Stock' || i.stock < 5).length} টি</h3>
          </div>
        </div>
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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">কোনো ইনভেন্টরি পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">INV-{item.id}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      {getIcon(item.item_type)}
                      {item.item_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1 hover:text-red-500 transition-colors text-gray-400"
                    >
                      <Trash2 size={16} />
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
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">প্যাকেজের নাম</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="Cox's Bazar 3 Days..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ধরন (Type)</label>
                  <select required value={formData.item_type} onChange={e => setFormData({...formData, item_type: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                    <option>ট্যুর প্যাকেজ</option>
                    <option>ফ্লাইট টিকিট</option>
                    <option>হোটেল রুম</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">স্টক</label>
                    <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">প্রাইস</label>
                    <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="৳ ১২,০০০" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">স্ট্যাটাস</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                    <option>Available</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors">বাতিল</button>
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
