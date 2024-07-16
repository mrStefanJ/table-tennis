import { useState, useEffect, useRef } from "react";
import { getPlayers } from "../../jasonData/data";
import { Player } from "../../jasonData/type";
import "./style.css";
import {
  Box,
  Button,
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
import { ModalCreate } from "../Modal/playerCreate";
import { ModalDelete } from "../Modal/playerDelete";
import { Link } from "react-router-dom";

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      fetchPlayers();
    }
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  const openCreaterModal = () => setOpenModal(true);
  const closeCreaterModal = () => setOpenModal(false);

  const openDeleteModal = () => setOpenModalDelete(true);
  const closeDeleteModal = () => setOpenModalDelete(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container">
      <div className="players-list">
        <div className="players-list__header">
          <h2 className="players-list__title">Players</h2>
          <div className="players-list__actions">
            <Box className="players-list__btn">
              <Button onClick={openCreaterModal} className="add">
                Add New Player
              </Button>
            </Box>
            {openModal && (
              <ModalCreate
                fetchPlayers={fetchPlayers}
                closeCreaterModal={closeCreaterModal}
              />
            )}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className="table-player">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.length === 0 ? (
                <TableCell colSpan={5} className="result-table__cell">
                  The data of players are empty
                </TableCell>
              ) : (
                (rowsPerPage > 0
                  ? players.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : players
                ).map((player: any) => (
                  <TableRow key={player.id}>
                    <TableCell component="th" scope="row">
                      {player.firstName}
                    </TableCell>
                    <TableCell align="left">{player.lastName}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={openDeleteModal}
                        className="players-list__btn delete"
                      >
                        Delete
                      </Button>
                      {openModalDelete && (
                        <ModalDelete
                          onClose={closeDeleteModal}
                          playerId={player.id as string}
                          fetchPlayers={fetchPlayers}
                        />
                      )}
                      <Link
                        key={player.id}
                        to={`/profile/${player.id}`}
                        className="players-list__btn profile"
                      >
                        Profile
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={players.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PlayerList;
