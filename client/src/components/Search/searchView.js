import React, { Component } from 'react';
import axios from 'axios';
import Book from '../Library/book/book';
import SearchInputForm from '../Common/searchBar/SearchInputForm';
import Nav1 from '../Common/nav1/Nav1';
import Pagination from './pagination'

class SearchView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: [],
			searchOption: '',
			errMsg: '',
		};
		this.currentPage = 1
		this.totalItems = 0
	}

	componentDisMount() {
		this.searchBook(this.state.search);
	}

	searchBook = query => {
		console.log('query:', query);
		axios.get('/api/search/' + query, {
			params: {
				startIndex: ((this.currentPage - 1) *10)
			}
		})
			.then((res) => {
				if (res.status === 200) {
					if (res.data.result.totalItems > 0) {
						this.totalItems = res.data.result.totalItems
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

	updateCurrentPage = (s) => {
		this.currentPage = s
	}

	updateTotalItems = (t) => {
		this.totalItems = t
	}

	getPage = (number) => {
		this.updateCurrentPage(parseInt(number, 10))
		this.searchBook(this.state.search + this.state.searchOption);
	}

	getPaginationUI = () => {
		window.scrollTo(0,0)
		const current = parseInt(this.currentPage, 10)
		let start
		let end
		if (this.totalItems === 0) {
			return null
		}
		if ( (current - 5) < 1 ) {
			start = 1
		} else {
			start = current - 5
		}

		if ((current + 4) > Math.ceil((this.totalItems/10))) {
			end = Math.ceil((this.totalItems/10))
		} else {
			if (start ===1 ) {
				end = 10
			} else {
				end = current + 4

			}
		}
		return (
			<>
			<Pagination 
			onPageClick={this.getPage}
			start={start}
			end={end}
			current={current}>
			</Pagination>
			</>
		)
	}

	handleFormSubmit = e => {
		e.preventDefault();
		this.updateCurrentPage(1)
		this.updateTotalItems(0)
		if (this.state.search) {
			this.searchBook(this.state.searchOption + this.state.search);
			this.setState({ search: ''})
		} else {
			this.redirectToSearchBook();
			this.setState({ errMsg: 'Please enter book name or author name to search!' })
		}

	}

	handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.handleFormSubmit(e);
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

	getImageLink = imglink => {
		let url = imglink && imglink.thumbnail;
		return url ? url.replace(/^http:\/\//i, 'https://') : '';
	}

	render() {
		return (
			<div>
				<Nav1/>
				<div className="d-flex row justify-content-center">
				
					<div className="col-9 result-container mb-5">
						<h4 className="mt-4" >Search books</h4>

						<div onChange={this.handleValueChange} className='option-line'>
							<label htmlFor='option' className='search-option'>Search option: </label>
							<input type='radio' value='inauthor:' name='soption' className='option' /> Author
							<input type='radio' value='intitle:' name='soption' className='option' /> Title
							<input type='radio' value=' ' name='soption' className='option' defaultChecked /> All
						</div>

						<SearchInputForm 
							search={this.state.search}
							handleInputChange={this.handleInputChange}
							handleFormSubmit={this.handleFormSubmit}
							placeholder={'Please search books here...'}
						/>

						<div className="alert alert-warning mt-2" style={{ display: this.state.errMsg ? 'block' : 'none' }} role="alert">
							{this.state.errMsg}
						</div>
						
						{this.state.result.map(book => (
							<Book
								key={book.id}
								title={book.volumeInfo.title}
								author={book.volumeInfo.authors}
								description={book.volumeInfo.description}
								img={book.volumeInfo.imageLinks.thumbnail}
								isbn={this.getIsbn(book)}
								options="card-half"
								showUserFeedback={false}
							/>
						))}

						{/* <div className="my-4">
							{this.getPaginationUI()}
						</div> */}
					</div>
				</div>
			</div>
		)
	}
}

export default SearchView;

