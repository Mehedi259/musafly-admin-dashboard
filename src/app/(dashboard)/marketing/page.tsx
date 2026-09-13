'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, Users, Target, Plus, Play, Pause, Share2, Mail, MessageSquare, X, Trash2 } from 'lucide-react';

const API_URL = '/api/marketing/campaigns/';

export default function MarketingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Facebook Ads',
    budget: '',
    spent: '৳ ০',
    reach: '০',
    status: 'চলমান (Active)'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, formData);
      setFormData({ name: '', platform: 'Facebook Ads', budget: '', spent: '৳ ০', reach: '০', status: 'চলমান (Active)' });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating campaign:', err);
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
      console.error('Error deleting campaign:', err);
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'Email Newsletter') return <Mail size={16} className="text-orange-500" />;
    if (platform === 'SMS Marketing') return <MessageSquare size={16} className="text-green-500" />;
    return <Share2 size={16} className="text-blue-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Completed')) return 'bg-gray-100 text-gray-700';
    if (status.includes('Paused')) return 'bg-orange-100 text-orange-700';
    return 'bg-green-100 text-green-700';
  };

  const activeCount = items.filter(c => c.status.includes('Active')).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">মার্কেটিং ও ক্যাম্পেইন</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার বিজ্ঞাপন এবং প্রোমোশনাল ক্যাম্পেইনগুলো পরিচালনা করুন।</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm"
        >
          <Plus size={18} /> নতুন ক্যাম্পেইন শুরু করুন
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4"><Megaphone size={24} /></div>
          <p className="text-sm font-medium text-gray-500">অ্যাক্টিভ ক্যাম্পেইন</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{activeCount} টি</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4"><Users size={24} /></div>
          <p className="text-sm font-medium text-gray-500">মোট ক্যাম্পেইন</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{items.length} টি</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-4"><Target size={24} /></div>
          <p className="text-sm font-medium text-gray-500">বাজেট খরচ হয়েছে (এই মাসে)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">প্রক্রিয়াধীন</h3>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">ক্যাম্পেইন তালিকা</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">ক্যাম্পেইনের নাম</th>
                <th className="px-6 py-4">প্ল্যাটফর্ম</th>
                <th className="px-6 py-4">মোট বাজেট</th>
                <th className="px-6 py-4">খরচ হয়েছে</th>
                <th className="px-6 py-4">রিচ (Reach)</th>
                <th className="px-6 py-4">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">কোনো ক্যাম্পেইন পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((camp, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{camp.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(camp.platform)}
                      <span className="text-gray-700 font-medium">{camp.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{camp.budget}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{camp.spent}</td>
                  <td className="px-6 py-4 text-gray-600">{camp.reach}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusColor(camp.status)}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleDelete(camp.id)} className="p-1.5 hover:bg-gray-100 text-red-500 rounded-md transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">নতুন ক্যাম্পেইন শুরু করুন</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাম্পেইনের নাম</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="Hajj Promo 2024..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">প্ল্যাটফর্ম</label>
                    <select required value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                      <option>Facebook Ads</option>
                      <option>Email Newsletter</option>
                      <option>SMS Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">স্ট্যাটাস</label>
                    <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                      <option>চলমান (Active)</option>
                      <option>স্থগিত (Paused)</option>
                      <option>সম্পন্ন (Completed)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">বাজেট</label>
                  <input type="text" required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="৳ ৫০,০০০" />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors">বাতিল</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">ক্যাম্পেইন শুরু করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
