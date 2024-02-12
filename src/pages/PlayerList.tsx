import React, { useState, useEffect } from "react";
import {
  getPlayers,
  addPlayer,
  deletePlayer,
  selectedPlayer,
} from "../jasonData/data";
import { PlayersProps } from "../jasonData/type";
import "./style.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../component/playerModal";

const PlayerList = () => {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [newPlayer, setNewPlayer] = useState<PlayersProps>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    image: "",
    title: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedPlayerData, setSelectedPlayerData] =
    useState<PlayersProps | null>(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setLoading(false);
    setPlayers(data);
  };

  const handleAddPlayer = async () => {
    try {
      if (!newPlayer.firstName.trim() || !newPlayer.lastName.trim()) {
        setError("First name and last name must not be empty!!!");
        return;
      }
      setError("");

      await addPlayer(newPlayer);
      setNewPlayer({
        id: Date.now(),
        firstName: "",
        lastName: "",
        image: "",
        title: "",
      });
      fetchPlayers();
    } catch (error) {
      console.error("Error adding new player: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlayer((prevPlayer) => ({
          ...prevPlayer,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteItem = (id: number) => {
    deletePlayer(id);
    fetchPlayers();
  };

  const fetchPlayerbyID = async (id: string) => {
    try {
      const playerData = await selectedPlayer(id);
      setSelectedPlayerData(playerData);
      setSelectedPlayerId(id);
    } catch (error) {
      console.error("Error fetching player data: ", error);
    }
  };

  const closeModal = () => {
    setSelectedPlayerData(null);
    setSelectedPlayerId(null);
  };

  return (
    <div className="container">
      <div className="players-list">
        <h2>Players</h2>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell component="th" scope="player">
                        {player.firstName}
                      </TableCell>
                      <TableCell component="th" scope="player">
                        {player.lastName}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handleDeleteItem(player.id as number)}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => fetchPlayerbyID(player.id as string)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {players.length === 0 && <p>Data is empty</p>}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
      <div className="players-form">
        <form>
          <div className="player-field">
            <input
              type="text"
              name="firstName"
              value={newPlayer.firstName}
              onChange={handleChange}
              placeholder="Enter player first name"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="player-field">
            <input
              type="text"
              name="lastName"
              value={newPlayer.lastName}
              onChange={handleChange}
              placeholder="Enter player last name"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Upload player image"
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={newPlayer.title}
              onChange={handleChange}
              placeholder="Enter player title"
            />
          </div>
          <button type="button" onClick={handleAddPlayer}>
            Add Player
          </button>
        </form>
      </div>
      {selectedPlayerId && (
        <Modal player={selectedPlayerData} onClose={closeModal} />
      )}
    </div>
  );
};

export default PlayerList;
