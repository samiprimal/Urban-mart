/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Filter, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ProductCard } from '../components/ProductCard';
import { Category, Product } from '../types';
import { cn } from '../lib/utils';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Attempt fetch with ordering, fallback if permission/index error occurs
    const fetchProducts = () => {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(fetched);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      
      // Fallback to unordered if index/permission issue
      const qSimple = query(collection(db, 'products'));
      onSnapshot(qSimple, (snapshot) => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(fetched);
        setLoading(false);
      }, (err2) => {
        console.error('Final fetch error:', err2);
        setLoading(false);
      });
    });

      return unsubscribe;
    };

    const unsub = fetchProducts();
    return () => unsub();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-900">
        <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 0.6, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.4em] text-white/70"
          >
            Spring Summer 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
          >
            ESSENTIALS FOR <br /> MODERN LIVING
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <button className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest hover:bg-neutral-200 transition-colors rounded-sm flex items-center group">
              SHOP COLLECTION <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
            </button>
            <button className="border border-white/30 text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-white/10 transition-colors rounded-sm">
              VIEW LOOKBOOK
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-linear-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20 w-full">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as Category)}
                className={cn(
                  "px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full border",
                  activeCategory === category 
                    ? "bg-neutral-900 border-neutral-900 text-white" 
                    : "bg-transparent border-neutral-200 text-neutral-500 hover:border-neutral-400"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-neutral-500 transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <span className="text-xs text-neutral-400 font-medium">Showing {filteredProducts.length} items</span>
          </div>
        </div>

        {/* Filters Drawer (Self-contained for simplicity) */}
        <motion.div
           animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
           className="overflow-hidden mb-12"
        >
          <div className="p-8 bg-neutral-50 border border-neutral-100 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Price Range</h4>
               <input 
                 type="range" 
                 min="0" 
                 max="1000" 
                 value={priceRange[1]} 
                 onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                 className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
               />
               <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                 <span>$0</span>
                 <span>${priceRange[1]}</span>
               </div>
             </div>
             <div>
               <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Sort By</h4>
               <select className="bg-transparent border-b border-neutral-300 w-full py-2 text-xs outline-hidden focus:border-neutral-900 transition-colors">
                 <option>Recommended</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
                 <option>Newest Arrivals</option>
               </select>
             </div>
             <div>
               <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Availability</h4>
               <div className="flex items-center space-x-2">
                 <input type="checkbox" id="instock" className="accent-neutral-900" defaultChecked />
                 <label htmlFor="instock" className="text-xs text-neutral-600">In Stock</label>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-neutral-200" size={48} />
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Updating Collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="py-40 text-center space-y-4">
            <p className="text-neutral-400 uppercase tracking-[0.3em] text-xs">No items found</p>
            <button 
              onClick={() => {setActiveCategory('All'); setPriceRange([0, 1000]);}}
              className="text-xs font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Featured Banner */}
      <section className="bg-neutral-100 py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 overflow-hidden rounded-sm">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?q=80&w=1200" 
              alt="Promotion" 
              className="w-full aspect-[3/4] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[.4em] text-neutral-400">Featured Material</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">SUSTAINABLE PERFORMANCE FABRICS</h2>
            <p className="text-neutral-500 max-w-md leading-loose">
              Our new collection features eco-engineered textiles that offer superior durability without compromising on comfort. Designed for the nomadic urban lifestyle.
            </p>
            <button className="text-xs font-bold border-b-2 border-neutral-900 pb-2 hover:opacity-70 transition-opacity uppercase tracking-widest">
              Explore Our Ethics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
