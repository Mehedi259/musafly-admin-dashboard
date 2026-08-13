'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/visas/';

export default function VisasPage() {
  const [visas, setVisas] = useState([]);
  const [formData, setFormData] = useState({
    country: '', visa_type: '', processing_time: '', price: '', requirements: ''
  });

  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const res = await axios.get(API_URL);
      setVisas(res.data);
    } catch (err) {
      console.error('Error fetching visas:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ country: '', visa_type: '', processing_time: '', price: '', requirements: '' });
      fetchVisas();
    } catch (err) {
      console.error('Error creating visa:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchVisas();
    } catch (err) {
      console.error('Error deleting visa:', err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Visas</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Visa</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Country" className="border p-2 rounded" required
            value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
          <input type="text" placeholder="Visa Type" className="border p-2 rounded" required
            value={formData.visa_type} onChange={e => setFormData({...formData, visa_type: e.target.value})} />
          <input type="text" placeholder="Processing Time" className="border p-2 rounded" required
            value={formData.processing_time} onChange={e => setFormData({...formData, processing_time: e.target.value})} />
          <input type="number" step="0.01" placeholder="Price" className="border p-2 rounded" required
            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <textarea placeholder="Requirements" className="border p-2 rounded md:col-span-2" 
            value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2 hover:bg-blue-700">Add Visa</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Current Visas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Country</th>
                <th className="p-2">Type</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visas.map((visa: any) => (
                <tr key={visa.id} className="border-b">
                  <td className="p-2">{visa.id}</td>
                  <td className="p-2">{visa.country}</td>
                  <td className="p-2">{visa.visa_type}</td>
                  <td className="p-2">${visa.price}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(visa.id)} className="text-red-500 hover:text-red-700">Delete</button>
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
