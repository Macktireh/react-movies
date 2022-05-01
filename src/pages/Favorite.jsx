import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Navigation from "../components/Navigation";

const Favorite = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="favorites-page">
      <Navigation />
      <h2>
        Favorites <span>💖</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movies) => <Card key={movies.id} movie={movies} />)
        ) : (
          <h2>Pas de film favorite</h2>
        )}
      </div>
    </div>
  );
};

export default Favorite;
