import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Hangman from "./components/Hangman";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import StartScreen from "./components/StartScreen";
import { WORD_LIST } from "./data/wordList";
import "./styles/hangman.css";

function App() {
  const [gameState, setGameState] = useState("start"); // 'start', 'playing', 'won', 'lost'
  const [currentWord, setCurrentWord] = useState<{ word: string; hint: string } | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !currentWord?.word.toLowerCase().includes(letter)
  );

  const correctLetters = guessedLetters.filter((letter) =>
    currentWord?.word.toLowerCase().includes(letter)
  );

  const isWon =
    currentWord &&
    currentWord.word
      .toLowerCase()
      .split("")
      .every((letter) => guessedLetters.includes(letter));

  const isLost = incorrectLetters.length >= 6;

  const startNewGame = useCallback(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setCurrentWord(randomWord);
    setGuessedLetters([]);
    setShowHint(false);
    setGameState("playing");
  }, []);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWon || isLost) return;
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters, isWon, isLost]
  );

  // Check for win/loss conditions
  useEffect(() => {
    if (isWon && gameState === "playing") {
      setGameState("won");
    } else if (isLost && gameState === "playing") {
      setGameState("lost");
    }
  }, [isWon, isLost, gameState]);

  // Keyboard event handling
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeydown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!(key >= "a" && key <= "z")) return;
      event.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [addGuessedLetter, gameState]);

  if (gameState === "start") {
    return <StartScreen onStart={startNewGame} />;
  }

  return (
    <div className="game-container">
      <div className="game-wrapper">
        {/* Header */}
        <div className="game-header">
          <h1 className="game-title">HANGMAN</h1>
          <div className="game-controls">
            <Button
              onClick={() => setShowHint(!showHint)}
              className="hint-button"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <Button onClick={startNewGame} className="new-game-button">
              New Game
            </Button>
          </div>
          {showHint && currentWord && (
            <div className="hint-container">
              <p className="hint-text">Hint: {currentWord.hint}</p>
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="game-board">
          {/* Hangman Drawing */}
          <div className="hangman-section">
            <div className="hangman-container">
              <Hangman numberOfGuesses={incorrectLetters.length} />
            </div>
          </div>

          {/* Word and Status */}
          <div className="word-section">
            {currentWord && (
              <WordDisplay
                guessedLetters={guessedLetters}
                wordToGuess={currentWord.word}
              />
            )}

            {/* Wrong guesses display */}
            <div className="guesses-info">
              <p className="guesses-count">
                Wrong Guesses: {incorrectLetters.length} / 6
              </p>
              {incorrectLetters.length > 0 && (
                <p className="wrong-letters">
                  {incorrectLetters
                    .map((letter) => letter.toUpperCase())
                    .join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="keyboard-section">
          <Keyboard
            activeLetter={correctLetters}
            inactiveLetter={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
            disabled={isWon || isLost}
          />
        </div>

        {/* Win Modal */}
        <Modal
          isOpen={gameState === "won"}
          onClose={() => setGameState("playing")}
          title="🎉 You Won!"
          showCloseButton={false}
        >
          <p className="modal-message success">
            Congratulations! You guessed the word!
          </p>
          <p className="modal-word">{currentWord?.word}</p>
          <div className="modal-buttons">
            <Button onClick={startNewGame} className="modal-button-primary">
              Play Again
            </Button>
            <Button
              onClick={() => setGameState("start")}
              className="modal-button-secondary"
            >
              Main Menu
            </Button>
          </div>
        </Modal>

        {/* Lose Modal */}
        <Modal
          isOpen={gameState === "lost"}
          onClose={() => setGameState("playing")}
          title="💀 Game Over"
          showCloseButton={false}
        >
          <p className="modal-message error">Sorry, you ran out of guesses!</p>
          <p className="modal-subtitle">The word was:</p>
          <p className="modal-word">{currentWord?.word}</p>
          <div className="modal-buttons">
            <Button onClick={startNewGame} className="modal-button-danger">
              Try Again
            </Button>
            <Button
              onClick={() => setGameState("start")}
              className="modal-button-secondary"
            >
              Main Menu
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
