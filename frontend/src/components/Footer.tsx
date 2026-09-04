import React from 'react';
import { Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-slate-200/90 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Fintech Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b border-slate-100">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 flex-shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Mutual Fund Backed</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pledge your mutual fund portfolio digitally to secure 0% and low-interest smartphone financing without liquidating investments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Transparent & Compliant</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Clear 0% to 10.5% APR rates, zero undisclosed processing fees, and guaranteed cashback credited directly upon approval.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Instant Digital Confirmation</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Select your preferred tenure and lock in your reservation with immediate server confirmation and booking reference.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">1Fi EMIStore</span>
            <span>•</span>
            <span>Flagship Smartphones on Smart EMI</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Smartphone Catalog
            </Link>
            <span>•</span>
            <span>Built for 1Fi SDE1 Assignment</span>
            <span>•</span>
            <span>&copy; 2026 EMIStore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
