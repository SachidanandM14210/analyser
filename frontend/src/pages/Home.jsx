import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, AlertTriangle, Layers, Award } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    avgComplexity: 0,
    avgMaintainability: 0
  });

  useEffect(() => {
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

        setStats({
          total,
          highRisk,
          avgComplexity: Math.round(sumComplexity / total),
          avgMaintainability: validMIs > 0 ? Math.round(sumMaintainability / validMIs) : 0
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Code Quality Analyzer
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
            Analyze source code, identify quality issues, and predict defect risk.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/analyze"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Code2 className="w-4 h-4" />
            <span>Analyze Code</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Summary Metrics */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Analysis Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Total Analyses</span>
              <Code2 className="w-3.5 h-3.5 text-primary-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">High Risk</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-rose-600">{stats.highRisk}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Avg Complexity</span>
              <Layers className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.avgComplexity || '—'}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase">Avg Maintainability</span>
              <Award className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.avgMaintainability ? `${stats.avgMaintainability}/100` : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
