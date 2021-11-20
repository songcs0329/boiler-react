import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { loginUser } from '../../../_actions/users';

const LoginPage = (props) => {
	const dispatch = useDispatch()
	const [Forms, setForms] = useState({
		email: "",
		password: ""
	})
	const { email, password } = Forms

	const handleFormsValue = event => {
		setForms(Forms => {
			return {
				...Forms,
				[event.target.name]: event.target.value
			}
		})
	}

	const onSubmitHandler = event => {
		event.preventDefault()
		dispatch(loginUser(Forms)).then(response => {
			if(response.payload.loginSuccess) {
				props.history.push("/")
			} else {
				alert('fail to login')
			}
		})
	}

	return (
		<div className="wrapper">
			<form className="forms" onSubmit={onSubmitHandler}>
				<label>Email</label>
				<input type="email" value={email} name="email" onChange={handleFormsValue} />
				<label>Password</label>
				<input type="password" value={password} name="password" onChange={handleFormsValue} />
				<br />
				<button>Login</button>
			</form>
		</div>
	);
};

export default withRouter(LoginPage);