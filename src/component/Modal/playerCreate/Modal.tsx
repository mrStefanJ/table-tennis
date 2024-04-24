import { Box, Button, Modal, TextField } from "@mui/material";
import { Player } from "../../../jasonData/type";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addPlayer } from "../../../jasonData/data";
import DefaultImage from "../../../assets/player-image.png";
import "./style.css";
import styled from "@emotion/styled";

// Custom styled button
const CustomButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#fdd55f",
  border: "1px solid #fdd55f",
  padding: "10px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#fdd55f",
    borderColor: "#fdd55f",
    color: "#fff",
  },
});

const ModalCreate = ({
  fetchPlayers,
  closeCreaterModal,
}: {
  fetchPlayers: () => void;
  closeCreaterModal: () => void;
}) => {
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    image: "",
    title: "",
  });
  const [firstNameError, setfirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleAddPlayer = async () => {
    debugger;
    try {
      if (!newPlayer.firstName.trim() || !newPlayer.lastName.trim()) {
        setfirstNameError("First name and must not be empty!!!");
        setLastNameError("Last name and must not be empty!!!");
        return;
      }

      const playerWithDefaultImage = {
        ...newPlayer,
        image: newPlayer.image ? newPlayer.image : DefaultImage,
      };

      await addPlayer(playerWithDefaultImage);
      setNewPlayer({
        id: Date.now(),
        firstName: "",
        lastName: "",
        image: "",
        title: "",
      });
      fetchPlayers();
      closeCreaterModal();
    } catch (error) {
      console.error("Error adding new player: ", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image")) {
        setImageError("Please upload an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlayer((prevPlayer) => ({
          ...prevPlayer,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setImageError("");
    }
  };

  return (
    <Modal open>
      <Box component="form" className="players-form">
        <Box className="input-fields">
          <div className="fields">
            <div className="player-field">
              <TextField
                id="player-firsname"
                name="firstName"
                label="First Name"
                variant="standard"
                value={newPlayer.firstName}
                onChange={handleChange}
              />

              {firstNameError && (
                <p style={{ color: "#ff0000" }}>{firstNameError}</p>
              )}
            </div>
            <div className="player-field">
              <TextField
                id="player-lastname"
                name="lastName"
                label="Last Name"
                variant="standard"
                value={newPlayer.lastName}
                onChange={handleChange}
              />
              {lastNameError && (
                <p style={{ color: "#ff0000" }}>{lastNameError}</p>
              )}
            </div>
            <div className="player-field">
              <TextField
                id="player-title"
                name="title"
                label="Player Title"
                variant="standard"
                value={newPlayer.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="image">
            {newPlayer.image && (
              <div className="player-field">
                <img
                  src={newPlayer.image}
                  alt="Uploaded Player"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
            {!newPlayer.image && (
              <img
                src={DefaultImage}
                alt="Uploaded Player"
                style={{ maxWidth: "200px" }}
              />
            )}
            <div className="player-field">
              <input
                className="image-field"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Upload player image"
              />
              {imageError && <p style={{ color: "#ff0000" }}>{imageError}</p>}
            </div>
          </div>
        </Box>
        <div className="button-action">
          <CustomButton
            type="button"
            className="custom-button"
            variant="outlined"
            onClick={handleAddPlayer}
          >
            Add Player
          </CustomButton>
          <CustomButton
            type="button"
            className="custom-button"
            variant="outlined"
            onClick={closeCreaterModal}
          >
            Close
          </CustomButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreate;
