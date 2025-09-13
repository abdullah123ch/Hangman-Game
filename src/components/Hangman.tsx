interface HangmanProps {
    numberOfGuesses: number;
  }
  
  // Hangman body parts
  const HEAD = (
    <div
      className="hangman-head"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        top: "0px",
        left: "-20px",
      }}
    />
  );
  
  const BODY = (
    <div
      className="hangman-body"
      style={{
        height: "80px",
        width: "4px",
        top: "40px",
        left: "0px",
      }}
    />
  );
  
  const RIGHT_ARM = (
    <div
      className="hangman-arm hangman-right-arm"
      style={{
        width: "50px",
        height: "4px",
        top: "60px",
        left: "0px",
        transform: "rotate(-30deg)",
      }}
    />
  );
  
  const LEFT_ARM = (
    <div
      className="hangman-arm hangman-left-arm"
      style={{
        width: "50px",
        height: "4px",
        top: "60px",
        left: "-50px",
        transform: "rotate(30deg)",
      }}
    />
  );
  
  const RIGHT_LEG = (
    <div
      className="hangman-leg hangman-right-leg"
      style={{
        width: "50px",
        height: "4px",
        top: "120px",
        left: "0px",
        transform: "rotate(45deg)",
      }}
    />
  );
  
  const LEFT_LEG = (
    <div
      className="hangman-leg hangman-left-leg"
      style={{
        width: "50px",
        height: "4px",
        top: "120px",
        left: "-50px",
        transform: "rotate(-45deg)",
      }}
    />
  );
  
  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];
  
  function Hangman({ numberOfGuesses }: HangmanProps) {
    return (
      <div className="hangman-drawing">
        <div className="gallows">
          {/* Base */}
          <div className="gallows-base"></div>
  
          {/* Vertical post */}
          <div className="gallows-post"></div>
  
          {/* Top beam */}
          <div className="gallows-beam"></div>
  
          {/* Noose */}
          <div className="gallows-noose"></div>
  
          {/* Hangman parts */}
          <div className="hangman-body-container">
            {BODY_PARTS.slice(0, numberOfGuesses)}
          </div>
        </div>
      </div>
    );
  }
  
  export default Hangman;
  