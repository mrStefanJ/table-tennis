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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { Game, Player } from "../../jasonData/type";
import "./style.css";

type FilterType = "all" | "active" | "retired";

const Standings = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matchs, setMatchs] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeButton, setActiveButton] = useState<FilterType>("all");

  useEffect(() => {
    fetchPlayers();
    fetchMatchData(); // eslint-disable-next-line
  }, []);

  // Fetch all players from localStorage
  const getPlayers = () => {
    try {
      const storedPlayers = localStorage.getItem("players");
      return storedPlayers ? JSON.parse(storedPlayers) : [];
    } catch (error) {
      console.error("Error fetching players from localStorage:", error);
      return [];
    }
  };

  // Set players into state
  const fetchPlayers = () => {
    const data = getPlayers();
    setPlayers(data);
  };

  // Fetch all matches from localStorage and calculate player stats
  const fetchMatchData = () => {
    try {
      const storedMatches = localStorage.getItem("match");
      if (!storedMatches) {
        console.log("No matches found in localStorage.");
        return;
      }

      const matches = JSON.parse(storedMatches) as Game[];
      const playersStatsMap: Map<string, any> = new Map();

      // Process each match
      matches.forEach((match: Game) => {
        match.players.forEach((player: Player) => {
          const playerId = player.id;
          const playerName = `${player.firstName} ${player.lastName}`;

          // Initialize player stats if not already present
          if (!playersStatsMap.has(playerId)) {
            playersStatsMap.set(playerId, {
              id: playerId,
              name: playerName,
              played: 0,
              won: 0,
              lost: 0,
              pointsWon: 0,
              pointsLost: 0,
            });
          }

          const playerStats = playersStatsMap.get(playerId);

          // Process match sets and update player stats
          match.sets.forEach((set: any) => {
            if (player.set === "player1") {
              playerStats.pointsWon += set.player1;
              playerStats.pointsLost += set.player2;
              playerStats.won += set.player1 > set.player2 ? 1 : 0;
              playerStats.lost += set.player1 <= set.player2 ? 1 : 0;
            } else if (player.set === "player2") {
              playerStats.pointsWon += set.player2;
              playerStats.pointsLost += set.player1;
              playerStats.won += set.player2 > set.player1 ? 1 : 0;
              playerStats.lost += set.player2 <= set.player1 ? 1 : 0;
            }
          });

          // Increment the number of games played
          playerStats.played++;
        });
      });

      // Convert map to array and set state
      const playersStatsArray = Array.from(playersStatsMap.values());
      setMatchs(playersStatsArray);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  // Check if a player is active or retired
  const checkPlayerActive = (playerId: string) => {
    return players.some((player) => player.id === playerId);
  };

  // Handle filter change for active/retired players
  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
    setActiveButton(filter);
  };

  // Define filter functions
  const filterFunctions: Record<FilterType, (player: Player) => boolean> = {
    all: () => true,
    active: (player) => checkPlayerActive(player.id),
    retired: (player) => !checkPlayerActive(player.id),
  };

  // Filter players data based on the selected filter
  const filteredPlayersData = matchs.filter(filterFunctions[filter]);

  return (
    <>
      <section className="standing__container">
        <Link to="/" className="standing__btn-back">
          Back
        </Link>
        <h2 className="standing__title">Standings Result</h2>
        <Box className="standing__buttons">
          {(["all", "active", "retired"] as FilterType[]).map((type) => (
            <Button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={activeButton === type ? "active" : ""}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
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
                  <TableCell>Points Won</TableCell>
                  <TableCell>Points Lost</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Retired</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPlayersData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      {filter === "retired"
                        ? "There are no players who have retired."
                        : "The data is empty."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlayersData.map((player) => (
                    <TableRow key={player.id}>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.played}</TableCell>
                      <TableCell>{player.won}</TableCell>
                      <TableCell>{player.lost}</TableCell>
                      <TableCell>{player.pointsWon}</TableCell>
                      <TableCell>{player.pointsLost}</TableCell>
                      <TableCell>{player.won * 3}</TableCell>
                      <TableCell>
                        {checkPlayerActive(player.id) ? "No" : "Yes"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </section>
      <Footer />
    </>
  );
};

export default Standings;
