import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

function rating(props) {

    const getNow = () => {
        const total = props.likeCount + props.dislikeCount
        if (total === 0) {
            return 0
        }
        return( ( props.likeCount / total) * 100 )
    }
    return (
        <div>
            <div className="d-flex mb-2 justify-content-between flex-row">
                <Badge pill variant="secondary">
                    Dislike <span>{props.dislikeCount}</span>
                </Badge>{' '}
                <Badge pill variant="secondary">
                    Like <span>{props.likeCount} </span>
                </Badge>{' '}
            </div>
            <ProgressBar now={getNow()}/>
        </div>
    )
}

export default rating;