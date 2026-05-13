/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-screen pt-40 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-neutral-100 mb-4">
            <ShoppingBag size={40} className="text-neutral-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">YOUR CART IS EMPTY</h1>
          <p className="text-neutral-500 max-w-md mx-auto leading-loose uppercase tracking-widest text-xs">
            Start adding essential items to your collection to proceed with the checkout process.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">YOUR BAG</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* List */}
          <div className="flex-1 space-y-12">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="flex gap-6 pb-8 border-b border-neutral-100 last:border-0"
              >
                <div className="w-32 h-40 bg-neutral-100 rounded-sm overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col pt-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{item.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-neutral-400 mt-1">{item.category}</p>
                    </div>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-neutral-200 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-neutral-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-neutral-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-neutral-50 p-10 rounded-sm space-y-8 sticky top-32">
              <h2 className="text-xl font-bold tracking-tight uppercase text-xs tracking-[0.2em]">Summary</h2>
              
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Estimated Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all rounded-sm flex items-center justify-center group shadow-2xl shadow-black/10">
                CHECKOUT NOW <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="space-y-4 pt-4">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center">We accept</p>
                <div className="flex justify-center gap-4 opacity-30 grayscale">
                  <span className="text-xs font-bold">VISA</span>
                  <span className="text-xs font-bold">MASTERCARD</span>
                  <span className="text-xs font-bold">AMEX</span>
                  <span className="text-xs font-bold">APPLE PAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
