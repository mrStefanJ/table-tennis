import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { saveMatch } from "../../../jasonData/data";
import { Game, Player } from "../../../jasonData/type";
import "./style.css";

const GameRoom = ({
  players,
  closeModal,
}: {
  players: Player[];
  closeModal: () => void;
}) => {
  const player1 = players[0];
  const player2 = players[1];
  const initialMatchData = {
    id: uuidv4(),
    sets: [...Array(5)].map(() => ({ player1: 0, player2: 0 })),
    players: [
      {
        id: player1.id,
        firstName: player1.firstName,
        lastName: player1.lastName,
        set: "player1",
      },
      {
        id: player2.id,
        firstName: player2.firstName,
        lastName: player2.lastName,
        set: "player2",
      },
    ],
  };

  const [matchData, setMatchData] = useState<Game>(initialMatchData);

  const handleValues =
    (index: number, player: "player1" | "player2") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        const newSets = [...matchData.sets];
        newSets[index][player] = numericValue;
        setMatchData({ ...matchData, sets: newSets });
      }
    };

  const handleSubmit = () => {
    try {
      // Retrieve existing matches from localStorage
      const storedMatches = localStorage.getItem("match");
      const existingMatches = storedMatches ? JSON.parse(storedMatches) : [];

      // Add the new match to the list of existing matches
      const updatedMatches = [...existingMatches, matchData];

      // Save the updated list back to localStorage
      localStorage.setItem("match", JSON.stringify(updatedMatches));

      console.log("Game data saved successfully in localStorage.");
    } catch (error) {
      console.error("Error saving game data to localStorage:", error);
    }
    closeModal();
  };

  return (
    <Modal open aria-describedby="room-game" className="modal--position">
      <div className="modal-room">
        <h2 className="modal-room__title">Room</h2>
        <p className="modal-room__title">
          {player1.firstName} VS {player2.firstName}
        </p>
        <TableContainer className="table-container">
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[...Array(5).keys()].map((index) => (
                  <TableCell key={`setHeader${index}`}>
                    Set {index + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {[...Array(5)].map((_, index) => (
                  <TableCell key={`set${index}`}>
                    <TextField
                      value={matchData.sets[index].player1}
                      label="Player 1"
                      className="modal-room__input-size"
                      type="number"
                      onChange={handleValues(index, "player1")}
                    />
                    <TextField
                      value={matchData.sets[index].player2}
                      label="Player 2"
                      className="modal-room__input-size"
                      type="number"
                      onChange={handleValues(index, "player2")}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="modal-room__button">
          <Button onClick={handleSubmit} className="modal-room__button--save">
            Save Match
          </Button>
          <Button onClick={closeModal} className="modal-room__button--cancel">
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default GameRoom;
