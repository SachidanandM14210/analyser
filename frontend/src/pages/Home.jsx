import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, AlertTriangle, Layers, Award, Sparkles, ShieldCheck, Cpu, GitBranch, Terminal } from 'lucide-react';
import ArchitectureOverview from '../components/dashboard/ArchitectureOverview';

export default function Home() {
  const [stats] = useState(() => {
    try {
      const history = JSON.parse(localStorage.getItem('analyzer_history') || '[]');
      if (history.length > 0) {
        const total = history.length;
        const highRisk = history.filter(h => h.defectRisk === 'High').length;
        const sumComplexity = history.reduce((acc, h) => acc + (parseInt(h.complexity) || 0), 0);
        
        let sumMaintainability = 0;
        let validMIs = 0;
        history.forEach(h => {
          const match = h.maintainability?.match(/\d+/);
          if (match) {
            sumMaintainability += parseInt(match[0]);
            validMIs++;
          }
        });

        return {
          total,
          highRisk,
          avgComplexity: Math.round(sumComplexity / total),
          avgMaintainability: validMIs > 0 ? Math.round(sumMaintainability / validMIs) : 0
        };
      }
    } catch (e) {
      console.error(e);
    }
    return {
      total: 0,
      highRisk: 0,
      avgComplexity: 0,
      avgMaintainability: 0
    };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl text-white">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dual-Engine Code Intelligence Platform</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Analyze Code Quality & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                Predict Defect Risk
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Combine static AST parsing, vulnerability detection, and machine learning models to detect software bugs before they reach production.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/analyze"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4" />
              <span>Start Analyzing</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>

            <Link
              to="/history"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-all duration-200"
            >
              <Terminal className="w-4 h-4 text-slate-400" />
              <span>View History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Workspace Analysis Summary
          </h2>
          <span className="text-[11px] text-slate-400">Real-time local metrics</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Total Analyses */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Scans</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Code2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.total}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Scans recorded</p>
          </div>

          {/* High Risk Findings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">High Risk</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-rose-600 tracking-tight">{stats.highRisk}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Critical attention needed</p>
          </div>

          {/* Avg Complexity */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg Complexity</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{stats.avgComplexity || '—'}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Cyclomatic index</p>
          </div>

          {/* Avg Maintainability */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg Maintainability</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.avgMaintainability ? `${stats.avgMaintainability}/100` : '—'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Overall health score</p>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <GitBranch className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">AST & Metric Extraction</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Extracts AST nodes, lines of code, branch decision points, loop structures, and calculates cyclomatic complexity index.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Security & Static Linting</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Flags critical security vulnerabilities like hardcoded secrets, unsafe file operations, and code style violations in real-time.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">ML Defect Prediction</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Uses trained machine learning classifiers to estimate defect probabilities, giving teams early warning before regressions happen.
          </p>
        </div>
      </div>

      {/* System Architecture Overview */}
      <ArchitectureOverview />
    </div>
  );
}
