import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import {Home} from "./javaScript/Home";
import {SeatsInMovie} from "./javaScript/Seats";



export const ReactRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movie/:movieId" element={<SeatsInMovie/>}/>
            </Routes>
        </BrowserRouter>
    )
}