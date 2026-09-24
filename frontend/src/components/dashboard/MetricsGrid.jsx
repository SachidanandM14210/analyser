import React from 'react';
import { Code, GitBranch, MessageSquare, Gauge } from 'lucide-react';
import clsx from 'clsx';

export default function MetricsGrid({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Code Metrics</h2>
          <p className="text-xs text-slate-500">Extracted AST and static measurements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Lines of Code */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100/60 text-blue-600 flex items-center justify-center shrink-0">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Lines of Code (LOC)</p>
            <p className="text-2xl font-bold text-slate-900">{metrics.loc}</p>
            <p className="text-xs text-slate-400 mt-0.5">{metrics.functionCount} functions detected</p>
          </div>
        </div>

        {/* Cyclomatic Complexity */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            metrics.complexityRating === 'High' ? 'bg-rose-100/70 text-rose-600' :
            metrics.complexityRating === 'Medium' ? 'bg-amber-100/70 text-amber-600' :
            'bg-emerald-100/70 text-emerald-600'
          )}>
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Cyclomatic Complexity</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">{metrics.cyclomaticComplexity}</span>
              <span className={clsx(
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                metrics.complexityRating === 'High' ? 'bg-rose-100 text-rose-700' :
                metrics.complexityRating === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              )}>
                {metrics.complexityRating}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{metrics.branchCount} branches • {metrics.loopCount} loops</p>
          </div>
        </div>

        {/* Comment Density */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className={clsx(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            metrics.commentDensity < 10 ? 'bg-amber-100/70 text-amber-600' : 'bg-blue-100/70 text-blue-600'
          )}>
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Comment Density</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">{metrics.commentDensity}%</span>
              <span className={clsx(
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                metrics.commentDensity < 10 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              )}>
                {metrics.commentDensity < 10 ? 'Low' : 'Healthy'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Documentation ratio</p>
          </div>
        </div>

        {/* Maintainability Index */}
        <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-indigo-100/60 text-indigo-600 flex items-center justify-center shrink-0">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Maintainability Index</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">{metrics.maintainabilityIndex}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                Grade {metrics.maintainabilityGrade}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Status: {metrics.maintainabilityRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
