import React from 'react';
import Card from 'react-bootstrap/Card';

function message(props) {
    return (
    <Card className=" my-3 col-lg-6">
        <Card.Body>
          <Card.Title>{props.message.creator.username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{new Date(
              props.message.createdAt,
            ).toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</Card.Subtitle>
          <Card.Text>
            {props.message.content}
          </Card.Text>
         
        </Card.Body>
    </Card>
    )
    
}

export default message;