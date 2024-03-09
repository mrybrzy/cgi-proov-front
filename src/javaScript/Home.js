import React, {useState, useEffect} from "react";
import axios from "axios";
import '../css/Home.css'

import {useNavigate} from "react-router-dom"; // Import the Header component

export const Home = () => {
    const [data, setData] = useState([]);
    const [countryName, setCountryName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("home")
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const searchForMovie = () => {
        axios.get(``)
            .then((result) => {
                if (Array.isArray(result.data) && result.data.length > 0) {
                    setData(result.data);
                } else {
                    setData([]); // If no match is found, set data to an empty array
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie.id}`); // Redirect to the country's page
    }

    return (
        <div className='explore'>
            {/*<form*/}
            {/*    id="search-input"*/}
            {/*    onSubmit={(e) => {*/}
            {/*        e.preventDefault();*/}
            {/*        searchForMovie(); // Call the search function when the form is submitted*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        id="country-input"*/}
            {/*        className="search-input"*/}
            {/*        placeholder="Search for a country..."*/}
            {/*        value={countryName}*/}
            {/*        onChange={(e) => setCountryName(e.target.value)} // Update 'country' state on input change*/}
            {/*    />*/}
            {/*    <button className="search-button" onClick={searchForCountry}>*/}
            {/*        Search*/}
            {/*    </button>*/}
            {/*</form>*/}
            <div className="movies">
                <div className="movies_container">
                    {data.map((movie, index) => (
                        <div key={index} className="container">
                            <div className="explore_movie">
                                <img src={movie.image} alt={movie.movieName} className="explore_image"/>
                                <button className="explore_movie" onClick={() => handleMovieClick(movie)}>
                                    <div className="country_text">{movie.movieName}</div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};