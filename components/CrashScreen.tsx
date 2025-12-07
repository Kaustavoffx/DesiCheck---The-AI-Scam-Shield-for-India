import React, { useEffect, useState } from 'react';

interface Props {
  onExit: () => void;
}

export const CrashScreen: React.FC<Props> = ({ onExit }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Very slow progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) return 99;
        // Random increment
        return prev + (Math.random() * 0.5);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="h-full w-full bg-black flex flex-col items-center justify-center text-white"
      onClick={(e) => {
        // Only exit if specific area is double clicked (top right corner hidden)
        // For now, let's just make it hard to exit: Triple tap anywhere
        if (e.detail === 3) onExit();
      }}
    >
      <div className="mb-12 animate-pulse">
        {/* Simple Android Robot / Gear Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div className="w-64">
        <h2 className="text-sm font-medium mb-4 text-center">Installing system update</h2>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">{Math.floor(progress)}%</p>
      </div>
      
      <div className="mt-8 text-[10px] text-gray-600 text-center w-1/2">
        Do not restart your device. This may take a while.
      </div>
    </div>
  );
};
