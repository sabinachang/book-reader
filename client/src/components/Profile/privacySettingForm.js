import React from 'react'

class SettingsForm extends React.Component {
    render() {
        return (
            <div>
                <h5>{this.props.heading}</h5>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + 'everybody'} value="everybody" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'everybody'} >
                        Everybody
                       </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + "friends"} value="friends" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'friends'}>
                        Friends
                       </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + "me"} value="me" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'me'}>
                        Only me
                       </label>
                </div>
            </div>
        )
    }
}

export default SettingsForm