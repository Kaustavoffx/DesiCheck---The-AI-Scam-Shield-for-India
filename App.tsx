import React, { useState, useRef } from 'react';
import { analyzeScreenshot } from './services/geminiService';
import { ScamAnalysisResult, Language } from './types';
import { ResultCard } from './components/ResultCard';
import { triggerHaptic } from './utils/haptics';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScamAnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('English');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    triggerHaptic('START');
    setResult(null);
    setIsAnalyzing(true);

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
      });

      const analysis = await analyzeScreenshot(base64Data, language);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      alert("Something went wrong analyzing the image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setPreview(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden font-sans text-slate-200 selection:bg-indigo-500/30">
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Animated Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-60"></div>
          <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[90px] mix-blend-screen opacity-30"></div>
          
          {/* Noise Texture for Film Grain Look */}
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
      </div>

      {/* Floating Glass Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl h-16 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 z-50 flex items-center justify-between px-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="flex items-center space-x-3 pl-4 group cursor-default">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-shadow duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold tracking-wide text-white/90 text-sm">DesiCheck</span>
        </div>
        
        <div className="pr-5 flex items-center space-x-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400/80 uppercase">Shield Active</span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-grow z-10 w-full max-w-xl mx-auto px-6 pt-32 pb-12 flex flex-col justify-center min-h-[85vh]">

        {!isAnalyzing && !result && (
          <div className="flex flex-col animate-fade-in-up">
            
            <div className="text-center mb-10 relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Verify Before<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-pulse">You Trust</span>
              </h2>
              <p className="text-slate-400/80 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                Advanced AI diagnostics for your digital safety. Detect scams in seconds.
              </p>
            </div>

            {/* Premium Language Switcher */}
            <div className="mb-10 flex justify-center">
              <div className="bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 flex relative shadow-inner">
                 {/* This div acts as the container */}
                {(['English', 'Bengali', 'Hinglish'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); triggerHaptic('CLICK'); }}
                    className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      language === lang 
                        ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Holographic Upload Card */}
            <div className="group relative">
               {/* Animated Gradient Border */}
               <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[2.5rem] opacity-30 blur group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
               
               <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden">
                  
                  {/* Subtle internal sheen */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                  <div className="mb-6 relative">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                     </div>
                     {/* Floating Badge */}
                     <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-indigo-400/50">
                        AI READY
                     </div>
                  </div>

                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect}
                  />
                  
                  <button 
                    onClick={() => { 
                      fileInputRef.current?.click(); 
                      triggerHaptic('CLICK'); 
                    }}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl text-base tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Analyze Screenshot</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <p className="mt-4 text-xs text-slate-500 font-medium tracking-wide">Secure Encryption • Private Analysis</p>
               </div>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-grow flex flex-col items-center justify-center">
            {/* High Tech Scanner UI */}
            <div className="relative w-full max-w-sm aspect-square bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center mb-8">
               {/* Background Grid */}
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBWMHjwIDBWMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-50"></div>
               
               {/* Image Preview */}
               {preview && (
                 <img src={preview} className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 scale-105" alt="analysis" />
               )}
               
               {/* Scanning Beam */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent h-[40%] w-full animate-scan border-b-2 border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
               
               {/* Corner Accents */}
               <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
               <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
               <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
               <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
            </div>

            <div className="flex flex-col items-center space-y-3">
               <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-0"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-300"></span>
               </div>
               <h3 className="text-lg font-bold text-white tracking-widest uppercase">Processing Data</h3>
               <p className="text-indigo-400 text-xs font-mono">GEMINI_PRO_VISION_V1.5 // {language.toUpperCase()}</p>
            </div>
          </div>
        )}

        {result && !isAnalyzing && (
          <ResultCard result={result} onReset={handleReset} />
        )}

      </main>
    </div>
  );
};

export default App;