import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../_actions/users'

export default function Auth(SpecificComponent, option, adminRoute = null) {
	function AuthenticationCheck(props) {
		const dispatch = useDispatch()
		useEffect(() => {
			dispatch(authUser()).then(response => {
				console.log(response);
				if(!response.payload.isAuth) {
					// 비로그인
					if(option) {
						props.history.push("/login")
					}
				} else {
					// 로그인
					if(adminRoute && !response.payload.isAdmin) {
						props.history.push("/")
					} else {
						if(!option) {
							props.history.push("/")
						}
					}
				}
			})
		}, [dispatch, props.history])

		return (
			<SpecificComponent />
		)
	}


	return AuthenticationCheck
}