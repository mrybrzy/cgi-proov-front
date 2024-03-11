import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import {Home} from "./javaScript/Home";
import {SeatsInMovie} from "./javaScript/Seats";
import {Login} from "./javaScript/Login";
import {Register} from "./javaScript/Register";



export const ReactRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movie/:movieId" element={<SeatsInMovie/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}