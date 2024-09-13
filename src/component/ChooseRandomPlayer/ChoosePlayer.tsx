import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import GameRoom from "../../component/Modal/gameRoom/GameRoom";
import { getPlayers } from "../../jasonData/data";
import { Player } from "../../jasonData/type";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./style.css";

const ChoosePlayer = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [randomPlayers, setRandomPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displaySection, setDisplaySection] = useState<
    "random" | "manual" | null
  >(null); // State to track which section to display
  const [manualPlayerOne, setManualPlayerOne] = useState<string>("");
  const [manualPlayerTwo, setManualPlayerTwo] = useState<string>("");

  useEffect(() => {
    fetchPlayers();
  }, [players, randomPlayers]);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  const pickRandomPlayers = () => {
    setLoading(true);
    setManualPlayerOne(""); // Clear manual selections when switching modes
    setManualPlayerTwo("");
    setSelectedPlayers([]);
    setDisplaySection("random"); // Show the random players section

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

  const pickManualPlayers = () => {
    setRandomPlayers([]); // Clear random selections when switching modes
    setDisplaySection("manual"); // Show the manual players section
  };

  const handleManualPlayerOneChange = (event: SelectChangeEvent) => {
    setManualPlayerOne(event.target.value);
  };

  const handleManualPlayerTwoChange = (event: SelectChangeEvent) => {
    setManualPlayerTwo(event.target.value);
  };

  const handleOpenRoom = () => {
    if (displaySection === "random" && randomPlayers.length === 2) {
      setSelectedPlayers(randomPlayers);
    } else if (
      displaySection === "manual" &&
      manualPlayerOne &&
      manualPlayerTwo
    ) {
      const playerOne = players.find((player) => player.id === manualPlayerOne);
      const playerTwo = players.find((player) => player.id === manualPlayerTwo);
      if (playerOne && playerTwo) {
        setSelectedPlayers([playerOne, playerTwo]);
      }
    }
    setModalOpen(true);
  };

  const closeRoom = () => {
    setSelectedPlayers([]);
    setModalOpen(false);
  };

  // To prevent choosing the same player in both selects
  const filteredPlayersForSecondSelect = players.filter(
    (player) => player.id !== manualPlayerOne
  );

  return (
    <div className="container-random-player">
      <div className="random-players">
        <div className="btn--position-center">
          <Button
            onClick={pickRandomPlayers}
            disabled={loading || players.length <= 2}
            className="btn btn--pick"
          >
            {loading ? "Loading..." : "Pick Random Players"}
          </Button>
          <Button
            onClick={pickManualPlayers}
            disabled={loading || players.length <= 2}
            className="btn btn--pick"
          >
            Pick Manually Players
          </Button>
          {players.length <= 2 && (
            <Tooltip
              title="Need to have more that two players to play game"
              placement="top"
            >
              <InfoOutlinedIcon />
            </Tooltip>
          )}
        </div>
        {displaySection === "random" && randomPlayers.length > 0 && (
          <div className="pick__random-players">
            <h3 className="random-players__title">Randomly Picked Players</h3>
            <div className="random-players__choosen">
              {randomPlayers.map((player, index) => (
                <div key={player.id} className="choosen-player">
                  <p className="player-name">
                    <span>Player {index + 1}:</span> {player.firstName}
                  </p>
                  <img
                    className="player-image"
                    src={player.image}
                    alt={`Player ${player.firstName}`}
                  />
                </div>
              ))}
            </div>
            <div className="btn-modal">
              <Button className="btn" onClick={handleOpenRoom}>
                Open Modal
              </Button>
            </div>
          </div>
        )}
        {displaySection === "manual" && (
          <div className="pick__manual-players">
            <h2>Manual</h2>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="player-one-select-label">Player One</InputLabel>
              <Select
                labelId="player-one-select-label"
                id="player-one-select"
                value={manualPlayerOne}
                label="Player One"
                onChange={handleManualPlayerOneChange}
              >
                {players.map((player) => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="player-two-select-label">Player Two</InputLabel>
              <Select
                labelId="player-two-select-label"
                id="player-two-select"
                value={manualPlayerTwo}
                label="Player Two"
                onChange={handleManualPlayerTwoChange}
                disabled={!manualPlayerOne}
              >
                {filteredPlayersForSecondSelect.map((player) => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="btn-modal">
              <Button
                className="btn"
                onClick={handleOpenRoom}
                disabled={!manualPlayerOne || !manualPlayerTwo}
              >
                Open Modal
              </Button>
            </div>
          </div>
        )}
        {displaySection === null && (
          <Box className="text">
            {/* <img
              src={Image}
              alt="players and table-tennis"
              className="image--default"
            /> */}
          </Box>
        )}
      </div>
      {modalOpen && selectedPlayers.length > 0 && (
        <GameRoom players={selectedPlayers} closeModal={closeRoom} />
      )}
    </div>
  );
};

export default ChoosePlayer;
