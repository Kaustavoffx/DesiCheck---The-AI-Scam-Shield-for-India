import React from 'react';
import { CallerProfile } from '../types';

interface Props {
  caller: CallerProfile;
  onDecline: () => void;
  onAccept: () => void;
}

export const FakeCallScreen: React.FC<Props> = ({ caller, onDecline, onAccept }) => {
  return (
    <div className="h-full w-full bg-gray-900 relative flex flex-col text-white overflow-hidden">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-black opacity-80 z-0"></div>
      
      {/* Top Info */}
      <div className="relative z-10 pt-16 flex flex-col items-center flex-grow">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {caller.name.charAt(0)}
          </div>
          <div className="text-center">
             <h2 className="text-3xl font-normal text-white mb-1">{caller.name}</h2>
             <p className="text-lg text-gray-200">{caller.label}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 pb-20 px-12 w-full">
        <div className="flex justify-between items-center">
          {/* Decline Button */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={onDecline}
              className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <span className="text-sm font-medium">Decline</span>
          </div>

          {/* Accept Button */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={onAccept}
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg animate-pulse"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <span className="text-sm font-medium">Accept</span>
          </div>
        </div>

        {/* Remind Me / Message options */}
        <div className="mt-12 flex justify-between text-gray-300 text-xs px-4">
          <div className="flex flex-col items-center">
            <div className="mb-1">⏰</div>
            <span>Remind Me</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-1">💬</div>
            <span>Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};
