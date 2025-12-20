import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AppView, EmailTemplate, Sender, SentEmail, Signature, Attachment } from './types';
import { INITIAL_TEMPLATES, SENDERS } from './constants';
import { TemplateCard } from './components/TemplateCard';
import { SettingsPanel } from './components/SettingsPanel';
import { RichTextEditor } from './components/RichTextEditor';
import { SignatureManager } from './components/SignatureManager';
import { sendEmail } from './services/brevoService';
import { generateEmailContent, suggestSubjectLines } from './services/geminiService';
import { Sparkles, Send, Loader2, ArrowLeft, RefreshCw, Wand2, CheckCircle, XCircle, FileText, History, Repeat, Trash2, PenTool, Paperclip, X } from 'lucide-react';

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [brevoKey, setBrevoKey] = useState<string>('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');

  // Editor State
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [sender, setSender] = useState<Sender>(SENDERS[0]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean, msg: string } | null>(null);
  const [showSignatureManager, setShowSignatureManager] = useState(false);

  // AI Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplates, setGeneratedTemplates] = useState<EmailTemplate[]>([]);

  // Sent Items State
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);

  // Load Sent Items from Local Storage on Mount
  useEffect(() => {
    const saved = localStorage.getItem('brevo_mailer_sent_items');
    if (saved) {
      try {
        setSentEmails(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse sent items', e);
      }
    }
  }, []);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setHtmlContent(template.htmlContent);
    setCurrentView(AppView.EDITOR);
    setSendResult(null);
    setAttachments([]);
  };

  // Load default signature when entering editor if empty
  useEffect(() => {
    if (currentView === AppView.EDITOR && !htmlContent) {
      const savedSigs = localStorage.getItem('brevo_mailer_signatures');
      if (savedSigs) {
        const signatures: Signature[] = JSON.parse(savedSigs);
        const defaultSig = signatures.find(s => s.isDefault);
        if (defaultSig) {
          setHtmlContent(`<br/><br/>${defaultSig.content}`);
        }
      }
    }
  }, [currentView]);

  const handleSignatureSelect = (signature: Signature) => {
    setHtmlContent(prev => `${prev}<br/><br/>${signature.content}`);
    setShowSignatureManager(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        const newAttachment: Attachment = {
          name: file.name,
          content: base64String
        };
        setAttachments([...attachments, newAttachment]);
      };

      reader.readAsDataURL(file);
    }
    // Reset input
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !subject) return;

    setIsSending(true);
    setSendResult(null);

    const result = await sendEmail({
      apiKey: brevoKey,
      sender,
      to: [{ email: recipientEmail, name: recipientName || recipientEmail.split('@')[0] }],
      subject,
      htmlContent,
      attachment: attachments
    });

    setIsSending(false);
    if (result.success) {
      setSendResult({ success: true, msg: 'Email sent successfully!' });

      // Save to Sent Items
      const newSentEmail: SentEmail = {
        id: result.messageId || `sent_${Date.now()}`,
        timestamp: Date.now(),
        sender,
        recipient: { email: recipientEmail, name: recipientName },
        subject,
        htmlContent,
        messageId: result.messageId,
        attachment: attachments
      };

      const updatedSent = [newSentEmail, ...sentEmails];
      setSentEmails(updatedSent);
      localStorage.setItem('brevo_mailer_sent_items', JSON.stringify(updatedSent));

      // Reset success message after 5 seconds
      setTimeout(() => setSendResult(null), 5000);
      setAttachments([]);
    } else {
      setSendResult({ success: false, msg: result.error || 'Failed to send.' });
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const content = await generateEmailContent(`Create an HTML email for: ${aiPrompt}. Include inline CSS.`);
      const subjects = await suggestSubjectLines(aiPrompt);

      const newTemplate: EmailTemplate = {
        id: `gen_${Date.now()}`,
        name: `AI: ${aiPrompt.substring(0, 20)}...`,
        subject: subjects[0] || 'New Generated Email',
        category: 'AI Generated',
        description: 'Generated by Gemini based on your prompt.',
        htmlContent: content
      };

      setGeneratedTemplates([newTemplate, ...generatedTemplates]);
    } catch (e) {
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteSentItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updated = sentEmails.filter(e => e.id !== id);
      setSentEmails(updated);
      localStorage.setItem('brevo_mailer_sent_items', JSON.stringify(updated));
    }
  };

  const resendSentItem = (email: SentEmail) => {
    setSender(email.sender);
    setRecipientEmail(email.recipient.email);
    setRecipientName(email.recipient.name);
    setSubject(email.subject);
    setHtmlContent(email.htmlContent);
    setAttachments(email.attachment || []);
    setCurrentView(AppView.EDITOR);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Sashi!</h2>
          <p className="text-blue-100 max-w-xl mb-6">
            Ready to engage with your clients today? Your campaigns for App Cloud Pro are performing well.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentView(AppView.AI_GENERATOR)}
              className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </button>
            <button
              onClick={() => setCurrentView(AppView.TEMPLATES)}
              className="bg-blue-500/30 border border-blue-400/30 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-500/40 transition-colors"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Emails Sent</h3>
          <p className="text-3xl font-bold text-slate-800">{sentEmails.length}</p>
          <span className="text-xs text-green-600 font-medium">Recorded in history</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Avg. Open Rate</h3>
          <p className="text-3xl font-bold text-slate-800">42.5%</p>
          <span className="text-xs text-green-600 font-medium">+5% vs industry avg</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 text-sm font-medium mb-1">AI Credits</h3>
          <p className="text-3xl font-bold text-slate-800">Unlimited</p>
          <span className="text-xs text-blue-600 font-medium">Gemini Pro Plan</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_TEMPLATES.map(t => (
            <TemplateCard key={t.id} template={t} onSelect={handleTemplateSelect} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Template Gallery</h2>
        <button
          onClick={() => setCurrentView(AppView.AI_GENERATOR)}
          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          <Sparkles className="w-4 h-4" /> Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...generatedTemplates, ...INITIAL_TEMPLATES].map(t => (
          <TemplateCard key={t.id} template={t} onSelect={handleTemplateSelect} />
        ))}
      </div>
    </div>
  );

  const renderSentItems = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <History className="w-6 h-6" /> Sent History
      </h2>
      {sentEmails.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <History className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No emails sent yet.</p>
          <button
            onClick={() => setCurrentView(AppView.EDITOR)}
            className="mt-4 text-blue-600 font-medium hover:underline"
          >
            Compose your first email
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 font-medium text-slate-700">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">To</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sentEmails.map((email) => (
                  <tr key={email.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">
                        {new Date(email.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{email.recipient.name || email.recipient.email}</div>
                      <div className="text-xs text-slate-400">{email.recipient.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 truncate max-w-xs">
                      {email.subject}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => resendSentItem(email)}
                          className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-xs font-medium"
                          title="Resend / Edit"
                        >
                          <Repeat className="w-3.5 h-3.5" /> Resend
                        </button>
                        <button
                          onClick={() => deleteSentItem(email.id)}
                          className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderEditor = () => (
    <div className="flex flex-col h-full lg:h-[calc(100vh-6rem)]">
      <div className="flex items-center gap-4 mb-6 shrink-0">
        <button
          onClick={() => setCurrentView(AppView.TEMPLATES)}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Composer</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:h-full overflow-hidden">
        {/* Configuration Side */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-auto lg:h-full">
          <div className="p-6 space-y-5 flex-1 lg:overflow-y-auto custom-scrollbar">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
              <select
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={sender.email}
                onChange={(e) => setSender(SENDERS.find(s => s.email === e.target.value) || SENDERS[0])}
              >
                {SENDERS.map(s => (
                  <option key={s.email} value={s.email}>{s.name} ({s.email})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">To (Email)</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="client@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">To (Name)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John Doe"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Subject</label>
                <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1" onClick={async () => {
                  const newSubjects = await suggestSubjectLines(htmlContent.substring(0, 500));
                  if (newSubjects.length > 0) setSubject(newSubjects[0]);
                }}>
                  <Wand2 className="w-3 h-3" /> Enhance
                </button>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">HTML Content</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSignatureManager(true)}
                    className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <PenTool className="w-3 h-3" /> Insert Signature
                  </button>
                  <label className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 cursor-pointer">
                    <Paperclip className="w-3 h-3" /> Attach File
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
              <RichTextEditor
                content={htmlContent}
                onChange={setHtmlContent}
                className="h-64 lg:h-full min-h-[300px]"
                placeholder="Type your email content here..."
              />
            </div>

            {/* Attachments List */}
            {attachments.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Attachments</label>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-700 border border-slate-200">
                      <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                      <span className="max-w-[150px] truncate">{file.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="ml-1 p-0.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
            <button
              onClick={handleSendEmail}
              disabled={isSending || !recipientEmail || !subject}
              className={`w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${isSending ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20'
                }`}
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {isSending ? 'Sending via Brevo...' : 'Send Email'}
            </button>

            {sendResult && (
              <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${sendResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {sendResult.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
                <p className="text-sm">{sendResult.msg}</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Side */}
        <div className="w-full lg:w-1/2 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex flex-col h-[500px] lg:h-full shrink-0">
          <div className="bg-white border-b border-slate-200 px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center shrink-0">
            <span>Preview</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-white p-4 custom-scrollbar">
            {htmlContent ? (
              <div className="w-full h-full border-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FileText className="w-12 h-12 mb-2 opacity-50" />
                <p>No content to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIGenerator = () => (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">AI Email Generator</h2>
        <p className="text-slate-500">Describe the email you want to send, and Gemini will craft it for you.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 mb-8">
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g., Write a follow-up email to a client named John about the React project proposal sent last week. Mention that we can start immediately."
          className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-slate-700 text-lg"
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Professional</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Persuasive</span>
          </div>
          <button
            onClick={handleAiGenerate}
            disabled={isGenerating || !aiPrompt}
            className={`px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all ${isGenerating ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
              }`}
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            Generate Email
          </button>
        </div>
      </div>

      {generatedTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recently Generated</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedTemplates.slice(0, 4).map(t => (
              <TemplateCard key={t.id} template={t} onSelect={handleTemplateSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      <main className="ml-64 flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          {currentView === AppView.DASHBOARD && renderDashboard()}
          {currentView === AppView.TEMPLATES && renderTemplates()}
          {currentView === AppView.EDITOR && renderEditor()}
          {currentView === AppView.AI_GENERATOR && renderAIGenerator()}
          {currentView === AppView.SENT_ITEMS && renderSentItems()}
          {currentView === AppView.SETTINGS && (
            <SettingsPanel brevoKey={brevoKey} onSaveBrevoKey={setBrevoKey} />
          )}

          {showSignatureManager && (
            <SignatureManager
              onSelect={handleSignatureSelect}
              onClose={() => setShowSignatureManager(false)}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;