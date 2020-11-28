import React from 'react';
import "./SearchInputForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function searchInputForm(props) {
	return (
		<form className='form my-3' role='form'>
			<div className='form-group form-custom'>
				<input 
					id='search-books'
					onChange={props.handleInputChange}
					onKeyPress={props.handleKeyPress}
					value={props.search}
					name='search'
					type='text'
					className='form-control p-2'
					placeholder=' Enter book name...'
					required
				/>
				<span>
					<button onClick={props.handleFormSubmit} className="ml-2 px-4" id="btn-custom"><FontAwesomeIcon icon={faSearch} /></button>
				</span>
			</div>
		</form>
	);
}

export default searchInputForm;

