import React from 'react';
import { TriviaQuestion, FeedbackType } from '../types';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

interface GameCardProps {
  question: TriviaQuestion;
  selectedOption: number | null;
  feedback: FeedbackType;
  onOptionSelect: (index: number) => void;
  onNext: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  question,
  selectedOption,
  feedback,
  onOptionSelect,
  onNext
}) => {
  const isAnswered = selectedOption !== null;

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400 transition-colors duration-300">
      {/* Subject Badge */}
      <div className="bg-yellow-400 px-6 py-3 flex items-center justify-between">
        <span className="font-display font-bold text-yellow-900 tracking-wide uppercase flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" />
          {question.subject}
        </span>
        <span className="text-xs font-bold bg-white/30 text-yellow-900 px-2 py-1 rounded-md">
          5th Grade Level
        </span>
      </div>

      <div className="p-6 md:p-8">
        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-display text-gray-800 dark:text-white mb-8 leading-tight">
          {question.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            let buttonStyle = "border-gray-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200";
            
            if (isAnswered) {
              if (index === question.correctAnswerIndex) {
                buttonStyle = "border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-2 ring-green-500";
              } else if (index === selectedOption && index !== question.correctAnswerIndex) {
                buttonStyle = "border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 opacity-70";
              } else {
                buttonStyle = "border-gray-200 dark:border-slate-700 opacity-50 grayscale dark:text-gray-500";
              }
            }

            return (
              <button
                key={index}
                disabled={isAnswered}
                onClick={() => onOptionSelect(index)}
                className={`relative p-5 text-left rounded-xl border-2 transition-all duration-200 group ${buttonStyle} disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{option}</span>
                  {isAnswered && index === question.correctAnswerIndex && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  )}
                  {isAnswered && index === selectedOption && index !== question.correctAnswerIndex && (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
                
                {/* ABCD Label */}
                {!isAnswered && (
                  <span className="absolute top-2 right-2 text-xs font-bold text-gray-300 dark:text-slate-600 group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`mt-8 p-6 rounded-2xl border ${
            feedback === 'correct' 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50' 
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50'
          } animate-fade-in transition-colors duration-300`}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {feedback === 'correct' ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className={`font-display font-bold text-xl ${
                    feedback === 'correct' ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'
                  }`}>
                    {feedback === 'correct' ? 'Correct!' : 'Incorrect!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {feedback === 'correct' ? '+10 Points' : 'You lost a heart'}
                  </p>
                </div>
              </div>
              
              <div className="pl-14">
                <p className="text-gray-700 dark:text-gray-300 italic border-l-4 border-gray-300 dark:border-slate-600 pl-3">
                  "{question.explanation}"
                </p>
                <button
                  onClick={onNext}
                  className="mt-6 w-full md:w-auto px-8 py-3 bg-gray-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Next Question →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
