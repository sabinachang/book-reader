import React, { Component } from 'react';
import Book from './book/book'
import axios from 'axios';
import  Nav1 from '../Common/nav1/Nav1';
import Nav2 from '../Common/nav2/Nav2';


class Library extends Component {
    componentDidMount = () => {
        axios.get('http://localhost:5000/api/library/wantToRead')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <div>
                <Nav1/>
                <Nav2/>
                <div className="d-flex row justify-content-center">
                    <div className="col-9">
                        <Book
                            title="Harry Potter And The Chamber Of Secrets"
                            author="J.K. Rowling"
                            description="Aenean posuere posuere nisi. Nunc sollicitudin condimentum nunc quis placerat. Donec sagittis nibh eget diam dictum"
                            img="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
                            isbn="IDK"
                        />
                    </div>
                    <div className="col-9 my-3">
                    </div>
                </div>
            </div>

        );
    }
}
export default Library;