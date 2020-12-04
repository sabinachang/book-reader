import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './candidate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
            <div className='custom-card'>
                <div className="d-flex justify-content-between py-2">
                    <h6>{this.props.username}</h6>
                    <Button 
                        disabled={this.state.loading || this.props.invited}
                        onClick={ this.handleOnClick.bind(this)}>
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-1"/>
                        {this.props.invited? 'invited': 'invite' }
                    </Button>
                </div>
            </div>
        )
    }
    
}

export default Candidate;