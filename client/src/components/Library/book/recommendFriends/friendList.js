import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class FriendList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            hasFriends: true,
            loading: false,
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
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }));

        axios.get('/api/friends', {
            withCredentials: true,
        })
        .then((res) => {
            if (res.data.list === null) {
                this.setState({
                    friends: [],
                    hasFriends: false,
                    loading: false,
                });
            } else {
                const friends = res.data.list.friends;
                this.setState({
                    friends: friends,
                    hasFriends: true,
                    loading: false,
                });
            }
           
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    onFriendChosen(e) {
        this.chosenId = e.target.value;
    }

    handleClick() {
        this.props.recommendBook({friendId: this.chosenId});
    }

    render() {
        let friends = this.state.friends.map((f, i)=> {
            if (i === 0) {
                this.chosenId = f._id;
            }
            return <option key= {i} value={f._id}>{f.username}</option>
        });
        return (
        <div>
            {this.state.hasFriends ? (
                 <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Recommend <b>{this.props.bookTitle}</b> to</Form.Label>
                        { this.state.loading? (
                            <p>Fetching friends...</p>
                        ): (
                            <Form.Control as="select" 
                                custom
                                onChange={this.onFriendChosen}>
                                {friends}
                             </Form.Control>
                        )}
                    </Form.Group>
                    <Button variant="primary"
                     onClick={this.handleClick}>
                     Recommend
                    </Button>
                    </Form>
            ): (
                <p> You don't have any friends yet</p>
            )}
           
        </div>
        
        )
    }
}

export default FriendList;