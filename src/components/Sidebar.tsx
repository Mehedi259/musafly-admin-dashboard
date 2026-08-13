'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Plane, Map, FileText, Moon, MessageSquare, HelpCircle, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Tours', href: '/tours', icon: Map },
    { name: 'Flights', href: '/flights', icon: Plane },
    { name: 'Visas', href: '/visas', icon: FileText },
    { name: 'Umrah', href: '/umrah', icon: Moon },
    { name: 'Testimonials', href: '/testimonials', icon: MessageSquare },
    { name: 'FAQs', href: '/faqs', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1d24] border-b border-[#2e3340] z-40 flex items-center justify-between px-4">
        <Link href="/"><h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">
          MusaFly Admin
        </h1></Link>
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
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1a1d24] border-r border-[#2e3340] h-screen flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-[#2e3340] hidden md:block">
          <Link href="/"><h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">
            MusaFly Admin
          </h1></Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-[#252932] text-white' : 'text-[#94a3b8] hover:text-white hover:bg-[#252932]'}`}>
                <Icon size={20} className={`${isActive ? 'text-[#F4B942]' : 'group-hover:text-[#F4B942]'} transition-colors`} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#2e3340] text-sm text-[#94a3b8] text-center">
          © 2026 MusaFly
        </div>
      </div>
    </>
  );
}
