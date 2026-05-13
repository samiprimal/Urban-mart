/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  date: Timestamp;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Timestamp;
}

export const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedBookings: Booking[] = [];
        querySnapshot.forEach((doc) => {
          fetchedBookings.push({ id: doc.id, ...doc.data() } as Booking);
        });
        
        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-neutral-300" size={40} />
        <p className="text-xs uppercase tracking-widest text-neutral-400">Loading your history...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen pt-40 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-100 mb-4">
            <Calendar size={40} className="text-neutral-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">NO BOOKINGS YET</h1>
          <p className="text-neutral-500 max-w-md mx-auto leading-loose uppercase tracking-widest text-xs">
            Schedule your first styling appointment or product demo to get started.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-sm"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">MY APPOINTMENTS</h1>

        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={booking.id}
              className="group border border-neutral-100 p-8 rounded-sm hover:border-neutral-900 transition-all flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 bg-neutral-50 rounded-sm flex items-center justify-center text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight uppercase">{booking.productName}</h3>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">ID: {booking.id.slice(0, 8)}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-neutral-400" />
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Date</p>
                    <p className="text-xs font-bold uppercase tracking-widest">{booking.date.toDate().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-neutral-400" />
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Time</p>
                    <p className="text-xs font-bold uppercase tracking-widest">{booking.date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm ${
                  booking.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                  booking.status === 'pending' ? 'bg-neutral-50 text-neutral-500' : 'bg-red-50 text-red-700'
                }`}>
                  {booking.status}
                </span>
                <ChevronRight size={20} className="text-neutral-200 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
