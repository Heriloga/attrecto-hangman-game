import { ReactElement } from "react";
import "./Hangman.css";
import { useAppSelector } from "../../hooks/storeHooks";

export default function Hangman(): ReactElement {
  const health = useAppSelector((state) => state.game.health);

  return (
    <svg viewBox="0 0 10 12">
      <path d="M1,11 h8" />
      <path d="M9,11 v-10" />
      <path d="M9,1 h-4" />
      <path d="M5,1 v2" />
      {health <= 5 && <circle cx="5" cy="4" r="1" />}
      {health <= 4 && <path d="M5,5 v3" />}
      {health <= 3 && <path d="M5,5 l-2,2" />}
      {health <= 2 && <path d="M5,5 l2,2" />}
      {health <= 1 && <path d="M5,8 l-2,2" />}
      {health <= 0 && <path d="M5,8 l2,2" />}
    </svg>
  );
}
