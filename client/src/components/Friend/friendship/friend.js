import React, { Component } from 'react';
import { Card } from 'react-bootstrap'


class Friend extends Component {

    render() {
        return(
            <Card className='my-2'style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{this.props.username}</Card.Title>
                </Card.Body>
            </Card>
        )
    }
    
}

export default Friend;