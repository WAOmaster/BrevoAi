import React, { useState, useRef } from 'react';
import { Signature } from '../types';
import { Banana, Download, Save, RefreshCw } from 'lucide-react';

interface NanoBananaGeneratorProps {
    onSave: (signature: Signature) => void;
    onClose: () => void;
}

export const NanoBananaGenerator: React.FC<NanoBananaGeneratorProps> = ({ onSave, onClose }) => {
    const [name, setName] = useState('Sashi Perera');
    const [title, setTitle] = useState('Chief Banana Officer');
    const [company, setCompany] = useState('Banana Corp');
    const [email, setEmail] = useState('sashi@banana.com');
    const [phone, setPhone] = useState('+1 234 567 890');
    const [theme, setTheme] = useState<'yellow' | 'dark' | 'minimal'>('yellow');

    const previewRef = useRef<HTMLDivElement>(null);

    const generateHtml = () => {
        const styles = {
            yellow: {
                container: 'font-family: "Arial", sans-serif; padding: 20px; border-left: 5px solid #FACC15; background-color: #FEFCE8; color: #1F2937;',
                name: 'font-size: 24px; font-weight: 800; color: #000; margin: 0;',
                title: 'font-size: 14px; font-weight: 600; color: #CA8A04; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;',
                link: 'color: #000; text-decoration: none; font-weight: bold; border-bottom: 2px solid #FACC15;',
                icon: 'font-size: 24px; margin-right: 10px;'
            },
            dark: {
                container: 'font-family: "Courier New", monospace; padding: 20px; background-color: #1F2937; color: #F3F4F6; border-radius: 8px;',
                name: 'font-size: 22px; font-weight: bold; color: #FACC15; margin: 0;',
                title: 'font-size: 14px; color: #9CA3AF; margin-bottom: 12px; font-style: italic;',
                link: 'color: #60A5FA; text-decoration: none;',
                icon: 'font-size: 24px; margin-right: 10px;'
            },
            minimal: {
                container: 'font-family: "Helvetica", sans-serif; padding: 10px 0; border-top: 1px solid #E5E7EB; color: #374151;',
                name: 'font-size: 18px; font-weight: 600; color: #111827; margin: 0;',
                title: 'font-size: 14px; color: #6B7280; margin-bottom: 8px;',
                link: 'color: #374151; text-decoration: underline;',
                icon: 'font-size: 20px; margin-right: 8px;'
            }
        };

        const s = styles[theme];

        return `
      <div style="${s.container}">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="${s.icon}">🍌</span>
          <div>
            <h3 style="${s.name}">${name}</h3>
            <div style="${s.title}">${title} // ${company}</div>
          </div>
        </div>
        <div style="font-size: 13px; line-height: 1.6;">
          <div>📧 <a href="mailto:${email}" style="${s.link}">${email}</a></div>
          <div>📱 <span style="${s.link}">${phone}</span></div>
        </div>
        <div style="margin-top: 12px; font-size: 10px; opacity: 0.7;">
          <i>Sent with Nano Banana Power</i>
        </div>
      </div>
    `;
    };

    const handleSave = () => {
        const newSig: Signature = {
            id: `banana_${Date.now()}`,
            name: `Nano Banana - ${name}`,
            content: generateHtml(),
            isDefault: false
        };
        onSave(newSig);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">

                {/* Controls */}
                <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-yellow-400 p-2 rounded-lg">
                            <Banana className="w-6 h-6 text-black" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Nano Banana</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Theme</label>
                            <div className="flex gap-2">
                                {(['yellow', 'dark', 'minimal'] as const).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${theme === t
                                                ? 'bg-yellow-400 text-black shadow-md scale-105'
                                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Company</label>
                            <input
                                type="text"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            onClick={handleSave}
                            className="w-full py-3 bg-black text-yellow-400 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" /> Save Signature
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 text-slate-500 font-medium hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div className="w-full md:w-2/3 bg-slate-100 p-8 flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    <div className="mb-4 text-slate-400 font-medium text-sm uppercase tracking-widest">Live Preview</div>

                    <div
                        ref={previewRef}
                        className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full transform transition-all duration-500"
                        dangerouslySetInnerHTML={{ __html: generateHtml() }}
                    />

                    <div className="mt-8 text-center max-w-md text-slate-500 text-sm">
                        <p>This signature is generated using pure HTML/CSS. It works in Gmail, Outlook, and Apple Mail.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
