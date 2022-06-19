import React from 'react';

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

export default UserTableHeader;