import React from 'react';
import { Menu, LogIn, User } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-navy-900 border-b border-navy-800 flex items-center justify-between px-4 lg:px-8 text-white z-10 relative">
      <div className="flex items-center lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 rounded-md hover:bg-navy-800 text-slate-300 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-base font-semibold tracking-tight text-slate-100">
          Code Quality Analyzer
        </h1>
        <p className="text-[11px] text-primary-400 font-medium">Detect • Analyze • Improve</p>
      </div>

      <div className="flex items-center ml-auto">
        <button
          type="button"
          onClick={() => alert('Authentication module will connect here in production backend.')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-navy-800 hover:bg-slate-800 border border-slate-700/80 transition-colors"
        >
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>Login</span>
        </button>
      </div>
    </header>
  );
}
