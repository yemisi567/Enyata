import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

// Endpoint to get films
export async function getFilms() {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get("/films");
  return response.data;
}

// Endpoint to get starships
export async function getStarShips() {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get("/starships");
  return response.data;
}

// Endpoint to get people
export async function getPeople() {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get("/people");
  return response.data;
}

// Endpoint to get species
export async function getSpecies() {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get("/species");
  return response.data;
}

// Endpoint to get specific people
export async function getSpecificPeople(id: string) {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get(`/people/${id}`);
  return response.data;
}
// Endpoint to get specific film
export async function getSpecificFilm(id: string) {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get(`/films/${id}`);
  return response.data;
}

// Endpoint to get specific specie
export async function getSpecificSpecie(id: string) {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get(`/species/${id}`);
  return response.data;
}
// Endpoint to get specific starship
export async function getSpecificStarShip(id: string) {
  // Simulate a delay of 2 seconds before fetching the data this is for aesthetics the data loads too quickly
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axiosInstance.get(`/starships/${id}`);
  return response.data;
}
