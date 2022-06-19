import React from 'react';


import axios from '../axios';
import UserTable from './UserTable';
import CreateUserForm from './CreateUserForm';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      shouldReload: false
    };
  }

  handleSaveEditedUser = (event, index, user) => {
    event.preventDefault();

    console.log(`Saved user ind ${index}`)
    console.log(user)

    axios
      .patch(`/edit/${user._id}`, user)
      .then((res) => {
        console.log('User edited successfully!');
        this.setState({
          shouldReload: true
        });
      })
      .catch((e) => {
        console.log(e);
      })
  }

  handleDeleteUser = (event, user) => {
    event.preventDefault();

    axios
      .delete(`/delete/${user._id}`)
      .then((res) => {
        console.log('User deleted successfully!');
        this.setState({
          shouldReload: true
        });
      })
      .catch((e) => {
        console.log(e);
      })

  }

  handleUserCreation = (user) => {

    console.log(`Attempting to create user`, user);

    axios
      .post('/create', user)
      .then((res) => {
        console.log('User created successfully!');
        this.setState({
          shouldReload: true
        });
      })
      .catch((e) => {
        console.log(e);
      })

  }

  componentDidMount() {
    axios.get("/")
      .then((res) => {
        //   console.log(res);
        this.setState({
          users: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidUpdate() {

    if (this.state.shouldReload) {

      axios.get("/")
        .then((res) => {
          this.setState({
            users: res.data,
            shouldReload: false
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({
            shouldReload: false
          });
        });
    }
  }

  render() {
    return (
      <div className="app-container">
        <UserTable
          users={this.state.users}
          onSaveEditedUser={this.handleSaveEditedUser}
          onDeleteUserClick={this.handleDeleteUser}
        />
        <CreateUserForm
          onUserCreation={this.handleUserCreation}
        />
      </div>
    );
  }
}


export default App;