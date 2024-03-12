import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router";
import '../css/Seats.css';
import {Header} from "./Header";

export const SeatsInMovie = () => {
    const [seatsData, setSeatsData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const {movieId} = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatQuantity, setSeatQuantity] = useState(1); // Default quantity is 1
    const navigate = useNavigate();
    let [seatPrice, setSeatPrice] = useState(7)

    useEffect(() => {
        axios.get(`/public/movie/${movieId}`).then((result) => {
            setMovieData(result.data);
        });

        axios.get(`/public/movie/id/${movieId}`).then((result) => {
            setSeatsData(result.data);
        });

    }, [movieId]);


    const seatsPerRow = 10;

    const rows = Array.from({length: seatsData.length / seatsPerRow}, (_, rowIndex) =>
        seatsData.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
    );
    const availableSeatsQuantity = seatsData.filter(seat => !seat.isBooked).length;

    const handleSeatClick = (seat) => {
        if (!seat.isBooked) {
            const isSeatClicked = selectedSeats.includes(seat.seatNumber);

            if (isSeatClicked) {
                // If seat is already clicked, unselect it
                const updatedSelectedSeats = selectedSeats.filter(clickedSeat => clickedSeat !== seat.seatNumber);
                setSelectedSeats(updatedSelectedSeats);
            } else if (selectedSeats.length < seatQuantity) {
                // If seat is not clicked and the selected seats are less than the specified quantity, select it
                const updatedSelectedSeats = [...selectedSeats, seat.seatNumber];
                setSelectedSeats(updatedSelectedSeats);
            }
        }
    };

    const handleBuyClick = (movie) => {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            console.log(selectedSeats)
            localStorage.setItem("movieId", movieId);
            localStorage.setItem("seats", selectedSeats);
            localStorage.setItem("price", seatPrice);
            navigate(`/confirm`);
        } else {
            navigate('/login');
        }
    }
    const handleSeatQuantityChange = (newValue) => {
        // Ensure that the new value is within the range [1, availableSeatsQuantity]
        const newQuantity = Math.max(1, Math.min(availableSeatsQuantity, newValue));
        setSeatQuantity(newQuantity);
    };

    const handleSelectSeats = () => {
        console.log(selectedSeats)

        // Send selected seats data to the backend
        axios.get(`/public/movie/${movieId}/${seatQuantity}`, {seatQuantity, movieId})
            .then(response => {
                // Handle the response from the backend
                console.log(response.data);
                setSelectedSeats(response.data)
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
        handlePriceChange()


    };

    const handlePriceChange = () => {
        axios.get(`/public/price/${seatQuantity}`).then((result) => {
            setSeatPrice(result.data);
        });
    }


    return (
        <div className="explore">
            <Header/>
            <div className="movie-view-container">
                {movieData && (
                    <div className="movie-view-image-seats">
                        <img src={movieData.image} alt={movieData.movie_name}/>
                    </div>
                )}
                <div className="movie-info">
                    {movieData && (
                        <>
                            <h1 style={{marginBottom: 50}}>{movieData.movieName}</h1>
                            <p><span className="label">Genre:</span> {movieData.genre}</p>
                            <p><span className="label">Age Limit:</span> {movieData.ageLimit}</p>
                            <p><span className="label">Language:</span> {movieData.language}</p>
                            <p><span className="label">Start Time:</span> {movieData.startTime}</p>
                            <p><span className="label">Run Time:</span> {movieData.runTime}</p>
                            <p><span className="label">Price:</span> {seatPrice}</p>
                            <p style={{marginTop: 80}}><span className="label">Description</span></p>
                            <p>{movieData.description}</p>
                        </>
                    )}
                </div>
            </div>

            <div className="seats-input-container">
                <div className="seats-container">
                    {rows.map((row, rowIndex) => (
                        <div className="movies" key={rowIndex} style={{display: "flex"}}>
                            {row.map((seat, index) => (
                                <button
                                    key={index}
                                    className={`button ${seat.isBooked ? "booked" : "available"} ${selectedSeats && selectedSeats.includes(seat.seatNumber) ? "clicked" : ""} ${selectedSeats && selectedSeats.includes(seat.seatNumber) ? "selected" : ""}`}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    <div>{seat.seatNumber}</div>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <input
                        type="number"
                        value={seatQuantity}
                        min="1"
                        max={availableSeatsQuantity}
                        style={{marginLeft: 60}}
                        onChange={(e) => setSeatQuantity(parseInt(e.target.value, 10))}
                    />
                    <div className="select-seats">
                        <button style={{marginRight: 15}} className="button"
                                onClick={() => handleSeatQuantityChange(seatQuantity - 1)}>-
                        </button>
                        <button className="button" onClick={() => handleSeatQuantityChange(seatQuantity + 1)}>+</button>
                        <button style={{marginTop: 30}} className="search-buy-button" onClick={handleSelectSeats}>Select
                            Seats
                        </button>
                        <button className="search-buy-button" onClick={handleBuyClick}>Buy</button>
                    </div>
                </div>
            </div>

        </div>
    );
};