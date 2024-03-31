import React, { useState, useEffect, useRef } from "react";
import Movie from "../Components/Movie";

const Home = () => {
  const [searchmovie, setSearchMovie] = useState("");
  const [getMovies, setGetMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [error, seterror] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click is outside of the dropdown, so close it
      setShowDropdown(false);
    }
  };

  const fetchMovie = async (movieTitle) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movieTitle}&apikey=1423fd97`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setGetMovies(data);
      setIsLoading(true);
      setShowDropdown(false);
      seterror(false);
      searchHistory(movieTitle);
    } catch (error) {
      console.error("Error fetching data:", error.Response);
      setIsLoading(false);
      seterror(true);
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
    if (searchmovie.length == 0) {
      setShowDropdown(false);
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchMovie(e.target.value);
    if (e.target.value === "") {
      setShowDropdown(false); // Hide dropdown if input is empty
    } else {
      setShowDropdown(true); // Show dropdown if input is not empty
    }
  };

  const handleSearch = () => {
    fetchMovie(searchmovie);
    setSearchHistory((prevHistory) => {
      const newHistory = [searchmovie, ...prevHistory.slice(0, 2)]; // Keep the last 3 searches
      localStorage.setItem("searchHistory", JSON.stringify(newHistory)); // Save to localStorage
      return newHistory;
    });
  };

  const handleHistoryClick = (searchTerm) => {
    setSearchMovie(searchTerm); // Set search term from history
    fetchMovie(searchTerm); // Fetch data for selected history item
  };

  const handleDeleteHistory = (itemToDelete) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => item !== itemToDelete)
    );
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };
  return (
    <div>
      <div>
        <h3 className="text-2xl uppercase font-semibold">
          Search for a movie by title
        </h3>
        <div className="relative pt-6 flex align-middle items-center">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <form>
            <input
              onChange={handleInputChange}
              onClick={() => setShowDropdown((prevState) => !prevState)} // Toggle setShowDropdown
              value={searchmovie}
              type="text"
              id="Search"
              placeholder="Search for..."
              className="w-[85vw] h-16 px-5 rounded-md border border-gray-700 py-2.5 pe-10 shadow-sm sm:text-lg"
              autoComplete="off"
            />
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700"
              onClick={handleSearch}
            >
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center items-center top-[35%]">
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </button>
          </form>
          {/* Display search history dropdown */}
          {showDropdown && searchHistory.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-24 z-10 mt-1 h-fit w-full bg-white rounded-md border border-gray-300 shadow-lg"
            >
              <ul>
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span
                      onClick={() => handleHistoryClick(item)}
                      className="text-start capitalize"
                    >
                      {item}
                    </span>
                    <button
                      onClick={() => handleDeleteHistory(item)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center ">
        {getMovies && <Movie passeddata={getMovies} />}
      </div>
      <div className="flex w-full items-center justify-center ">
        {isLoading && <p>Search Movie</p>}
      </div>
    </div>
  );
};

export default Home;
