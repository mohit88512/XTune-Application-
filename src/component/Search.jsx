import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // URL se query lo
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL // ← .env se lo

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API}search?query=${query}`,
          { withCredentials: true }
        );
        setSongs(res.data.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="search-page">
      <h1>Results for "{query}"</h1>

      {songs.length === 0 && <p>No songs found</p>}

      <div className="search-list">
        {songs.map((song, index) => (
          <div
            key={index}
            className="search-song"
            onClick={() => navigate(`/music/${song.title}`)}
          >
            <img src={song.poster} alt={song.title} />
            <p>{song.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;