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
            errMsg: '',
            pgsMsg: ''};
        this.needUpdate = true;
    }

    handleChange = (e) => {
        if (e.target) {
            this.setState({value: e.target.value});
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        this.setState({errMsg: ''});
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
                this.setState({errMsg: 'Please enter the page number < total page', value: '', pgsMsg: ''});
                return false;
            } else if (userInput <= 0) {
                this.setState({errMsg: 'Please enter the page number > 0', value: '', pgsMsg: ''});
                return false;
            } else {
                return true;
            }
        } else {
            this.setState({errMsg: 'Please enter an integer page number', value: '', pgsMsg: ''});
            return false;
        }
    }

    closeModal = () => {
        this.setState({value: '', progress: '0', errMsg: '', pgsMsg: ''});
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
                this.checkProgress();
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

    checkProgress = () => {
        if (this.state.progress === 100) {
            this.setState({pgsMsg: 'Congratulations! This book will move to Read bookshelf!'});   
        } else if (this.state.progress < 50) {
            this.setState({pgsMsg: 'Hope you like this book!'});
        } else {
            this.setState({pgsMsg: 'Almost done! Good job!'});
        }
    }

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
                        <p>Total Page: {this.props.bookInfo.pageCount}</p>
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

                    <div className="alert alert-danger mt-2" style={{display: this.state.errMsg ? 'block' : 'none' }} role="alert">
                        {this.state.errMsg}
                    </div>
                    <div className="alert alert-info mt-2" style={{display: this.state.pgsMsg ? 'block' : 'none' }} role="alert">
                        {this.state.pgsMsg}
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

