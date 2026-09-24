import React from 'react';
import { Layers, Network, ArrowRight } from 'lucide-react';

export default function ArchitectureOverview() {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-6 border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-primary-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Dual-Engine System Architecture</h3>
        </div>
        <span className="text-[11px] font-medium text-slate-400">Planned FastAPI & ML Pipeline</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Static Analysis Pipeline */}
        <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center space-x-2 mb-2 text-primary-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary-400"></span>
            <h4>1. Static Analysis Pipeline</h4>
          </div>
          <p className="text-slate-400 mb-2">Deterministic rules, syntax parsing & vulnerability scans:</p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-200">AST Parser</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-200">Radon (Metrics)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-rose-300">Bandit (Security)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-amber-300">Flake8 / Pylint</span>
          </div>
        </div>

        {/* Machine Learning Pipeline */}
        <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60">
          <div className="flex items-center space-x-2 mb-2 text-indigo-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <h4>2. Machine Learning Pipeline</h4>
          </div>
          <p className="text-slate-400 mb-2">Statistical defect prediction via trained model inference:</p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-200">Feature Vector</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-slate-200">Scaler / Normalizer</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-indigo-300">Trained Model</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200 border border-indigo-700">Defect Probability</span>
          </div>
        </div>
      </div>
    </div>
  );
}
