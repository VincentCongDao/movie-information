import React, { useState } from "react";

export default function Card({ movie }) {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className="card"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {!isShow && <img src={movie.thumnail} alt="movies" />}
      {isShow && (
        <>
          <img src={movie.thumnail} alt="movies" />
          <div className="info-box">
            <p>{movie.title}</p>
          </div>
        </>
      )}
    </div>
  );
}
