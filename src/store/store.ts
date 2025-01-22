import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";

const rootReducer = combineReducers({
  game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state:", err);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Could not save state:", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
