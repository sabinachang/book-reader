import React from 'react'

class SettingsForm extends React.Component {
    state = {
        selectedOption: 'everybody'
    }

    onValueChange = (event) =>{
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
                    <input checked={this.state.selectedOption === "everybody"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + 'everybody'} value="everybody" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'everybody'} >
                        Everybody
                       </label>
                </div>
                <div className="form-check">
                    <input checked={this.state.selectedOption === "friends"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + "friends"} value="friends" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'friends'}>
                        Friends
                       </label>
                </div>
                <div className="form-check mb-4">
                    <input checked={this.state.selectedOption === "me"} onChange={this.onValueChange} className="form-check-input" type="radio" name={this.props.privacy_type} id={this.props.privacy_type + "me"} value="me" />
                    <label className="form-check-label" htmlFor={this.props.privacy_type + 'me'}>
                        Only me
                       </label>
                </div>
            </div>
        )
    }
}

export default SettingsForm