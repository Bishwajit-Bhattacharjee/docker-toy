import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import data from './mock-data.json';


const userFields = [
	'firstName',
	'lastName',
	'email',
	'mobileNo'
];

class UserTable extends React.Component {

	render () {
			const columns = ['First Name', 'Fast Name', 'Email', 'Mobile No', 'Actions'];
			const {users} = this.props;

			const userRows = users.map((user) => {
				return (
					<tr key={user._id}>
						<ReadOnlyUserRow user={user} />
					</tr>
				)
			});

			return (
					<div>
						<table>
							<UserTableHeader columns={columns}/>
							<tbody> 
								{userRows}	
							</tbody>
						</table>
					</div>
			);
	}
}

class ReadOnlyUserRow extends React.Component {
	render() {
		const {user} = this.props;
		const fields = userFields;

		const values = fields.map((field) => {
			return (
				<td> {user[field] || ""} </td>
			);
		});

		values.concat(
			<td> 
				<button ></button>
			</td>
		)

		return (
				values
		);
	}	
}

class UserTableHeader extends React.Component {
	render () {
			const {columns} = this.props;
			const headerColumns = columns.map( (column) => {
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
		
		const clearState = this.getClearState();

		this.state = {
			...clearState
		};
	}

	getClearState = () => {
		const states = {};
		userFields.forEach(field => states[field] = "");
		return states;
	}

	handleFormChange = (event) => {
		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		this.setState({
			[fieldName] : fieldValue
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		const newUser = {...this.state};

		this.setState(this.getClearState);
		this.props.onUserCreation(newUser);

		alert("Form submitted!")
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
			users: data
		};
	}

	handleUserCreation = (user) => {

		console.log("user from the Epp ", user);

		this.setState((prevState) => {
			user["_id"] = prevState.users.length + 1 + "";
			return (
				{
					users: [...prevState.users, user]
				}
			)
		})
	}
	
	render() {
			return (
					<div className="app-container">
						<UserTable 
							users={this.state.users}
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
  