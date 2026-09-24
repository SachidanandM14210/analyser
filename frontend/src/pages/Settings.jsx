import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    defaultLanguage: 'Python',
    autoRunOnUpload: false,
    showRecommendations: true,
    darkMode: false,
  });

  const [savedNotification, setSavedNotification] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('analyzer_settings') || '{}');
      setSettings(prev => ({ ...prev, ...saved }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('analyzer_settings', JSON.stringify(settings));
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure default analysis behaviors, language bindings, and workspace preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Analysis Preferences */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-primary-600" />
            <h2 className="text-base font-bold text-slate-900">Analysis Options</h2>
          </div>

          <div className="space-y-5 text-xs">
            {/* Default Language */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="font-semibold text-slate-800 text-sm">Default Language</label>
                <p className="text-slate-500 text-xs">Pre-selected language when opening the code editor</p>
              </div>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                className="bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-3 py-2 outline-hidden focus:ring-2 focus:ring-primary-500 w-full sm:w-44"
              >
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C">C</option>
                <option value="C++">C++</option>
              </select>
            </div>

            {/* Auto Run on Upload */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 text-sm">Auto-run Analysis on Upload</span>
                <p className="text-slate-500 text-xs">Automatically trigger scans immediately when a file is selected</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoRunOnUpload}
                  onChange={(e) => setSettings({ ...settings, autoRunOnUpload: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {/* Show Recommendations */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 text-sm">Show AI Recommendations</span>
                <p className="text-slate-500 text-xs">Display contextual refactoring and code improvement tips</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showRecommendations}
                  onChange={(e) => setSettings({ ...settings, showRecommendations: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-slate-100">
            <Sun className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Appearance</h2>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-800 text-sm">Dark Theme Mode</span>
              <p className="text-slate-500 text-xs">Toggle between dark navy theme and light canvas layout</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>

        {/* Save & Feedback */}
        <div className="flex items-center justify-between pt-2">
          {savedNotification ? (
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">Settings are saved locally to your browser profile.</span>
          )}

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
