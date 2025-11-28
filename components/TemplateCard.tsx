import React from 'react';
import { EmailTemplate } from '../types';
import { Eye, Edit2 } from 'lucide-react';

interface TemplateCardProps {
  template: EmailTemplate;
  onSelect: (template: EmailTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="h-32 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
        {/* Simple preview thumbnail simulation */}
        <div className="w-full h-full bg-white shadow-sm border border-slate-200 rounded p-2 text-[6px] text-slate-400 overflow-hidden leading-tight opacity-70 group-hover:scale-105 transition-transform">
           <div className="w-1/2 h-1 bg-slate-300 mb-1 rounded"></div>
           <div className="w-3/4 h-1 bg-slate-300 mb-2 rounded"></div>
           <div className="space-y-1">
             <div className="w-full h-0.5 bg-slate-200"></div>
             <div className="w-full h-0.5 bg-slate-200"></div>
             <div className="w-2/3 h-0.5 bg-slate-200"></div>
           </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        <div className="absolute top-2 right-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide
                ${template.category === 'Business' ? 'bg-blue-100 text-blue-700' : 
                  template.category === 'Personal' ? 'bg-green-100 text-green-700' : 
                  'bg-purple-100 text-purple-700'}`}>
                {template.category}
            </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-800 text-lg mb-1">{template.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{template.description}</p>
        
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => onSelect(template)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};
