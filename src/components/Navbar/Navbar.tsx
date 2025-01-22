import { ReactElement } from "react";
import { Screen, switchScreen } from "../../store/slices/gameSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import "./Navbar.css";
import logo from "./logo.png";

export default function Navbar(): ReactElement {
  const dispatch = useAppDispatch();

  return (
    <nav id="Navbar">
      <ul>
        <li>
          <img
            src={logo}
            onClick={() => dispatch(switchScreen(Screen.MainMenu))}
          />
          <span>Attrecto</span>
        </li>
        <li>
          <button onClick={() => dispatch(switchScreen(Screen.Admin))}>
            Admin
          </button>
        </li>
      </ul>
    </nav>
  );
}
