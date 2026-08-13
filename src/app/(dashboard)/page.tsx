'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardHome() {
  const [counts, setCounts] = useState({
    tours: 0,
    testimonials: 0,
    faqs: 0,
    flights: 0,
    visas: 0,
    umrah: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toursRes, flightsRes, visasRes, umrahRes, testimonialsRes, faqsRes] = await Promise.all([
          axios.get('/api/tours/').catch(() => ({ data: [] })),
          axios.get('/api/flights/').catch(() => ({ data: [] })),
          axios.get('/api/visas/').catch(() => ({ data: [] })),
          axios.get('/api/umrah/').catch(() => ({ data: [] })),
          axios.get('/api/testimonials/').catch(() => ({ data: [] })),
          axios.get('/api/faqs/').catch(() => ({ data: [] })),
        ]);

        setCounts({
          tours: toursRes.data.length || 0,
          flights: flightsRes.data.length || 0,
          visas: visasRes.data.length || 0,
          umrah: umrahRes.data.length || 0,
          testimonials: testimonialsRes.data.length || 0,
          faqs: faqsRes.data.length || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: "Total Tours", value: counts.tours, color: "from-blue-500 to-cyan-400" },
    { label: "Total Flights", value: counts.flights, color: "from-purple-500 to-pink-500" },
    { label: "Total Visas", value: counts.visas, color: "from-amber-400 to-orange-500" },
    { label: "Umrah Packages", value: counts.umrah, color: "from-emerald-400 to-teal-500" },
    { label: "Customer Ratings", value: counts.testimonials, color: "from-indigo-400 to-purple-500" },
    { label: "FAQs", value: counts.faqs, color: "from-rose-400 to-red-500" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1d24] border border-[#2e3340] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <h3 className="text-[#94a3b8] text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</h3>
            <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
              {loading ? "..." : stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
