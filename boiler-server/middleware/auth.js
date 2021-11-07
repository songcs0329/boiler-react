const { User } = require('../models/User')

let auth = (req, res, next) => {
	// 인증처리

	// 클라이언트 쿠키에서 토큰값 가져옴
	let token = req.cookies.x_auth
	// 토큰값 디코드 후 유저를 찾음
	User.findByToken(token, (err, user) => {
		if(err) throw err
		if(!user) {
			return res.json({
				isAuth: false,
				error : true
			})
		}
		req.token = token
		req.user = user
		next()
	})
	// 유저가 있을 경우 인증 O

	// 없을 경우 X
}

module.exports = {
	auth
}