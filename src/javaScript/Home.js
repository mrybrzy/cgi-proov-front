import React, {useState, useEffect} from "react";
import axios from "axios";
import '../css/Home.css'
import {useNavigate} from "react-router-dom";


export const Home = () => {
    const [data, setData] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [genre, setGenre] = useState([]);
    const [age, setAge] = useState("");
    const [startTime, setStartTime] = useState("");
    const [language, setLanguage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/home")
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const searchForMovie = () => {
        let url = `/search`;

        if (Array.isArray(genre) && genre.length > 0) {
            url += `/genre/${genre.join(',')}`;
        }
        if (typeof age === 'string' && age.trim() !== "") {
            url += `/age/${age.trim()}`;
        }
        if (typeof startTime === 'string' && startTime.trim() !== "") {
            url += `/time/${startTime.trim()}`;
        }
        if (typeof language === 'string' && language.trim() !== "") {
            url += `/language/${language.trim()}`;
        }
        console.log(url)

        axios.get(url)
            .then((result) => {
                if (Array.isArray(result.data) && result.data.length > 0) {
                    setData(result.data);
                } else {
                    setData([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGenreChange = (selectedGenre) => {
        // Check if the genre is already selected
        if (genre.includes(selectedGenre)) {
            // If selected, remove it from the array
            setGenre((prevGenre) => prevGenre.filter((g) => g !== selectedGenre));
        } else {
            // If not selected, add it to the array
            setGenre((prevGenre) => [...prevGenre, selectedGenre]);
        }
    };

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.movieId}`);
    };

    return (
        <div className='explore'>
            <form
                id="search-input"
                onSubmit={(e) => {
                    e.preventDefault();
                    // searchForMovie();
                }}
            >
                {/*<input*/}
                {/*    type="text"*/}
                {/*    id="movie-input"*/}
                {/*    className="search-input"*/}
                {/*    placeholder="Search"*/}
                {/*    value={movieName}*/}
                {/*    onChange={(e) => setMovieName(e.target.value)}*/}
                {/*/>*/}
                <select
                    id="age-select"
                    className="search-select"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                >
                    <option value="">Select Age</option>
                    <option value="12">Child</option>
                    <option value="15">Teen</option>
                    <option value="18">Adult</option>
                </select>


                <select
                    id="language-select"
                    className="search-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select Language</option>
                    <option value="est">Est</option>
                    <option value="eng">Eng</option>

                </select>
                <select
                    id="start-time-select"
                    className="search-select"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                >
                    <option value="">Start Time</option>
                    <option value="9">Morning</option>
                    <option value="12">Afternoon</option>
                    <option value="18">Evening</option>
                </select>
                <button className="search-button" onClick={searchForMovie}>
                    Search
                </button>
                {/* Replace the existing genre select with the following */}
                <div className="dropdown-container">

                    <div id="genre-dropdown" className="dropdown-content">
                        {['action', 'comedy', 'drama', "thriller", "romance", "fantasy", "adventure"].map((g) => (
                            <label key={g}>

                                <input
                                    type="checkbox"
                                    value={g}
                                    checked={genre.includes(g)}
                                    onChange={() => handleGenreChange(g)}
                                />
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

            </form>
            <div className="movies">
                <div className="movies_container">
                    {data.map((movie, index) => (
                        <div key={index} className="container">
                            <div className="explore_movie">
                                <img src={movie.image} alt={movie.movieName} onClick={() => handleMovieClick(movie)} className="explore_image"/>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
