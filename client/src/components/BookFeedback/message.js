import React from 'react';
import './feedback.css'

function message(props) {
    return (
      <div>
        <div className="mt-3 user-review px-3 pt-3 pb-1">
          <div className="d-flex justify-content-between flex-row">
            <span><h6 >{props.message.creator.username}</h6></span>
            <span><p className="mb-2 text-muted">{new Date(
                props.message.createdAt,
              ).toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p></span>
          </div>
          <p>
            {props.message.content}
          </p>
        </div>
      </div>
    )
}

export default message;