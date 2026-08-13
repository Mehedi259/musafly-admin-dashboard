export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Tours</h3>
          <p className="text-3xl font-bold mt-2">Manage</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Flights</h3>
          <p className="text-3xl font-bold mt-2">Manage</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Visas</h3>
          <p className="text-3xl font-bold mt-2">Manage</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Umrah Packages</h3>
          <p className="text-3xl font-bold mt-2">Manage</p>
        </div>
      </div>
    </div>
  );
}
