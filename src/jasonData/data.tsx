import axios from "axios";
import { PlayersProps } from "./type";

const API_BASE_URL = "http://localhost:8000";

export const getPlayers = async () => {
  const response = await axios.get(`${API_BASE_URL}/players`);
  return response.data;
};

export const addPlayer = async (playerData: PlayersProps) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/players`, playerData);
    return response.data;
  } catch (error) {
    console.error("Error adding player: ", error);
  }
};

export const updateItem = async (id: number, playerData: PlayersProps) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/players/${id}`,
      playerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating player: ", error);
  }
};

export const deleteItem = async (playerId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting player: ", error);
  }
};
