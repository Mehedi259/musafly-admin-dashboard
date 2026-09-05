'use client';

import { useState } from 'react';
import { Settings, User, Lock, Bell, Building2, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">সেটিংস ও কনফিগারেশন</h1>
        <p className="text-gray-500 text-sm mt-1">আপনার কোম্পানির প্রোফাইল, পাসওয়ার্ড এবং সিস্টেম নোটিফিকেশন ম্যানেজ করুন।</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'general' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Building2 size={18} /> জেনারেল সেটিংস
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Lock size={18} /> পাসওয়ার্ড ও নিরাপত্তা
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Bell size={18} /> নোটিফিকেশন সেটিংস
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <User size={18} /> প্রোফাইল আপডেট
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSave}>
            
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">কোম্পানির তথ্য</h2>
                  <p className="text-sm text-gray-500 mt-1">আপনার ট্রাভেল এজেন্সির প্রাথমিক তথ্য আপডেট করুন।</p>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">কোম্পানির নাম</label>
                    <input type="text" defaultValue="MusaFly Travels" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">অফিসিয়াল ইমেইল</label>
                    <input type="email" defaultValue="contact@musafly.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">যোগাযোগের নম্বর</label>
                    <input type="text" defaultValue="+880 1XXX XXXXXX" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">অফিসের ঠিকানা</label>
                    <textarea rows={3} defaultValue="Dhaka, Bangladesh" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">পাসওয়ার্ড পরিবর্তন</h2>
                  <p className="text-sm text-gray-500 mt-1">আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।</p>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">বর্তমান পাসওয়ার্ড</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">নতুন পাসওয়ার্ড</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">ইমেইল ও SMS নোটিফিকেশন</h2>
                  <p className="text-sm text-gray-500 mt-1">কখন এবং কীভাবে আপনি আপডেট পেতে চান তা ঠিক করুন।</p>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-bold text-gray-900">নতুন বুকিং অ্যালার্ট (ইমেইল)</p>
                      <p className="text-xs text-gray-500 mt-0.5">নতুন বুকিং রিসিভ করলে ইমেইলে নোটিফিকেশন পাবেন।</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-bold text-gray-900">পেমেন্ট কনফার্মেশন (SMS)</p>
                      <p className="text-xs text-gray-500 mt-0.5">কাস্টমার পেমেন্ট করলে আপনার মোবাইলে SMS আসবে।</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-bold text-gray-900">সাপ্তাহিক রিপোর্ট (ইমেইল)</p>
                      <p className="text-xs text-gray-500 mt-0.5">প্রতি সপ্তাহে আয়-ব্যয়ের একটি সংক্ষিপ্ত রিপোর্ট।</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                </div>
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">অ্যাডমিন প্রোফাইল</h2>
                  <p className="text-sm text-gray-500 mt-1">আপনার ব্যক্তিগত তথ্য এবং ছবি পরিবর্তন করুন।</p>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                    <User size={32} />
                  </div>
                  <div>
                    <button type="button" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">ছবি আপলোড করুন</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">আপনার নাম</label>
                    <input type="text" defaultValue="অ্যাডমিন" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ইউজার রোল</label>
                    <input type="text" defaultValue="Super Admin" disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="p-6 md:px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 rounded-b-2xl">
              <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-2">
                {loading ? 'সংরক্ষণ করা হচ্ছে...' : (
                  <><Save size={18} /> সংরক্ষণ করুন</>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>

    </div>
  );
}
