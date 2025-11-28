import React, { useState } from 'react';
import { Save, AlertCircle, Key } from 'lucide-react';

interface SettingsPanelProps {
  brevoKey: string;
  onSaveBrevoKey: (key: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ brevoKey, onSaveBrevoKey }) => {
  const [localKey, setLocalKey] = useState(brevoKey);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSaveBrevoKey(localKey);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings</h2>
        <p className="text-slate-500">Manage your API connections and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600" />
            API Configuration
          </h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Brevo (Sendinblue) API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                placeholder="xkeysib-..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-start gap-1">
              <AlertCircle className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
              <span>
                Your API key is stored in local React state and used for direct API calls. 
                Ensure your Brevo account allows calls from this origin, or use a proxy.
              </span>
            </p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
             <h4 className="text-sm font-medium text-slate-700 mb-2">Gemini API Key</h4>
             <p className="text-xs text-slate-500">
                The Gemini API Key is currently configured via environment variables for security.
             </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-all ${
              showSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {showSuccess ? (
              <>Saved Successfully!</>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
