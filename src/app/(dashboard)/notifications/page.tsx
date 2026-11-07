'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Bell, 
  Send, 
  Plus, 
  Trash2, 
  X, 
  RotateCw, 
  Image as ImageIcon, 
  Smartphone, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Plane, 
  Moon, 
  FileText, 
  Map, 
  Tag, 
  ExternalLink 
} from 'lucide-react';

const API_URL = '/api/notifications/';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  image: string | null;
  badge_text: string;
  target_type: string;
  target_id: string | null;
  external_link: string | null;
  is_active: boolean;
  sent_count: number;
  created_at: string;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendingId, setResendingId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    badge_text: '🔥 বিশেষ অফার',
    target_type: 'all',
    target_id: '',
    external_link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('message', formData.message);
      data.append('badge_text', formData.badge_text);
      data.append('target_type', formData.target_type);
      if (formData.target_id) data.append('target_id', formData.target_id);
      if (formData.external_link) data.append('external_link', formData.external_link);
      if (imageFile) data.append('image', imageFile);

      await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset
      setFormData({
        title: '',
        message: '',
        badge_text: '🔥 বিশেষ অফার',
        target_type: 'all',
        target_id: '',
        external_link: '',
      });
      setImageFile(null);
      setImagePreview('');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating notification:', err);
      alert('নোটিফিকেশন তৈরিতে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('আপনি কি এই নোটিফিকেশনটি মুছে ফেলতে চান?')) return;
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchData();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const handleResend = async (id: number) => {
    setResendingId(id);
    try {
      await axios.post(`${API_URL}${id}/resend/`);
      alert('পুশ নোটিফিকেশন পুনরায় পাঠানো হয়েছে!');
      fetchData();
    } catch (err) {
      console.error('Error resending push:', err);
      alert('পুশ পাঠাতে সমস্যা হয়েছে।');
    } finally {
      setResendingId(null);
    }
  };

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane size={14} className="text-blue-500" />;
      case 'umrah': return <Moon size={14} className="text-emerald-500" />;
      case 'visa': return <FileText size={14} className="text-amber-500" />;
      case 'tour': return <Map size={14} className="text-purple-500" />;
      case 'deal': return <Tag size={14} className="text-rose-500" />;
      case 'external_url': return <ExternalLink size={14} className="text-cyan-500" />;
      default: return <Layers size={14} className="text-gray-500" />;
    }
  };

  const getTargetLabel = (type: string) => {
    switch (type) {
      case 'flight': return 'ফ্লাইট';
      case 'umrah': return 'ওমরাহ';
      case 'visa': return 'ভিসা';
      case 'tour': return 'ট্যুর';
      case 'deal': return 'হট ডিল';
      case 'external_url': return 'ওয়েব লিংক';
      default: return 'সাধারণ (সকল)';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Bell size={22} />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">পুশ নোটিফিকেশন ও অফার</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            বিকাশের মতো সকল অ্যাপ ব্যবহারকারীদের কাছে ব্যানার ইমেজ ও অফার মেসেজ পুশ নোটিফিকেশন হিসেবে পাঠান।
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 font-semibold text-sm cursor-pointer"
        >
          <Plus size={18} /> নতুন নোটিফিকেশন পাঠান
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">মোট প্রেরিত নোটিফিকেশন</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{items.length} টি</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">সক্রিয় অফার ও নোটিশ</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
              {items.filter(i => i.is_active).length} টি
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Smartphone size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">পুশ সার্ভিস চ্যানেল</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-emerald-600 text-sm font-bold">
              <CheckCircle size={16} /> Firebase Cloud (FCM)
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900 text-base">নোটিফিকেশন হিস্ট্রি ও ইনবক্স</h2>
          <span className="text-xs text-gray-500">সর্বমোট {items.length} টি রেকর্ড</span>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Bell size={40} className="mx-auto mb-3 opacity-40 text-blue-500" />
            <p className="font-medium text-gray-600">এখনো কোনো পুশ নোটিফিকেশন পাঠানো হয়নি</p>
            <p className="text-xs text-gray-400 mt-1">"নতুন নোটিফিকেশন পাঠান" বাটনে ক্লিক করে প্রথম ক্যাম্পেইন শুরু করুন।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/30">
                  <th className="px-5 py-3.5">ব্যানার / থাম্বনেইল</th>
                  <th className="px-5 py-3.5">টাইটেল ও মেসেজ</th>
                  <th className="px-5 py-3.5">ক্যাটাগরি</th>
                  <th className="px-5 py-3.5">তারিখ</th>
                  <th className="px-5 py-3.5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-4">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-12 object-cover rounded-lg border border-gray-200 shadow-xs" 
                        />
                      ) : (
                        <div className="w-20 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 max-w-sm">
                      <div className="flex items-center gap-2 mb-1">
                        {item.badge_text && (
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold rounded-md">
                            {item.badge_text}
                          </span>
                        )}
                        <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.message}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
                        {getTargetIcon(item.target_type)}
                        {getTargetLabel(item.target_type)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleString('bn-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResend(item.id)}
                          disabled={resendingId === item.id}
                          title="পুনরায় পুশ পাঠান"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <RotateCw size={16} className={resendingId === item.id ? 'animate-spin' : ''} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="মুছে ফেলুন"
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Notification Modal with Live Mobile Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  <Send size={16} />
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">নতুন পুশ নোটিফিকেশন পাঠান</h3>
                  <p className="text-xs text-gray-500">বিকাশের মতো ব্যানার ইমেজ ও বিস্তারিত অফার ডিজাইন করুন</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body with 2-Column Layout */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Form (7 cols) */}
              <form id="notification-form" onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    নোটিফিকেশন টাইটেল *
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    placeholder="যেমন: ঢাকা-দুবাই রিটার্ন টিকিটে ২০% স্পেশাল ডিসকাউন্ট!"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium"
                  />
                </div>

                {/* Badge text */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      ব্যাজ টেক্সট
                    </label>
                    <input 
                      type="text" 
                      value={formData.badge_text} 
                      onChange={e => setFormData({...formData, badge_text: e.target.value})} 
                      placeholder="যেমন: 🔥 সীমিত সময়ের অফার"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      অফারের ধরন (Target)
                    </label>
                    <select 
                      value={formData.target_type} 
                      onChange={e => setFormData({...formData, target_type: e.target.value})} 
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium cursor-pointer"
                    >
                      <option value="all">সাধারণ নোটিফিকেশন (All)</option>
                      <option value="flight">ফ্লাইট বুকিং (Flight)</option>
                      <option value="umrah">ওমরাহ প্যাকেজ (Umrah)</option>
                      <option value="visa">ভিসা সার্ভিস (Visa)</option>
                      <option value="tour">ট্যুর প্যাকেজ (Tour)</option>
                      <option value="deal">হট ডিল (Hot Deal)</option>
                      <option value="external_url">ওয়েবসাইট লিংক (External URL)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Target Link */}
                {formData.target_type === 'external_url' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      ওয়েবসাইট লিংক (URL)
                    </label>
                    <input 
                      type="url" 
                      value={formData.external_link} 
                      onChange={e => setFormData({...formData, external_link: e.target.value})} 
                      placeholder="https://musafly.com/offers/..."
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                )}

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    মেসেজ / বিস্তারিত বিবরণ *
                  </label>
                  <textarea 
                    rows={3} 
                    required 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    placeholder="অফারের বিস্তারিত বিবরণ লিখুন যা ইউজার নোটিফিকেশনে দেখতে পাবে..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm resize-none"
                  />
                </div>

                {/* Banner Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    ব্যানার ইমেজ (Landscape রেশিও যেমন 16:9 সবচেয়ে ভালো)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/20 rounded-2xl p-4 transition-all text-center">
                    <input 
                      type="file" 
                      id="banner-image-upload" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="hidden" 
                    />
                    <label htmlFor="banner-image-upload" className="cursor-pointer block">
                      <ImageIcon size={28} className="mx-auto text-gray-400 mb-1.5" />
                      <p className="text-xs font-semibold text-gray-700">ছবি বাছাই করতে ক্লিক করুন</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG বা WEBP (সর্বোচ্চ ৫ MB)</p>
                    </label>
                  </div>
                </div>
              </form>

              {/* Right Column: Mobile Live Mockup Preview (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-5 rounded-2xl text-white flex flex-col items-center justify-center relative">
                <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-1.5">
                  <Smartphone size={14} /> মোবাইলে লাইভ প্রিভিউ
                </div>

                {/* Mobile Notification Card Frame */}
                <div className="w-full max-w-xs bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-3.5 shadow-2xl space-y-2.5">
                  
                  {/* Top Bar inside notification */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white">
                        <Send size={11} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200">MusaFly</span>
                      <span className="text-[10px] text-slate-400">• এইমাত্র</span>
                    </div>
                    {formData.badge_text && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {formData.badge_text}
                      </span>
                    )}
                  </div>

                  {/* Title & Body */}
                  <div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">
                      {formData.title || 'নোটিফিকেশন টাইটেল এখানে দেখাবে'}
                    </h5>
                    <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                      {formData.message || 'এখানে অফার ও বিস্তারিত মেসেজ প্রিভিউ হবে...'}
                    </p>
                  </div>

                  {/* Banner Preview */}
                  {imagePreview ? (
                    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-inner">
                      <img 
                        src={imagePreview} 
                        alt="Banner Preview" 
                        className="w-full h-28 object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="h-24 rounded-xl bg-slate-700/50 border border-slate-700 flex flex-col items-center justify-center text-slate-500 text-[10px]">
                      <ImageIcon size={20} className="mb-1 opacity-50" />
                      ব্যানার ছবি আপলোড করলে এখানে দেখাবে
                    </div>
                  )}

                  {/* Action CTA Button */}
                  <div className="pt-1">
                    <div className="w-full py-1.5 bg-blue-600 text-center text-white rounded-lg text-[10px] font-bold">
                      অফারটি দেখুন →
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center mt-3">
                  সব ব্যবহারকারীর মোবাইলের নোটিফিকেশন প্যানেলে ঠিক এভাবেই ভেসে উঠবে।
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                বাতিল
              </button>
              <button 
                type="submit" 
                form="notification-form"
                disabled={loading} 
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Send size={16} /> {loading ? 'পাঠানো হচ্ছে...' : 'নোটিফিকেশন ও পুশ পাঠান'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

