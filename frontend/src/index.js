import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import data from './mock-data.json';


import axios from './axios';

const userFields = [
  'firstName',
  'lastName',
  'email',
  'mobileNo'
];

const getClearState = () => {
  const states = {};
  userFields.forEach(field => states[field] = "");
  return states;
}
class UserTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editedUser: null,
      selectedEditUserId: null
    };
  }

  handleEditUserSelection = (user) => {
    this.setState({
      selectedEditUserId: user._id,
      editedUser: { ...user }
    })
  }

  handleUserSelectionCancel = () => {
    this.setState({
      selectedEditUserId: null,
      editedUser: null
    })
  }

  handleUserFieldEdit = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    console.log(`selected field ${fieldName}, val: ${fieldValue}`)

    this.setState((prevState) => ({
      // [fieldName] : fieldValue
      editedUser: {
        ...prevState.editedUser,
        [fieldName]: fieldValue
      }
    }));
  }


  render() {
    const columns = ['First Name', 'Fast Name', 'Email', 'Mobile No', 'Actions'];
    const { users, onSaveEditedUser, onDeleteUserClick } = this.props;


    const userRows = users.map((user, ind) => {
      // console.log(`userid: ${user._id}, selected: ${selectedEditUserId}`)
      return (
        <tr key={user._id}>
          {(user._id === this.state.selectedEditUserId) ? (

            <EditableUserRow
              editedIndex={ind}
              user={this.state.editedUser}
              onUserInfoEdit={this.handleUserFieldEdit}
              onSaveEditedUser={(e, ind, user) => {
                this.setState({
                  selectedEditUserId: null
                })
                onSaveEditedUser(e, ind, user)
              }}
              onUserSelectionCancel={this.handleUserSelectionCancel}
            />
          ) : (
            <ReadOnlyUserRow
              user={user}
              onEditUserSelection={this.handleEditUserSelection}
              onDeleteUserClick={onDeleteUserClick} />
          )}
        </tr>
      );
    });

    return (
      <div>
        <form>
          <table>
            <UserTableHeader columns={columns} />
            <tbody>
              {userRows}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

class EditableUserRow extends React.Component {


  render() {
    const { editedIndex, onUserInfoEdit, onSaveEditedUser, onUserSelectionCancel } = this.props;
    const fields = userFields;
    const user = { ...this.props.user };

    return (
      <>
        {fields.map((field) => {
          return (
            <td key={field}>
              <input
                type="text"
                name={field}
                value={user ? user[field] : ""}
                required="required"
                onChange={onUserInfoEdit}
              />
            </td>
          );
        })
        }
        <td>
          <button onClick={(e) => onSaveEditedUser(e, editedIndex, user)}> Save </button>
          <button onClick={onUserSelectionCancel}> Cancel  </button>
        </td>
      </>

    )
  }
}

class ReadOnlyUserRow extends React.Component {

  render() {
    const { user, onEditUserSelection, onDeleteUserClick } = this.props;
    const fields = userFields;


    return (
      <>
        {fields.map((field) => {
          return (
            <td key={field}> {user[field] || ""} </td>
          );
        })
        }
        <td>
          <button
            type='submit'
            onClick={(e) => onEditUserSelection(user)}
          > Edit
          </button>

          <button
            type='submit'
            onClick={(e) => onDeleteUserClick(e, user)}
          >
            Delete
          </button>
        </td>

      </>
    );
  }
}

class UserTableHeader extends React.Component {
  render() {
    const { columns } = this.props;
    const headerColumns = columns.map((column) => {
      return (
        <th key={column}> {column} </th>
      )
    });
    return (
      <thead>
        <tr>
          {headerColumns}
        </tr>
      </thead>
    );
  }
}

class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);

    const clearState = getClearState();

    this.state = {
      ...clearState
    };
  }

  handleFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    this.setState({
      [fieldName]: fieldValue
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const newUser = { ...this.state };

    this.setState(getClearState);
    this.props.onUserCreation(newUser);

    // alert("Form submitted!")
  }

  render() {
    return (
      <div>
        <h2> Add a user </h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name='firstName'
            value={this.state.firstName}
            required="required"
            placeholder='Enter first name...'
            onChange={this.handleFormChange}
          />
          <input
            type="text"
            name='lastName'
            value={this.state.lastName}
            required="required"
            placeholder='Enter last name...'
            onChange={this.handleFormChange}
          />
          <input
            type="text"
            name='email'
            value={this.state.email}
            required="required"
            placeholder='Enter Email...'
            onChange={this.handleFormChange}
          />
          <input
            type="text"
            name='mobileNo'
            value={this.state.mobileNo}
            required="required"
            placeholder='Enter mobile Num...'
            onChange={this.handleFormChange}
          />

          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: data,
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
    axios
      .get("/")
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
      axios
        .get("/")
        .then((res) => {
          //   console.log(res);
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
