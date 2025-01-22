import { createSlice } from "@reduxjs/toolkit";

export enum Difficulty {
  Easy = 6,
  Medium = 9,
  Hard = 12,
}
export enum GameState {
  Idle,
  Started,
  Defeat,
  Victory,
}
export enum Screen {
  MainMenu,
  Game,
  Admin,
}

interface InitialState {
  currentScreen: Screen;
}

export type LetterFound = {
  index: number[];
  letter: string;
};

type Letter = {
  letter: string;
  isDisabled: boolean;
};

interface InitialState {
  currentScreen: Screen;
  gameState: GameState;
  difficulty: Difficulty;
  maxHealth: number;
  health: number;
  letters: Letter[];
  lettersFound: LetterFound[];
  indexesFound: number[];
  lettersPlayed: string[];
  currentWord: string;
  currentWordIndex: number;
  wordsPlayed: string[];
  words: string[];
}

const initialState: InitialState = {
  currentScreen: Screen.MainMenu,
  gameState: GameState.Idle,
  difficulty: Difficulty.Easy,
  maxHealth: 6,
  health: 6,
  lettersFound: [],
  indexesFound: [],
  letters: [
    { letter: "A", isDisabled: false },
    { letter: "B", isDisabled: false },
    { letter: "C", isDisabled: false },
    { letter: "D", isDisabled: false },
    { letter: "E", isDisabled: false },
    { letter: "F", isDisabled: false },
    { letter: "G", isDisabled: false },
    { letter: "H", isDisabled: false },
    { letter: "I", isDisabled: false },
    { letter: "J", isDisabled: false },
    { letter: "K", isDisabled: false },
    { letter: "L", isDisabled: false },
    { letter: "M", isDisabled: false },
    { letter: "N", isDisabled: false },
    { letter: "O", isDisabled: false },
    { letter: "P", isDisabled: false },
    { letter: "Q", isDisabled: false },
    { letter: "R", isDisabled: false },
    { letter: "S", isDisabled: false },
    { letter: "T", isDisabled: false },
    { letter: "U", isDisabled: false },
    { letter: "V", isDisabled: false },
    { letter: "W", isDisabled: false },
    { letter: "X", isDisabled: false },
    { letter: "Y", isDisabled: false },
    { letter: "Z", isDisabled: false },
  ],
  lettersPlayed: [],
  wordsPlayed: [],
  currentWord: "",
  currentWordIndex: 0,
  words: [
    "reward",
    "shiver",
    "regret",
    "carbon",
    "island",
    "impound",
    "extreme",
    "inspire",
    "finan",
    "control",
    "collapse",
    "medicine",
    "frighten",
    "observer",
    "classify",
    "monstrous",
    "orchestra",
    "executive",
    "firepla",
    "essential",
    "prevalence",
    "background",
    "particular",
    "attraction",
    "pedestrian",
    "unfortunate",
    "charismatic",
    "institution",
    "destruction",
    "presentation",
    "manufacturer",
    "interference",
    "announcement",
    "presidential",
    "inappropriate",
    "embarrassment",
    "consideration",
    "comprehensive",
    "communication",
    "representative",
    "responsibility",
    "constitutional",
    "discrimination",
    "recommendation",
  ],
};

export const gameSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    newGame: (state) => {
      state.gameState = GameState.Started;
      state.lettersPlayed = [];
      state.lettersFound = [];
      state.indexesFound = [];

      gameSlice.caseReducers.resetHealth(state);
      gameSlice.caseReducers.setWord(state);
      gameSlice.caseReducers.switchScreen(state, {
        type: "switchScreen",
        payload: Screen.Game,
      });

      state.letters.forEach((l) => {
        l.isDisabled = false;
      });
    },

    addFoundLetter: (state, action) => {
      state.lettersFound = [...state.lettersFound, action.payload];

      let letterCount = 0;
      state.lettersFound.forEach((letterFound) => {
        letterCount += letterFound.index.length;
      });

      if (state.currentWord.length === letterCount) {
        state.gameState = GameState.Victory;
        gameSlice.caseReducers.playWord(state, {
          type: "playWord",
          payload: state.currentWord,
        });
      }
    },

    setWord: (state) => {
      // filter words by diff. length
      const wordsFilterByLength = state.words.filter(
        (word) =>
          word.length >= state.difficulty && word.length <= state.difficulty + 2
      );

      // check if we have a non played
      const wordsFilterNonPlayed = wordsFilterByLength.filter(
        (word) => !state.wordsPlayed.includes(word)
      );

      // filter them out if we have, and return a random from them
      let randomIndex;
      if (wordsFilterNonPlayed.length > 0) {
        randomIndex = Math.floor(Math.random() * wordsFilterNonPlayed.length);
        state.currentWord = wordsFilterNonPlayed[randomIndex];
      }
      // else return a random
      else {
        randomIndex = Math.floor(Math.random() * wordsFilterByLength.length);
        state.currentWord = wordsFilterByLength[randomIndex];
      }
    },

    switchScreen: (state, action) => {
      state.currentScreen = action.payload;
    },

    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },

    playWord: (state, action) => {
      state.wordsPlayed = [...state.wordsPlayed, action.payload];
    },

    playLetter: (state, action) => {
      if (state.gameState != GameState.Started) {
        return;
      }

      const playedLetter = action.payload.letter.toLowerCase();

      state.letters.forEach((l) => {
        if (l.letter.toLowerCase() === playedLetter) {
          l.isDisabled = true;
        }
      });

      if (state.lettersPlayed.includes(playedLetter)) {
        return;
      }
      state.lettersPlayed = [...state.lettersPlayed, playedLetter];

      const currentWord = state.currentWord.toLowerCase();
      const indexes: number[] = [];

      currentWord.split("").findIndex((l, i) => {
        if (l == playedLetter) {
          indexes.push(i);
        }
      });
      const foundLetter = {
        index: indexes,
        letter: playedLetter,
      } as LetterFound;

      if (indexes.length > 0) {
        state.indexesFound = [...state.indexesFound, ...indexes];
        gameSlice.caseReducers.addFoundLetter(state, {
          type: "addFoundLetter",
          payload: foundLetter,
        });
        return;
      }
      gameSlice.caseReducers.decreaseHealth(state);
    },

    addNewWord: (state, action) => {
      if (state.words.includes(action.payload)) return;
      if (action.payload.length < 6 || action.payload.length > 14) return;
      state.words = [...state.words, action.payload];
    },

    decreaseHealth: (state) => {
      state.health -= 1;
      if (state.health === 0) {
        state.gameState = GameState.Defeat;
        return;
      }
    },

    resetHealth: (state) => {
      state.health = state.maxHealth;
    },
  },
});

export const {
  newGame,
  addFoundLetter,
  setWord,
  switchScreen,
  setDifficulty,
  playWord,
  playLetter,
  addNewWord,
  decreaseHealth,
  resetHealth,
} = gameSlice.actions;
export default gameSlice.reducer;
