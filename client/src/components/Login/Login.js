import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login(props) {
    const [state, setState] = useState({
        username: "",
        password: "",
        errMsg: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const payload = {
            username: state.username,
            password: state.password
        }

        axios.post('http://localhost:5000/api/users/login', payload, {
            withCredentials: true,
        })
            .then((res) => {
                if (res.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        successMessage: 'Login successful. Redirecting to home page..'
                    }))
                    redirectToHome();
                } else {
                    console.log(res);
                }
            })
            .catch((e) => {
                //Alert
                console.log(e.response.data.error);
                setState(prevState => ({
                    ...prevState,
                    errMsg: e.response.data.error
                }));
            })
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
    }
    return (
        <div className="col-12 col-lg-4 mt-2 login-container">

            <form className="login-form">
                <div className="alert alert-danger mt-2" style={{ display: state.errMsg ? 'block' : 'none' }} role="alert">
                    {state.errMsg}
                </div>
                <h4>BookReader Login</h4>
                <div className="form-group text-left mt-3">
                    <label htmlFor="usernameInput1">Username</label>
                    <input type="username"
                        className="form-control"
                        id="username"
                        aria-describedby="usernameHelp"
                        placeholder="Enter username..."
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password..."
                        value={state.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-check">
                    <button
                        type="submit"
                        className="btn btn-primary btn-custom mt-2"
                        onClick={handleSubmitClick}
                    >Sign In</button>
                    <span className="mt-2 ml-4">
                        <span className="loginText" onClick={() => redirectToRegister()}>or Register</span>
                    </span>
                </div>
            </form>
            <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

        </div>
    )
}

export default Login;