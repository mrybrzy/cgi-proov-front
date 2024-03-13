import React, {useState, useEffect} from "react";
import axios from "axios";
import '../css/Home.css'
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";


export const Home = () => {
    const [data, setData] = useState([]);
    const [genre, setGenre] = useState([]);
    const [age, setAge] = useState("");
    const [startTime, setStartTime] = useState("");
    const [language, setLanguage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/public/home")
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get(`/public/rating`).then((result) => {
        });
        handleRecommendation();
    }, []);



    const handleRecommendation = () => {
        const username = localStorage.getItem("username");
        if (username) {
            fetch(`/recommendation/${username}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

        }
    }

    const searchForMovie = () => {
        let url = `/public/search`;

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
        if (genre.includes(selectedGenre)) {
            setGenre((prevGenre) => prevGenre.filter((g) => g !== selectedGenre));
        } else {
            setGenre((prevGenre) => [...prevGenre, selectedGenre]);
        }
    };

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.movieId}`);
    };

    return (
        <div className='explore'>
            <Header/>
            <form
                id="search-input"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >

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
                        <div onClick={() => handleMovieClick(movie)} className="movie-view-movie-card" key={index}>
                            <div className="container">
                                <img src={movie.image} alt={movie.movieName} className="explore_image"/>
                            </div>
                            <div className="movie-info">
                                <h2>{movie.movieName}</h2>
                                <div style={{marginLeft: 10}}>
                                    <p><span className="label">Genre:</span> {movie.genre}</p>
                                    <p><span className="label">Age Limit:</span> {movie.ageLimit}</p>
                                    <p><span className="label">Language:</span> {movie.language}</p>
                                    <p><span className="label">Start Time:</span> {movie.startTime}</p>
                                    <p><span className="label">Run Time:</span> {movie.runTime}</p>
                                    <p><span className="label">Price:</span> {movie.price}</p>
                                    <p style={{marginTop: 20}}><span className="label">Description</span></p>
                                    <p>{movie.description}</p>
                                    <h3 style={{marginTop: 20}}><span className="label">Recommendation:</span>{movie.recommendation}%</h3>
                                    <p><span className="label">IMDb rating:</span>{movie.rating}</p>
                                    {[...Array(10.0)].map((_, index) => (
                                        <span
                                            key={index}
                                            className="label"
                                            style={{
                                                cursor: 'pointer',
                                                color: index < movie.rating ? 'gold' : 'gray',
                                            }}
                                        >
                                                &#9733;
                                                </span>))}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
