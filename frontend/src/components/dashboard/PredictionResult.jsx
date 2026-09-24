import React from 'react';
import { Bot, Sparkles, Cpu } from 'lucide-react';
import clsx from 'clsx';

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  const isHighRisk = prediction.risk === 'High';
  const isMedRisk = prediction.risk === 'Medium';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-7 shadow-xl text-white mb-6">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start space-x-4 max-w-xl">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">ML Defect Risk Prediction</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-2.5 h-2.5 mr-1 text-indigo-400" />
                Model Inference
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              The dual-engine pipeline estimates a{' '}
              <strong className={clsx(
                'font-bold px-1.5 py-0.5 rounded text-xs',
                isHighRisk ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 
                isMedRisk ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              )}>
                {prediction.risk} Defect Risk
              </strong>{' '}
              based on normalized structural branch depth, cyclomatic complexity, and static vulnerability markers.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pipeline: AST Extractor → Feature Vector Normalizer → Pre-trained Classifier</span>
            </div>
          </div>
        </div>

        {/* Progress & Class Status Box */}
        <div className="w-full lg:w-72 bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 shadow-inner shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-300">Defect Probability</span>
            <span className={clsx(
              'text-base font-extrabold',
              isHighRisk ? 'text-rose-400' : isMedRisk ? 'text-amber-400' : 'text-emerald-400'
            )}>
              {prediction.probability}%
            </span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div 
              className={clsx(
                'h-2.5 rounded-full transition-all duration-700 ease-out',
                isHighRisk ? 'bg-gradient-to-r from-rose-500 to-red-600' : 
                isMedRisk ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 
                'bg-gradient-to-r from-emerald-400 to-teal-500'
              )}
              style={{ width: `${prediction.probability}%` }}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Predicted Class:</span>
            <span className={clsx(
              'font-extrabold px-2 py-0.5 rounded-md border text-[11px]',
              isHighRisk ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 
              isMedRisk ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 
              'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            )}>
              {prediction.class}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
