import "./App.css";
import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { ChoosePlayer } from "./component/ChooseRandomPlayer";
import { PlayerList } from "./component/PlayerList";

function App() {
  return (
    <div className="App">
      <Header />
      <PlayerList />
      <ChoosePlayer />
      <Footer />
    </div>
  );
}

export default App;
