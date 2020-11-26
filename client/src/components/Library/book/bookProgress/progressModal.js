import React from 'react';
import Modal from '../../../Common/modal/Modal'
import axios from 'axios';
import "./progressModal.css"

class ProgressModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            progress: '0',
            errMsg: ''};
        this.needUpdate = true;
    }

    handleChange = (e) => {
        if (e.target) {
            this.setState({value: e.target.value});
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        if (this.state.value) {
            const pageNum = Number(this.state.value);
            if (this.checkValidInput(pageNum)) {
                this.updateProgress(pageNum);
            }
        }
    }

    checkValidInput = (userInput) => {
        if (Number.isInteger(userInput)) {
            if (this.props.bookInfo.pageCount &&
                userInput > this.props.bookInfo.pageCount) {
                // this.setState(errMsg: 'Out of max page number')
                console.log('max err');
                return false;
            } else {
                return true;
            }
        } else {
            // this.setState(errMsg: 'Please enter a number');
            console.log('err');
            return true;
        }
    }

    closeModal = () => {
        this.setState({value: '', progress: '0'})
        this.needUpdate = true;
        this.props.handleClose();
    }

    updateProgress = (inputPage) => {
        axios.put('/api/progress', {
            isbn: this.props.bookInfo.isbn,
            pageNum: inputPage
            },
            {withCredentials: true}
        ).then ((res) => {
            if (res.status === 200) {
                this.setState({progress: res.data.message, value: ''});
            } else {
                console.log(res.error);
            }
   
        }).catch ((err) => {
            console.log(err);
        });
    }

    getProgress = () => {
        axios.get(`/api/progress/${this.props.bookInfo.isbn}`,
            {withCredentials: true}
        ).then ((res) => {
            if (res.status === 200) {
                // console.log(res.data.message);
                this.setState({progress: res.data.message});
            } else {
                console.log(res.error);
            }
   
        }).catch ((err) => {
            console.log(err);
        });
    }

    // finishRead = () => {
    //     axios.post('/api/library/read', this.props.bookInfo, 
    //         { withCredentials: true }
    //     ).then(() => {console.log('FINISH READ')});
    // }

    getCurrentProgress = () => {
        if (this.needUpdate){
            this.getProgress();
            this.needUpdate = false;
        }
        return this.state.progress;
    }

    getProgressUI = () => {
        return (<div>
                    <div>
                        <h5>Current progress: {this.getCurrentProgress()}%</h5>
                    </div>

                    <div className='input-container'>
                        <form onSubmit={this.handleSubmit} className='input-form'>
                            <label className='input-label'>Last page you read: 
                                <input type='number' pattern='[0-9]*'
                                 value={this.state.value} className='input-num'
                                 onChange={this.handleChange}/>
                            </label>
                            <input type='submit' value='Update' className='btn-primary'/>
                        </form>
                    </div>
                </div>
            )
    }

    render() {
            return (<Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading="Tracking Progress">
            {this.getProgressUI()}    
        </Modal>)
    }
}

export default ProgressModal

