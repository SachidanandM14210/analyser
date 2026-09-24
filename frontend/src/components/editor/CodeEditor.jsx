import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { FileCode, Loader2 } from 'lucide-react';

export default function CodeEditor({ code, onChange, language = 'python', filename = 'main.py' }) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorError, setEditorError] = useState(false);

  // Normalize language for Monaco
  const getMonacoLang = (lang) => {
    const l = lang?.toLowerCase() || 'python';
    if (l === 'c++') return 'cpp';
    if (l === 'c') return 'c';
    if (l === 'java') return 'java';
    return 'python';
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/70 border-b border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-medium">
          <FileCode className="w-4 h-4 text-primary-400" />
          <span>Code Editor</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700/60">
            {filename}
          </span>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="relative h-[380px] w-full bg-[#1e1e1e]">
        {!editorError ? (
          <Editor
            height="100%"
            language={getMonacoLang(language)}
            value={code}
            theme="vs-dark"
            onChange={(val) => onChange(val || '')}
            onMount={() => setIsEditorReady(true)}
            loading={
              <div className="flex items-center justify-center h-full text-slate-400 space-x-2 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                <span>Loading Monaco Editor...</span>
              </div>
            }
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
              fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
              renderLineHighlight: 'all',
              padding: { top: 12, bottom: 12 }
            }}
          />
        ) : (
          /* Graceful Fallback */
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-xs bg-[#1e1e1e] text-slate-100 resize-none outline-hidden"
            spellCheck="false"
          />
        )}
      </div>
    </div>
  );
}
