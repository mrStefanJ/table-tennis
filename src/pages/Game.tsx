import React, { useState } from "react";
import { dataPlayer } from "../jasonData/data";
import { RandomData } from "../jasonData/type";
import "./style.css";

const Game = () => {
  const players = dataPlayer;

  const [randomPlayers, setRandomPlayers] = useState<RandomData[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(players);

  const pickRandomPlayers = () => {
    setLoading(true);
    let index1 = Math.floor(Math.random() * players.length);
    let index2 = Math.floor(Math.random() * players.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * players.length);
    }

    const randomPlayer1 = players[index1];
    const randomPlayer2 = players[index2];

    // go to room game

    setTimeout(() => {
      setRandomPlayers([randomPlayer1, randomPlayer2]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player, index) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      <button onClick={pickRandomPlayers} disabled={loading}>
        {loading ? "Loading..." : "Pick Random Players"}
      </button>
      {randomPlayers.length > 0 && (
        <div>
          <h2>Randomly Picked Players</h2>
          <>
            <div className="choosePlayer">
              <div className="player">
                <p>Player 1: </p> <span>{randomPlayers[0].name}</span>
              </div>
              <div className="player">
                <p>Player 2: </p> <span>{randomPlayers[1].name}</span>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Game;
