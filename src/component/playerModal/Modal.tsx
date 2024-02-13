import { Button } from "@mui/material";
import { PlayersProps } from "../../jasonData/type";
import "./style.css";

const Modal = ({
  player,
  onClose,
}: {
  onClose: () => void;
  player: PlayersProps | null;
}) => {
  console.log(player);

  return (
    <>
      <div className="player-modal">
        <h2>About player</h2>
        <div className="player-profile">
          <div className="player-image">
            <img src={player?.image} alt={player?.firstName} />
          </div>
          <div className="player-info">
            <p>Player ID: {player?.id}</p>
            <p>First Name: {player?.firstName}</p>
            <p>Last Name: {player?.lastName}</p>
          </div>
        </div>
        <Button onClick={() => onClose()}>Close</Button>
      </div>
    </>
  );
};

export default Modal;
