import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    axios.get('/api/users')
    .then(res => {
        const list = res.data
        this.setState({list});
    })
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>Interact with users</h1>
        {list.length ? (
          <div>
            {list.map((item) => {
              return(
                <div>
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default User;
