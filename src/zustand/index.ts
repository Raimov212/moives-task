import { create } from "zustand";
import { MovieTypes } from "../types";

interface MovieStore {
  movie: MovieTypes | null;
  handlePopularMovie: (item: MovieTypes) => void;
  removePopularMovie: () => void;
}

export const useMovieStore = create<MovieStore>()((set) => ({
  movie: null,
  handlePopularMovie: (item) => set(() => ({ movie: item })),
  removePopularMovie: () => set(() => ({ movie: null })),
}));
