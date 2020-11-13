import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'

class Candidate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    handleOnClick (e)  {
        this.setState({
            loading: true,
        })
        this.props.handleInvite(this.props.username);
    }

    render() {
        return(
            <Card className='my-2'style={{ width: '18rem' }}>
                <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{this.props.username}</Card.Title>
                    <Button 
                        disabled={this.state.loading}
                        onClick={ this.handleOnClick.bind(this)}>
                            Invite
                    </Button>
                </Card.Body>
            </Card>
        )
    }
    
}

export default Candidate;