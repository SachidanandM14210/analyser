import React from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function StaticIssues({ securityIssues = [], styleIssues = [] }) {
  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Static Analysis Issues</h2>
          <p className="text-xs text-slate-500">Security scans and style validation findings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Issues Panel (Bandit / Static Security) */}
        <div className="border border-slate-200/70 rounded-xl p-4 bg-slate-50/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-semibold text-slate-800">Security Findings</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
              {securityIssues.length} found
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {securityIssues.length === 0 ? (
              <div className="flex items-center space-x-2 py-6 text-slate-400 justify-center text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>No security vulnerabilities detected.</span>
              </div>
            ) : (
              securityIssues.map((issue, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs flex items-start justify-between shadow-2xs">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Line {issue.line}
                      </span>
                      <span className={clsx('px-2 py-0.2 rounded-full font-semibold border text-[10px]', getSeverityBadge(issue.severity))}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium">{issue.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Code Quality & Style Issues (Flake8 / Pylint) */}
        <div className="border border-slate-200/70 rounded-xl p-4 bg-slate-50/40">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-slate-800">Quality & Style Issues</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
              {styleIssues.length} found
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {styleIssues.length === 0 ? (
              <div className="flex items-center space-x-2 py-6 text-slate-400 justify-center text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>No style or quality violations detected.</span>
              </div>
            ) : (
              styleIssues.map((issue, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs flex items-start justify-between shadow-2xs">
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Line {issue.line}
                      </span>
                      <span className={clsx('px-2 py-0.2 rounded-full font-semibold border text-[10px]', getSeverityBadge(issue.severity))}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium">{issue.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
