import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

function rating(props) {

    const getNow = () => {
        const total = props.likeCount + props.dislikeCount
        console.log(props.likeCount/total)
        return( ( props.likeCount / total) * 100 )
    }
    return (
        <div className="my-3 col-5">
            <div className="d-flex mb-2 justify-content-between flex-row">
                <Badge pill variant="secondary">
                    Like <span>{props.likeCount} </span>
                </Badge>{' '}
                
               
                
                <Badge pill variant="secondary">
                    Dislike <span>{props.dislikeCount}</span>
                </Badge>{' '}
            </div>
            <ProgressBar now={getNow()}/>
        </div>
    )
}

export default rating;