import { Button } from "@/components/ui/button";
import Hangman from "./Hangman";

interface StartScreenProps {
  onStart: () => void;
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="start-title">HANGMAN</h1>
        <div className="start-hangman">
          <Hangman numberOfGuesses={0} />
        </div>
        <p className="start-description">
          Guess the word letter by letter before the drawing is complete!
        </p>
        <Button
          onClick={onStart}
          className="start-button"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}

export default StartScreen;