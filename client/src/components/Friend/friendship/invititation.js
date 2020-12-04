import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './candidate.css';

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
            <div className='custom-card'>
                <div className="d-flex justify-content-between py-2">
                    <h6>{this.props.username}</h6>
                    <span>
                        <Button 
                            value='accept' 
                            disabled={this.state.loading}
                            onClick={ this.handleOnClick.bind(this) }
                            >
                            Accept
                        </Button>
                        <Button 
                            value='deny'
                            variant= "secondary"
                            disabled={this.state.loading}
                            onClick={ this.handleOnClick.bind(this)}
                            className="mr-2"
                            >
                            Deny
                        </Button>
                    </span>
                </div>
            </div>
        )
    }
    
}

export default Invitation;