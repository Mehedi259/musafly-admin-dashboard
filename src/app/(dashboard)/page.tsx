export default function DashboardHome() {
  const stats = [
    { label: "Total Tours", value: "Manage", color: "from-blue-500 to-cyan-400" },
    { label: "Total Flights", value: "Manage", color: "from-purple-500 to-pink-500" },
    { label: "Total Visas", value: "Manage", color: "from-amber-400 to-orange-500" },
    { label: "Umrah Packages", value: "Manage", color: "from-emerald-400 to-teal-500" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1d24] border border-[#2e3340] p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <h3 className="text-[#94a3b8] text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</h3>
            <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
