import { useState, useEffect, useRef } from "react";
import { getPlayers } from "../jasonData/data";
import { Player } from "../jasonData/type";
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
import { ModalCreate } from "../component/Modal/playerCreate";
import { ModalDelete } from "../component/Modal/playerDelete";
import { Link } from "react-router-dom";

const PlayerList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      fetchPlayers();
    }
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setLoading(false);
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
        <div className="header">
          <h2>Players</h2>
          <div className="btn__player-add">
            <Box className="btn__add-player">
              <Button onClick={openCreaterModal}>Add New Player</Button>
            </Box>
            {openModal && (
              <ModalCreate
                fetchPlayers={fetchPlayers}
                closeCreaterModal={closeCreaterModal}
              />
            )}
          </div>
        </div>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? players.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : players
                  ).map((player) => (
                    <TableRow key={player.id}>
                      <TableCell component="th" scope="row">
                        {player.firstName}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {player.lastName}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          onClick={openDeleteModal}
                          className="btn delete"
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
                          to={`profile/${player.id}`}
                          className="btn profile"
                        >
                          Profile
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
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
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
