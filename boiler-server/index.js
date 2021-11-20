const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
	res.send('Hello LandingPage.')
})

app.post('/api/users/register', (req, res) => {
	const user = new User(req.body)

	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err })
		return res.status(200).json({
			success: true
		})
	})
})

app.post('/api/users/login', (req, res) => {
	// 요청된 이메일 디비에서 찾기
	User.findOne({ email: req.body.email }, (err, user) => {
		if(!user) {
			return res.json({
				loginSuccess: false,
				message: "제공된 이메일에 해당하는 유저가 없습니다."
			})
		}

		// 요청된 이메일 있을 경우 비밀번호 일치하는 지 확인
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) {
				return res.json({
					loginSuccess: false,
					message: "비밀번호가 틀렸습니다."
				})
			}
			
			// 이메일, 비밀번호 일치할 경우 토큰 생성
			user.generateToken((err, user) => {
				if(err) return res.status(400).send(err)

				// 토큰을 저장한다. (쿠키, 로컬스토리지...)
				res.cookie("x_auth", user.token)
				.status(200)
				.json({
					loginSuccess: true,
					userId: user._id
				})
			})
		})
	})
})

app.get('/api/users/auth', auth, (req, res) => {
	// 여기까지 미들웨어를 통과했다는 말은 인증이 true
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image
	})
})

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: "" },
		(err, user) => {
			if(err) return res.json({
				success: false,
				err
			})
			return res.status(200).send({
				success: true,
			})
		}
	)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})