import React, {useState, useEffect} from 'react';
import axios from "axios";
import '../css/ConfirmBooking.css';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";

export const ConfirmBooking = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({});


    const client = localStorage.getItem("username");
    const movieId = localStorage.getItem("movieId");
    const seatId = localStorage.getItem("seats");
    const price = localStorage.getItem("price");

    const getMovieById = async () => {
        try {
            const response = await axios.get(`/public/movie/${movieId}`);
            setMovieData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleBookingSave = async () => {
        await axios.post('/book', {
            "client": client,
            "movieId": movieId,
            "seatsId": seatId,
            "price": price,

        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
                console.log('Booking successful');
                navigate("/profile");
            }
        ).catch(() => {
            console.error('Booking failed');
        })
    };

    const handleCancel = () => {
        navigate(`/movie/${movieId}`);
    };

    useEffect(() => {
        getMovieById();
    }, [movieId]);

    return (
        <div>
            <Header/>
            <div style={{marginBottom: 265}}>
                <div className="title">
                    <h2 style={{fontSize: 25, paddingLeft: 30}}>Please check details before confirming:</h2>
                </div>

                <div className="movie-view-container">
                    <div className="movie-view-image-seats">
                        <img src={movieData.image} alt={movieData.movie_name}/>
                    </div>
                    <div className="movie-info" style={{marginLeft: 10}}>
                        <p><span className="label">Genre:</span> {movieData.genre}</p>
                        <p><span className="label">Age Limit:</span> {movieData.ageLimit}</p>
                        <p><span className="label">Language:</span> {movieData.language}</p>
                        <p><span className="label">Start Time:</span> {movieData.startTime}</p>
                        <p><span className="label">Run Time:</span> {movieData.runTime}</p>
                        <p><span className="label">Price:</span> {price}</p>
                        <p><span className="label">Seats:</span> {seatId}</p>
                        <p style={{marginTop: 40}}><span className="label">Description</span></p>
                        <p>{movieData.description}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="confirm-book-button" onClick={handleBookingSave}>Confirm tickets</button>
                    <button className="confirm-book-button" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
