import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'

class Invitation extends Component {

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
        this.props.handleAction(e.target.value, this.props.username);
    }

    render() {
        return(
            <Card className='my-2'style={{ width: '18rem' }}>
                <Card.Body className="d-flex justify-content-between">
                    <Card.Title>{this.props.username}</Card.Title>
                    <Button 
                        value='accept' 
                        disabled={this.state.loading}
                        onClick={ this.handleOnClick.bind(this) }>
                           Accept
                    </Button>
                    <Button 
                        value='deny'
                        variant= "secondary"
                        disabled={this.state.loading}
                        onClick={ this.handleOnClick.bind(this)}>
                            Deny

                    </Button>
                </Card.Body>
            </Card>
        )
    }
    
}

export default Invitation;