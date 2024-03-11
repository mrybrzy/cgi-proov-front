import '../css/Header.css';
import React from 'react';

import homeIcon from '../icons/home.png'; // Import the image using require
import contactIcon from '../icons/contact.png'; // Import the image using require
import userIcon from '../icons/user.png'; // Import the image using require
import searchIcon from '../icons/search.png'; // Import the image using require
import menuIcon from '../icons/menu.png'; // Import the image using require
import { useNavigate } from "react-router-dom";



export const Header = () => {
    const navigate = useNavigate();
    // const handleHomeClick = () => {
    //     navigate("/");
    // }
    // const handleContactClick = () => {
    //     navigate("/contacts");
    // }
    const handleLoginClick = () => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            navigate("/profile")
        } else {
            navigate("/login");
        }
    }
    const handleSearchClick = () => {
        navigate("/");
    }
    return (
        <header className="header">
            <div className="menu-button">
                <button className="icon-button">
                    <img src={menuIcon} alt="Menu" /> {/* Use the imported image */}
                </button>
                <div className="menu-content">
                    <button className="icon-button-menu" onClick={handleLoginClick}>
                        <img src={userIcon} alt="User"/> Your account
                    </button>
                    <button className="icon-button-menu" onClick={handleSearchClick}>
                        <img src={searchIcon} alt="Search" /> Search
                    </button>

                </div>
            </div>
            <h1 className="header-heading">PROOV</h1>
            <div className="header-buttons">
                <button className="icon-button-header" onClick={handleSearchClick}>
                    <img src={searchIcon} alt="Search" />
                </button>
                <button className="icon-button-header" onClick={handleLoginClick}>
                    <img src={userIcon} alt="User" />
                </button>

            </div>
        </header>
    );
};
