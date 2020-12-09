import React from 'react';
import Modal from '../Common/modal/Modal'
import axios from 'axios'
import { Form, Button, Spinner } from 'react-bootstrap'

class AboutModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            description: "",
        }
        this.textInput = React.createRef()
    }

    getDescription = () => {
        console.log(this.props.targetUser)
        axios.get(`/api/users/description/${this.props.targetUser}`, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data.user)
            let description
            if (res.data.user.description) {
                description = res.data.user.description
            } else {
                description = "No description added yet"
            }
            this.setState({ loading: false, description })
        }).catch(() => {
            this.setState({ loading: false, description: "Error. Something went wrong" })
        })
    }
    componentDidMount = () => {
        this.getDescription()
    }

    onPostClick = (e) => {
        e.preventDefault()
        const r = this.textInput.current.value
        this.textInput.current.value = ''

        this.setState({
            loading: true,
        })
        axios.post(`/api/users/description/${this.props.targetUser}`, {
            description: r
        }, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    this.getDescription()
                } else {
                    console.log('something went wrong')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const visible = this.props.visible;
        const handleClose = this.props.handleClose;
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading="About">
                <div>

                    {this.props.viewable ? (
                        <div className="my-3 d-flex justify-content-between">
                            <h6>{this.state.description}</h6>
                        </div>
                    ) : (
                            <p>Sorry, you are not allowed to view the content</p>
                        )}


                    {this.props.inProfile && (
                        <>
                            <hr ></hr>

                            <Form onSubmit={this.onPostClick}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="mt-2">Tell people about you</Form.Label>
                                    <Form.Control ref={this.textInput} as="textarea" className="custom-textarea" />

                                </Form.Group>
                                {this.state.loading ? (
                                    <Button variant="secondary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                       Loading
                                    </Button>
                                ) : (
                                        <Button variant="primary" type="submit">
                                            Post
                                        </Button>
                                    )}
                            </Form>
                        </>
                    )}


                </div>
            </Modal>
        )
    }
}

export default AboutModal