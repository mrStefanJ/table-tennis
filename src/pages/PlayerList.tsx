import { useState, useEffect } from "react";
import { getPlayers, deletePlayer, selectedPlayer } from "../jasonData/data";
import { PlayersProps } from "../jasonData/type";
import "./style.css";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Modal as PlayerInfo } from "../component/Modal/playerInfo";
import { ModalCreate } from "../component/Modal/playerCreate";
import { ModalDelete } from "../component/Modal/playerDelete";

const PlayerList = () => {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
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

  const fetchPlayerbyID = async (id: string) => {
    try {
      const playerData = await selectedPlayer(id);
      setSelectedPlayerData(playerData);
      setSelectedPlayerId(id);
    } catch (error) {
      console.error("Error fetching player data: ", error);
    }
  };

  const openCreaterModal = () => setOpenModal(true);
  const closeCreaterModal = () => setOpenModal(false);

  const openDeleteModal = () => setOpenModalDelete(true);
  const closeDeleteModal = () => setOpenModalDelete(false);

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
                        <Button onClick={openDeleteModal}>Delete</Button>
                        {openModalDelete && (
                          <ModalDelete
                            onClose={closeDeleteModal}
                            playerId={player.id as string}
                            fetchPlayers={fetchPlayers}
                          />
                        )}
                        <Button
                          onClick={() => fetchPlayerbyID(player.id as string)}
                        >
                          Info
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
      <div>
        <Box>
          <Button onClick={openCreaterModal}>Add New Player</Button>
        </Box>
        {openModal && (
          <ModalCreate
            fetchPlayers={fetchPlayers}
            closeCreaterModal={closeCreaterModal}
          />
        )}
      </div>
      {selectedPlayerId && (
        <PlayerInfo player={selectedPlayerData} onClose={closeModal} />
      )}
    </div>
  );
};

export default PlayerList;
