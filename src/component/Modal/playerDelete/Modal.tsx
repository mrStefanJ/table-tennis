import { Button } from "@mui/material";
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
    <>
      <div className="player-modal">
        <h2>Are you sure, you want to delete player</h2>
        <div className="actine-delete-player">
          <Button onClick={() => handleDeleteItem(playerId)}>Delete</Button>
          <Button onClick={() => onClose()}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
