import { useEffect, useState } from "react";
import { getPlayers } from "../../jasonData/data";
import { Player } from "../../jasonData/type";
import "./style.css";
import GameRoom from "../../component/Modal/gameRoom/GameRoom";
import { Box, Button } from "@mui/material";

const ChoosePlayer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [randomPlayers, setRandomPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
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

  const handleOpenRoom = (player1: Player, player2: Player) => {
    setSelectedPlayers([player1, player2]);
    setModalOpen(true);
  };

  const closeRoom = () => {
    setSelectedPlayers([]);
    setModalOpen(false);
  };

  return (
    <div className="container_random-player">
      <div className="randomPlayers">
        <Button
          onClick={pickRandomPlayers}
          disabled={loading || players.length < 2}
          className="btn"
        >
          {loading ? "Loading..." : "Pick Random Players"}
        </Button>
        {randomPlayers.length === 0 ? (
          <Box className="text">
            <p>You dind't choose random players</p>
          </Box>
        ) : (
          <div>
            <h2 className="title">Randomly Picked Players</h2>
            <div className="randomPlayers-choosen">
              <div className="choosen-player">
                <p className="player-name">
                  Player 1: {randomPlayers[0].firstName}
                </p>
                <img
                  className="player-image"
                  src={randomPlayers[0].image}
                  alt={`Player ${randomPlayers[0].firstName}`}
                />
              </div>
              <div className="choosen-player">
                <p className="player-name">
                  Player 2: {randomPlayers[1].firstName}
                </p>
                <img
                  className="player-image"
                  src={randomPlayers[1].image}
                  alt={`Player ${randomPlayers[1].firstName}`}
                />
              </div>
            </div>
            <div className="btn-modal">
              <Button
                className="btn"
                onClick={() =>
                  handleOpenRoom(randomPlayers[0], randomPlayers[1])
                }
              >
                Open Modal
              </Button>
            </div>
          </div>
        )}
      </div>
      {modalOpen && selectedPlayers.length > 0 && (
        <GameRoom players={selectedPlayers} closeModal={closeRoom} />
      )}
    </div>
  );
};

export default ChoosePlayer;
