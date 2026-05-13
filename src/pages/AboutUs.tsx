/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Send } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12 mb-32"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none max-w-4xl">
            CRAFTING THE <br /> FUTURE OF RETAIL
          </h1>
          <p className="text-lg md:text-2xl text-neutral-500 max-w-3xl leading-relaxed font-light">
            Founded in 2026, UrbanMart started with a simple belief: superior design should be accessible, and the products we use daily should inspire us. We curate items that balance utility with aesthetic perfection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
           <div className="aspect-square bg-neutral-100 overflow-hidden rounded-sm">
             <img 
               src="https://images.unsplash.com/photo-1558223933-289b5c38ee8b?q=80&w=1200" 
               alt="About 1" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           </div>
           <div className="flex flex-col justify-center space-y-8">
              <h3 className="text-3xl font-bold tracking-tighter">UNCOMPROMISING QUALITY</h3>
              <p className="text-neutral-500 leading-loose text-sm">
                Every item in our collection undergoes a rigorous selection process. We partner with independent designers and established brands that share our commitment to material honesty and ethical production. We don't just sell products; we verify the stories behind them.
              </p>
              <div className="pt-8 border-t border-neutral-100 flex items-center space-x-12">
                 <div>
                   <span className="block text-2xl font-bold">50+</span>
                   <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Global Partners</span>
                 </div>
                 <div>
                   <span className="block text-2xl font-bold">12k</span>
                   <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Happy Customers</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Culture */}
        <section className="bg-black text-white -mx-6 px-6 py-32 rounded-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
          <div className="relative z-10 max-w-4xl space-y-12">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">JOIN OUR COMMUNITY</h2>
             <p className="text-white/60 leading-relaxed text-sm max-w-xl">
               Become part of a network of design-forward individuals. Early access to new collections, exclusive drops, and more.
             </p>
             <div className="flex gap-4">
                <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors">
                  <Instagram size={16} />
                  <span>Follow Us</span>
                </button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};
