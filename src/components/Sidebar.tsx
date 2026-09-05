'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Plane, Map, FileText, Moon, MessageSquare, HelpCircle, Menu, X, ChevronRight, Users, BarChart2, Megaphone, Settings, Briefcase, ChevronDown, Headset, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1120] border-b border-[#1e293b] z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Send className="text-[#3B82F6]" size={24} />
          <h1 className="text-xl font-bold text-white">MusaFly</h1>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0B1120] text-gray-300 h-screen flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Area */}
        <div className="p-6 md:flex hidden items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Send className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">MusaFly</h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">অ্যাডমিন ড্যাশবোর্ড</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto mt-16 md:mt-0 custom-scrollbar">
          
          <Link 
            href="/"
            onClick={() => setIsOpen(false)} 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${pathname === '/' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'hover:bg-white/5 hover:text-white'}`}>
            <Home size={20} className={pathname === '/' ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
            <span className="font-medium">ড্যাশবোর্ড</span>
          </Link>

          {/* Bookings Section (Expandable) */}
          <div className="pt-2">
            <button 
              onClick={() => setIsBookingsOpen(!isBookingsOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group hover:bg-white/5 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <Briefcase size={20} className="text-gray-400 group-hover:text-white" />
                <span className="font-medium">বুকিং</span>
              </div>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${isBookingsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isBookingsOpen && (
              <div className="pl-11 pr-4 py-2 space-y-1.5">
                <Link href="/bookings" className="block py-2 text-sm text-gray-400 hover:text-white transition-colors">সব বুকিং</Link>
                <Link href="/flights" className={`block py-2 text-sm transition-colors ${pathname === '/flights' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>ফ্লাইট</Link>
                <Link href="/hotels" className="block py-2 text-sm text-gray-400 hover:text-white transition-colors">হোটেল</Link>
                <Link href="/tours" className={`block py-2 text-sm transition-colors ${pathname === '/tours' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>ট্যুর</Link>
                <Link href="/visas" className={`block py-2 text-sm transition-colors ${pathname === '/visas' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>ভিসা</Link>
                <Link href="/umrah" className={`block py-2 text-sm transition-colors ${pathname === '/umrah' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>ওমরাহ</Link>
              </div>
            )}
          </div>

          <Link href="/inventory" className="flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group hover:bg-white/5 hover:text-white">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-400 group-hover:text-white" />
              <span className="font-medium">ইনভেন্টরি</span>
            </div>
            <ChevronDown size={16} className="text-gray-500 -rotate-90" />
          </Link>

          <Link href="/customers" className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${pathname === '/customers' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 hover:text-white'}`}>
            <Users size={20} className={pathname === '/customers' ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
            <span className="font-medium">কাস্টমার</span>
          </Link>

          <Link href="/reports" className="flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group hover:bg-white/5 hover:text-white">
            <div className="flex items-center gap-3">
              <BarChart2 size={20} className="text-gray-400 group-hover:text-white" />
              <span className="font-medium">রিপোর্টস</span>
            </div>
            <ChevronDown size={16} className="text-gray-500 -rotate-90" />
          </Link>
          
          <Link href="/marketing" className="flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group hover:bg-white/5 hover:text-white">
            <div className="flex items-center gap-3">
              <Megaphone size={20} className="text-gray-400 group-hover:text-white" />
              <span className="font-medium">মার্কেটিং</span>
            </div>
            <ChevronDown size={16} className="text-gray-500 -rotate-90" />
          </Link>

          <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group hover:bg-white/5 hover:text-white">
            <Settings size={20} className="text-gray-400 group-hover:text-white" />
            <span className="font-medium">সেটিংস</span>
          </Link>
        </nav>

        {/* Need Help Card */}
        <div className="p-6">
          <div className="bg-[#152033] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/10 p-2 rounded-xl">
                <Headset size={20} className="text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">সাহায্য প্রয়োজন?</p>
                <p className="text-xs text-gray-400">আমাদের সাথে যোগাযোগ করুন</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
              যোগাযোগ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
