import React from 'react';

import {userFields} from '../helpers';

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


export default ReadOnlyUserRow;