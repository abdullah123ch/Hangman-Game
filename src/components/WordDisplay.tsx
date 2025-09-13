interface WordDisplayProps {
    guessedLetters: string[];
    wordToGuess: string;
  }
  
  function WordDisplay({ guessedLetters, wordToGuess }: WordDisplayProps) {
    return (
      <div className="word-display">
        {wordToGuess.split("").map((letter, index) => (
          <span key={index} className="word-letter">
            <span
              className="letter-content"
              style={{
                visibility: guessedLetters.includes(letter.toLowerCase()) ? "visible" : "hidden",
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>
    );
  }
  
  export default WordDisplay;