import React, { useState, useEffect } from 'react';
import { Signature } from '../types';
import { Plus, Trash2, Check, Star, Edit2, X, Banana } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { NanoBananaGenerator } from './NanoBananaGenerator';

interface SignatureManagerProps {
    onSelect: (signature: Signature) => void;
    onClose: () => void;
}

export const SignatureManager: React.FC<SignatureManagerProps> = ({ onSelect, onClose }) => {
    const [signatures, setSignatures] = useState<Signature[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showNanoBanana, setShowNanoBanana] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('brevo_mailer_signatures');
        if (saved) {
            setSignatures(JSON.parse(saved));
        }
    }, []);

    const saveSignatures = (newSignatures: Signature[]) => {
        setSignatures(newSignatures);
        localStorage.setItem('brevo_mailer_signatures', JSON.stringify(newSignatures));
    };

    const handleSave = () => {
        if (!name || !content) return;

        let updatedSignatures = [...signatures];

        if (isDefault) {
            // Unset other defaults
            updatedSignatures = updatedSignatures.map(s => ({ ...s, isDefault: false }));
        }

        if (editingId) {
            // Update existing
            updatedSignatures = updatedSignatures.map(s =>
                s.id === editingId
                    ? { ...s, name, content, isDefault }
                    : s
            );
        } else {
            // Create new
            const newSig: Signature = {
                id: `sig_${Date.now()}`,
                name,
                content,
                isDefault
            };
            updatedSignatures.push(newSig);
        }

        saveSignatures(updatedSignatures);
        resetForm();
    };

    const handleNanoBananaSave = (newSig: Signature) => {
        const updatedSignatures = [...signatures, newSig];
        saveSignatures(updatedSignatures);
        setShowNanoBanana(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this signature?')) {
            saveSignatures(signatures.filter(s => s.id !== id));
        }
    };

    const handleEdit = (sig: Signature) => {
        setName(sig.name);
        setContent(sig.content);
        setIsDefault(sig.isDefault);
        setEditingId(sig.id);
        setIsEditing(true);
    };

    const resetForm = () => {
        setName('');
        setContent('');
        setIsDefault(false);
        setEditingId(null);
        setIsEditing(false);
    };

    if (showNanoBanana) {
        return <NanoBananaGenerator onSave={handleNanoBananaSave} onClose={() => setShowNanoBanana(false)} />;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">Signature Manager</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Signature Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="My Professional Signature"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                    className="min-h-[200px]"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={isDefault}
                                    onChange={(e) => setIsDefault(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="isDefault" className="text-sm text-slate-700">Set as default signature</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={resetForm}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!name || !content}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Signature
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <Plus className="w-6 h-6" />
                                    <span>Create Custom</span>
                                </button>
                                <button
                                    onClick={() => setShowNanoBanana(true)}
                                    className="w-full py-4 border-2 border-dashed border-yellow-300 rounded-xl text-slate-500 font-medium hover:border-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-bl-lg text-black">NEW</div>
                                    <Banana className="w-6 h-6 text-yellow-500" />
                                    <span>Nano Banana Gen</span>
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {signatures.map(sig => (
                                    <div key={sig.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white group relative">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-slate-800">{sig.name}</h3>
                                                {sig.isDefault && (
                                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-current" /> Default
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(sig)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sig.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            className="text-sm text-slate-600 border-t border-slate-100 pt-3"
                                            dangerouslySetInnerHTML={{ __html: sig.content }}
                                        />

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => onSelect(sig)}
                                                className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                                            >
                                                Use this signature <Check className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {signatures.length === 0 && (
                                    <div className="text-center py-8 text-slate-400">
                                        No signatures found. Create one to get started!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
