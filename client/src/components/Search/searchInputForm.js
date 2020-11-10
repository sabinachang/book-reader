import React from 'react';


function searchInputForm(props) {
	return (
		<div className='form-group'>
			<label htmlFor='search'></label>
			<input 
				id='search'
				onChange={props.handleInputChange}
				value={props.search}
				name='search'
				type='text'
				className='form-control'
				placeholder='Please search books here...'
				required
			/>
			<button onClick={props.handleFormSubmit} className='btn-search'>Search</button>
		</div>

	);
}

export default searchInputForm;

