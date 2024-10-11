import { Box, Button, Modal } from "@mui/material";
import "./style.css";
// import { deletePlayer } from "../../../jasonData/data";

const ModalDelete = ({
  onClose,
  playerId,
  fetchPlayers,
}: {
  onClose: () => void;
  playerId: string;
  fetchPlayers: () => void;
}) => {
  const deletePlayer = (id: string) => {
    try {
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers) {
        const players = JSON.parse(storedPlayers);
        const updatedPlayers = players.filter(
          (player: any) => player.id !== id
        ); // Filter out the player by ID
        localStorage.setItem("players", JSON.stringify(updatedPlayers)); // Update localStorage
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    await deletePlayer(id);
    fetchPlayers();
    onClose();
  };

  return (
    <Modal open>
      <Box className="modal-delete-player">
        <h2 className="modal-delete-player__title">
          Are you sure, you want to delete player?
        </h2>
        <div className="modal-delete-player__actions">
          <Button
            className="btn btn-delete"
            onClick={() => handleDeleteItem(playerId)}
          >
            Delete
          </Button>
          <Button className="btn btn-cancel" onClick={() => onClose()}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
