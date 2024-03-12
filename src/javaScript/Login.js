import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/Login.css';
import axios from "axios";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleKeyPress = async (event) => {
        if (event.key === ' ' || event.key === 'Spacebar') {
            handleSignUpClick();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleLogin = async () => {
        await axios.post('/public/login', {
            "username": username,
            "password": password,
        }).then(result => {
                console.log('Login successful');
                console.log(result)
                localStorage.setItem("username", username)
                localStorage.setItem("token", result.data)
                navigate("/");
            }
        ).catch(() => {
            console.error('Login failed');
            window.alert('Login failed. Please check your credentials and try again.')
        })
    };

    const handleSignUpClick = () => {
        navigate("/register")
    };

    return (

        <div className="login-container">
            <div className="login-frame">
                <img src="https://media.wired.co.uk/photos/606d9ea06a2b7484dab92d37/master/w_1600%2Cc_limit/wired-movie-industry.jpg" alt="Login" className="login-image" />
                <h2 className={"text-login"}>Log In</h2>
                <form>
                    <label>
                        <input type="text" value={username} onChange={handleUsernameChange} className="input-style-login" placeholder="Email" />
                    </label>
                    <br />
                    <label>
                        <input type="password" value={password} onChange={handlePasswordChange} className="input-style-login" placeholder="Password" />
                    </label>
                    <br />
                    <button type="button" onClick={handleLogin} className="button-style-login-register">
                        Login
                    </button>
                </form>
                <p className={"not-member"}>Not a member? <span onClick={handleSignUpClick} className={"link-style"}>Sign Up</span></p>
            </div>
        </div>
    );
};
