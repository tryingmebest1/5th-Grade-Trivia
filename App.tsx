import React, { useState, useEffect, useCallback } from 'react';
import { GameState, TriviaQuestion, FeedbackType } from './types';
import { generateTriviaQuestion } from './services/gemini';
import Header from './components/Header';
import GameCard from './components/GameCard';
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle';
import { GraduationCap, RotateCcw, Play, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [highScore, setHighScore] = useState(0);

  // Load high score from local storage
  useEffect(() => {
    const saved = localStorage.getItem('triviaHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('triviaHighScore', score.toString());
    }
  }, [score, highScore]);

  const loadNewQuestion = useCallback(async () => {
    setGameState(GameState.LOADING);
    setFeedback(null);
    setSelectedOption(null);
    
    // Slight delay to allow UI to transition smoothly
    const question = await generateTriviaQuestion();
    setCurrentQuestion(question);
    setGameState(GameState.PLAYING);
  }, []);

  const startGame = () => {
    setScore(0);
    setHearts(3);
    loadNewQuestion();
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null || !currentQuestion) return;

    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setFeedback('correct');
      // Confetti effect could go here
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setFeedback('incorrect');
      if (newHearts === 0) {
        // Game Over logic handled when clicking "Next"
      }
    }
  };

  const handleNext = () => {
    if (hearts === 0) {
      setGameState(GameState.GAME_OVER);
    } else {
      loadNewQuestion();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 font-sans bg-chalkboardGreen dark:bg-slate-900 bg-pattern transition-colors duration-500">
      
      {/* Top Bar for Toggle */}
      <div className="w-full max-w-2xl flex justify-end mb-4">
        <ThemeToggle />
      </div>

      {/* Intro Screen */}
      {gameState === GameState.START && (
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center border-b-8 border-yellow-500 dark:border-yellow-600 animate-fade-in-up mt-4 transition-colors duration-300">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            Are You Smarter Than a <span className="text-yellow-600 dark:text-yellow-400 block mt-2">5th Grader?</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Prove your knowledge across Math, Science, History, and more. You have 3 hearts. Good luck!
          </p>
          <button
            onClick={startGame}
            className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-current" />
            Start Game
          </button>
        </div>
      )}

      {/* Playing State */}
      {(gameState === GameState.PLAYING || gameState === GameState.LOADING) && (
        <>
          <Header score={score} hearts={hearts} />
          {gameState === GameState.LOADING ? (
            <Loading />
          ) : (
            currentQuestion && (
              <GameCard
                question={currentQuestion}
                selectedOption={selectedOption}
                feedback={feedback}
                onOptionSelect={handleOptionSelect}
                onNext={handleNext}
              />
            )
          )}
        </>
      )}

      {/* Game Over Screen */}
      {gameState === GameState.GAME_OVER && (
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center border-b-8 border-red-500 animate-bounce-in mt-10 transition-colors duration-300">
          <div className="bg-red-100 dark:bg-red-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-white mb-2">Class Dismissed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You ran out of hearts.</p>
          
          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 mb-8 border border-gray-100 dark:border-slate-600">
            <div className="flex justify-between items-center mb-2 border-b border-gray-200 dark:border-slate-600 pb-2">
              <span className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">Final Score</span>
              <span className="text-3xl font-display font-bold text-gray-800 dark:text-white">{score}</span>
            </div>
             <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">High Score</span>
              <span className="text-xl font-display font-bold text-yellow-600 dark:text-yellow-400">{highScore}</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-gray-900 dark:bg-slate-700 hover:bg-black dark:hover:bg-slate-600 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}
      
      {/* Footer / Copyright */}
      <div className="mt-8 text-white/50 text-sm text-center">
        Powered by Gemini AI • 5th Grade Trivia
      </div>
    </div>
  );
};

export default App;
