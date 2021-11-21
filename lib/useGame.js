import { useEffect, useState } from "react";

export function useGame(totalTime = 60) {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words[currentIndex];
  const [typed, setTyped] = useState("");
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(totalTime);
  const [isGameOver, setIsGameOver] = useState(false);
  const WPM = calculateWpm();
  const isCorrect = typed === currentWord;
  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=500&swear=0")
      .then((res) => res.json())
      .then((data) => setWords(data));
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
    let countdownInterval;
    if (countdown === 0) {
      stopGame();
    }
    if (isRunning) {
      countdownInterval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [isRunning, countdown]);
  function resetGame() {
    setIsRunning(false);
    setIsGameOver(false);
    setCorrectWordsCount(0);
    setCountdown(totalTime);
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
  function onInputChange(e) {
    setTyped(e.target.value);
  }
  function getLetterColor(index) {
    if (index > typed.length - 1 || !typed) {
      return "inherit";
    }
    if (typed[index] === currentWord[index]) {
      return "hsl(100, 70%, 60%)";
    } else {
      return "hsl(0, 80%, 60%)";
    }
  }
  function calculateWpm() {
    // https://www.speedtypingonline.com/typing-equations
    if (totalCharacters === 0) return 0;
    const elapsedTime = totalTime - countdown;
    const wpm = totalCharacters / 5 / (elapsedTime / 60);
    return Math.round(wpm);
  }
  // function WordInput() {
  //   return <Input onChange={(e) => setTyped(e.target.value)} value={typed} />;
  // }
  return {
    isRunning,
    startGame,
    stopGame,
    typed,
    onInputChange,
    countdown,
    isGameOver,
    currentWord,
    correctWordsCount,
    totalTime,
    getLetterColor,
    resetGame,
    WPM
  };
}
