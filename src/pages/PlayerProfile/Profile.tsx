import { Link, useParams } from "react-router-dom";
import { selectedPlayer } from "../../jasonData/data";
import { useEffect, useState } from "react";
import { Player } from "../../jasonData/type";
import "./style.css";
import { Box, Button } from "@mui/material";
import { ModalEdit } from "../../component/Modal/playerEdit";
import { Footer } from "../../component/Footer";

const Profile = () => {
  const params = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await selectedPlayer(params.playerId as string);
      setPlayer(data);
    } catch (error) {
      console.error("Error fetching player data: ", error);
    }
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    fetchData();
  };

  if (!player) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="player__info">
        <Link to="/" className="player-info__btn-back">
          Back
        </Link>
        <h2 className="player-info__title">Player profile</h2>
        <Box className="player-info__profile">
          <div className="player-info__image">
            <img src={player?.image} alt={player?.firstName} />
          </div>
          <div className="player-info__details">
            <p className="player-info__detail">
              First Name: {player?.firstName}
            </p>
            <p className="player-info__detail">Last Name: {player?.lastName}</p>
            <p className="player-info__detail">Title: {player?.title}</p>
          </div>
        </Box>
        <Box className="player-info__btn">
          <Button className="player-info__btn-edit" onClick={handleOpen}>
            Edit Profile
          </Button>
        </Box>
        {openModal && <ModalEdit handleClose={handleClose} player={player} />}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
