const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email : {
		type: String,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
})

userSchema.pre('save', function(next) {
	var user = this

	if(user.isModified('password')) {
		// 비밀번호 암호화(변경있을 때)
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if(err) return next(err)
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err)
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
	var user = this
	// plainPassword: 프론트 입력값
	bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
		if(err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function(cb) {
	var user = this
	// jsonwebtoken 이용해 토큰생성
	const token = jwt.sign(user._id.toHexString(), 'secretToken')
	user.token = token
	user.save(function(err, user) {
		if(err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function(token, cb) {
	var user = this
	jwt.verify(token, 'secretToken', function(err, decode) {
		// 유저 아이디를 이용해 유저를 찾는다.
		// 클라이언트에서 갖고온 token과 DB에 보관된 토큰 일치 확인
		user.findOne({ "_id": decode, "token": token }, function(err, user) {
			if(err) return cb(err)
			cb(null, user)
		})
	})
}

const User = mongoose.model('User', userSchema)

module.exports = {
	User
}