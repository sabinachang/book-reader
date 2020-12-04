import { getCookie } from '../../helper'
import React from 'react'
import axios from 'axios'

class SettingsForm extends React.Component {
    state = {
        selectedOption: 'everybody'
    }

    componentDidMount = () => {
        const username = getCookie('username')
        axios.get(`http://localhost:5000/api/privacy/${username}/${this.props.privacyType}`, { withCredentials: true })
            .then((response) => {
                this.setState({ selectedOption: response.data.privacyType })
            })
    }

    onValueChange = (event) => {
        console.log(event.target.value)
        this.setState({
            selectedOption: event.target.value
        });
        this.props.updateValue(event.target.value)
    }
    render() {
        return (
            <div>
                <h5>{this.props.heading}</h5>
                <div className="form-check">
                    <input checked={this.state.selectedOption === "everybody"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacyType} id={this.props.privacyType + 'everybody'} value="everybody" />
                    <label className="form-check-label" htmlFor={this.props.privacyType + 'everybody'} >
                        Everybody
                       </label>
                </div>
                <div className="form-check">
                    <input checked={this.state.selectedOption === "friends"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacyType} id={this.props.privacyType + "friends"} value="friends" />
                    <label className="form-check-label" htmlFor={this.props.privacyType + 'friends'}>
                        Friends
                       </label>
                </div>
                <div className="form-check mb-4">
                    <input checked={this.state.selectedOption === "me"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacyType} id={this.props.privacyType + "me"} value="me" />
                    <label className="form-check-label" htmlFor={this.props.privacyType + 'me'}>
                        Only me
                       </label>
                </div>
            </div>
        )
    }
}

export default SettingsForm