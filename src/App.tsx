import "./App.css";
import Header from "./component/Header/Header";
import ChoosePlayer from "./pages/ChooseRandomPlayer/ChoosePlayer";
import PlayerList from "./pages/PlayerList";

function App() {
  return (
    <div className="App">
      <div className="App_background">
        <Header />
        <PlayerList />
        <ChoosePlayer />
      </div>
    </div>
  );
}

export default App;
