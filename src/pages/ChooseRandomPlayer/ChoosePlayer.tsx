import React, { useEffect, useState } from "react";
import { getPlayers } from "../../jasonData/data";
import { PlayersProps } from "../../jasonData/type";
import "./style.css";

const ChoosePlayer = () => {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [randomPlayers, setRandomPlayers] = useState<PlayersProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setLoading(false);
    setPlayers(data);
  };

  const pickRandomPlayers = () => {
    setLoading(true);
    let index1 = Math.floor(Math.random() * players.length);
    let index2 = Math.floor(Math.random() * players.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * players.length);
    }

    const randomPlayer1 = players[index1];
    const randomPlayer2 = players[index2];

    setTimeout(() => {
      setRandomPlayers([randomPlayer1, randomPlayer2]);
      setLoading(false);
    }, 1000);
  };

  console.log(randomPlayers);

  return (
    <>
      <p>Choose random player</p>
      <div>
        <button onClick={pickRandomPlayers} disabled={loading}>
          {loading ? "Loading..." : "Pick Random Players"}
        </button>
        {randomPlayers.length > 0 && (
          <div>
            <h2>Randomly Picked Players</h2>
            <div className="c">
              <div className="p">
                <p>Player 1: {randomPlayers[0].firstName}</p>
                <img src={randomPlayers[0].image} />
              </div>
              <div className="p">
                <p>Player 2: {randomPlayers[1].firstName}</p>
                <img src={randomPlayers[1].image} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChoosePlayer;
