import "./App.css";
import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { ChoosePlayer } from "./component/ChooseRandomPlayer";
import { PlayerList } from "./component/PlayerList";

function App() {
  return (
    <div className="App">
      <div className="App_background">
        <Header />
        <PlayerList />
        <ChoosePlayer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
