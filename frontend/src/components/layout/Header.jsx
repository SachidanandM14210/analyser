import React from 'react';
import { Menu, ShieldCheck, User, Terminal } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 lg:px-8 text-white z-10 relative">
      {/* Mobile Menu Button */}
      <div className="flex items-center lg:hidden">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Title & Tagline */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 items-center justify-center text-indigo-400">
          <Terminal className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-100">
              Code Quality Analyzer
            </h1>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
              Engine Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Detect • Analyze • Improve</p>
        </div>
      </div>

      {/* Right Action Icons & Status */}
      <div className="flex items-center space-x-3 ml-auto">
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>AST + ML Security</span>
        </div>

        <button
          type="button"
          onClick={() => alert('Authentication & Cloud Sync module')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 shadow-sm transition-all duration-200 hover:shadow-indigo-500/10 hover:border-slate-600 cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
            <User className="w-3 h-3" />
          </div>
          <span>Sign In</span>
        </button>
      </div>
    </header>
  );
}
