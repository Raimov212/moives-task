import { Button, Card, Col, Drawer, Input, Row, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularMovies,
  getSearchMovie,
} from "../hooks/apiRequest/GET_MOVIES";
import { useState } from "react";
import type { SearchProps } from "antd/es/input/Search";
import { useMovieStore } from "../zustand";
import MoviesItem from "../components/movies/MoviesItem";
import { MovieTypes } from "../types";

const { Meta } = Card;
const { Search } = Input;

const Movies = () => {
  const [id, setId] = useState(2);
  const [search, setSearch] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const movieStore = useMovieStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular_movies", id],
    queryFn: async () => {
      const res = await getPopularMovies(id);
      return res.data;
    },
  });

  const searchMovie = useQuery({
    queryKey: ["popular_movies_search", search],
    queryFn: async () => {
      const res = await getSearchMovie(search);
      return res.data;
    },
  });

  if (isLoading || searchMovie.isLoading)
    return (
      <Row gutter={[0, 40]} style={{ padding: "40px" }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} className="gutter-row" span={6}>
            <Card style={{ width: 300, height: 250 }}>
              <Skeleton loading={isLoading} active>
                <Meta title="" description="" />
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
    );

  if (isError) return <div>Error</div>;

  const onSearch: SearchProps["onSearch"] = (value) => setSearch(value);

  return (
    <div style={{ padding: "40px", width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
        }}
      >
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => setId((prev) => prev - 1)}>prev</Button>
          <Button onClick={() => setId((prev) => prev + 1)}>next</Button>
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        onClose={() => {
          setOpenDrawer(false), movieStore.removePopularMovie();
        }}
        open={openDrawer}
      >
        <MoviesItem />
      </Drawer>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 },
          { xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 },
        ]}
      >
        {(search === "" ? data : searchMovie?.data)?.results?.map(
          (movie: MovieTypes) => (
            <Col className="gutter-row" md={8} xl={6} span={24} key={movie.id}>
              <Card
                style={{ width: "100%", height: 350, cursor: "pointer" }}
                onClick={() => {
                  setOpenDrawer(true), movieStore.handlePopularMovie(movie);
                }}
                cover={
                  <img
                    alt="example"
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  />
                }
              >
                <Skeleton loading={isLoading} avatar active>
                  <Meta
                    title={movie.original_title}
                    description={movie.overview.slice(0, 150)}
                  />
                </Skeleton>
              </Card>
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export default Movies;
