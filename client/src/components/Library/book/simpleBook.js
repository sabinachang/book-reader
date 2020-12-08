import React, { Component } from 'react';
import axios from 'axios'
import "./book.css";



class SimpleBook extends Component {
    constructor(props){
        super(props);
        const img = "url('" + props.img + "')"
        this.state = {
            isbn: props.isbn,
            title: props.title,
            img: img
        }
        this.style = 'simple-card-body p-3 mt-3'
    }

    handleOnclick = () => {
        if(this.style === 'simple-card-body p-3 mt-3') {
            this.style = 'selected-card-body p-3 mt-3'
            console.log('post')
            axios.post(`/api/topfavorites`, { isbn: this.state.isbn }, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        console.log('finish selected');
                    } else {
                        console.log('error');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            this.style = 'simple-card-body p-3 mt-3'
            console.log('remove')
        }

    }

    render() {
        return(
            <div>
                <div className={this.style} onClick={this.handleOnclick}>
                    <span><div className="book" style={{ backgroundImage: this.state.img }}></div></span>
                    <span>
                        <p className="simple-card-title mt-2">{this.state.title}</p>
                    </span>
                </div>
            </div>
        )
    }    
}

export default SimpleBook;