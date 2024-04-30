import "./App.css";
import ChoosePlayer from "./pages/ChooseRandomPlayer/ChoosePlayer";
import PlayerList from "./pages/PlayerList";

function App() {
  return (
    <div className="App">
      <div className="App_background">
        <PlayerList />
        <ChoosePlayer />
      </div>
    </div>
  );
}

export default App;
