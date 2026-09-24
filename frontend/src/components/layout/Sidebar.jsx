import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Code2, History, Sliders, Activity, Cpu, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar({ isOpen }) {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/analyze', icon: Code2, label: 'Analyze Code', badge: 'Live' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/settings', icon: Sliders, label: 'Settings' },
  ];

  return (
    <aside className={clsx(
      'fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col border-r border-slate-800 shadow-xl',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      {/* Brand Header */}
      <div className="flex items-center px-6 h-16 border-b border-slate-800/80 bg-slate-950/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 mr-3 shrink-0 ring-1 ring-white/20">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight block">Code Analyzer</span>
          <span className="text-[10px] text-indigo-400 font-medium tracking-wide uppercase flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> AI & AST Engine
          </span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3.5 py-5 space-y-1.5 overflow-y-auto dark-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Main Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => clsx(
              'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group cursor-pointer',
              isActive 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-500/25 ring-1 ring-white/10' 
                : 'hover:bg-slate-800/70 hover:text-white text-slate-400'
            )}
          >
            <div className="flex items-center">
              <item.icon className="w-4 h-4 mr-3 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-400/20 text-blue-200 border border-blue-400/30">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status Footer Card */}
      <div className="p-3.5 m-3 rounded-xl bg-slate-950/60 border border-slate-800/80 shadow-inner">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            ML Inference
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle inline-block shadow-xs shadow-emerald-400" />
            Online
          </span>
        </div>
        <div className="space-y-1 text-[10px] text-slate-400 font-mono">
          <div className="flex justify-between">
            <span>Dual-Engine:</span>
            <span className="text-slate-200 font-semibold">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Model:</span>
            <span className="text-indigo-300">XGBoost+AST</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
