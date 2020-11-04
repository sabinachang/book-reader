import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class FriendList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            friends: []
        };
        // friend's id
        this.chosenId = -1;
        this.onFriendChosen = this.onFriendChosen.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        this.getFriendList();
    }

    getFriendList() {
        // TODO replace with real api
        axios.get('/api/friends')
        .then((res) => {
            const friends = res.data;
            this.setState({friends});
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    onFriendChosen(e) {
        this.chosenId = e.target.value;
    }

    handleClick() {
        this.props.recommendBook({title: this.props.bookTitle, friendId: this.chosenId});
    }

    render() {
        let friends = this.state.friends.map((f, i)=> {
            if (i === 0) {
                this.chosenId = f.id;
            }
            return <option key= {i} value={f.id}>{f.name}</option>
        });
        return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Recommend <b>{this.props.bookTitle}</b> to</Form.Label>
                <Form.Control as="select" 
                    custom
                    onChange={this.onFriendChosen}>
                    {friends}
                </Form.Control>
            </Form.Group>
            <Button variant="primary"
                onClick={this.handleClick}>
                Recommend
            </Button>
        </Form>
        )
    }
}

export default FriendList;