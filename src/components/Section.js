import React, { useEffect, useState } from "react";
import Card from "./Card";
import { AiOutlineCaretRight } from "react-icons/ai";
export default function Section({ genre }) {
  const [movies, setMovies] = useState(null);
  const [pageState, setPageState] = useState(null);
  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    });

    const responseBody = await response.json();
    setMovies(responseBody.data.movie_by_genre.values);
    setPageState(responseBody.data.movie_by_genre.pageState);
    console.log(responseBody.data.movie_by_genre.pageState);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h4 id={genre}>{genre}</h4>
      {movies && (
        <div className="movie-section">
          {movies.map((movies, index) => (
            <Card key={index} movie={movies} />
          ))}
          <div
            className="more-section"
            onClick={() => {
              setPageState(pageState);
              fetchData();
            }}
          >
            <AiOutlineCaretRight />
          </div>
        </div>
      )}
    </div>
  );
}
