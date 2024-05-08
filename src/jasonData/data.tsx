import axios from "axios";
import { Game, Player } from "./type";

const API_BASE_URL = "http://localhost:8000";

// fetch all players
export const getPlayers = async () => {
  const response = await axios.get(`${API_BASE_URL}/players`);
  return response.data;
};
// create player
export const addPlayer = async (playerData: Player) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/players`, playerData);
    return response.data;
  } catch (error) {
    console.error("Error adding player: ", error);
  }
};
// selected player
export const selectedPlayer = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/players/${id}`);
    return res.data;
  } catch (error) {
    console.error("Can not fetch player by id!!!");
  }
};
// edit player
export const editPlayer = async (id: string, playerData: Player) => {
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
// delete player
export const deletePlayer = async (playerId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting player: ", error);
  }
};
// save match
export const saveMatch = async (gameMatch: Game) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/game/`, gameMatch);
    return response;
  } catch (error) {
    console.error("Error in saving match: ", error);
  }
};
// fetch all matches
export const featchMatchs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/game`);
    return response;
  } catch (error) {
    console.error("Error in fetching matchs: ", error);
  }
};
//fetch matche by ID
export const featchMatchByID = async (id: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/game/${id}`);
    return res.data;
  } catch (error) {
    console.error("Can not fetch match!!");
  }
};
