import Link from 'next/link';
import { Home, Plane, Map, FileText, Moon, MessageSquare, HelpCircle } from 'lucide-react';

export default function Sidebar() {
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
    <div className="w-64 bg-[#1a1d24] border-r border-[#2e3340] h-screen flex flex-col transition-all">
      <div className="p-6 border-b border-[#2e3340]">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#5B9BD5] to-[#F4B942]">
          MusaFly Admin
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94a3b8] hover:text-white hover:bg-[#252932] transition-all group">
              <Icon size={20} className="group-hover:text-[#F4B942] transition-colors" />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#2e3340] text-sm text-[#94a3b8] text-center">
        © 2026 MusaFly
      </div>
    </div>
  );
}
