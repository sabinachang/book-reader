import React from 'react';
import "./searchInputForm.css"

function searchInputForm(props) {
	return (
		<form className='form' role='form'>
			<h1 className='search_book'>Search books</h1>
			<div className='form-group'>
				<label htmlFor='search'></label>
				<input 
					id='search'
					onChange={props.handleInputChange}
					value={props.search}
					name='search'
					type='text'
					className='form-control'
					placeholder='Please enter book name here...'
					required
				/>
				<button onClick={props.handleFormSubmit} className='btn-search'>Search</button>
			</div>
		</form>
	);
}

export default searchInputForm;

