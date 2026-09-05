'use client';

import { useState } from 'react';
import { X, Save, User, MapPin, Phone, Mail, CreditCard, Calendar, Globe, MessageSquare } from 'lucide-react';

export default function ManualBookingForm({ onClose }: { onClose?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation of API call to the backend
    setTimeout(() => {
      setLoading(false);
      if (onClose) onClose();
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl w-full mx-auto">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">অফলাইন বুকিং / ক্লাইন্ট যোগ করুন</h2>
          <p className="text-sm text-gray-500">হোয়াটসঅ্যাপ, মেসেঞ্জার বা ফোনে হওয়া ডিল রেকর্ড করুন।</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* Customer Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <User size={16} className="text-blue-500" /> কাস্টমার বিস্তারিত
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">সম্পূর্ণ নাম</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর (WhatsApp)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="+880 1..." />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">সম্পূর্ণ ঠিকানা</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea rows={2} required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="House, Road, City, Country" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসপোর্ট নম্বর</label>
              <div className="relative">
                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="A12345678" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="john@example.com" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        {/* Deal Information */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe size={16} className="text-green-500" /> ডিল / বুকিং বিস্তারিত
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">সার্ভিস ক্যাটাগরি</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                <option>ফ্লাইট টিকিট</option>
                <option>হোটেল বুকিং</option>
                <option>ভিসা প্রসেসিং</option>
                <option>ওমরাহ প্যাকেজ</option>
                <option>হলিডে ট্যুর</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">রুট / গন্তব্য বিস্তারিত</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="যেমন, ঢাকা থেকে সিলেট, ওমান থেকে সৌদি আরব" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ভ্রমণের তারিখ</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">লিড সোর্স</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                  <option>WhatsApp</option>
                  <option>Facebook Messenger</option>
                  <option>সরাসরি ফোন কল</option>
                  <option>অফিসে ভিজিট</option>
                  <option>রেফারেল</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ডিল প্রাইস (OMR/BDT)</label>
              <input type="number" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="50000" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end gap-4 border-t border-gray-100">
          {onClose && (
            <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              বাতিল
            </button>
          )}
          <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-2">
            {loading ? 'ডেটাবেসে সেভ হচ্ছে...' : (
              <>
                <Save size={18} /> সেভ ও নতুন ডিল
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
