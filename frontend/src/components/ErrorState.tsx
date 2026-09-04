import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showBackToProducts?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to load product',
  message = 'An error occurred while fetching product information. Please check your connection and try again.',
  onRetry,
  showBackToProducts = true,
}) => {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 text-center shadow-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-6 shadow-xs border border-rose-100">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        {title}
      </h2>

      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
        {message}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}

        {showBackToProducts && (
          <Link
            to="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        )}
      </div>
    </div>
  );
};
