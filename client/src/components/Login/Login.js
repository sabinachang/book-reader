import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

function Login (props) {
    const [state , setState] = useState({
        email : "",
        password : "",
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

    const handleSubmitClick = (e) => {
        // TODO: check email and password
        // wrong password (email correct)
        // email does not exist

        // pass
        redirectToHome();
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToRegister = () => { 
        props.history.push('/register');
    }
    return(
        <div className="col-12 col-lg-4 mt-2">
            <form className="custom-card">
                <h4>Login</h4>
                <div className="form-group text-left mt-4">
                <label htmlFor="exampleInputEmail1">Email address</label>
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