import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useGame } from "../lib/useGame";
import ProgressRing from "../components/progressRing";

const Home: NextPage = () => {
  const {
    isRunning,
    startGame,
    resetGame,
    stopGame,
    isGameOver,
    currentWord,
    totalCharacters,
    getLetterColor,
    counter,
    typed,
    percentCompleted,
    onInputChange,
    gameMode,
    setGameMode,
    WPM,
  } = useGame();
  if (isGameOver) {
    return (
      <main className="flex-1 flex flex-col items-center space-y-10 pt-52">
        <div className="flex flex-col items-center space-y-2">
          <section className="space-y-5 mb-14">
            <h3 className="text-4xl font-mono text-center">Results</h3>
            <div className="grid grid-cols-2 items-center gap-2">
              <div className="flex flex-col text-right text-lg">
                <span>Speed:</span>
                <span>Total entries:</span>
              </div>
              <div className="flex flex-col text-2xl text-green-500">
                <span>{WPM} WPM</span>
                <span>{totalCharacters} characters</span>
              </div>
            </div>
          </section>
          <button
            onClick={resetGame}
            className="uppercase font-mono text-lg bg-blue-600 ring-4 ring-blue-800 hover:ring-blue-800 hover:bg-blue-600/80 ring-offset-2 hover:ring-offset-blue-500 ring-offset-blue-500/80 active:translate-y-0.5 px-10 py-2 rounded-none transition duration-75"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }
  if (!isRunning && !isGameOver) {
    return (
      <main className="flex-1 flex flex-col items-center space-y-14 pt-52">
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              setGameMode("Practice");
              startGame();
            }}
            className="uppercase font-mono text-lg bg-green-600 ring-4 ring-green-800 hover:ring-green-800 hover:bg-green-600/80 ring-offset-2 hover:ring-offset-green-500 ring-offset-green-500/80 active:translate-y-0.5 px-10 py-2 rounded-none transition duration-75"
          >
            Start practice
          </button>
          <p className="text-blue-100 mt-5">No time-limit. Stop at any time.</p>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              setGameMode("Timed");
              startGame();
            }}
            className="uppercase font-mono text-lg bg-blue-600 ring-4 ring-blue-800 hover:ring-blue-800 hover:bg-blue-600/80 ring-offset-2 hover:ring-offset-blue-500 ring-offset-blue-500/80 active:translate-y-0.5 px-10 py-2 rounded-none transition duration-75"
          >
            Start timed game
          </button>
          <p className="text-blue-100 mt-5">
            Type as many words as you can in <strong>60 seconds</strong>
          </p>
        </div>
      </main>
    );
  }
  return (
    <main className="flex-1">
      <div className="max-w-2xl mx-auto mt-5 text-center space-y-10 p-10">
        <ProgressRing
          label={counter}
          percentage={gameMode === "Timed" ? percentCompleted : 100}
        />
        <h3 className="text-5xl font-mono">
          {currentWord?.split("").map((letter, index) => (
            <span key={index} style={{ color: getLetterColor(index) }}>
              {letter}
            </span>
          ))}
        </h3>
        <input
          onChange={onInputChange}
          autoFocus
          value={typed}
          type="text"
          placeholder={currentWord}
          className="bg-gray-900/50 p-3 w-full ring-2 focus:outline-none focus:ring-blue-500/70 rounded-none"
        />
        <div hidden={gameMode === "Timed"}>
          <button
            onClick={stopGame}
            className="uppercase font-mono text-lg bg-red-700 ring-4 ring-red-800 hover:ring-red-800 hover:bg-red-700/80 ring-offset-2 hover:ring-offset-red-500 ring-offset-red-500/80 active:translate-y-0.5 px-10 py-2 rounded-none transition duration-75"
          >
            End practice
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
