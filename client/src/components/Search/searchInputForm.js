import React from 'react';

function searchInputForm(props) {
	return (
		<form class='form-inline' role='form'>
			<div className='form-group'>
				<label htmlFor='search'>Search Books: </label>
				<input 
					id='search'
					onChange={props.handleInputChange}
					value={props.search}
					name='search'
					type='text'
					className='form-control'
					placeholder='Please search books here'
					required
				/>
				<button onClick={props.handleFormSubmit} className='btn btn-primary'>Search</button>
			</div>
		</form>
	);
}

export default searchInputForm;

