import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featchMatchs } from "../../jasonData/data";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Footer from "../../component/Footer/Footer";

const Standings = () => {
  const [matchs, setMatchs] = useState<any>([]);

  useEffect(() => {
    fetchMatchData();
  }, []);

  const fetchMatchData = async () => {
    const data = await featchMatchs();
    setMatchs(data);
  };

  return (
    <>
      <div className="container-result">
        <Link to="/" className="btn-back">
          Go Back
        </Link>
        {/*<div className="container--table">
        <h2>Standings Result</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Played</TableCell>
                <TableCell>Won</TableCell>
                <TableCell>Loss</TableCell>
                <TableCell>Point Won</TableCell>
                <TableCell>Point Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div> */}
        <h1>In progress</h1>
      </div>
      <Footer />
    </>
  );
};

export default Standings;
