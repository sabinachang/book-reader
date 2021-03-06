import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register(props) {
    const [state, setState] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        errMsg: "",
        successMessage: null,
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const sendDetailsToServer = () => {
        const payload = {
            username: state.username,
            password: state.password
        }

        axios.post('http://localhost:5000/api/users/register', payload, {
            withCredentials: true,
        })
            .then((res) => {
                if (res.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))
                    redirectToHome();
                }
            })
            .catch((e) => {
                if (e.response && e.response.data && e.response.data.error) {
                    setState(prevState => ({
                        ...prevState,
                        errMsg: e.response.data.error
                    }));
                } else {
                    setState(prevState => ({
                        ...prevState,
                        errMsg: "An error occured while registering"
                    }));
                }
                redirectToRegister();


            })
    }

    const redirectToLogin = () => {
        props.history.push('/');
    }

    const redirectToRegister = () => {
        props.history.push('/register');
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
            setState(prevState => ({
                ...prevState,
                errMsg: "Passwords do not match"
            }));
        } else if (state.password.length < 6) {
            setState(prevState => ({
                ...prevState,
                errMsg: "Password should be at least 6 characters"
            }));
        } else if (state.username.length < 6) {
            setState(prevState => ({
                ...prevState,
                errMsg: "Username should be at least 6 characters",
            }));
        } else {
            sendDetailsToServer();
        }
    }

    return (
        <div className="col-12 col-lg-4 mt-2 register-container" >
            <form className="custom-card register-form">
                <div className="alert alert-danger mt-2" style={{ display: state.errMsg ? 'block' : 'none' }} role="alert">
                    {state.errMsg}
                </div>
                <h4>BookReader Register</h4>

                <div className="form-group text-left">
                    <label>Username</label>
                    <input type="username"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label>Confirm Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-custom mt-2"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
                <span className="mt-2 ml-4">
                    <span className="loginText" onClick={() => redirectToLogin()}>or Login</span>
                </span>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

        </div>
    )
}

export default Register;