import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/Login.css';
import axios from "axios";
import {Header} from "./Header";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handle username change.
     * If value in username input is changed, assign it as new value.
     * @param event in case username input was changed.
     */
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    /**
     * Handle password change.
     * If value in password input is changed, assign it as new value.
     * @param event in case password input was changed.
     */
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    /**
     * Handle login.
     * Log user in and redirect to the profile page.
     */
    const handleLogin = async () => {
        await axios.post('/public/login', {
            "username": username,
            "password": password,
        }).then(result => {
                console.log('Login successful');
                console.log(result)
                localStorage.setItem("username", username)
                localStorage.setItem("token", result.data)
                navigate("/profile");
            }
        ).catch(() => {
            console.error('Login failed');
            window.alert('Login failed. Please check your credentials and try again.')
        })
    };

    /**
     * Handle sigh up click.
     * If user decides to sign up, redirect to the register page.
     */
    const handleSignUpClick = () => {
        navigate("/register")
    };

    return (

        <div className="login-container">
            <Header/>
            <div className="login-frame">
                <img
                    src="https://media.wired.co.uk/photos/606d9ea06a2b7484dab92d37/master/w_1600%2Cc_limit/wired-movie-industry.jpg"
                    alt="Login" className="login-image"/>
                <h2 className={"text-login"}>Log In</h2>
                <form>
                    <label>
                        <input type="text" value={username} onChange={handleUsernameChange}
                               className="input-style-login" placeholder="Email"/>
                    </label>
                    <br/>
                    <label>
                        <input type="password" value={password} onChange={handlePasswordChange}
                               className="input-style-login" placeholder="Password"/>
                    </label>
                    <br/>
                    <button type="button" onClick={handleLogin} className="button-style-login-register">
                        Login
                    </button>
                </form>
                <p className={"not-member"}>Not a member? <span onClick={handleSignUpClick} className={"link-style"}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};
