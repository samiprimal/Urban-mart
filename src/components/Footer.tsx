/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-20 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
            URBANMART
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Curating the finest lifestyle products with a focus on quality, design, and sustainability. Your journey to a better living starts here.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">All Collections</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Electronics</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Fashion</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Home & Living</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
          <div className="space-y-4 text-sm mb-6">
            <div className="flex items-center space-x-3">
              <Phone size={16} />
              <span>+1 (555) 000-0000</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} />
              <span>hello@urbanmart.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={16} />
              <span>123 Design St, Creative Quarter, SF</span>
            </div>
          </div>
          <p className="text-xs mb-4">Subscribe to our newsletter for early access to drops.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-neutral-900 border-none rounded-sm px-4 py-2 text-xs focus:ring-1 focus:ring-neutral-700 w-full outline-hidden"
            />
            <button className="bg-white text-black px-4 py-2 text-xs font-bold rounded-sm hover:bg-neutral-200 transition-colors">
              JOIN
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-neutral-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest">
        <p>&copy; 2026 UrbanMart Inc. All rights reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};
