/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 block mb-6">Contact</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">LET'S CONNECT</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Info */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Headquarters</h4>
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin size={18} className="text-neutral-900 mt-0.5" />
                  <p className="leading-relaxed">
                    123 Design Street, Creative Quarter<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Support</h4>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={18} className="text-neutral-900" />
                  <p>support@urbanmart.com</p>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone size={18} className="text-neutral-900" />
                  <p>+1 (555) 000-0000</p>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-neutral-100 rounded-sm overflow-hidden grayscale contrast-125">
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200" 
                alt="Office" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-neutral-50 p-12 rounded-sm">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-neutral-200 py-3 outline-hidden focus:border-neutral-900 transition-colors text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-neutral-200 py-3 outline-hidden focus:border-neutral-900 transition-colors text-sm" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Subject</label>
                <select className="w-full bg-transparent border-b border-neutral-200 py-3 outline-hidden focus:border-neutral-900 transition-colors text-sm">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Business Partnership</option>
                  <option>Returns</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-neutral-200 py-3 outline-hidden focus:border-neutral-900 transition-colors text-sm resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button className="bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all flex items-center gap-2 group">
                SEND MESSAGE <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
