import React, { useEffect, useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
export default function HeroSection() {
  const [movie, setMovies] = useState(null);
  const [pageState, setPageState] = useState(null);
  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", {
      method: "POST",
      body: JSON.stringify({ genre: "Comedies", pageState: pageState }),
    });

    const responseBody = await response.json();
    setMovies(
      responseBody.data.movie_by_genre.values[
        Math.floor(
          Math.random() * responseBody.data.movie_by_genre.values.length
        )
      ]
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {movie && (
        <div className="hero">
          <img className="hero-video" src={movie.thumnail} />
          <div className="info-section">
            <h2 className="hero-blurb">{movie.synosis}</h2>
            <div className="button-section">
              <button>
                <AiOutlineProfile />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
