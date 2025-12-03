import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/20 hover:bg-white/30 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 backdrop-blur-md transition-all border border-white/20 shadow-lg group"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`w-6 h-6 text-yellow-300 absolute inset-0 transition-all duration-500 rotate-0 scale-100 ${
            theme === 'dark' ? '-rotate-90 scale-0 opacity-0' : ''
          }`} 
        />
        <Moon 
          className={`w-6 h-6 text-blue-200 absolute inset-0 transition-all duration-500 rotate-90 scale-0 opacity-0 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : ''
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
