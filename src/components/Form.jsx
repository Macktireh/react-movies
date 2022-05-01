import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("python");
  const [sortGoogBad, setSortGoogBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${
          search ? search : "python"
        }&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form action="">
          <input
            type="text"
            placeholder="Entrer le titre de film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoogBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoogBad("badToGood")}
          >
            Flop<span>➜</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData.length > 0 ? (
          moviesData
            .slice(0, 12)
            .sort((a, b) => {
              if (sortGoogBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sortGoogBad === "badToGood") {
                return a.vote_average - b.vote_average;
              }
            })
            .map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <h2>Aucun film trouver</h2>
        )}
      </div>
    </div>
  );
};

export default Form;
