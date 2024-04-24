import { api } from "../../api";

export const getPopularMovies = (id: number) => {
  return api.get(`/movie/popular?language=en-US&page=${id}`);
};

export const getSearchMovie = (query: string) => {
  return api.get(`/search/movie?query=${query}`);
};
