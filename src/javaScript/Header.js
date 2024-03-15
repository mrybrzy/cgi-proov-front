import '../css/Header.css';
import React from 'react';

import userIcon from '../icons/user.png';
import searchIcon from '../icons/search.png';
import menuIcon from '../icons/menu.png';
import {useNavigate} from "react-router-dom";


export const Header = () => {
    const navigate = useNavigate();

    /**
     * Website navigation.
     */
    const handleLoginClick = () => {
        if (localStorage.getItem("token")) {
            navigate("/profile")
        } else {
            navigate("/login");
        }
    }
    /**
     * Redirect to the home page.
     */
    const handleSearchClick = () => {
        navigate("/");
    }
    return (
        <header className="header">
            <div className="menu-button">
                <button className="icon-button">
                    <img src={menuIcon} alt="Menu"/>
                </button>
                <div className="menu-content">
                    <button className="icon-button-menu" onClick={handleLoginClick}>
                        <img src={userIcon} alt="User"/> Your account
                    </button>
                    <button className="icon-button-menu" onClick={handleSearchClick}>
                        <img src={searchIcon} alt="Search"/> Search
                    </button>

                </div>
            </div>
            <h1 className="header-heading">PROOV</h1>
            <div className="header-buttons">
                <button className="icon-button-header" onClick={handleSearchClick}>
                    <img src={searchIcon} alt="Search"/>
                </button>
                <button className="icon-button-header" onClick={handleLoginClick}>
                    <img src={userIcon} alt="User"/>
                </button>

            </div>
        </header>
    );
};
