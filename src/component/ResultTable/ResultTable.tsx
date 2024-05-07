import { Link } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { featchMatchs } from "../../jasonData/data";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Game, Set } from "../../jasonData/type";

const ResultTable = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const matchs = await featchMatchs();
    setData(matchs!.data);
  };

  console.log(data);

  return (
    <div className="container-result">
      <Box>
        <Link to="/" className="btn-back">
          Go Back
        </Link>
      </Box>
      <div className="container--table">
        <h2>Result</h2>
        <ul>
          {data.map((match: Game) => (
            <div key={match.id}>
              <h2>Match {}</h2>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="match-content"
                >
                  <p>
                    {match.players[0].firstName} VS {match.players[1].firstName}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className="result-sets">
                    {match.sets.map((set: Set, index: number) => (
                      <li key={index}>
                        <p>Set {index + 1}</p>
                        {set.player1} - {set.player2}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultTable;
