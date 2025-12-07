import React, { useState } from 'react';
import { CallerProfile, ProtocolConfig } from '../types';

interface Props {
  onStartProtocol: (config: ProtocolConfig) => void;
}

const CALLERS: CallerProfile[] = [
  { id: '1', name: 'Mom ❤️', label: 'mobile' },
  { id: '2', name: 'Physics Sir', label: 'work' },
  { id: '3', name: 'Unknown Caller', label: 'unknown' },
];

export const EscapeMenu: React.FC<Props> = ({ onStartProtocol }) => {
  const [selectedTab, setSelectedTab] = useState<'CALL' | 'CRASH'>('CALL');
  const [selectedCaller, setSelectedCaller] = useState(CALLERS[0]);
  const [timer, setTimer] = useState(10);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-6 flex flex-col relative overflow-hidden">
      {/* Background Matrix Effect (Static CSS for performance) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px'}}>
      </div>

      <header className="mb-8 border-b-2 border-green-500 pb-4">
        <h1 className="text-3xl font-bold tracking-tighter">BAHAANA_PROTOCOL</h1>
        <p className="text-xs opacity-70">v2.4.0 [SECURE]</p>
      </header>

      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setSelectedTab('CALL')}
          className={`flex-1 py-3 border border-green-500 text-sm font-bold uppercase transition-all ${selectedTab === 'CALL' ? 'bg-green-500 text-black' : 'text-green-500 hover:bg-green-900/30'}`}
        >
          Fake Call
        </button>
        <button 
          onClick={() => setSelectedTab('CRASH')}
          className={`flex-1 py-3 border border-green-500 text-sm font-bold uppercase transition-all ${selectedTab === 'CRASH' ? 'bg-green-500 text-black' : 'text-green-500 hover:bg-green-900/30'}`}
        >
          Sys Crash
        </button>
      </div>

      <div className="flex-grow space-y-8 relative z-10">
        {selectedTab === 'CALL' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-xs uppercase mb-2 opacity-70">Select Caller ID</label>
              <div className="grid grid-cols-1 gap-2">
                {CALLERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaller(c)}
                    className={`w-full text-left p-3 border ${selectedCaller.id === c.id ? 'border-green-500 bg-green-500/10' : 'border-green-800 text-gray-500'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase mb-2 opacity-70">Time Delay (Seconds)</label>
              <div className="flex space-x-2">
                {[5, 10, 30, 60].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimer(t)}
                    className={`flex-1 py-2 border ${timer === t ? 'border-green-500 bg-green-500/20' : 'border-green-900 text-gray-600'}`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onStartProtocol({ type: 'CALL', delaySeconds: timer, caller: selectedCaller })}
                className="w-full bg-green-600 text-black font-bold text-xl py-4 hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse"
              >
                INITIATE PROTOCOL
              </button>
              <p className="text-[10px] mt-2 text-center text-gray-500">
                Warning: Phone will sleep. Wait for vibration.
              </p>
            </div>
          </div>
        )}

        {selectedTab === 'CRASH' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 border border-red-500 bg-red-900/10 text-red-400">
              <h3 className="font-bold mb-2">⚠ MODE: SYSTEM BRICK</h3>
              <p className="text-sm">This will simulate a critical system update. Useful when someone asks to borrow your phone.</p>
            </div>

            <button
                onClick={() => onStartProtocol({ type: 'CRASH', delaySeconds: 0, crashType: 'ANDROID' })}
                className="w-full border border-green-500 text-green-500 font-bold py-4 hover:bg-green-900/20 mt-8"
              >
                EXECUTE "ANDROID UPDATE"
            </button>
          </div>
        )}
      </div>

      <footer className="text-[10px] text-center opacity-30 mt-auto">
        SYSTEM READY. DO NOT ABUSE.
      </footer>
    </div>
  );
};
