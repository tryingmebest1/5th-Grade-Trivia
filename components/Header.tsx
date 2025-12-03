import React from 'react';
import { Heart, Star } from 'lucide-react';

interface HeaderProps {
  score: number;
  hearts: number;
}

const Header: React.FC<HeaderProps> = ({ score, hearts }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex justify-between items-center p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 mb-6 text-white sticky top-4 z-50">
      <div className="flex items-center space-x-2">
        <div className="bg-yellow-500 p-2 rounded-full shadow-lg">
          <Star className="w-6 h-6 text-white fill-current" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase opacity-80 font-bold tracking-wider">Score</span>
          <span className="text-2xl font-display font-bold leading-none">{score}</span>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {[1, 2, 3].map((i) => (
          <Heart
            key={i}
            className={`w-8 h-8 transition-all duration-300 ${
              i <= hearts
                ? 'fill-red-500 text-red-500 scale-100 drop-shadow-md'
                : 'fill-gray-700 text-gray-700 scale-75 opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;