import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [bookings, setBookings] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});


    useEffect(() => {
        const username = localStorage.getItem("username");

        // Fetch user data
        fetch(`/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error('Error fetching user data:', error));
        console.log(userData)

        // Fetch bookings data
        fetch(`/bookings/${username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error('Error fetching bookings data:', error));
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            const moviePromises = bookings.map((booking) =>
                fetch(`/public/movie/${booking.movieId}`).then((response) => response.json())
            );

            const movieData = await Promise.all(moviePromises);

            const movieDetailsObj = movieData.reduce((acc, data, index) => {
                acc[bookings[index].movieId] = data;
                return acc;
            }, {});
            

            setMovieDetails(movieDetailsObj);
        };

        if (bookings.length > 0) {
            fetchDetails();
        }
    }, [bookings]);

    const handleLogout = () => {
        localStorage.clear();
        console.log('Logout clicked');
        navigate('/home');
    };

    return (
        <div>
            <Header />
            <div className="profile">
                <button className="logout-btn" onClick={handleLogout}>
                    LOGOUT
                </button>
                <div className="profile-info">
                    <h2>Welcome, {userData.name}!</h2>
                    <p>Email: {userData.username}</p>
                    <img src={"https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg"} alt="Profile" />
                </div>
                <div className="booking-container">
                    <h3 style={{marginLeft: 75}}>Your Bookings</h3>
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <div className="movie-view-container">
                                <div className="movie-view-image-seats">
                                    <img src={movieDetails[booking.movieId]?.image} alt={movieDetails[booking.movieId]?.movie_name}/>
                                </div>
                                <div className="movie-info" style={{marginLeft: 10}}>
                                    <p><span className="label">Genre:</span> {movieDetails[booking.movieId]?.genre}</p>
                                    <p><span className="label">Age Limit:</span> {movieDetails[booking.movieId]?.ageLimit}</p>
                                    <p><span className="label">Language:</span> {movieDetails[booking.movieId]?.language}</p>
                                    <p><span className="label">Start Time:</span> {movieDetails[booking.movieId]?.startTime}</p>
                                    <p><span className="label">Run Time:</span> {movieDetails[booking.movieId]?.runTime}</p>
                                    <p><span className="label">Price:</span> {booking.price}</p>
                                    <p><span className="label">Seats:</span> {booking.seatsId}</p>
                                    <p style={{marginTop: 40}}><span className="label">Description</span></p>
                                    <p>{movieDetails[booking.movieId]?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

