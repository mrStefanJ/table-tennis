import { ChoosePlayer } from "../../component/ChooseRandomPlayer";
import { PlayerList } from "../../component/PlayerList";

const Home = () => {
  return (
    <>
      <PlayerList />
      <ChoosePlayer />
    </>
  );
};

export default Home;
