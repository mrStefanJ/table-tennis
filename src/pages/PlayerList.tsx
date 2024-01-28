import React, { useState, useEffect } from "react";
import {
  getPlayers,
  addPlayer,
  updateItem,
  deleteItem,
} from "../jasonData/data";
import { PlayersProps } from "../jasonData/type";
import "./style.css";

const PlayerList = () => {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [newPlayer, setNewPlayer] = useState<PlayersProps>({
    id: Date.now(),
    firstName: "",
    lastName: "",
    image: "",
    title: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const data = await getPlayers();
    setLoading(false);
    setPlayers(data);
  };

  const handleAddPlayer = async () => {
    try {
      if (!newPlayer.firstName.trim() || !newPlayer.lastName.trim()) {
        setError("First name and last name must not be empty!!!");
        return;
      }
      setError("");

      await addPlayer(newPlayer);
      setNewPlayer({
        id: Date.now(),
        firstName: "",
        lastName: "",
        image: "",
        title: "",
      });
      fetchPlayers();
    } catch (error) {
      console.error("Error adding new player: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlayer((prevPlayer) => ({
          ...prevPlayer,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleUpdateItem = async (id: number, newName: string) => {
  //   await updateItem(id, newName);
  //   fetchItems();
  // };

  // const handleDeleteItem = (id: number) => {
  //   deleteItem(id);
  //   fetchItems();
  // };

  return (
    <div>
      <h2>Players</h2>
      <div className="players">
        {loading ? (
          "Loading..."
        ) : (
          <>
            <ul className="player-list">
              {players.map((item) => (
                <li key={item.id}>
                  <p>
                    {item.firstName} {item.lastName}
                  </p>
                  <img
                    src={item.image}
                    alt={`Player image ${item.firstName}`}
                    className="player-image"
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        <form>
          <div className="player-field">
            <input
              type="text"
              name="firstName"
              value={newPlayer.firstName}
              onChange={handleChange}
              placeholder="Enter player first name"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="player-field">
            <input
              type="text"
              name="lastName"
              value={newPlayer.lastName}
              onChange={handleChange}
              placeholder="Enter player last name"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Upload player image"
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              value={newPlayer.title}
              onChange={handleChange}
              placeholder="Enter player title"
            />
          </div>
          <button type="button" onClick={handleAddPlayer}>
            Add Player
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerList;
