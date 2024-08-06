import { useEffect, useState } from "react";
import { featchMatchs, getPlayers } from "../../jasonData/data";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Footer from "../../component/Footer/Footer";
import "./style.css";
import { Link } from "react-router-dom";
import { Game, Match, Player } from "../../jasonData/type";

const Standings = () => {
  const [playersData, setPlayersData] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [activeButton, setActiveButton] = useState<string>("all");

  useEffect(() => {
    fetchMatchData();
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

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
      uniqueOpponents.forEach((opponentId: string) => {
        const opponentStats = playersStatsMap.get(opponentId);
        opponentStats.played += uniqueOpponents.size - 1; // Exclude the player himself
      });
    });

    const playersStatsArray = Array.from(playersStatsMap.values());
    setPlayersData(playersStatsArray);
  };

  const checkPlayerActive = (playerId: string) => {
    return players.some((player) => player.id === playerId);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    setActiveButton(filter);
  };

  const filteredPlayersData = playersData.filter((player) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "active") {
      return checkPlayerActive(player.id);
    }
    if (filter === "deactive") {
      return !checkPlayerActive(player.id);
    }
    return true;
  });

  return (
    <>
      <div className="standing__container">
        <Link to="/" className="standing__btn-back">
          Back
        </Link>
        <h2 className="standing__title">Standings Result</h2>
        <Box className="standing__buttons">
          <Button
            onClick={() => handleFilterChange("all")}
            className={activeButton === "all" ? "active" : ""}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilterChange("active")}
            className={activeButton === "active" ? "active" : ""}
          >
            Active
          </Button>
          <Button
            onClick={() => handleFilterChange("deactive")}
            className={activeButton === "deactive" ? "active" : ""}
          >
            Deactive
          </Button>
        </Box>
        <Paper sx={{ width: "100%" }}>
          <TableContainer className="result__table-container">
            <Table aria-label="simple table" className="result-table__table">
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Played</TableCell>
                  <TableCell>Won in Set</TableCell>
                  <TableCell>Lost in Set</TableCell>
                  <TableCell>Point Won</TableCell>
                  <TableCell>Point Lost</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlayersData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      The data is empty
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlayersData.map((player: Match) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.played}</TableCell>
                      <TableCell>{player.won}</TableCell>
                      <TableCell>{player.lost}</TableCell>
                      <TableCell>{player.pointsWon}</TableCell>
                      <TableCell>{player.pointsLost}</TableCell>
                      <TableCell>{player.won * 3}</TableCell>
                      <TableCell>
                        {checkPlayerActive(player.id) ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <Footer />
    </>
  );
};

export default Standings;
