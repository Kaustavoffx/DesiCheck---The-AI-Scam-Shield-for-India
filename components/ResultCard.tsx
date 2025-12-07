import React, { useEffect } from 'react';
import { ScamAnalysisResult } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface Props {
  result: ScamAnalysisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<Props> = ({ result, onReset }) => {
  useEffect(() => {
    if (result.verdict === 'SCAM') triggerHaptic('DANGER');
    else if (result.verdict === 'SAFE') triggerHaptic('SUCCESS');
    else triggerHaptic('WARNING');
  }, [result]);

  const handleReset = () => {
    triggerHaptic('CLICK');
    onReset();
  };

  let gradientOverlay = '';
  let glowColor = '';
  let icon = '';
  let title = '';
  let riskColor = '';
  let accentBorder = '';

  if (result.verdict === 'SAFE') {
    // Rich Emerald
    gradientOverlay = 'bg-gradient-to-b from-emerald-500/10 via-emerald-900/5 to-black/80';
    glowColor = 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]';
    icon = '✅';
    title = 'Safe';
    riskColor = 'text-emerald-400';
    accentBorder = 'border-emerald-500/20';
  } else if (result.verdict === 'SCAM') {
    // Intense Rose/Red
    gradientOverlay = 'bg-gradient-to-b from-rose-600/10 via-rose-900/5 to-black/80';
    glowColor = 'shadow-[0_0_60px_-10px_rgba(225,29,72,0.4)]';
    icon = '🛑';
    title = 'Scam';
    riskColor = 'text-rose-500';
    accentBorder = 'border-rose-500/30';
  } else {
    // Amber
    gradientOverlay = 'bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-black/80';
    glowColor = 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.3)]';
    icon = '⚠️';
    title = 'Caution';
    riskColor = 'text-amber-400';
    accentBorder = 'border-amber-500/20';
  }

  return (
    <div className={`w-full max-w-md mx-auto relative group animate-fade-in`}>
      
      {/* Main Glass Container */}
      <div className={`relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a]/80 backdrop-blur-2xl border ${accentBorder} border-t-white/10 ${glowColor} transition-all duration-500`}>
        
        {/* Top Specular Reflection (Glass Sheen) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

        {/* Dynamic Color Gradient Overlay */}
        <div className={`absolute inset-0 ${gradientOverlay} pointer-events-none`}></div>

        {/* Content */}
        <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center">
          
          {/* Icon & Title */}
          <div className="mb-8 transform transition-transform group-hover:scale-105 duration-500">
             <div className="text-8xl mb-4 drop-shadow-2xl">{icon}</div>
             <h2 className="text-4xl font-bold tracking-tight text-white mb-2">{title}</h2>
             <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em]">Verdict Confirmed</p>
          </div>

          {/* Risk Meter */}
          <div className="w-full bg-black/40 rounded-full h-1.5 mb-8 overflow-hidden border border-white/5">
            <div 
               className={`h-full ${result.verdict === 'SAFE' ? 'bg-emerald-500' : result.verdict === 'SCAM' ? 'bg-rose-500' : 'bg-amber-500'} transition-all duration-1000 ease-out shadow-[0_0_15px_currentColor]`}
               style={{ width: `${result.risk_score}%` }}
            ></div>
          </div>

          {/* Analysis Box */}
          <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm mb-6 text-left shadow-inner">
             <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold uppercase text-white/50 tracking-widest">Diagnostics</span>
                <span className={`text-xl font-mono font-bold ${riskColor}`}>{result.risk_score}<span className="text-xs text-white/30 ml-1">/100</span></span>
             </div>
             
             <p className="text-white/90 font-medium leading-relaxed text-sm">
                {result.translated_reason || result.reason}
             </p>
          </div>

          {/* Indicators */}
          {result.indicators.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {result.indicators.map((flag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase text-white/60 tracking-wider">
                  {flag}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <div className="w-full space-y-3">
             <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-[1px] rounded-xl overflow-hidden shadow-lg">
                <div className="bg-[#050505] rounded-[11px] px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">Action</span>
                    <span className="text-sm font-bold text-white">{result.action}</span>
                </div>
             </div>

             <button
                onClick={handleReset}
                className="w-full py-4 text-white/40 hover:text-white font-medium text-xs uppercase tracking-[0.2em] transition-colors duration-300"
             >
                Start New Analysis
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};
