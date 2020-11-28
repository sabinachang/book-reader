import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Book from '../Library/book/book';
import SearchInputForm from '../Common/searchBar/SearchInputForm';
import Nav1 from '../Common/nav1/Nav1';
import Nav2 from '../Common/nav2/Nav2';

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
			this.searchBook(this.state.search);
		}
		
	}

	render() {
		return (
			<div>
				<Nav1/>
				<div className="d-flex row justify-content-center">
				
					<div className="col-9 result-container mb-5">
						<h4 className="mt-4" >Search books</h4>
						<SearchInputForm 
							search={this.state.search}
							handleInputChange={this.handleInputChange}
							handleFormSubmit={this.handleFormSubmit}
						/>
						{this.state.result.map(book => (
							<Book
								key={book.id}
								title={book.volumeInfo.title}
								author={book.volumeInfo.authors}
								description={book.volumeInfo.description}
								img={book.volumeInfo.imageLinks.thumbnail}
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default SearchView;

