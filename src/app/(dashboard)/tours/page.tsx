'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tours/';

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [formData, setFormData] = useState({
    destination: '', duration: '', price: '', inclusions: '', image_url: ''
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axios.get(API_URL);
      setTours(res.data);
    } catch (err) {
      console.error('Error fetching tours:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ destination: '', duration: '', price: '', inclusions: '', image_url: '' });
      fetchTours();
    } catch (err) {
      console.error('Error creating tour:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchTours();
    } catch (err) {
      console.error('Error deleting tour:', err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Tours</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Tour</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Destination" className="border p-2 rounded" required
            value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          <input type="text" placeholder="Duration" className="border p-2 rounded" required
            value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
          <input type="number" step="0.01" placeholder="Price" className="border p-2 rounded" required
            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <input type="url" placeholder="Image URL" className="border p-2 rounded" 
            value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <textarea placeholder="Inclusions" className="border p-2 rounded md:col-span-2" required
            value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2 hover:bg-blue-700">Add Tour</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Current Tours</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Destination</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour: any) => (
                <tr key={tour.id} className="border-b">
                  <td className="p-2">{tour.id}</td>
                  <td className="p-2">{tour.destination}</td>
                  <td className="p-2">{tour.duration}</td>
                  <td className="p-2">${tour.price}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(tour.id)} className="text-red-500 hover:text-red-700">Delete</button>
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
