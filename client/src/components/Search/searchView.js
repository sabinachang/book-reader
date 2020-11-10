import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Book from '../Library/book/book';
import SearchInputForm from './searchInputForm'
import "./searchView.css"


class SearchView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: [],
			searchOption: ''
		};
	}


	componentDisMount() {
		this.searchBook(this.state.search);
	}

	searchBook = query => {
		console.log('query:',query);
		axios.get('/api/search/' + query)
		.then((res) => {
			if (res.status === 200) {
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
			this.searchBook(this.state.search + this.state.searchOption);
		}
		
	}

	handleValueChange = e => {
		this.setState({searchOption: e.target.value});
	}

	render() {
		return (
			<div className='container'>
				<h1 className='search_book'>Search books</h1>
				<div onChange={this.handleValueChange} className='option-line'>
					<label htmlFor='option' className='search-option'>Search option: </label>
					<input type='radio' value=' inauthor' className='option' /> Author
					<input type='radio' value=' intitle' className='option' /> Title
					<input type='radio' value=' ' className='option' /> All
				</div>

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
							img={book.volumeInfo.imageLinks.thumbnail}
						/>
					))}
				</Row>
			</div>
		)
	}
}

export default SearchView;

