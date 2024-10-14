import "./App.css";
import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { PlayerList } from "./component/PlayerList";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <PlayerList />
      </div>
      <Footer />
    </>
  );
}

export default App;
