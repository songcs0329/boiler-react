import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export const loginUser = async forms => {
	try {
		const { data } = await axios.post('/api/users/login', forms)
		return {
			type: LOGIN_USER,
			payload: data
		}
	} catch (error) {
		console.log(error)
	}
}

export const registerUser = async forms => {
	try {
		const { data } = await axios.post('/api/users/register', forms)
		return {
			type: REGISTER_USER,
			payload: data
		}
	} catch (error) {
		console.log(error)
	}
}

export const authUser = async () => {
	try {
		const { data } = await axios.get('/api/users/auth')
		return {
			type: AUTH_USER,
			payload: data
		}
	} catch (error) {
		console.log(error)
	}
}