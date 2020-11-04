import React, { Component } from 'react';
import Book from './book/book'

class Library extends Component {


    render() {
        return (
            <div>
                <h1 className="mb-4">(Google Books API Search Results)</h1>
                <div className="d-flex row justify-content-center">
                    <div className="col-9">

                        <Book
                            title="Harry Potter And The Chamber Of Secrets"
                            author="J.K. Rowling"
                            description="Aenean posuere posuere nisi. Nunc sollicitudin condimentum nunc quis placerat. Donec sagittis nibh eget diam dictum"
                            img="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
                        />
                    </div>
                    <div className="col-9 my-3">
                        <Book
                            title="Harry Potter And The Goblet of Fire"
                            author="J.K. Rowling"
                            description="Aenean posuere posuere nisi. Nunc sollicitudin condimentum nunc quis placerat. Donec sagittis nibh eget diam dictum"
                            img="https://secure.img1-fg.wfcdn.com/im/44694064/resize-h600-w600%5Ecompr-r85/4049/40493771/Harry+Potter+%27Book+Cover+-+Goblet+of+Fire%27+Graphic+Art+Print.jpg"
                        />
                    </div>

                </div>


            </div>

        );
    }
}
export default Library;