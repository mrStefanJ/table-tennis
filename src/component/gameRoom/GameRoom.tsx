import React, { useState } from "react";
import "./style.css";
import { Button, TextField } from "@mui/material";

const GameRoom = ({
  players,
  closeModal,
}: {
  players: any;
  closeModal: () => void;
}) => {
  console.log(players);
  const [chosenPlayers, setChosenPlayers] = useState(players);
  const [gameResults, setGameResults] = useState<Array<string>>([]);

  const updateGameResults = () => {
    const results = chosenPlayers.map((player: any) => {
      let playerScore = 0;
      for (let i = 1; i <= 5; i++) {
        const playerSetScore = parseInt(
          (
            document.getElementsByName(
              `player ${player.id} set ${i}`
            )[0] as HTMLInputElement
          ).value
        );
        playerScore += playerSetScore;
      }
      return playerScore;
    });
    setGameResults(results);
  };

  return (
    <div className="modal-room">
      <h2>GameRoom</h2>
      <div className="players">
        {chosenPlayers.map((player: any, index: number) => (
          <div key={index} className="player">
            <h3>{player.firstName}</h3>
            {/* Display other player information here */}
          </div>
        ))}
      </div>
      <table className="border-result">
        <tr>
          <th>Set 1</th>
          <th>Set 2</th>
          <th>Set 3</th>
          <th>Set 4</th>
          <th>Set 5</th>
        </tr>
        <tr>
          {[...Array(5)].map((_, index) => (
            <td key={index}>
              {chosenPlayers.map((player: any) => (
                <TextField
                  key={player.id}
                  name={`player ${player.id} set ${index + 1}`}
                  className="input-size"
                  onChange={updateGameResults}
                />
              ))}
            </td>
          ))}
        </tr>
      </table>
      <div className="game-result">
        {gameResults.map((result, index) => (
          <div key={index}>
            Player {index + 1} Score: {result}
          </div>
        ))}
      </div>
      <Button onClick={() => closeModal}>Cancel</Button>
    </div>
  );
};

export default GameRoom;
