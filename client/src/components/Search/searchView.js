import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Book from '../Library/book/book';
import SearchInputForm from './searchInputForm'
import defaultBookImg from './defaultBook.png'


class SearchView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: [],
		};
	}

	componentDisMount() {
		this.searchBook(this.state.search);
	}

	getImageLink = imglink => {
		let url = imglink && imglink.thumbnail;
		return url ? url.replace(/^http:\/\//i, 'https://') : '';
	}

	searchBook = query => {
		console.log('query:',query);
		axios.get('/api/search/' + query)
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data.result);
				this.setState({result: res.data.result});
			}
			else {
				console.log(res.error);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	handleInputChange = e => {
		this.setState({[e.target.name]:e.target.value});
	}

	handleFormSubmit = e => {
		e.preventDefault();
		if(this.state.search) {
			this.searchBook(this.state.search);
		}
		
	}

	render() {
		return (
			<div className='container'>
				<SearchInputForm 
					search={this.state.search}
					handleInputChange={this.handleInputChange}
					handleFormSubmit={this.handleFormSubmit}
				/>
				
				<Row>
					{this.state.result.map(book => (
						<Book
							key={book.id}
							title={book.volumeInfo.title}
							author={book.volumeInfo.authors}
							description={book.volumeInfo.description}
							img={this.getImageLink(book.volumeInfo.imageLinks) || defaultBookImg}
							// isbn={book.volumnInfo.industryIdentifiers[0].identifier}
							isbn={book.id}
						/>
					))}
				</Row>
			</div>
		)
	}
}

export default SearchView;

