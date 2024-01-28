import "./App.css";
import ChoosePlayer from "./pages/ChooseRandomPlayer/ChoosePlayer";
import PlayerList from "./pages/PlayerList";
import ScorePage from "./pages/ScorePage/ScorePage";

function App() {
  return (
    <div className="App">
      <PlayerList />
      <ChoosePlayer />
      <ScorePage />
    </div>
  );
}

export default App;
