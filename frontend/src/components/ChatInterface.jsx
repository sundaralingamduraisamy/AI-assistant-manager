import React, { useState } from 'react';

export default function ChatInterface({ onSendQuery, isLoading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSendQuery(query);
        }
    };

    const [selectedFault, setSelectedFault] = useState('');

    const handleQuickAction = (fault) => {
        setSelectedFault(fault);
        setQuery(`${fault} issue detected`);
        onSendQuery(`${fault} issue detected`);
    };

    const symptoms = [
        { name: 'Overheating', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.99 7.99 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14l.879 2.121z" /></svg> },
        { name: 'Vibration', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { name: 'Unusual Noise', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg> },
        { name: 'Power Loss', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="mb-6">
                <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">Quick Diagnosis</h3>
                <p className="text-xs text-slate-500 mb-6">Select the primary symptom you're observing</p>

                <div className="grid grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                        <button
                            key={symptom.name}
                            onClick={() => handleQuickAction(symptom.name)}
                            disabled={isLoading}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 group relative ${selectedFault === symptom.name
                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md'
                                    : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'
                                }`}
                        >
                            <div className={`mb-2 p-2 rounded-lg transition-colors ${selectedFault === symptom.name ? 'bg-white text-indigo-600' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                                }`}>
                                {symptom.icon}
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider">{symptom.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 pt-6 border-t border-slate-100">
                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="relative group">
                        <div className="flex">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Or describe in detail..."
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !query.trim()}
                                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-30 transition-all flex items-center justify-center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
