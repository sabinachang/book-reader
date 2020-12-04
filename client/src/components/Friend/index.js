import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import Friend from './friendship/friend';
import Candidate from './friendship/candidate';
import Invitation from './friendship/invititation';
import SearchInputForm from '../Common/searchBar/SearchInputForm';
import Nav1 from '../Common/nav1/Nav1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faUsers } from '@fortawesome/free-solid-svg-icons';
import './index.css';

class FriendHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: true,
            loadingMsg: 'Loading...',
            friends: [],
            candidates: [],
            invitations: [],
            invited: [],
            searched: false,
        }
    }

    getFriendshipInfo = () => {
        axios.get(`/api/friendship/all`, {withCredentials: true})
        .then((res) => {
           if (res.status === 200) {
               console.log(res)
                this.setState({
                    loading: false,
                    loadingMsg: 'Loading...',
                    friends: res.data.friends,
                    invitations: res.data.invitations,
                    invited: res.data.invited,
                })
           } else {
               this.setState(prevState => ({
                   ...prevState,
                   loadingMsg:'something went wrong, please reload'
               }))
           }
    
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getSearchResult = () => {
        axios.get('/api/friendship/candidates', {
            params: {
                username: this.state.search
            }
        }, {withCredentials: true})
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    loading: false,
                    candidates: res.data.candidates,
                    invited: res.data.invited,
                })
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    loadingMsg:'something went wrong, please reload'
                }))
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleInvite = (invitee) => {
        axios.post('/api/request/invitation', {
            to: invitee,
            request_type: "friendship-invitation"
        }, {
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    loading: true,
                })
                this.getFriendshipInfo();

            } else {
                this.setState(prevState => ({
                    ...prevState,
                    loadingMsg: 'something went wrong, please reload'
                }))
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    handelAction = (action, to) => {
        console.log(action)
        console.log(to)
        axios.post(`/api/friendship/invitation/${action}`, {
            to: to,
            request_type: "friendship-" + action
        }, {
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) {
                this.setState({
                    loading: true,
                    loadingMsg: 'Updating...',
                    friends: [],
                    candidates: [],
                    invitations: [],
                    invited: [],
                    search: '',
                    search: false,
                })
                this.getFriendshipInfo();
            } else {
                this.setState(prevState => ({
                    ...prevState,
                    loadingMsg: 'something went wrong, please reload'
                }))
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    setFriendsUI = () => {
        let friendsUI;
        if (this.state.friends.length !== 0) {
            friendsUI = this.state.friends.map((f) => {
                return <Friend key={f._id} username={f.username} />
            })
        } else {
            friendsUI = <Friend key='-1' username='No Friends to show'></Friend>
        }
        return friendsUI;
    }

    setCandidatesUI = () => {
        let candidatesUI;
        if(this.state.candidates.length !== 0 ) {
            const friends = this.state.friends.map(f => {
                return f.username
            })
            const invited = this.state.invited.map(i => {
                return i.username
            })

            candidatesUI = this.state.candidates.map(c => {
                if (friends.includes(c.username)) {
                    return <Friend key={c._id} username={c.username}/>
                } else {
                    if (invited.includes(c.username)) {
                        return <Candidate key={c._id} invited={true} username={c.username} handleInvite={this.handleInvite}/>
                    } else {
                        return <Candidate key={c._id} invited={false} username={c.username} handleInvite={this.handleInvite}/>
                    }
                }
                
            })
        } else {
            if (this.state.searched === false ) {
                candidatesUI = null
            } else if (this.state.search) {
                candidatesUI = (
                <Friend key='-1' username='No match found'></Friend>
                )
            }
        }
        return candidatesUI;
    }

    setInvitationsUI = () => {
        let invitationsUI;
        if (this.state.invitations.length !== 0) {
            invitationsUI = this.state.invitations.map((i) => {
                return <Invitation
                    key={i._id}
                    username={i.username}
                    handleAction={this.handelAction}
                />
            })
        } else {
            invitationsUI = <Friend key='-1' username='No invitations to show'></Friend>
        }
        return invitationsUI;
    }

    componentDidMount = () => {
        this.getFriendshipInfo();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
            searched:true,
        })
        if (this.state.search) {

            this.getSearchResult()

		} else {
			this.setState({
                loading: false,
                candidates: [],
                invited: [],
                searched: false,
            })
		}
    }

    handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
    }
    
    handleKeyPress = e => {
		if (e.key === 'Enter') {
			this.handleFormSubmit(e);
		}
	}

    render () {
        const friendsUI = this.setFriendsUI();

        const candidatesUI = this.setCandidatesUI();
        const invitationsUI = this.setInvitationsUI();
        return (
            <div>
                <Nav1 />
                <div>
                    <div className="d-flex row justify-content-center mt-4">
                        <div className="col-9">
                            <h6><a href="/profile"><FontAwesomeIcon icon={faLongArrowAltLeft} className="my-2 custom-icon" /></a></h6>
                            <h5 className="my-4 "><FontAwesomeIcon icon={faUsers} className="mr-2" />Manage Friendships</h5>
                            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                <Tab className='my-4' eventKey="home" title="My friends">
                                    {this.state.loading ? (
                                        <h5>{this.state.loadingMsg}</h5>
                                    ) : (
                                            friendsUI
                                        )}
                                </Tab>
                                <Tab className='my-4'eventKey="add" title="Add friends">
                                    <SearchInputForm
					                        search={this.state.search}
					                        handleInputChange={this.handleInputChange}
                                            handleFormSubmit={this.handleFormSubmit}
                                            handleKeyPress={this.handleKeyPress}
                                            placeholder={'Search for usernames...'}
                                    />
                                    {this.state.loading ? (
                                         <h5>{this.state.loadingMsg}</h5>
                                    ): (
                                        <>
                                        {candidatesUI}
                                        </>
                                    )}
                                </Tab>
                                <Tab className='my-4' eventKey="invite" title="Invitations" >
                                    {this.state.loading ? (
                                        <h5>{this.state.loadingMsg}.</h5>
                                    ) : (
                                            invitationsUI
                                        )}
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendHome;