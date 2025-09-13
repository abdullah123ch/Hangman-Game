import { Button } from "@/components/ui/button";

const KEYS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

interface KeyboardProps {
  activeLetter: string[];
  inactiveLetter: string[];
  addGuessedLetter: (letter: string) => void;
  disabled: boolean;
}

function Keyboard({ activeLetter, inactiveLetter, addGuessedLetter, disabled }: KeyboardProps) {
  return (
    <div className="keyboard-grid">
      {KEYS.map((key) => {
        const isActive = activeLetter.includes(key.toLowerCase());
        const isInactive = inactiveLetter.includes(key.toLowerCase());
        const isDisabled = disabled || isActive || isInactive;
        
        let buttonClass = "keyboard-key";
        if (isActive) {
          buttonClass += " keyboard-key-correct";
        } else if (isInactive) {
          buttonClass += " keyboard-key-wrong";
        } else {
          buttonClass += " keyboard-key-default";
        }
        
        if (isDisabled) {
          buttonClass += " keyboard-key-disabled";
        }
        
        return (
          <Button
            key={key}
            onClick={() => addGuessedLetter(key.toLowerCase())}
            disabled={isDisabled}
            className={buttonClass}
          >
            {key}
          </Button>
        );
      })}
    </div>
  );
}

export default Keyboard;