import React, { useState } from 'react';
import MachineContext from './components/MachineContext';
import ChatInterface from './components/ChatInterface';
import ResponseVisualizer from './components/ResponseVisualizer';
import KnowledgeSources from './components/KnowledgeSources';
import { NotificationsPanel, HelpPanel, SettingsPanel, SourceViewerModal } from './components/HeaderPanels';

function App() {
  const [machineContext, setMachineContext] = useState({
    machine_type: 'Motor',
    model: 'ABB M3AA 132',
    age_years: 5,
    operating_hours: 12500
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI State for Panels
  const [activePanel, setActivePanel] = useState(null); // 'notifications', 'help', 'settings' or null
  const [selectedSource, setSelectedSource] = useState(null);

  const handleContextChange = (newContext) => {
    setMachineContext(prev => ({ ...prev, ...newContext }));
  };

  const togglePanel = (panelName) => {
    setActivePanel(prev => prev === panelName ? null : panelName);
  };

  const handleSourceClick = (source) => {
    setSelectedSource(source);
  };

  const handleSendQuery = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          machine_context: machineContext
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setError("Failed to get response from AI Assistant. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">MaintAI</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Industrial Assistant</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[11px] font-bold text-slate-500">System Online</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400 relative">
                <div className="relative">
                  <button
                    onClick={() => togglePanel('notifications')}
                    className={`p-1 rounded-lg transition-all ${activePanel === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    {/* Notification Dot */}
                    <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-red-500 rounded-full border border-white"></span>
                  </button>
                  <NotificationsPanel isOpen={activePanel === 'notifications'} onClose={() => setActivePanel(null)} />
                </div>

                <div className="relative">
                  <button
                    onClick={() => togglePanel('help')}
                    className={`p-1 rounded-lg transition-all ${activePanel === 'help' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                  <HelpPanel isOpen={activePanel === 'help'} onClose={() => setActivePanel(null)} />
                </div>

                <div className="relative">
                  <button
                    onClick={() => togglePanel('settings')}
                    className={`p-1 rounded-lg transition-all ${activePanel === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </button>
                  <SettingsPanel isOpen={activePanel === 'settings'} onClose={() => setActivePanel(null)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Column: Context & Symptoms */}
          <div className="lg:col-span-1 space-y-6">
            <MachineContext onContextChange={handleContextChange} />
            <ChatInterface onSendQuery={handleSendQuery} isLoading={loading} />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm flex items-start gap-2 shadow-sm animate-fade-in">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}
          </div>

          {/* Middle Column: Diagnostic Report */}
          <div className="lg:col-span-2">
            <div className={`transition-all duration-300 ${loading ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
              {response ? (
                <ResponseVisualizer response={response} />
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm">
                  <svg className="w-20 h-20 mb-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-bold text-slate-500">Waiting for Diagnostic Input</p>
                  <p className="text-[11px] font-semibold text-slate-400 max-w-[240px] text-center mt-2 uppercase tracking-wider">Select Context and Symptom to Begin</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Knowledge Sources */}
          <div className="lg:col-span-1 border-l border-slate-200 pl-8">
            <KnowledgeSources
              sources={response?.knowledge_sources || []}
              historicalCount={response?.historical_count || 0}
              onSourceClick={handleSourceClick}
            />
          </div>

        </div>
      </main>

      {/* Global Modals */}
      <SourceViewerModal
        source={selectedSource}
        isOpen={!!selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}

export default App;
