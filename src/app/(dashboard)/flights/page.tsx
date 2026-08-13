'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/flights/';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    airline: '', origin: '', destination: '', departure_time: '', arrival_time: '', price: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get(API_URL);
      setFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ airline: '', origin: '', destination: '', departure_time: '', arrival_time: '', price: '' });
      fetchFlights();
    } catch (err) {
      console.error('Error creating flight:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchFlights();
    } catch (err) {
      console.error('Error deleting flight:', err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Flights</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Flight</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Airline" className="border p-2 rounded" required
            value={formData.airline} onChange={e => setFormData({...formData, airline: e.target.value})} />
          <input type="number" step="0.01" placeholder="Price" className="border p-2 rounded" required
            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          <input type="text" placeholder="Origin" className="border p-2 rounded" required
            value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
          <input type="text" placeholder="Destination" className="border p-2 rounded" required
            value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          <div>
            <label className="block text-xs text-gray-500 mb-1">Departure Time</label>
            <input type="datetime-local" className="border p-2 rounded w-full" required
              value={formData.departure_time} onChange={e => setFormData({...formData, departure_time: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Arrival Time</label>
            <input type="datetime-local" className="border p-2 rounded w-full" required
              value={formData.arrival_time} onChange={e => setFormData({...formData, arrival_time: e.target.value})} />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded md:col-span-2 hover:bg-blue-700">Add Flight</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Current Flights</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Airline</th>
                <th className="p-2">Route</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight: any) => (
                <tr key={flight.id} className="border-b">
                  <td className="p-2">{flight.id}</td>
                  <td className="p-2">{flight.airline}</td>
                  <td className="p-2">{flight.origin} - {flight.destination}</td>
                  <td className="p-2">${flight.price}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(flight.id)} className="text-red-500 hover:text-red-700">Delete</button>
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
