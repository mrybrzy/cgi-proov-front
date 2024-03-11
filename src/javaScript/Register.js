import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import axios from "axios";

export const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const handleFirstNameChange = (event) => {
        setName(event.target.value);
    };


    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleRegister = async () => {

        await axios.post('/public/register', {
            "username": username,
            "name": name,
            "password": password,
            "passwordRepeated": repeatPassword
        }).then(() => {
                console.log('Registration successful');
                navigate("/login");
            }
        ).catch(() => {
            console.error('Registration failed');
        })
    };


    const handleSignUpClick = () => {
        navigate("/login")
    };

    return (
        <div className="register-container">
            <div className="register-frame-container">
                <div className="left-column">
                    <img src="https://img.freepik.com/premium-photo/red-white-paper-popcorn-bucket-cinema-snack-isolated-white-background-ai-generated_921479-26349.jpg" alt="Registration" className="register-image" />
                </div>
                <div className="right-column">

                    <div className="register-frame">
                        <h2>Register now</h2>
                        <form>
                            <div className="name-inputs">
                                <label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleFirstNameChange}
                                        className="input-style-register"
                                        placeholder="Name"
                                    />
                                </label>
                            </div>
                            <label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleEmailChange}
                                    className="input-style-register"
                                    placeholder="Email"
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="input-style-register"
                                    placeholder="Password"
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    value={repeatPassword}
                                    onChange={handleRepeatPasswordChange}
                                    className="input-style-register"
                                    placeholder="Repeat Password"
                                />
                            </label>
                            <button type="button" onClick={handleRegister} className="button-style-register">
                                Register
                            </button>
                        </form>
                        <p>
                            Already a member? <span onClick={handleSignUpClick} className="link-style">Log in</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
