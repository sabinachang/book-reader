import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

function Register(props) {
    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: "",
        errMsg : "",
        successMessage: null
    })
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendDetailsToServer = () => {
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const redirectToLogin = () => {
        props.history.push('/'); 
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            setState(prevState => ({
                ...prevState,
                errMsg : "password not match"
            }));
            console.log("password not match");
        }
    }

    return(
        <div className="col-12 col-lg-4 mt-2" >
            <h6 className="error">{ state.errMsg }</h6>
            <form className="custom-card">
                <h4>Register</h4>
                <div className="form-group text-left mt-4">
                <label>Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
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
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default Register;