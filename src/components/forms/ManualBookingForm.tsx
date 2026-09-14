'use client';

import { useState } from 'react';
import axios from 'axios';
import { X, Save, User, MapPin, Phone, Mail, CreditCard, Calendar, Globe, MessageSquare } from 'lucide-react';

export default function ManualBookingForm({ onClose, initialData, isEditMode, onSuccess }: { onClose?: () => void, initialData?: any, isEditMode?: boolean, onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: initialData?.customer_name || '',
    phone_number: initialData?.phone_number || '',
    address: initialData?.address || '',
    passport_number: initialData?.passport_number || '',
    email: initialData?.email || '',
    service_category: initialData?.service_category || 'Flight Ticket',
    route_destination: initialData?.route_destination || '',
    travel_date: initialData?.travel_date || '',
    airline_name: initialData?.airline_name || '',
    lead_source: initialData?.lead_source || 'WhatsApp',
    deal_price: initialData?.deal_price || '',
    currency: initialData?.currency || 'BDT'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode && initialData?.id) {
        await axios.put(`/api/deals/${initialData.id}/`, formData);
      } else {
        await axios.post('/api/deals/', formData);
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      if (!onSuccess) window.location.reload(); 
    } catch (err) {
      console.error('Failed to save deal:', err);
      alert('ডিল সেভ করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl w-full mx-auto">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{isEditMode ? "ডিল আপডেট করুন" : "অফলাইন বুকিং / ক্লাইন্ট যোগ করুন"}</h2>
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
              <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর (WhatsApp)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="+880 1..." />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">সম্পূর্ণ ঠিকানা</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea rows={2} name="address" value={formData.address} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="House, Road, City, Country" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">পাসপোর্ট নম্বর</label>
              <div className="relative">
                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="passport_number" value={formData.passport_number} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="A12345678" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="john@example.com" />
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
              <select name="service_category" value={formData.service_category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                <option>Flight Ticket</option>
                <option>Visa Process</option>
                <option>Umrah</option>
                <option>Tour</option>
                <option>Ads</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">রুট / গন্তব্য বিস্তারিত</label>
              <input type="text" name="route_destination" value={formData.route_destination} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="যেমন, ঢাকা থেকে সিলেট, ওমান থেকে সৌদি আরব" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ভ্রমণের তারিখ</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" name="travel_date" value={formData.travel_date} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">বিমানের নাম (ঐচ্ছিক)</label>
              <input type="text" name="airline_name" value={formData.airline_name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="যেমন, US-Bangla Airlines" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">লিড সোর্স</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select name="lead_source" value={formData.lead_source} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                  <option>WhatsApp</option>
                  <option>Facebook Messenger</option>
                  <option>সরাসরি ফোন কল</option>
                  <option>অফিসে ভিজিট</option>
                  <option>রেফারেল</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ডিল প্রাইস</label>
              <div className="flex gap-2">
                <input type="number" name="deal_price" value={formData.deal_price} onChange={handleChange} required className="flex-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="5000" />
                <select name="currency" value={formData.currency} onChange={handleChange} className="w-24 px-2 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white">
                  <option value="BDT">BDT</option>
                  <option value="OMR">OMR</option>
                </select>
              </div>
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
                <Save size={18} /> {isEditMode ? "আপডেট করুন" : "সেভ ও নতুন ডিল"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
