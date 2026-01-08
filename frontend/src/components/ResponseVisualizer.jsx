import React from 'react';

export default function ResponseVisualizer({ response }) {
    if (!response) return null;

    const getStepIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'safety': return <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
            case 'inspection': return <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
            case 'repair': return <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
            case 'test': return <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'report': return <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
            default: return <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        }
    };

    const dashOffset = 175 - (175 * response.confidence_score);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Main Diagnostic Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start gap-8 mb-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600">Diagnostic Report</span>
                                <span className="text-slate-400 text-[10px] font-semibold">{new Date().toLocaleString()}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-4">{response.issue_summary}</h2>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                                Analysis of machine parameters and sound patterns indicate potential faults in the core assembly. Recommendations below are prioritized by confidence and historical success rate.
                            </p>
                        </div>

                        {/* Confidence Gauge */}
                        <div className="flex flex-col items-center flex-shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div className="relative flex items-center justify-center w-20 h-20">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-200" />
                                    <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={175} strokeDashoffset={dashOffset} className={`transition-all duration-1000 ease-out ${response.confidence_score > 0.8 ? 'text-blue-600' : 'text-yellow-500'}`} />
                                </svg>
                                <span className="absolute text-lg font-black text-slate-800">
                                    {Math.round(response.confidence_score * 100)}%
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Confidence</span>
                        </div>
                    </div>

                    {/* Historical Context Box */}
                    <div className="bg-blue-50/50 rounded-xl p-4 flex items-center gap-3 border border-blue-100/50">
                        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xs text-blue-700 font-medium leading-tight">
                            Based on historical data from <span className="font-bold underline cursor-help">{response.historical_count || 1200}+ similar cases</span> in the knowledge base.
                        </p>
                    </div>
                </div>

                {/* Probable Causes Section */}
                <div className="px-8 pb-8 pt-0">
                    <div className="flex items-center gap-2 mb-6">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Probable Causes</h3>
                    </div>
                    <div className="space-y-5 max-w-3xl">
                        {response.possible_causes.map((cause, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-700">{cause.cause}</span>
                                    <span className="text-slate-500">{Math.round(cause.probability * 100)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${cause.probability * 100}%` }}
                                        className={`h-full rounded-full transition-all duration-1000 ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : 'bg-blue-500'
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Plan Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="flex items-center gap-2 mb-8">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recommended Action Plan</h3>
                </div>

                <div className="relative">
                    <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-100" />
                    <div className="space-y-8">
                        {response.diagnostic_steps.map((step) => (
                            <div key={step.step_id} className="relative flex gap-6 group">
                                <div className="z-10 bg-white p-2 rounded-full border border-slate-100 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
                                    {getStepIcon(step.step_type)}
                                </div>
                                <div className="flex-1 pt-1.5">
                                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">
                                        Step {step.step_id}: {step.step_type || 'Action'}
                                    </h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{step.instruction}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Safety Warnings Area */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4 text-red-600">
                    <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <h4 className="text-xs font-bold uppercase tracking-widest">Safety Precautions</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {response.safety_warnings.map((warning, idx) => (
                        <span key={idx} className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 border border-red-100 shadow-sm">
                            {warning}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
