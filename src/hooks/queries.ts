import { useQuery } from "@tanstack/react-query";
import {
  getFilms,
  getPeople,
  getSpecies,
  getSpecificFilm,
  getSpecificPeople,
  getSpecificSpecie,
  getSpecificStarShip,
  getStarShips,
} from "../services";

// hook to get all films
export function useGetFilms() {
  return useQuery({ queryKey: ["films"], queryFn: () => getFilms() });
}

// hook to get all starships
export function useGetStarShips() {
  return useQuery({ queryKey: ["starships"], queryFn: () => getStarShips() });
}

// hook to get all people
export function useGetPeople() {
  return useQuery({ queryKey: ["people"], queryFn: () => getPeople() });
}

// hook to get all species
export function useGetSpecies() {
  return useQuery({ queryKey: ["species"], queryFn: () => getSpecies() });
}

// hook to get specific people
export function useGetSpecificPeople(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["single_people", id],
    queryFn: () => getSpecificPeople(id),
    enabled: enabled,
  });
}

// hook to get specific specie
export function useGetSpecificSpecie(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["single_specie", id],
    queryFn: () => getSpecificSpecie(id),
    enabled: enabled,
  });
}

// hook to get specific film
export function useGetSpecificFilm(id: string, enabled: boolean ) {
  return useQuery({
    queryKey: ["single_film", id],
    queryFn: () => getSpecificFilm(id),
    enabled: enabled,
  });
}

// hook to get specific specie
export function useGetSpecificStarship(id: string, enabled: boolean) {
  return useQuery({
    queryKey: ["single_starship", id],
    queryFn: () => getSpecificStarShip(id),
    enabled: enabled,
  });
}
