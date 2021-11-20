import React, { useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router';

const LandingPage = (props) => {
	useEffect(() => {
		axios.get('/api/hello')
		.then(res => console.log(res))
	}, [])

	const onClickHandler = async () => {
		try {
			const { data } = await axios.get('/api/users/logout')
			if(data.success) props.history.push("/login")
			else alert('fail to logout')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="wrapper">
			<h2>시작 페이지</h2>
			<button onClick={onClickHandler}>Logout</button>
		</div>
	);
};

export default withRouter(LandingPage);