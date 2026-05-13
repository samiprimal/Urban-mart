/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export type Category = 'All' | 'Electronics' | 'Fashion' | 'Home & Living' | 'Beauty' | 'Sports';

export interface CartItem extends Product {
  quantity: number;
}
