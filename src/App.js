import { useEffect, useState } from "react";
import Section from "./components/Section";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import { AiFillCaretDown } from "react-icons/ai";
function App() {
  const genreIncrement = 3;
  const [genres, setGenres] = useState(null);
  const [limit, setLimit] = useState(genreIncrement);
  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    });
    const responseBody = await response.json();
    setGenres(responseBody.data.reference_list.values);
  };
  useEffect(() => {
    fetchData();
  }, [limit]);

  console.log(genres);
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      {/* IF genres exist */}
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre, index) => (
            <Section key={index} genre={genre.Value} />
          ))}
        </div>
      )}
      <div
        className="end-section"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement);
        }}
      >
        Click Here To See More <AiFillCaretDown />
      </div>
    </div>
  );
}

export default App;
