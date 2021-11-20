import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/users';
import { withRouter } from 'react-router';

const RegisterPage = (props) => {
	const dispatch = useDispatch()
	const [Forms, setForms] = useState({
		email: "",
		name: "",
		password: ""
	})
	const [confirm, setConfirm] = useState("")
	const { email, name, password } = Forms

	const handleFormsValue = event => {
		setForms(Forms => {
			return {
				...Forms,
				[event.target.name]: event.target.value
			}
		})
	}
	const handleConfirmValue = event => setConfirm(event.target.value)

	const onSubmitHandler = event => {
		event.preventDefault()
		if(password !== confirm) {
			return alert("check your password & confirm")
		} else {
			dispatch(registerUser(Forms)).then(response => {
				if(response.payload.success) {
					props.history.push("/login")
				} else {
					alert('fail to signup')
				}
			})
		}
	}

	return (
		<div className="wrapper">
			<form className="forms" onSubmit={onSubmitHandler}>
				<label>Email</label>
				<input type="email" value={email} name="email" onChange={handleFormsValue} />
				<label>name</label>
				<input type="text" value={name} name="name" onChange={handleFormsValue} />
				<label>Password</label>
				<input type="password" value={password} name="password" onChange={handleFormsValue} />
				<label>Confirm Password</label>
				<input type="password" value={confirm} name="checked_password" onChange={handleConfirmValue} />
				<br />
				<button>Register</button>
			</form>
		</div>
	);
};

export default withRouter(RegisterPage);