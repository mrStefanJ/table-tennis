import React, { useEffect, useState } from "react";
import { getPlayers } from "../../jasonData/data";
import { PlayersProps } from "../../jasonData/type";
import "./style.css";
import GameRoom from "../../component/gameRoom/GameRoom";

const ChoosePlayer = () => {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [randomPlayers, setRandomPlayers] = useState<PlayersProps[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayersProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleOpenRoom = (player1: PlayersProps, player2: PlayersProps) => {
    setSelectedPlayers([player1, player2]);
    setModalOpen(true);
  };

  return (
    <>
      <p>Choose random player</p>
      <div className="randomPlayers">
        <button onClick={pickRandomPlayers} disabled={loading}>
          {loading ? "Loading..." : "Pick Random Players"}
        </button>
        {randomPlayers.length > 0 && (
          <div>
            <h2>Randomly Picked Players</h2>
            <div className="c">
              <div className="p">
                <p>Player 1: {randomPlayers[0].firstName}</p>
                <img
                  src={randomPlayers[0].image}
                  alt={`Player ${randomPlayers[0].firstName}`}
                />
              </div>
              <div className="p">
                <p>Player 2: {randomPlayers[1].firstName}</p>
                <img
                  src={randomPlayers[1].image}
                  alt={`Player ${randomPlayers[1].firstName}`}
                />
              </div>
            </div>
            <div className="btn-modal">
              <button
                className="btn"
                onClick={() =>
                  handleOpenRoom(randomPlayers[0], randomPlayers[1])
                }
              >
                Open Modal
              </button>
            </div>
          </div>
        )}
      </div>
      {modalOpen && selectedPlayers.length > 0 && (
        <GameRoom players={selectedPlayers} />
      )}
    </>
  );
};

export default ChoosePlayer;
