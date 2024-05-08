import "./App.css";
import Footer from "./component/Footer/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
