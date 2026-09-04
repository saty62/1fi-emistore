import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Smartphone, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl p-1 -m-1">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-200">
            <span className="font-black text-base sm:text-lg tracking-tight">1Fi</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              EMIStore
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
              Mutual Fund Backed EMIs
            </span>
          </div>
        </Link>

        {/* Navigation & Trust Badges */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                location.pathname === '/' || location.pathname === '/products'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Smartphones</span>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-200">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>0% Interest Available</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/70">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Instant Cashback Up to ₹7,500</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
