import React, { useState, useEffect } from 'react';
import { Play, Upload, Check, RefreshCw, AlertTriangle, FileCode } from 'lucide-react';
import CodeEditor from '../components/editor/CodeEditor';
import RiskCards from '../components/dashboard/RiskCard';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import StaticIssues from '../components/dashboard/StaticIssues';
import Recommendations from '../components/dashboard/Recommendations';
import PredictionResult from '../components/dashboard/PredictionResult';
import { analyzeCode } from '../services/analysisService';

const DEFAULT_SAMPLE_PYTHON = `import os

def read_file(filename):
    with open(filename, "r") as file:
        return file.read()

def process_data(data):
    result = []

    for item in data:
        if item > 0:
            result.append(item)

    return result

def main():
    filename = input("Enter file name: ")
    data = read_file(filename)
    processed = process_data(data.split())
    print("Processed data:", processed)

if __name__ == "__main__":
    main()`;

export default function Analyze() {
  const [code, setCode] = useState(DEFAULT_SAMPLE_PYTHON);
  const [language, setLanguage] = useState('Python');
  const [filename, setFilename] = useState('main.py');
  const [status, setStatus] = useState('initial'); // 'initial' | 'analyzing' | 'completed'
  const [result, setResult] = useState(null);
  const [isStale, setIsStale] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (result) {
      setIsStale(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name;
    setFilename(fileName);

    // Detect language from extension
    const ext = fileName.split('.').pop()?.toLowerCase();
    let detectedLang = language;
    if (ext === 'py') detectedLang = 'Python';
    else if (ext === 'java') detectedLang = 'Java';
    else if (ext === 'c') detectedLang = 'C';
    else if (ext === 'cpp' || ext === 'cc' || ext === 'cxx') detectedLang = 'C++';
    
    setLanguage(detectedLang);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setCode(content);
        setResult(null);
        setIsStale(false);
        setStatus('initial');
      }
    };
    reader.readAsText(file);
  };

  const triggerAnalysis = async (codeToAnalyze = code, langToAnalyze = language, fileToSave = filename) => {
    setStatus('analyzing');
    setIsStale(false);

    try {
      const analysisResult = await analyzeCode(codeToAnalyze, langToAnalyze);
      setResult(analysisResult);
      setStatus('completed');

      // Briefly display 'Analysis Complete' then return to 'Run Analysis'
      setTimeout(() => {
        setStatus('initial');
      }, 1800);

      // Save to localStorage history
      saveToHistory({
        filename: fileToSave,
        language: langToAnalyze,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        defectRisk: analysisResult.prediction.risk,
        defectProbability: analysisResult.prediction.probability,
        complexity: analysisResult.metrics.cyclomaticComplexity,
        maintainability: `${analysisResult.metrics.maintainabilityGrade} (${analysisResult.metrics.maintainabilityIndex})`,
        status: 'Success',
        codeSnippet: codeToAnalyze.slice(0, 150)
      });
    } catch (err) {
      console.error(err);
      setStatus('initial');
    }
  };

  const saveToHistory = (entry) => {
    try {
      const existing = JSON.parse(localStorage.getItem('analyzer_history') || '[]');
      const updated = [entry, ...existing].slice(0, 50); // Keep last 50
      localStorage.setItem('analyzer_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analyze Your Code</h1>
        <p className="text-sm text-slate-500 mt-1">
          Paste your code below or upload a file to analyze its quality and defect risk.
        </p>
      </div>

      {/* Control bar: Language, File Upload, Run Analysis */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="language-select" className="text-xs font-semibold text-slate-600">
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-lg px-3 py-2 outline-hidden focus:ring-2 focus:ring-primary-500"
            >
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
          </div>

          {/* File Upload Button */}
          <div>
            <label className="cursor-pointer inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium rounded-lg transition-colors border border-slate-200">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Upload Source File</span>
              <input
                type="file"
                accept=".py,.java,.c,.cpp,.h,.hpp"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Run Analysis Action Button */}
        <div>
          <button
            onClick={() => triggerAnalysis()}
            disabled={status === 'analyzing'}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
              status === 'analyzing'
                ? 'bg-primary-400 text-white cursor-not-allowed'
                : status === 'completed'
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
            }`}
          >
            {status === 'analyzing' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : status === 'completed' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Analysis Complete</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stale Warning Indicator */}
      {isStale && (
        <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Code was modified after the last run. The results below represent the previous snapshot until you click <strong>Run Analysis</strong> again.
          </span>
        </div>
      )}

      {/* Code Editor Surface */}
      <CodeEditor
        code={code}
        onChange={handleCodeChange}
        language={language}
        filename={filename}
      />

      {/* Results Section */}
      {result ? (
        <div className="space-y-6 pt-2">
          <div className="border-t border-slate-200 pt-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight mb-4">Analysis Results</h2>
          </div>

          {/* Top 4 Result Cards */}
          <RiskCards result={result} />

          {/* Detailed Metric Badges */}
          <MetricsGrid metrics={result.metrics} />

          {/* Static Findings Grid */}
          <StaticIssues
            securityIssues={result.securityIssues}
            styleIssues={result.styleIssues}
          />

          {/* AI Refactoring Recommendations */}
          <Recommendations recommendations={result.recommendations} />

          {/* ML Defect Prediction Section */}
          <PredictionResult prediction={result.prediction} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center shadow-xs">
          <FileCode className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">Ready to Analyze</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Click the <strong className="text-primary-600">Run Analysis</strong> button above to extract code metrics, detect security and style issues, and predict defect risk.
          </p>
        </div>
      )}
    </div>
  );
}
