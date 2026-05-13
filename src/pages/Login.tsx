/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const Login = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Visual Side */}
      <div className="hidden lg:block w-1/2 bg-neutral-900 relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1522204538344-922f76ece041?q=80&w=1200" 
          alt="Login visual" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-20 space-y-6">
           <h2 className="text-5xl font-bold text-white tracking-tighter leading-tight">
             JOIN THE HUB OF <br /> DESIGN-FIRST SHOPPING.
           </h2>
           <p className="text-white/60 max-w-sm text-sm uppercase tracking-widest leading-loose">
             Unlock personalized recommendations, faster checkout, and exclusive early access.
           </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-12">
          <div className="space-y-4 text-center lg:text-left">
            <Link to="/" className="inline-block text-xl font-bold tracking-tighter mb-8">URBANMART</Link>
            <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-neutral-500 text-sm">Please enter your details to sign in.</p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 border border-neutral-200 py-4 rounded-sm hover:bg-neutral-50 transition-colors cursor-pointer"
            >
               <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
               <span className="text-xs font-bold uppercase tracking-widest">Sign in with Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 border border-neutral-200 py-4 rounded-sm hover:bg-neutral-50 transition-colors opacity-50 cursor-not-allowed">
               <Github size={16} />
               <span className="text-xs font-bold uppercase tracking-widest">Sign in with Github</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-white px-4 text-neutral-400">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden" 
                placeholder="name@company.com" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
                <a href="#" className="text-[10px] text-neutral-900 underline uppercase tracking-widest font-bold">Forgot?</a>
              </div>
              <input 
                type="password" 
                className="w-full bg-neutral-50 border-none rounded-sm py-4 px-4 text-sm focus:ring-1 focus:ring-neutral-900 outline-hidden" 
                placeholder="••••••••" 
              />
            </div>
            <button className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-all flex items-center justify-center group shadow-xl">
              SIGN IN <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-xs text-neutral-500 uppercase tracking-widest">
            Don't have an account? <a href="#" className="text-neutral-900 font-bold underline">Create for free</a>
          </p>
        </div>
      </div>
    </div>
  );
};
