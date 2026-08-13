'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/umrah/';

export default function UmrahPage() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    package_name: '', price: '', inclusions: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API_URL);
      setPackages(res.data);
    } catch (err) {
      console.error('Error fetching umrah packages:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ package_name: '', price: '', inclusions: '' });
      fetchPackages();
    } catch (err) {
      console.error('Error creating umrah package:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchPackages();
    } catch (err) {
      console.error('Error deleting umrah package:', err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Umrah Packages</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Package</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Package Name" className="border p-2 rounded" required
            value={formData.package_name} onChange={e => setFormData({...formData, package_name: e.target.value})} />
          <input type="number" step="0.01" placeholder="Price" className="border p-2 rounded" required
            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <textarea placeholder="Inclusions" className="border p-2 rounded md:col-span-2" required
            value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2 hover:bg-blue-700">Add Package</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Current Packages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Package Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg: any) => (
                <tr key={pkg.id} className="border-b">
                  <td className="p-2">{pkg.id}</td>
                  <td className="p-2">{pkg.package_name}</td>
                  <td className="p-2">${pkg.price}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
