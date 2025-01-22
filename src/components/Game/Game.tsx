import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import {
  Screen,
  GameState,
  switchScreen,
  playLetter,
  newGame,
} from "../../store/slices/gameSlice";
import Hangman from "../HangMan/Hangman";
import "./Game.css";

export default function Game(): ReactElement {
  const dispatch = useAppDispatch();
  const letters = useAppSelector((state) => state.game.letters);
  const gameState = useAppSelector((state) => state.game.gameState);
  const health = useAppSelector((state) => state.game.health);
  const currentWord = useAppSelector((state) => state.game.currentWord);
  const indexesFound = useAppSelector((state) => state.game.indexesFound);

  return (
    <div id="game">
      <h1 className="title">Hangman Game</h1>
      <div id="gameState">
        {gameState == GameState.Victory && (
          <h2 className="victory-color"> You've won! </h2>
        )}
        {gameState == GameState.Defeat && (
          <h2 className="defeat-color"> You've lost! </h2>
        )}
      </div>

      {/* SVG */}
      <Hangman />
      {/* guesses */}
      <h1>
        {currentWord &&
          currentWord
            .toUpperCase()
            .split("")
            .map((_letter, index) => (
              <span key={index}>
                {" "}
                {indexesFound.includes(index)
                  ? currentWord[index].toUpperCase()
                  : "_"}
              </span>
            ))}
        {/* keyboard */}
      </h1>
      <div id="letters">
        {letters.map((letter) => (
          <button
            onClick={() => {
              dispatch(playLetter(letter));
            }}
            key={letter.letter}
            disabled={letter.isDisabled}
          >
            {letter.letter}
          </button>
        ))}
      </div>

      <p>
        Remaining possibility of failure: <strong>{health}</strong>
      </p>

      <div>
        <button onClick={() => dispatch(switchScreen(Screen.MainMenu))}>
          End Game
        </button>
        <button onClick={() => dispatch(newGame())}>New Game</button>
      </div>
    </div>
  );
}
