import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import ChoosePlayer from "./component/ChooseRandomPlayer/ChoosePlayer";
import PlayerList from "./component/PlayerList/PlayerList";

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
