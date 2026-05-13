/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Share2, Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, query, where, getDocs, limit } from 'firebase/firestore';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { cn } from '../lib/utils';
import { Product } from '../types';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const productDoc = await getDoc(doc(db, 'products', id));
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() } as Product;
          setProduct(productData);
          
          // Fetch related products
          const q = query(
            collection(db, 'products'),
            where('category', '==', productData.category),
            limit(5)
          );
          const relatedSnapshot = await getDocs(q);
          const related = relatedSnapshot.docs
            .map(d => ({ id: d.id, ...d.data() } as Product))
            .filter(p => p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-neutral-300" size={40} />
        <p className="text-xs uppercase tracking-widest text-neutral-400">Loading Product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <button onClick={() => navigate('/')} className="text-neutral-500 underline text-sm">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingStatus('loading');
    try {
      // Simulate booking logic - in a real app, you'd pick a date
      const bookingDate = new Date();
      bookingDate.setDate(bookingDate.getDate() + 7); // Book for 7 days from now

      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        productId: product.id,
        productName: product.name,
        date: bookingDate,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      setBookingStatus('success');
      setTimeout(() => setBookingStatus('idle'), 3000);
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingStatus('idle');
    }
  };

  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 mb-12 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square overflow-hidden bg-neutral-100 rounded-sm"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-8 left-8 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-xl">
                New Arrival
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="space-y-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={cn(i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200')} 
                    />
                  ))}
                  <span className="text-xs text-neutral-500 font-medium ml-2">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="h-4 w-[1px] bg-neutral-200" />
                <button className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
              <p className="text-3xl font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-neutral-500 leading-loose mb-12">
              {product.description}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-200 rounded-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-neutral-100 text-neutral-900 py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
              
              <button 
                onClick={handleBooking}
                disabled={bookingStatus !== 'idle'}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {bookingStatus === 'loading' ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : bookingStatus === 'success' ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Calendar size={16} />
                )}
                <span>
                  {bookingStatus === 'loading' ? 'Processing...' : 
                   bookingStatus === 'success' ? 'Appointment Scheduled' : 
                   'Book Styling Appointment'}
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-8">
              <div className="flex items-start space-x-3">
                <Truck size={20} className="text-neutral-400 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-900">Free Shipping</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Orders over $200</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck size={20} className="text-neutral-400 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-900">2-Year Warranty</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Authorized service</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-xl font-bold tracking-tighter mb-12">YOU MAY ALSO LIKE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
