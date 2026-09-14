'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, TrendingUp, CreditCard, ArrowDownRight, ArrowUpRight, Download, Trash2, Plus, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL_TXN = '/api/reports/transactions/';
const API_URL_MONTHLY = '/api/reports/monthly/';

export default function ReportsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [areaData, setAreaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [isTxnModalOpen, setIsTxnModalOpen] = useState(false);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  
  const [txnForm, setTxnForm] = useState({
    date: '',
    description: '',
    payment_method: 'bKash',
    amount: '',
    status: 'পেইড'
  });
  
  const [monthForm, setMonthForm] = useState({
    month: '',
    revenue: 0,
    profit: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [txnRes, monthRes] = await Promise.all([
        axios.get(API_URL_TXN),
        axios.get(API_URL_MONTHLY)
      ]);
      setTransactions(txnRes.data);
      setAreaData(monthRes.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleTxnSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL_TXN, txnForm);
      setTxnForm({ date: '', description: '', payment_method: 'bKash', amount: '', status: 'পেইড' });
      setIsTxnModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating txn:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL_MONTHLY, monthForm);
      setMonthForm({ month: '', revenue: 0, profit: 0 });
      setIsMonthModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error creating month stat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTxnDelete = async (id: number) => {
    if(!confirm('আপনি কি এটি মুছতে চান?')) return;
    try {
      await axios.delete(`${API_URL_TXN}${id}/`);
      fetchData();
    } catch (err) {
      console.error('Error deleting txn:', err);
    }
  };

  const handleMonthDelete = async (id: number) => {
    if(!confirm('আপনি কি এটি মুছতে চান?')) return;
    try {
      await axios.delete(`${API_URL_MONTHLY}${id}/`);
      fetchData();
    } catch (err) {
      console.error('Error deleting month stat:', err);
    }
  };

  const totalRevenue = areaData.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
  const totalProfit = areaData.reduce((acc, curr) => acc + (curr.profit || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ফাইন্যান্সিয়াল রিপোর্টস</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার ব্যবসার আয়, ব্যয় এবং লাভের সম্পূর্ণ হিসাব।</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsMonthModalOpen(true)} className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm">
            <Plus size={18} /> মাসিক রিপোর্ট যোগ
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl transition-colors shadow-sm font-semibold text-sm">
            <Download size={18} /> ডাউনলোড
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"><DollarSign size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md"><ArrowUpRight size={14} /> ১২.৫%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">মোট রেভিনিউ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ {totalRevenue.toLocaleString('en-IN')}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600"><TrendingUp size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md"><ArrowUpRight size={14} /> ৮.২%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">নেট লাভ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ {totalProfit.toLocaleString('en-IN')}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600"><CreditCard size={24} /></div>
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md"><ArrowDownRight size={14} /> ২.৪%</span>
          </div>
          <p className="text-sm font-medium text-gray-500">মোট খরচ</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">৳ {(totalRevenue - totalProfit).toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">মাসিক রেভিনিউ এবং প্রফিট</h2>
        </div>
        {areaData.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="রেভিনিউ" />
                <Area type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="প্রফিট" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">কোনো ডাটা নেই</div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">সাম্প্রতিক লেনদেন</h2>
          <button onClick={() => setIsTxnModalOpen(true)} className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
            <Plus size={16}/> লেনদেন যোগ
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">লেনদেন আইডি</th>
                <th className="px-6 py-4">তারিখ</th>
                <th className="px-6 py-4">বিবরণ</th>
                <th className="px-6 py-4">পেমেন্ট মেথড</th>
                <th className="px-6 py-4">অ্যামাউন্ট</th>
                <th className="px-6 py-4 text-center">স্ট্যাটাস</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">কোনো লেনদেন পাওয়া যায়নি।</td>
                </tr>
              ) : transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">TXN-{txn.id}</td>
                  <td className="px-6 py-4 text-gray-600">{txn.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{txn.description}</td>
                  <td className="px-6 py-4 text-gray-600">{txn.payment_method}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${txn.status === 'পেন্ডিং' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleTxnDelete(txn.id)} className="p-1 hover:text-red-500 transition-colors text-gray-400">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Txn Modal */}
      {isTxnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTxnModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">নতুন লেনদেন</h2>
            <form onSubmit={handleTxnSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ</label>
                <input required type="text" value={txnForm.date} onChange={e => setTxnForm({...txnForm, date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="২৮ মে, ২০২৪" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
                <input required type="text" value={txnForm.description} onChange={e => setTxnForm({...txnForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="Cox's Bazar Tour..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পেমেন্ট মেথড</label>
                  <select value={txnForm.payment_method} onChange={e => setTxnForm({...txnForm, payment_method: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white">
                    <option>bKash</option>
                    <option>Nagad</option>
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">স্ট্যাটাস</label>
                  <select value={txnForm.status} onChange={e => setTxnForm({...txnForm, status: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none bg-white">
                    <option>পেইড</option>
                    <option>পেন্ডিং</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">অ্যামাউন্ট</label>
                <input required type="text" value={txnForm.amount} onChange={e => setTxnForm({...txnForm, amount: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="৳ ১২,০০০" />
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsTxnModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">বাতিল</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">সেভ করুন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Month Stat Modal */}
      {isMonthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMonthModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">মাসিক রিপোর্ট যোগ</h2>
            <form onSubmit={handleMonthSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাস</label>
                <input required type="text" value={monthForm.month} onChange={e => setMonthForm({...monthForm, month: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="জানু" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">রেভিনিউ</label>
                <input required type="number" value={monthForm.revenue} onChange={e => setMonthForm({...monthForm, revenue: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রফিট</label>
                <input required type="number" value={monthForm.profit} onChange={e => setMonthForm({...monthForm, profit: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsMonthModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">বাতিল</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">সেভ</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
