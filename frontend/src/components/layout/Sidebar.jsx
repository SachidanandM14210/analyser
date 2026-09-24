import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Code2, History, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar({ isOpen }) {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/analyze', icon: Code2, label: 'Analyze Code' },
    { to: '/history', icon: History, label: 'History' },
  ];

  return (
    <aside className={clsx(
      'fixed inset-y-0 left-0 z-30 w-60 bg-navy-900 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col border-r border-navy-800',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      <div className="flex items-center px-6 h-16 border-b border-navy-800">
        <Activity className="w-6 h-6 text-primary-500 mr-2.5 shrink-0" />
        <span className="text-base font-bold text-white tracking-tight">Code Analyzer</span>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => clsx(
              'flex items-center px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors',
              isActive 
                ? 'bg-primary-600 text-white font-semibold shadow-xs' 
                : 'hover:bg-navy-800 hover:text-white text-slate-400'
            )}
          >
            <item.icon className="w-4 h-4 mr-3 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
