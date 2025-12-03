import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="w-full max-w-2xl h-96 flex flex-col items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-xl transition-colors duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-20 animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-yellow-600 dark:text-yellow-400 animate-spin relative z-10" />
      </div>
      <p className="mt-6 text-xl font-display font-bold text-gray-700 dark:text-gray-200 animate-pulse">
        Consulting the 5th Graders...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Writing a new question on the board</p>
    </div>
  );
};

export default Loading;
