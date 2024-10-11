import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { Player } from "../../../jasonData/type";
import styled from "@emotion/styled";
import "./style.css";

// Custom styled button
const CustomButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#fdd55f",
  border: "1px solid #fdd55f",
  padding: "10px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#fdd55f",
    borderColor: "#fdd55f",
    color: "#fff",
  },
});

const ModalEdit = ({
  handleClose,
  player,
}: {
  handleClose: () => void;
  player: Player;
}) => {
  const [editedPlayer, setEditedPlayer] = useState<Player>({
    ...player,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPlayer((prevPlayer) => ({
          ...prevPlayer,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    try {
      // Retrieve the existing players from localStorage
      const storedPlayers = localStorage.getItem("players");
      if (storedPlayers) {
        // Parse the players array
        const players: Player[] = JSON.parse(storedPlayers);

        // Find the player to update
        const updatedPlayers = players.map((p) =>
          p.id === player.id ? { ...p, ...editedPlayer } : p
        );

        // Save the updated players list back to localStorage
        localStorage.setItem("players", JSON.stringify(updatedPlayers));

        // Close the modal after updating
        handleClose();
      } else {
        console.error("No players found in localStorage.");
      }
    } catch (error) {
      console.error("Error editing player: ", error);
    }
  };

  return (
    <Modal open>
      <Box component="form" className="modal-edit__form">
        <Box className="modal-edit__input-fields">
          <div className="modal-edit__fields">
            <div className="modal-edit__field">
              <TextField
                id="player-firstname"
                name="firstName"
                label="First Name"
                variant="standard"
                value={editedPlayer.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="modal-edit__field">
              <TextField
                id="player-lastname"
                name="lastName"
                label="Last Name"
                variant="standard"
                value={editedPlayer.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="modal-edit__field">
              <TextField
                id="player-title"
                name="title"
                label="Player Title"
                variant="standard"
                value={editedPlayer.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="image">
            {editedPlayer.image && (
              <div className="modal-edit__field">
                <img
                  src={editedPlayer.image}
                  alt="Uploaded Player"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
            {!editedPlayer.image && (
              <img
                src={editedPlayer.image}
                alt="Uploaded Player"
                style={{ maxWidth: "200px" }}
              />
            )}
            <div className="modal-edit__field">
              <input
                className="modal-edit__uploaded-image"
                type="file"
                accept="image/*"
                placeholder="Upload player image"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </Box>
        <Box className="modal-edit__btn">
          <CustomButton onClick={handleEdit} className="modal-edit__btn-edit">
            Edit Profile
          </CustomButton>
          <CustomButton
            onClick={handleClose}
            className="modal-edit__btn-cancel"
          >
            Close
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
