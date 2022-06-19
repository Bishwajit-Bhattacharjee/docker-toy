import React from 'react';

import {getClearState} from '../helpers';

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


export default CreateUserForm;