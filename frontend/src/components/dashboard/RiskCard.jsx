import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Cpu, Award } from 'lucide-react';
import clsx from 'clsx';

export default function RiskCards({ result }) {
  if (!result) return null;

  const { prediction, metrics, securityIssues } = result;

  const riskBadgeColor = {
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    High: 'bg-rose-50 text-rose-700 border-rose-200',
  }[prediction.risk] || 'bg-slate-50 text-slate-700 border-slate-200';

  const riskTextColor = {
    Low: 'text-emerald-600',
    Medium: 'text-amber-600',
    High: 'text-rose-600',
  }[prediction.risk] || 'text-slate-600';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Defect Risk Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Defect Risk</span>
          <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-semibold border', riskBadgeColor)}>
            {prediction.risk}
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className={clsx('text-3xl font-bold tracking-tight', riskTextColor)}>
            {prediction.probability}%
          </span>
          <span className="text-xs text-slate-500 font-medium">Risk Probability</span>
        </div>
        <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className={clsx(
              'h-1.5 rounded-full transition-all duration-500',
              prediction.risk === 'High' ? 'bg-rose-500' : prediction.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
            )}
            style={{ width: `${prediction.probability}%` }}
          />
        </div>
      </div>

      {/* 2. Maintainability Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Maintainability</span>
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
            {metrics.maintainabilityGrade}
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {metrics.maintainabilityIndex}
          </span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          Status: {metrics.maintainabilityRating}
        </p>
      </div>

      {/* 3. Complexity Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Complexity</span>
          <Cpu className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {metrics.cyclomaticComplexity}
          </span>
          <span className={clsx(
            'text-xs font-semibold px-2 py-0.5 rounded-md',
            metrics.complexityRating === 'High' ? 'bg-rose-100 text-rose-700' :
            metrics.complexityRating === 'Medium' ? 'bg-amber-100 text-amber-700' :
            'bg-emerald-100 text-emerald-700'
          )}>
            {metrics.complexityRating}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500 font-medium">Cyclomatic index</p>
      </div>

      {/* 4. Security Issues Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Security Issues</span>
          <ShieldAlert className={clsx('w-4 h-4', securityIssues.length > 0 ? 'text-rose-500' : 'text-emerald-500')} />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {securityIssues.length}
          </span>
          <span className={clsx(
            'text-xs font-semibold px-2 py-0.5 rounded-md',
            securityIssues.length > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
          )}>
            {securityIssues.length > 0 ? (securityIssues.some(s => s.severity === 'Critical' || s.severity === 'High') ? 'High' : 'Moderate') : 'Clean'}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500 font-medium">
          {securityIssues.length > 0 ? `${securityIssues.length} potential vulnerabilities` : 'No known vulnerabilities'}
        </p>
      </div>
    </div>
  );
}
