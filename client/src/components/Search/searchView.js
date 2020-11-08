import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Book from '../Library/book/book';
import SearchInputForm from './searchInputForm'


// export function getSearchGoogle() {
//   if (searchView == null) {
//     searchView = new SearchView();
//   }
//   return searchView;
// }

// let searchView = null;

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
							img={book.volumeInfo.imageLinks.thumbnail}
						/>
					))}
				</Row>
			</div>
		)
	}
}

export default SearchView;

