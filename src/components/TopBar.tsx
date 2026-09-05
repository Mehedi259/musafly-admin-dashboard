'use client';

import { useState } from 'react';
import { Search, Bell, Globe, ChevronDown, User } from 'lucide-react';
import ManualBookingForm from './forms/ManualBookingForm';

export default function TopBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 w-full shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="বুকিং, কাস্টমার খুঁজুন..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-4">
        
        {/* Add Deal Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm font-semibold text-sm"
        >
          <span>+ নতুন ডিল</span>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors bg-gray-50 rounded-full border border-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Language Selector */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 transition-colors text-sm font-medium">
          <Globe size={18} className="text-gray-400" />
          <span>বাংলা</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        <div className="w-px h-8 bg-gray-200"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
            <User size={20} className="text-blue-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900">অ্যাডমিন</p>
            <p className="text-xs text-gray-500 font-medium">সুপার অ্যাডমিন</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 hidden sm:block ml-1" />
        </div>
      </div>
      </header>

      {/* Global Add Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <ManualBookingForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
