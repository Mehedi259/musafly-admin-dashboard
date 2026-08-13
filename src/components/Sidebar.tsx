import Link from 'next/link';
import { Home, Plane, Map, FileText, Moon } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Tours', href: '/tours', icon: Map },
    { name: 'Flights', href: '/flights', icon: Plane },
    { name: 'Visas', href: '/visas', icon: FileText },
    { name: 'Umrah', href: '/umrah', icon: Moon },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-yellow-500">MusaFly Admin</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
