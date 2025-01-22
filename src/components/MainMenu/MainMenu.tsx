import { ReactElement } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import {
  Difficulty,
  newGame,
  setDifficulty,
} from "../../store/slices/gameSlice";
import "./MainMenu.css";

export default function Game(): ReactElement {
  const dispatch = useAppDispatch();

  return (
    <div id="main-menu">
      <h1 id="title">Hangman Game</h1>
      <div id="buttons">
        <button
          onClick={() => dispatch(setDifficulty(Difficulty.Easy))}
          autoFocus={true}
        >
          Easy (6-8)
        </button>
        <button onClick={() => dispatch(setDifficulty(Difficulty.Medium))}>
          Medium (9-11)
        </button>
        <button onClick={() => dispatch(setDifficulty(Difficulty.Hard))}>
          Hard (12-14)
        </button>

        <button className="button-primary" onClick={() => dispatch(newGame())}>
          LET'S PLAY
        </button>
      </div>
    </div>
  );
}
