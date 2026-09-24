import React from 'react';
import { Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Recommendations({ recommendations = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Recommendations</h2>
          <p className="text-xs text-slate-500">Contextual refactoring and engineering suggestions</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="flex items-center space-x-2 py-4 text-slate-400 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>No specific refactoring recommendations required for this code snippet.</span>
          </div>
        ) : (
          recommendations.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-50 transition-colors"
            >
              <div className="mt-0.5 text-primary-500 shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                {rec}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
