import React from 'react';
import { Layers, ArrowRight, Cpu, GitBranch } from 'lucide-react';

export default function ArchitectureOverview() {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-slate-100">Dual-Engine System Architecture</h3>
            <p className="text-[11px] text-slate-400">Integrated Static AST Analysis & Machine Learning Defect Classifier</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          FastAPI & ML Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Static Analysis Pipeline */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-all">
          <div className="flex items-center space-x-2 mb-2.5 text-blue-400 font-bold">
            <GitBranch className="w-4 h-4" />
            <h4>1. Static AST Analysis Pipeline</h4>
          </div>
          <p className="text-slate-400 mb-3 text-[11px] leading-relaxed">
            Deterministic syntax parsing, complexity calculation, and security audit:
          </p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">AST Parser</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-blue-300 border border-slate-700">Radon (Metrics)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-rose-300 border border-slate-700">Bandit (Security)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700">Flake8 / Pylint</span>
          </div>
        </div>

        {/* Machine Learning Pipeline */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-all">
          <div className="flex items-center space-x-2 mb-2.5 text-indigo-400 font-bold">
            <Cpu className="w-4 h-4" />
            <h4>2. Machine Learning Pipeline</h4>
          </div>
          <p className="text-slate-400 mb-3 text-[11px] leading-relaxed">
            Statistical defect prediction through pre-trained inference models:
          </p>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">Feature Vector</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">Normalizer</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-slate-800 text-indigo-300 border border-slate-700">Trained Model</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="px-2 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-700 font-bold">
              Defect %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
