import React from 'react';


import {userFields} from '../helpers';

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

export default EditableUserRow;