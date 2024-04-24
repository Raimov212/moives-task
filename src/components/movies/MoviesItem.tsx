import { Card } from "antd";
import { useMovieStore } from "../../zustand";

const { Meta } = Card;

const MoviesItem = () => {
  const itemMovie = useMovieStore((state) => state.movie);

  console.log(itemMovie);

  if (!itemMovie) return;

  return (
    <div>
      <Card
        style={{ width: 320, height: 400 }}
        cover={
          <img
            alt="example"
            src={`https://image.tmdb.org/t/p/w500/${itemMovie?.backdrop_path}`}
          />
        }
      >
        <Meta
          title={itemMovie?.original_title}
          description={itemMovie?.overview.slice(0, 150)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <b>{itemMovie?.release_date}</b>
          <b style={{ color: "yellow" }}>{itemMovie?.popularity}</b>
        </div>
      </Card>
    </div>
  );
};

export default MoviesItem;
