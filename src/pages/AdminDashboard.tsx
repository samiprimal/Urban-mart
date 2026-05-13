/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db, auth } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { PRODUCTS } from '../constants';

export const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    image: '',
    isNew: false
  });

  const isAdmin = user?.email === 'rimalsamip245@gmail.com';

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/');
    }
  }, [user, authLoading, isAdmin, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(fetched);
    } catch (error: any) {
      console.warn('Ordered fetch failed, trying unordered:', error.message);
      try {
        const qSimple = query(collection(db, 'products'));
        const snapshot = await getDocs(qSimple);
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(fetched);
      } catch (err2) {
        console.error('Final fetch error:', err2);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        isNew: product.isNew || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        image: '',
        isNew: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
      updatedAt: serverTimestamp(),
      ...(editingProduct ? {} : { createdAt: serverTimestamp() })
    };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), payload);
      } else {
        await addDoc(collection(db, 'products'), payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    if (!window.confirm('This will import the initial 8 products into your database. Continue?')) return;
    setLoading(true);
    try {
      for (const p of PRODUCTS) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = p;
        await addDoc(collection(db, 'products'), {
          ...rest,
          createdAt: serverTimestamp()
        });
      }
      fetchProducts();
    } catch (error) {
      console.error('Seeding failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-neutral-300 mb-4" size={40} />
        <p className="text-xs uppercase tracking-widest text-neutral-400">Verifying Admin Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 block mb-4">Control Panel</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">INVENTORY MANAGEMENT</h1>
          </div>
          <div className="flex gap-4">
            {products.length === 0 && (
              <button 
                onClick={seedData}
                className="bg-neutral-200 text-neutral-700 px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-300 transition-colors"
              >
                Import Initial Data
              </button>
            )}
            <button 
              onClick={() => handleOpenModal()}
              className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-xl"
            >
              <Plus size={16} />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Products', value: products.length },
            { label: 'Categories', value: new Set(products.map(p => p.category)).size },
            { label: 'Total Stock Value', value: `$${products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}` }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-neutral-100 p-8 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">{stat.label}</span>
              <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="bg-white border border-neutral-100 rounded-sm overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="w-full bg-neutral-50 border-none rounded-sm py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchProducts}
              className={cn("p-3 text-neutral-400 hover:text-neutral-900 transition-colors", loading && "animate-spin")}
            >
              <Loader2 size={18} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="text-sm group hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-bold text-neutral-900 group-hover:underline cursor-pointer">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest py-1 px-2 border border-neutral-200 rounded-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {product.isNew ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-neutral-900">
                          <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full animate-pulse" />
                          New Arrival
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase text-neutral-400">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && !loading && (
            <div className="py-20 text-center">
              <p className="text-xs uppercase tracking-widest text-neutral-400">No products found in inventory.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {editingProduct ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
                  </h2>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
                    {editingProduct ? `ID: ${editingProduct.id}` : 'Fill in the information below'}
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">Product Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">Price ($)</label>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Category</label>
                  <select 
                    className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home & Living</option>
                    <option>Beauty</option>
                    <option>Sports</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Description</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Image URL</label>
                  <div className="flex gap-4">
                    <input 
                      required
                      type="url" 
                      className="flex-1 bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                    <div className="w-14 h-14 bg-neutral-100 rounded-sm shrink-0 overflow-hidden flex items-center justify-center text-neutral-300">
                      {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <ImageIcon size={20} />}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <input 
                    type="checkbox" 
                    id="isNew"
                    className="w-5 h-5 accent-neutral-900"
                    checked={formData.isNew}
                    onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
                  />
                  <label htmlFor="isNew" className="text-xs font-bold uppercase tracking-widest cursor-pointer select-none">Mark as New Arrival</label>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-neutral-200 py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-black text-white py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : (editingProduct ? <CheckCircle2 size={16} /> : <Plus size={16} />)}
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
