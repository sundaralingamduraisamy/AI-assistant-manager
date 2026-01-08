import React from 'react';

export default function KnowledgeSources({ sources, historicalCount, onSourceClick }) {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Knowledge Sources</h3>
            </div>

            <div className="space-y-4">
                {sources.map((source, idx) => (
                    <div
                        key={idx}
                        onClick={() => onSourceClick && onSourceClick(source)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group relative cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{source.title}</h4>
                            <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>

                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 mb-2">
                            {source.type}
                        </span>

                        <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-3 mb-2">
                            "{source.excerpt}"
                        </p>

                        <div className="text-[10px] font-semibold text-slate-400">
                            {source.page && <span>{source.page}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {historicalCount > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Traceability
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                        All recommendations are derived from verified industrial sources and <span className="text-blue-600 font-bold">{historicalCount.toLocaleString()} similar cases</span> in the knowledge base.
                    </p>
                </div>
            )}

            <div className="bg-slate-50 rounded-xl p-4 mt-8">
                <h4 className="text-xs font-bold text-slate-800 mb-2">Feedback</h4>
                <p className="text-[10px] text-slate-500 mb-3">Was this diagnostic helpful? Your feedback helps improve our AI model.</p>
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.708C19.743 10 20.5 10.806 20.5 11.8c0 .358-.108.708-.311 1.003l-2.489 3.633C17.391 17.063 16.711 17.5 16 17.5h-5V10l3-5h.5a.5.5 0 01.5.5V10h1zM9 10H5v7.5h4V10z" /></svg>
                        Helpful
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.292C4.257 14 3.5 13.194 3.5 12.2c0-.358.108-.708.311-1.003l2.489-3.633C6.609 6.937 7.289 6.5 8 6.5h5v7.5l-3 5h-.5a.5.5 0 01-.5-.5V14h-1zM15 14h4v-7.5h-4V14z" /></svg>
                        Issues
                    </button>
                </div>
            </div>
        </div>
    );
}
