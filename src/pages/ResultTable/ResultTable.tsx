import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../component/Footer";
import { Game, Set } from "../../jasonData/type";
import "./style.css";

const ResultTable = () => {
  const [data, setData] = useState<Game[]>([]); // All matches
  const [selectedMatch, setSelectedMatch] = useState<string>(""); // Selected match ID
  const [selectedMatchData, setSelectedMatchData] = useState<Game | null>(null); // Selected match data

  useEffect(() => {
    fetchMatches(); // Fetch matches on component mount
  }, []);

  // Fetch all matches from localStorage
  const fetchMatches = () => {
    const storedMatches = localStorage.getItem("match");
    if (storedMatches) {
      const matches = JSON.parse(storedMatches) as Game[];
      setData(matches); // Set the retrieved matches into state
    }
  };

  // Fetch a specific match by ID from local state
  const fetchMatch = (id: string) => {
    const matchData = data.find((match) => match.id === id) || null;
    setSelectedMatchData(matchData); // Set the selected match data into state
  };

  // Handle match selection change
  const handleChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    setSelectedMatch(selectedId); // Set selected match ID
    fetchMatch(selectedId); // Fetch the match data based on the selected ID
  };

  return (
    <>
      <section className="result-table-container">
        <Box>
          <Link to="/" className="result-table__btn-back">
            Back
          </Link>
        </Box>
        <div className="result-table">
          <h2 className="result-table__heading">
            Matches that have been played
          </h2>
          <Box className="result-table__select">
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="select-label">Match</InputLabel>
              <Select
                id="select-match"
                value={selectedMatch}
                label="Match"
                onChange={handleChange}
              >
                {data.length === 0 ? (
                  <MenuItem disabled>There are NO matches</MenuItem>
                ) : (
                  data.map((match: Game) => (
                    <MenuItem value={match.id} key={match.id}>
                      {match.players[0].firstName} VS{" "}
                      {match.players[1].firstName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table
              sx={{ minWidth: 500 }}
              aria-label="simple table"
              className="result-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="result-table__cell">Set 1</TableCell>
                  <TableCell className="result-table__cell">Set 2</TableCell>
                  <TableCell className="result-table__cell">Set 3</TableCell>
                  <TableCell className="result-table__cell">Set 4</TableCell>
                  <TableCell className="result-table__cell">Set 5</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {selectedMatchData ? (
                    selectedMatchData.sets.map((set: Set, index: number) => (
                      <TableCell
                        key={index}
                        component="th"
                        scope="row"
                        className="result-table__cell"
                      >
                        {set.player1} - {set.player2}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell colSpan={5} className="result-table__cell">
                      Select a match
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ResultTable;
