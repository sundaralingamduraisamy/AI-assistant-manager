import React from 'react';

export const NotificationsPanel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const notifications = [
        { id: 1, title: 'System Update', description: 'AI Models updated to v2.4 with better vibration analysis.', time: '2h ago', type: 'info' },
        { id: 2, title: 'Security Alert', description: 'Unusual login attempt from terminal 04. Please verify.', time: '5h ago', type: 'warning' },
        { id: 3, title: 'Maintenance Due', description: 'Conveyor Belt B-12 requires routine inspection on Friday.', time: '1d ago', type: 'alert' },
    ];

    return (
        <div className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.map((n) => (
                    <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex gap-3">
                            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.type === 'warning' ? 'bg-orange-500' : n.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`} />
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{n.title}</h4>
                                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.description}</p>
                                <span className="text-[10px] text-slate-400 font-medium mt-2 block">{n.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 text-center bg-slate-50/50">
                <button className="text-[11px] font-bold text-blue-600 hover:underline">View All Alerts</button>
            </div>
        </div>
    );
};

export const HelpPanel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-12 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800">Resources & Help</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-4 space-y-4">
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-700 mb-1">Getting Started</h4>
                    <p className="text-[10px] text-blue-600 leading-tight">Input your machine details on the left, select a symptom, and click a button to generate a report.</p>
                </div>
                <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-600 border border-transparent hover:border-slate-100 transition-all">
                        <span>Technical Documentation</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-600 border border-transparent hover:border-slate-100 transition-all">
                        <span>API Reference</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-600 border border-transparent hover:border-slate-100 transition-all">
                        <span>Contact Support</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SettingsPanel = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-800">System Settings</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-4 space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-[11px] font-bold text-slate-800">Dark Mode</h4>
                        <p className="text-[9px] text-slate-400">Reduce eye strain at night</p>
                    </div>
                    <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-[11px] font-bold text-slate-800">High Resolution Reports</h4>
                        <p className="text-[9px] text-slate-400">Generate PDF in 4K resolution</p>
                    </div>
                    <div className="w-8 h-4 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
                    </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">API Environment</h4>
                    <select className="w-full text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 p-1.5 rounded-lg outline-none">
                        <option>Production (Llama-3.3)</option>
                        <option>Staging (Mixtral-8x7b)</option>
                        <option>Edge (Local VLLM)</option>
                    </select>
                </div>
            </div>
            <div className="p-3 bg-slate-50 text-center">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Version 2.4.0-Stable</span>
            </div>
        </div>
    );
};

export const SourceViewerModal = ({ source, isOpen, onClose }) => {
    if (!isOpen || !source) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{source.title}</h3>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{source.type}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto">
                    <div className="mb-8">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Relevant Excerpt</h4>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                            <svg className="absolute top-4 left-4 w-8 h-8 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.0171 18C14.0171 16.8954 14.9125 16 16.0171 16H19.0171C19.5694 16 20.0171 15.5523 20.0171 15V9C20.0171 8.44772 19.5694 8 19.0171 8H16.0171C15.4648 8 15.0171 8.44772 15.0171 9V10C15.0171 10.5523 14.5694 11 14.0171 11H12.0171C11.4648 11 11.0171 10.5523 11.0171 10V9C11.0171 7.34315 12.3602 6 14.0171 6H19.0171C20.6739 6 22.0171 7.34315 22.0171 9V15C22.0171 18.866 18.8831 22 15.0171 22H14.0171L14.017 21ZM4.01712 21L4.01712 18C4.01712 16.8954 4.91255 16 6.01712 16H9.01712C9.5694 16 10.0171 15.5523 10.0171 15V9C10.0171 8.44772 9.5694 8 9.01712 8H6.01712C5.46484 8 5.01712 8.44772 5.01712 9V10C5.01712 10.5523 4.5694 11 4.01712 11H2.01712C1.46484 11 1.01712 10.5523 1.01712 10V9C1.01712 7.34315 2.36027 6 4.01712 6H9.01712C10.6739 6 12.0171 7.34315 12.0171 9V15C12.0171 18.866 8.88312 22 5.01712 22H4.01712L4.01712 21Z" /></svg>
                            <p className="text-slate-700 leading-relaxed italic text-lg relative z-10 pl-8">
                                {source.excerpt}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Location</h4>
                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                {source.page || 'Full Document'}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Source ID</h4>
                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                {source.source_id || 'VERIFIED-MANUAL-001'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                    <button
                        onClick={() => {
                            if (source.file_url) {
                                window.open(`http://localhost:8000/docs/${source.file_url}`, '_blank');
                            } else {
                                alert("Full document link not available for this source.");
                            }
                        }}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                    >
                        Open Full PDF
                    </button>
                    <button onClick={onClose} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                        Close Preview
                    </button>
                </div>
            </div>
        </div>
    );
};
