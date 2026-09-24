import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Trash2, ExternalLink, Code2, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import clsx from 'clsx';

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const data = JSON.parse(localStorage.getItem('analyzer_history') || '[]');
      setHistory(data);
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire analysis history?')) {
      localStorage.removeItem('analyzer_history');
      setHistory([]);
      setSelectedItem(null);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analysis History</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review previous scans, defect estimations, and extracted metrics saved in your session.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-xs">
          <HistoryIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No History Recorded</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Analyses you run will automatically be logged here with date stamps and snapshot metrics.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">File Name</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Defect Risk</th>
                  <th className="py-3 px-4">Complexity</th>
                  <th className="py-3 px-4">Maintainability</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {history.map((item, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-slate-400" />
                      {item.filename || 'snippet.py'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-600">
                        {item.language}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={clsx('px-2.5 py-0.5 rounded-full font-semibold border text-[11px]', getRiskColor(item.defectRisk))}>
                        {item.defectRisk} ({item.defectProbability}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.complexity}
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {item.maintainability}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center text-emerald-600 gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.status || 'Success'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="text-primary-600 hover:text-primary-800 font-semibold text-xs inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Snapshot Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-primary-600" />
                <h3 className="text-base font-bold text-slate-900">{selectedItem.filename} Details</h3>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500">Target Language:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedItem.language}</p>
                </div>
                <div>
                  <span className="text-slate-500">Scan Timestamp:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedItem.date}</p>
                </div>
                <div>
                  <span className="text-slate-500">Defect Risk Category:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedItem.defectRisk} ({selectedItem.defectProbability}%)</p>
                </div>
                <div>
                  <span className="text-slate-500">Cyclomatic Complexity:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedItem.complexity}</p>
                </div>
              </div>

              {selectedItem.codeSnippet && (
                <div>
                  <span className="text-slate-500 block mb-1 font-medium">Code Snippet Snapshot:</span>
                  <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto max-h-32">
                    {selectedItem.codeSnippet}...
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
