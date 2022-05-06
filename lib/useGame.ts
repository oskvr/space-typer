import React, { useEffect, useState } from "react";

type GameMode = "Timed" | "Practice";
const MAX_SECONDS = 60;
export function useGame() {
  const [words, setWords] = useState(["Word"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];
  const [typed, setTyped] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>();
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const WPM = calculateWpm();
  const isCorrect = typed === currentWord;
  const percentCompleted = (countdown / MAX_SECONDS) * 100;
  useEffect(() => {
    getRandomWordsAsync().then(setWords);
  }, []);
  useEffect(() => {
    if (isCorrect) {
      setTotalCharacters(totalCharacters + currentWord.length);
      setCurrentIndex(currentIndex + 1);
      setTyped("");
      setCorrectWordsCount(correctWordsCount + 1);
    }
  }, [isCorrect]);
  useEffect(() => {
    let countdownInterval: NodeJS.Timer;
    if (gameMode === "Timed" && countdown === 0) {
      stopGame();
    }
    if (isRunning) {
      countdownInterval = setInterval(() => {
        if (gameMode === "Practice") {
          setCountdown(countdown + 1);
        } else if (gameMode === "Timed") {
          setCountdown(countdown - 1);
        }
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [isRunning, countdown, gameMode]);
  useEffect(()=>{
    if(gameMode){
      startGame();
    }
  }, [gameMode])
  function resetGame() {
    if(gameMode === "Practice") setCountdown(0);
    else if(gameMode === "Timed") setCountdown(MAX_SECONDS);
    setIsRunning(false);
    setIsGameOver(false);
    setCorrectWordsCount(0);
    setTotalCharacters(0);
    setCurrentIndex(0);
    setTyped("");
  }
  function startGame() {
    resetGame();
    setIsRunning(true);
  }
  function stopGame() {
    setIsGameOver(true);
    setIsRunning(false);
  }
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTyped(e.target.value);
  }
  function getLetterColor(letterIndex: number) {
    // Only return colors for typed letters
    if (letterIndex > typed.length - 1 || !typed) {
      return "inherit";
    }
    if (typed[letterIndex] === currentWord[letterIndex]) {
      return "hsl(100, 70%, 60%)"; // Green
    } else {
      return "hsl(0, 80%, 60%)"; // Red
    }
  }
  async function getRandomWordsAsync(amount = 500) {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${amount}`
    );
    return await res.json();
  }
  function calculateWpm() {
    // https://www.speedtypingonline.com/typing-equations
    if (totalCharacters === 0) return 0;
    const elapsedTime =
      gameMode === "Practice" ? countdown : MAX_SECONDS - countdown;
    const wpm = totalCharacters / 5 / (elapsedTime / 60);
    return Math.round(wpm);
  }
  return {
    isRunning,
    startGame,
    stopGame,
    typed,
    onInputChange,
    counter: countdown,
    isGameOver,
    currentWord,
    correctWordsCount,
    totalCharacters,
    getLetterColor,
    percentCompleted,
    resetGame,
    setGameMode,
    WPM,
    gameMode,
  };
}
