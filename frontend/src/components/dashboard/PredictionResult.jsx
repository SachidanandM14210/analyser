import React from 'react';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  const isHighRisk = prediction.risk === 'High';
  const isMedRisk = prediction.risk === 'Medium';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4 max-w-xl">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Prediction Result</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                <Sparkles className="w-2.5 h-2.5 mr-1 text-primary-500" />
                Demonstration Model
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
              The current analysis estimates a{' '}
              <strong className={clsx(
                isHighRisk ? 'text-rose-600' : isMedRisk ? 'text-amber-600' : 'text-emerald-600'
              )}>
                {prediction.risk.toLowerCase()} defect risk
              </strong>{' '}
              based on the extracted code metrics, structural branching complexity, and security markers.
            </p>
            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Frontend demonstration estimator. Planned architecture connects to trained scikit-learn/XGBoost classifier.</span>
            </div>
          </div>
        </div>

        {/* Progress & Class Status */}
        <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100 shrink-0">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Defect Probability</span>
            <span className={clsx(
              'text-sm font-bold',
              isHighRisk ? 'text-rose-600' : isMedRisk ? 'text-amber-600' : 'text-emerald-600'
            )}>
              {prediction.probability}%
            </span>
          </div>
          
          <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
            <div 
              className={clsx(
                'h-2.5 rounded-full transition-all duration-700 ease-out',
                isHighRisk ? 'bg-rose-500' : isMedRisk ? 'bg-amber-500' : 'bg-emerald-500'
              )}
              style={{ width: `${prediction.probability}%` }}
            />
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Class:</span>
            <span className={clsx(
              'font-bold',
              isHighRisk ? 'text-rose-600' : isMedRisk ? 'text-amber-600' : 'text-emerald-600'
            )}>
              {prediction.class}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
