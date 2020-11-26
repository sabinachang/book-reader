import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Book from '../Library/book/book';
import SearchInputForm from './searchInputForm'
import defaultBookImg from './defaultBook.png'
import "./searchView.css"



class SearchView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: [],
			searchOption: '',
			errMsg: ''
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
		console.log('query:', query);
		axios.get('/api/search/' + query)
			.then((res) => {
				if (res.status === 200) {
					if (res.data.result.totalItems > 0) {
						this.setState({
							result: res.data.result.items,
							errMsg: ''
						});
					}
					else {
						this.redirectToSearchBook();
						this.setState({ errMsg: 'No book found!' });
						console.log('No book found!');
					}
				}
				else {
					console.log(res.error);
				}
			})
			.catch((err) => {
				console.log(err);
			})
	}

	redirectToSearchBook = () => {
		this.setState({ search: '', result: [] });
		this.props.history.push('/search');
	}

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFormSubmit = e => {
		e.preventDefault();
		if (this.state.search) {
			this.searchBook(this.state.search + this.state.searchOption);
		} else {
			this.setState({ errMsg: 'Please enter book name or author name to search!' })
		}

	}

	handleValueChange = e => {
		this.setState({ searchOption: e.target.value });
	}

	getIsbn = (book) => {
		if (book.volumeInfo.industryIdentifiers) {
			return book.volumeInfo.industryIdentifiers[0].identifier

		}
		else {
			return book.volumeInfo.title + ", " + book.volumeInfo.authors
		}
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

				<div className="alert alert-warning mt-2" style={{ display: this.state.errMsg ? 'block' : 'none' }} role="alert">
					{this.state.errMsg}
				</div>
				<Row>
					{this.state.result.map(book => (
						<Book
							key={book.id}
							title={book.volumeInfo.title}
							authors={book.volumeInfo.authors}
							description={book.volumeInfo.description}
							img={this.getImageLink(book.volumeInfo.imageLinks) || defaultBookImg}
							isbn={this.getIsbn(book)}
							showUserFeedback={false}
						/>
					))}
				</Row>
			</div>
		)
	}
}

export default SearchView;

