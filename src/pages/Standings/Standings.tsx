import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import { Game, Player } from "../../jasonData/type";
import "./style.css";

// type FilterType = "all" | "active" | "retired";

const Standings = () => {
  const [playersData, setPlayersData] = useState<any[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  // const [filter, setFilter] = useState<string>("all");
  // const [activeButton, setActiveButton] = useState<string>("all");

  useEffect(() => {
    fetchMatchData();
    fetchPlayers(); // eslint-disable-next-line
  }, [players, playersData]);

  console.log("PLayers", players);

  // Fetch all players from localStorage
  const getPlayers = () => {
    try {
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers) {
        return JSON.parse(storedPlayers);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching players from localStorage:", error);
      return [];
    }
  };

  // Set players into state
  const fetchPlayers = async () => {
    const data = await getPlayers();
    console.log("Players fetched from localStorage:", data); // Debugging
    setPlayers(data);
  };
  // Fetch all matches from localStorage and calculate player stats
  const fetchMatchData = async () => {
    try {
      const storedMatches = localStorage.getItem("matches");
      console.log("Stored matches:", storedMatches); // Debug log to check if matches are stored

      if (storedMatches) {
        const matches = JSON.parse(storedMatches) as Game[];
        console.log("Matches parsed from storage:", matches); // Debug log to check the parsed matches

        const playersStatsMap: Map<string, any> = new Map();

        // Process each match
        matches.forEach((match: Game) => {
          match.players.forEach((player: Player) => {
            const playerId = player.id;
            const playerName = `${player.firstName} ${player.lastName}`;

            // Debugging player stats
            console.log("Processing player:", playerName, "with ID:", playerId);

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
                if (set.player1 > set.player2) {
                  playerStats.won++;
                } else {
                  playerStats.lost++;
                }
              } else if (player.set === "player2") {
                playerStats.pointsWon += set.player2;
                playerStats.pointsLost += set.player1;
                if (set.player2 > set.player1) {
                  playerStats.won++;
                } else {
                  playerStats.lost++;
                }
              }
            });

            // Increment the number of games played
            playerStats.played++;
          });
        });

        // Convert map to array and set state
        const playersStatsArray = Array.from(playersStatsMap.values());
        console.log("Players stats array:", playersStatsArray); // Debugging
        setPlayersData(playersStatsArray); // Set player data
      } else {
        console.log("No matches found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  // Check if a player is active or retired
  // const checkPlayerActive = (playerId: string) => {
  //   const isActive = players.some((player) => player.id === playerId);
  //   console.log(
  //     "Checking active status for player ID:",
  //     playerId,
  //     "Result:",
  //     isActive
  //   );
  //   return isActive;
  // };

  // Handle filter change for active/retired players
  // const handleFilterChange = (filter: string) => {
  //   setFilter(filter);
  //   setActiveButton(filter);
  // };

  // const filterFunctions = {
  //   all: () => true,
  //   active: (player: Player) => checkPlayerActive(player.id),
  //   retired: (player: Player) => !checkPlayerActive(player.id),
  // };

  // function getFilterFunction(filter: string): (player: Player) => boolean {
  //   if (filter in filterFunctions) {
  //     return filterFunctions[filter as FilterType];
  //   }
  //   return filterFunctions.all;
  // }

  // Filter players data based on the selected filter
  // const filteredPlayersData = playersData.filter(getFilterFunction(filter));

  return (
    <>
      <div className="standing__container">
        <Link to="/" className="standing__btn-back">
          Back
        </Link>
        <h2 className="standing__title">Standings Result</h2>
        {/* <Box className="standing__buttons">
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
            onClick={() => handleFilterChange("retired")}
            className={activeButton === "retired" ? "active" : ""}
          >
            Retired
          </Button>
        </Box> */}
        {/* <Paper sx={{ width: "100%" }}>
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
                  filteredPlayersData.map((player: any) => (
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
        </Paper> */}
      </div>
      <Footer />
    </>
  );
};

export default Standings;
