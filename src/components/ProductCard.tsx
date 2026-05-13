/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            New
          </span>
        )}

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-white text-neutral-900 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg"
          >
            <Plus size={20} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="text-sm font-medium text-neutral-900 hover:underline">
            {product.name}
          </Link>
          <span className="text-sm font-bold text-neutral-900">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
