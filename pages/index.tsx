import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useGame} from "../lib/useGame"
import ProgressRing from '../components/progressRing'

const Home: NextPage = () => {
  const {
    isRunning,
    startGame,
    stopGame,
    isGameOver,
    currentWord,
    correctWordsCount,
    getLetterColor,
    countdown,
    typed,
    onInputChange,
    totalTime,
    WPM
  } = useGame();
  if (!isRunning && !isGameOver) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="bg-blue-500 text-white text-lg font-medium px-10 py-3 hover:bg-blue-600 transition rounded" onClick={startGame}>
          Start Practice
        </button>
      </div>
    );
  }
  if (isGameOver) {
    return (
      <div className="grid place-items-center h-screen">
        <div>
          <h1>
            You got {correctWordsCount} words correct in {totalTime} seconds
          </h1>
          <h3>That's 10 WPM</h3>
          <button className="bg-blue-500 text-white text-lg font-medium px-10 py-3 hover:bg-blue-600 transition rounded" onClick={startGame}>
            Restart
          </button>
        </div>
      </div>
    );
  }
  return (
    <main className="container mx-auto py-20 min-h-screen">
      <div className="flex items-center">
        <span>WPM:</span>
        <span>{WPM}</span>
      </div>
      <div className="flex items-center justify-center">
        <ProgressRing value={(countdown / totalTime) * 100}>
          {countdown}
        </ProgressRing>
        {/* <RingProgress
          sections={[{ value: (countdown / totalTime) * 100, color: "blue" }]}
          label={
            <Text color="blue" weight={700} align="center" size="xl">
              {countdown}
            </Text>
          }
        /> */}
      </div>
      <div className="text-center py-5">
        <h3 className="text-2xl font-medium">
          {currentWord.split("").map((letter, index) => (
            <span key={index} style={{color: getLetterColor(index)}}>
              {letter}
            </span>
          ))}
        </h3>
      </div>
      <input autoFocus value={typed} onChange={onInputChange}  className="ring-1 w-full focus:outline-none focus-visible:ring"/>
      {/* <Button color="red" onClick={stopGame}>
        Stop game
      </Button> */}
    </main>
  );
}

export default Home
