import React from "react";
import PlayerList from "../PlayerList";
import ChoosePlayer from "../ChooseRandomPlayer/ChoosePlayer";

const Home = () => {
  return (
    <div>
      <PlayerList />
      <ChoosePlayer />
    </div>
  );
};

export default Home;
