import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import {Home} from "./javaScript/Home";
import {SeatsInMovie} from "./javaScript/Seats";
import {Login} from "./javaScript/Login";
import {Register} from "./javaScript/Register";
import {ConfirmBooking} from "./javaScript/ConfirmBooking";
import {Profile} from "./javaScript/Profile";



export const ReactRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movie/:movieId" element={<SeatsInMovie/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/confirm" element={<ConfirmBooking/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}