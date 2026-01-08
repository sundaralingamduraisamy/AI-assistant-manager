import React, { useState } from 'react';

export default function MachineContext({ onContextChange }) {
    const [machineType, setMachineType] = useState('Motor');
    const [model, setModel] = useState('ABB M3AA 132');
    const [age, setAge] = useState(5);
    const [operatingHours, setOperatingHours] = useState(12500);

    const handleUpdate = () => {
        onContextChange({
            machine_type: machineType,
            model: model,
            age_years: parseFloat(age),
            operating_hours: parseFloat(operatingHours)
        });
    };

    // Trigger update on mount or change - for now manual or effect?
    // Let's just expose the current state or use a "Set Context" button if needed.
    // Ideally, this updates the parent state whenever changed.

    React.useEffect(() => {
        handleUpdate();
    }, [machineType, model, age, operatingHours]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                    </div>
                    <h2 className="text-base font-bold text-slate-800 tracking-tight">Machine Context</h2>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Machine Type</label>
                        <div className="relative">
                            <select
                                value={machineType}
                                onChange={(e) => setMachineType(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none text-sm font-medium text-slate-700 hover:bg-white"
                            >
                                <option>Motor</option>
                                <option>CNC Machine</option>
                                <option>Conveyor Belt</option>
                                <option>Hydraulic Pump</option>
                            </select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Model Number</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700 hover:bg-white shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Machine Age (Years)</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700 hover:bg-white shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Operating Hours</label>
                            <input
                                type="number"
                                value={operatingHours}
                                onChange={(e) => setOperatingHours(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium text-slate-700 hover:bg-white shadow-inner"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
