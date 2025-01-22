import "./App.css";
import Game from "./components/Game/Game";
import MainMenu from "./components/MainMenu/MainMenu";
import Admin from "./components/Admin/Admin";
import { useAppSelector } from "./hooks/storeHooks";
import { Screen } from "./store/slices/gameSlice";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const currentScreen = useAppSelector((state) => state.game.currentScreen);

  return (
    <div>
      <Navbar />
      <div id="app-content">
        {(() => {
          switch (currentScreen) {
            case Screen.MainMenu:
              return <MainMenu />;
            case Screen.Game:
              return <Game />;
            case Screen.Admin:
              return <Admin />;
            default:
              return <h1>Default</h1>;
          }
        })()}
      </div>
    </div>
  );
}
export default App;
