import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './wall.css';


const NoPost = (props) => {
    return (
        <div className="card border-dark mb-4 mt-3">
            <div className="card-header d-flex justify-content-between">
                <div>
                    <a href={props.isLoggedIn ? `/home` : "/"}>{props.text}</a>
                </div>
            </div>
        </div>
    );

}
export default NoPost;
