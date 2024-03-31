import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Using date-fns for date formatting
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const About = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const fetchMovie = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=1423fd97`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Movie Details</h2>
      <div className="flex">
        <img src={movie.Poster} alt={movie.Title} className="w-1/4 h-auto mr-4" />

        <div className="flex flex-col items-start">
          <p className="text-xl text-red-600 font-bold mb-2">{movie.Title}</p>
          <p className="mb-2">
            <span className="font-bold">Released:</span> {(movie.Released)}
          </p>
          <p className="mb-2">
            <span className="font-bold">Genre:</span> {movie.Genre}
          </p>
          <p className="mb-2">
            <span className="font-bold">Director:</span> {movie.Director}
          </p>
          <p className="mb-2">
            <span className="font-bold">Writer:</span> {movie.Writer}
          </p>
          <p className="mb-2">
            <span className="font-bold">Actors:</span> {movie.Actors}
          </p>
          <p className="mb-2">
            <span className="font-bold text-left">Plot:</span> {movie.Plot}
          </p>
          <p className="mb-2">
            <span className="font-bold">Awards:</span> {movie.Awards}
          </p>
          <p className="mb-2">
            <span className="font-bold">Language:</span> {movie.Language}
          </p>
          <p className="mb-2">
            <span className="font-bold">Runtime:</span> {movie.Runtime}
          </p>
          <div>
            <span className="font-bold">IMDb Rating:</span> {movie.imdbRating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
