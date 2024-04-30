import { Link, useParams } from "react-router-dom";
import { selectedPlayer } from "../../jasonData/data";
import { useEffect, useState } from "react";
import { Player } from "../../jasonData/type";
import "./style.css";

const Profile = () => {
  const params = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await selectedPlayer(params.playerId as string);
        setPlayer(data);
      } catch (error) {
        console.error("Error fetching player data: ", error);
      }
    };

    fetchData();
  }, [params.playerId]);

  if (!player) {
    return <div>Loading...</div>;
  }
  return (
    <div className="player__info">
      <Link to="/" className="btn-goBack">
        Go Back
      </Link>
      <h3 style={{ color: "blue", fontSize: "16px", fontWeight: "bold" }}>
        Player profile
      </h3>
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
    </div>
  );
};

export default Profile;
