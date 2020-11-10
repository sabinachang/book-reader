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

        axios.post('http://localhost:5000/api/users/login', payload, {
            withCredentials: true,
        })
        .then((res) => {
            if(res.status === 200) {
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Login successful. Redirecting to home page..'
                }))
                redirectToHome();
            } else {
                console.log(res.error);
            }
        })
        .catch((e) => {
            console.log(e);
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
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default Login;