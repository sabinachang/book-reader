import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

function Login (props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        errMsg : "",
        successMessage: null
    })

    const handleChange = (e) => {
        const {id , value} = e.target;   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const payload = {
            username: state.username,
            password: state.password
        }

        axios.post('/api/users/login', payload, {
            withCredentials: true,
        })
        .then((res) => {
            console.log('resss',res);
            if(res.status === 200) {
                setState(prevState => ({
                    ...prevState,
                    successMessage : 'Login successful. Redirecting to home page..'
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

    const redirectToRegister = () => { 
        props.history.push('/register');
    }

    const redirectToHome = () => { 
        props.history.push('/home');
    }

    return(
        <div className="col-12 col-lg-4 mt-2">
            <form className="custom-card">
                <h4>Login</h4>
                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>
                <div className="alert alert-danger mt-2" style={{display: state.errMsg ? 'block' : 'none' }} role="alert">
                    {state.errMsg}
                </div>
                <div className="form-group text-left mt-4">
                <label htmlFor="usernameInput1">Username</label>
                <input type="username" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="usernameHelp" 
                       placeholder="Enter username" 
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="mt-2">
                <span>Don't have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default Login;