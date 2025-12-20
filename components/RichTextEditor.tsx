import React, { useRef, useEffect } from 'react';
import {
    Bold, Italic, Underline, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, Link,
    Type, RemoveFormatting
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
    className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    content,
    onChange,
    placeholder = 'Start typing...',
    className = ''
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Sync content updates from parent only if editor is empty or significantly different
    // to avoid cursor jumping issues
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            // Only update if the content is truly different to prevent cursor jumps
            // This is a simple check; for production, a more robust diff might be needed
            // or just only set initial content.
            if (document.activeElement !== editorRef.current) {
                editorRef.current.innerHTML = content;
            }
        }
    }, [content]);

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
        editorRef.current?.focus();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const ToolbarButton = ({
        icon: Icon,
        command,
        value,
        title
    }: {
        icon: any,
        command: string,
        value?: string,
        title: string
    }) => (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault(); // Prevent losing focus
                execCommand(command, value);
            }}
            className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"
            title={title}
        >
            <Icon className="w-4 h-4" />
        </button>
    );

    return (
        <div className={`flex flex-col border border-slate-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all ${className}`}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
                    <ToolbarButton icon={Bold} command="bold" title="Bold" />
                    <ToolbarButton icon={Italic} command="italic" title="Italic" />
                    <ToolbarButton icon={Underline} command="underline" title="Underline" />
                </div>

                <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
                    <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
                    <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />
                </div>

                <div className="flex items-center gap-0.5 border-r border-slate-300 pr-2 mr-1">
                    <ToolbarButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
                    <ToolbarButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
                    <ToolbarButton icon={AlignRight} command="justifyRight" title="Align Right" />
                </div>

                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            const url = prompt('Enter URL:');
                            if (url) execCommand('createLink', url);
                        }}
                        className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors"
                        title="Insert Link"
                    >
                        <Link className="w-4 h-4" />
                    </button>
                    <ToolbarButton icon={RemoveFormatting} command="removeFormat" title="Clear Formatting" />
                </div>
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="flex-1 p-4 outline-none min-h-[200px] overflow-y-auto text-slate-800 prose prose-sm max-w-none"
                style={{ minHeight: '300px' }}
                data-placeholder={placeholder}
            />

            {/* Placeholder styling helper */}
            <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
          display: block; /* For Firefox */
        }
      `}</style>
        </div>
    );
};
