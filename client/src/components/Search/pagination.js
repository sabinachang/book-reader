import React from 'react';
import Pagination from 'react-bootstrap/Pagination'

function pagination(props) {
    const handleClick = (e) => {
        e.target.blur()
        props.onPageClick(e.target.innerText)
    }
    const getPageItem = () => {
        let i
        let pages = []
        console.log(props)
        for (i = props.start; i <= props.end; i++) {
            pages.push(
                <Pagination.Item 
                    value={i}
                    active={i === props.current}
                    onClick={ handleClick}>
                        {i}
                </Pagination.Item>)
        }
        return pages
    }

    return  (
        <Pagination>
           {getPageItem()}
        </Pagination>
    )
}

export default pagination;