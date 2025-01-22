import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { Screen, switchScreen } from "../../store/slices/gameSlice";
import { addNewWord } from "../../store/slices/gameSlice";
import "./Admin.css";

export default function Game(): ReactElement {
  const [input, setInput] = useState("");

  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.game.words);

  return (
    <div id="admin">
      <h1>Admin</h1>
      <div id="content-wrapper">
        <div id="input">
          <h2> Type the word you want to add to the list </h2>
          <input
            type="text"
            value={input}
            placeholder="New word"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button onClick={() => dispatch(addNewWord(input))} autoFocus>
            Save
          </button>
          <button onClick={() => dispatch(switchScreen(Screen.MainMenu))}>
            Back
          </button>
        </div>
        <div id="words">
          {words.map((word, index) => (
            <div className="word" key={word}>
              <span>{word}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
