import React from "react";

import UserTableHeader from "./UserTableHeader";
import ReadOnlyUserRow from "./ReadOnlyUserRow";
import EditableUserRow from "./EditableUserRow";


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

    let userRows = null;

    if (users) {
      userRows = users.map((user, ind) => {
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
    }

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


export default UserTable;