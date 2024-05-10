import { useEffect, useState } from "react";
import { featchMatchs } from "../../jasonData/data";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Footer from "../../component/Footer/Footer";
import "./style.css";
import { Link } from "react-router-dom";
import { Game, Match, Player } from "../../jasonData/type";

const Standings = () => {
  const [playersData, setPlayersData] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    const matchesResponse = await featchMatchs();
    const matches = matchesResponse?.data;
    const playersStatsMap: Map<string, any> = new Map();
    matches.forEach((match: Game) => {
      const uniqueOpponents: Set<string> = new Set();

      match.players.forEach((player: Player) => {
        const playerId = player.id;
        const playerName = `${player.firstName} ${player.lastName}`;

        if (!playersStatsMap.has(playerId as string)) {
          playersStatsMap.set(playerId as string, {
            id: playerId,
            name: playerName,
            played: 0,
            won: 0,
            lost: 0,
            pointsWon: 0,
            pointsLost: 0,
          });
        }

        const playerStats = playersStatsMap.get(playerId as string);

        match.sets.forEach((set: any) => {
          if (set.player1 > set.player2 && player.set === "player1") {
            playerStats.won++;
          } else if (set.player2 > set.player1 && player.set === "player2") {
            playerStats.won++;
          } else if (set.player1 < set.player2 && player.set === "player1") {
            playerStats.lost++;
          } else if (set.player2 < set.player1 && player.set === "player2") {
            playerStats.lost++;
          }

          playerStats.pointsWon +=
            player.set === "player1" ? set.player1 : set.player2;
          playerStats.pointsLost +=
            player.set === "player1" ? set.player2 : set.player1;
        });

        uniqueOpponents.add(playerId as string);
      });

      // Increment the played count for each player with the number of unique opponents
      uniqueOpponents.forEach((opponentId) => {
        const opponentStats = playersStatsMap.get(opponentId);
        opponentStats.played += uniqueOpponents.size - 1; // Exclude the player himself
      });
    });

    const playersStatsArray = Array.from(playersStatsMap.values());
    setPlayersData(playersStatsArray);
  };

  return (
    <>
      <div className="container-standing">
        <Link to="/" className="standing__btn-back">
          Back
        </Link>
        <h2 className="standing__title">Standings Result</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Played</TableCell>
                <TableCell>Won in Set</TableCell>
                <TableCell>Lost in Set</TableCell>
                <TableCell>Point Won</TableCell>
                <TableCell>Point Lost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersData.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.played}</TableCell>
                  <TableCell>{player.won}</TableCell>
                  <TableCell>{player.lost}</TableCell>
                  <TableCell>{player.pointsWon}</TableCell>
                  <TableCell>{player.pointsLost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </>
  );
};

export default Standings;
