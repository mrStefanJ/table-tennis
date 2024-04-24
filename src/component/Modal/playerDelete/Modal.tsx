import { Box, Button, Modal } from "@mui/material";
import "./style.css";
import { deletePlayer, getPlayers } from "../../../jasonData/data";

const ModalDelete = ({
  onClose,
  playerId,
  fetchPlayers,
}: {
  onClose: () => void;
  playerId: string;
  fetchPlayers: () => void;
}) => {
  const handleDeleteItem = async (id: string) => {
    await deletePlayer(id);
    fetchPlayers();
    onClose();
  };
  return (
    <Modal open>
      <Box className="player-modal">
        <h2>Are you sure, you want to delete player</h2>
        <div className="btn__action">
          <Button
            className="btn-delete"
            onClick={() => handleDeleteItem(playerId)}
          >
            Delete
          </Button>
          <Button className="btn-cancel" onClick={() => onClose()}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
