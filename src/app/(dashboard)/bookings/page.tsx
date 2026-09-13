'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane, Map, FileText, Moon } from 'lucide-react';

export default function BookingsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [flightsRes, toursRes, visasRes, umrahRes] = await Promise.all([
        axios.get('/api/flights/').catch(() => ({ data: [] })),
        axios.get('/api/tours/').catch(() => ({ data: [] })),
        axios.get('/api/visas/').catch(() => ({ data: [] })),
        axios.get('/api/umrah/').catch(() => ({ data: [] }))
      ]);

      const flights = flightsRes.data.map((item: any) => ({
        ...item,
        bookingType: 'ফ্লাইট',
        details: `${item.airline} (${item.origin} → ${item.destination})`,
        icon: <Plane size={16} className="text-blue-400" />
      }));

      const tours = toursRes.data.map((item: any) => ({
        ...item,
        bookingType: 'ট্যুর',
        details: `${item.destination} (${item.duration})`,
        icon: <Map size={16} className="text-green-400" />
      }));

      const visas = visasRes.data.map((item: any) => ({
        ...item,
        bookingType: 'ভিসা',
        details: `${item.country} - ${item.visa_type}`,
        icon: <FileText size={16} className="text-purple-400" />
      }));

      const umrah = umrahRes.data.map((item: any) => ({
        ...item,
        bookingType: 'ওমরাহ',
        details: item.package_name,
        icon: <Moon size={16} className="text-yellow-400" />
      }));

      // Combine all and sort by ID descending (or just combine)
      const combined = [...flights, ...tours, ...visas, ...umrah].sort((a, b) => b.id - a.id);
      setItems(combined);
    } catch (err) {
      console.error('Error fetching combined data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">সব বুকিং</h1>
      </div>

      <div className="bg-[#1a1d24] border border-[#2e3340] rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#252932] px-6 py-4 border-b border-[#2e3340] flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">বুকিংয়ের তালিকা</h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#2e3340] text-[#94a3b8] rounded-lg border border-[#3e4455]">
            মোট: {items.length}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1d24]">
              <tr>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-20">আইডি</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-32">টাইপ</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8]">বিবরণ</th>
                <th className="p-4 text-left font-semibold text-[#94a3b8] w-32">প্রাইস</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#94a3b8]">লোড হচ্ছে...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#94a3b8]">কোনো তথ্য পাওয়া যায়নি।</td>
                </tr>
              ) : items.map((item: any, index: number) => (
                <tr key={`${item.bookingType}-${item.id}-${index}`} className="hover:bg-[#252932] transition-colors group">
                  <td className="p-4 border-t border-[#2e3340] text-[#94a3b8]">#{item.id}</td>
                  <td className="p-4 border-t border-[#2e3340]">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-white font-medium">{item.bookingType}</span>
                    </div>
                  </td>
                  <td className="p-4 border-t border-[#2e3340] text-white">{item.details}</td>
                  <td className="p-4 border-t border-[#2e3340] text-white font-semibold">OMR {item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
