/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Acoustic Noise Cancelling Headphones',
    description: 'Experience pure sound with our flagship wireless headphones featuring industry-leading noise cancellation.',
    price: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 1240,
    isNew: true,
  },
  {
    id: '2',
    name: 'Minimalist Leather Backpack',
    description: 'Crafted from premium full-grain leather, this backpack combines style with functional storage for your daily essentials.',
    price: 189.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 850,
  },
  {
    id: '3',
    name: 'Smart Home Hub & Speaker',
    description: 'Control your entire home with your voice and enjoy rich, high-fidelity audio in any room.',
    price: 129.50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 2100,
  },
  {
    id: '4',
    name: 'Cotton Linen Summer Shirt',
    description: 'Stay cool and comfortable with our breathable linen-blend shirt, perfect for warm weather adventures.',
    price: 59.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    reviews: 430,
  },
  {
    id: '5',
    name: 'Ceramic Pour-Over Coffee Set',
    description: 'The ultimate set for the coffee connoisseur. Minimalist design meets exceptional extraction.',
    price: 85.00,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1544787210-22da3ef59ad3?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 620,
    isNew: true,
  },
  {
    id: '6',
    name: 'Nordic Wool Throw Blanket',
    description: 'Ultra-soft sustainable wool throw that adds warmth and texture to any living space.',
    price: 110.00,
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 310,
  },
  {
    id: '7',
    name: 'Pro Yoga Performance Mat',
    description: 'Non-slip surface and superior cushioning for the dedicated yogi. Eco-friendly materials.',
    price: 78.00,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 980,
  },
  {
    id: '8',
    name: 'Matte Finish Facial Serum',
    description: 'Revolutionary skin-clearing formula with niacinamide and zinc for a perfect complexion.',
    price: 45.00,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    reviews: 1560,
  },
];

export const CATEGORIES: string[] = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'];
