import React, { useState } from 'react';

interface Props {
  onUnlock: () => void;
}

export const StealthCalculator: React.FC<Props> = ({ onUnlock }) => {
  const [display, setDisplay] = useState('0');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '=') {
      // THE SECRET CODE IS 777
      if (display === '777') {
        onUnlock();
      } else {
        // Evaluate simple math for realism (very basic)
        try {
          // eslint-disable-next-line no-eval
          setDisplay(eval(display).toString());
        } catch {
          setDisplay('Error');
        }
      }
    } else {
      setDisplay(prev => prev === '0' ? val : prev + val);
    }
  };

  const btnClass = "h-20 w-20 rounded-full text-3xl font-medium flex items-center justify-center transition-colors active:opacity-70";
  const grayBtn = `${btnClass} bg-[#333333] text-white`;
  const orangeBtn = `${btnClass} bg-[#ff9f0a] text-white`;
  const darkGrayBtn = `${btnClass} bg-[#a5a5a5] text-black`;

  return (
    <div className="flex flex-col h-full bg-black px-4 pb-8 pt-12">
      <div className="flex-grow flex items-end justify-end mb-4 px-4">
        <span className="text-8xl font-light text-white truncate tracking-tight">{display}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <button onClick={() => handlePress('C')} className={darkGrayBtn}>AC</button>
        <button className={darkGrayBtn}>+/-</button>
        <button className={darkGrayBtn}>%</button>
        <button onClick={() => handlePress('/')} className={orangeBtn}>÷</button>

        <button onClick={() => handlePress('7')} className={grayBtn}>7</button>
        <button onClick={() => handlePress('8')} className={grayBtn}>8</button>
        <button onClick={() => handlePress('9')} className={grayBtn}>9</button>
        <button onClick={() => handlePress('*')} className={orangeBtn}>×</button>

        <button onClick={() => handlePress('4')} className={grayBtn}>4</button>
        <button onClick={() => handlePress('5')} className={grayBtn}>5</button>
        <button onClick={() => handlePress('6')} className={grayBtn}>6</button>
        <button onClick={() => handlePress('-')} className={orangeBtn}>-</button>

        <button onClick={() => handlePress('1')} className={grayBtn}>1</button>
        <button onClick={() => handlePress('2')} className={grayBtn}>2</button>
        <button onClick={() => handlePress('3')} className={grayBtn}>3</button>
        <button onClick={() => handlePress('+')} className={orangeBtn}>+</button>

        <button onClick={() => handlePress('0')} className={`${grayBtn} col-span-2 w-auto rounded-[40px] pl-8 justify-start`}>0</button>
        <button onClick={() => handlePress('.')} className={grayBtn}>.</button>
        <button onClick={() => handlePress('=')} className={orangeBtn}>=</button>
      </div>
    </div>
  );
};
