import React from 'react';
import { Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';

export default function Recommendations({ recommendations = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-6">
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>AI Refactoring & Optimization Tips</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Automated
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Contextual clean-code and architecture recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="flex items-center space-x-3 py-6 px-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Code meets best practice guidelines. No specific refactoring required.</span>
          </div>
        ) : (
          recommendations.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3.5 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {rec}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
