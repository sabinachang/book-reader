import React from 'react';


function searchInputForm(props) {
	return (
		<div className='form' role='form'>
			<div className='row'>
				<div className='form-group col-md-10'>
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
				</div>
				<div className='form-group col-md-2'>
					<button onClick={props.handleFormSubmit} className='btn-search'>Search</button>
				</div>
			</div>
		</div>

	);
}

export default searchInputForm;

