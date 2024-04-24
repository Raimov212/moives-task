import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "3eb27c422f4c129de09dcc2a96fc710b",
  },
});
