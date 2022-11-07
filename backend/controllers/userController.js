const db = require('../models')
const User = db.users
const Token = db.tokens
const crypto = require('crypto')
const { sendEmail } = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')


exports.addUser = async (req, res) => {
     const { username, email, password } = req.body
     // check email if already registered
     let user = await User.findOne({ where: { email: email } })
     if (!user) {
          let userinfo = {
               username: username,
               email: email,
               password: password
          }
          const user1 = await User.create(userinfo)
          if (!user1) {
               return res.status(400).json({ error: "Something went wrong" })
          }
          // create token for verifying user
          let tokeninfo = {
               token: crypto.randomBytes(16).toString('hex'),
               userId: user1.userId
          }
          const token = await Token.create(tokeninfo)
          if (!token) {
               return res.status(400).json({ error: "something went wrong" })
          }

          // send token in email
          const url = `http://localhost:3000/emailConfirm/${token.token}`
          sendEmail({
               from: "noreply@something.com",
               to: email,
               subject: "Verification Email",
               text: " Please click on the verify email button or go to the link to verify your email." + url,
               html: `<a href='${url}'><button>Verify email.</button></a>`
          })
          res.send(user1)

     }
     else {
          // if user is already registered.
          return res.status(400).json({ error: "User/Email already exists" })
     }

}

// user verification
exports.userConfirmation = async (req, res) => {
     const token = await Token.findOne({ where: { token: req.params.token } })
     if (!token) {
          return res.status(400).json({ error: "Token not found, or may have expired" })
     }
     let user = await User.findOne({ where: { userId: token.userId } })
     if (!user) {
          return res.status(400).json({ error: "User not found." })
     }
     
     user.isVerified = true
     user = await user.save()

     if (!user) {
          res.status(400).json({ error: "something went wrong" })
     }
     res.status(200).json({ message: "User verified successfully." })

}


// resend confirmation
exports.resendConfirmation = async (req, res) => {
     // check if user already exists or not
     let user = await User.findOne({ where: { email: req.body.email } })
     if (!user) {
          return res.status(400).json({ error: "User does not exist.Please register" })
     }
     // check if user is already verified or not
     if (user.isVerified) {
          return res.status(400).json({ error: "User is already verified. Login to continue" })
     }
     // generate token and send verification email
     let tokeninfo = {
          token: crypto.randomBytes(16).toString('hex'),
          userId: user.userId
     }
     const token = await Token.create(tokeninfo)
     if (!token) {
          return res.status(400).json({ error: "something went wrong" })
     }
     // send token to user email
     const url = `http://localhost:3000/emailConfirm/${token.token}`

     sendEmail({
          from: "noreply@something.com",
          to: user.email,
          subject: "Verification Email",
          text: " Please click on the verify email button or go to the link to verify your email." + url,
          html: `<a href='${url}'><button>Verify email.</button></a>`
     })

     res.status(200).json({ message: "Verication email has been sent to your email." })
}

// forget password
exports.forgetpassword = async (req, res) => {
     //check if the email is  registered or not
     let user = await User.findOne({ where: { email: req.body.email } })
     if (!user) {
          return res.status(400).json({ error: "Email does not exist. Please first register" })
     }

     // generate token and send password reset link in email
     let tokeninfo = {
          token: crypto.randomBytes(16).toString('hex'),
          userId: user.userId
     }
     const token = await Token.create(tokeninfo)
     if (!token) {
          return res.status(400).json({ error: "something went wrong" })
     }
     // send token in email

     const url = `http://localhost:3000/resetpassword/${token.token}`
     sendEmail({
          from: "noreply@something.com",
          to: user.email,
          subject: "Password Reset Link",
          text: " Please click on Reset password button or go to the link to reset your password." + url,
          html: `<a href='${url}'><button>RESET PASSWORD.</button></a>`
     })

     return res.status(200).json({ message: "Password reset link has been sent to your email." })
}


// resetpassword
exports.resetPassword = async (req, res) => {
     let token = await Token.findOne({ where: { token: req.params.token } })
     if (!token) {
          return res.status(400).json({ error: "Token not found. or may have expired" })
     }
     let user = await User.findOne({ where: { userId: token.userId } })
     if (!user) {
          return res.status(400).json({ error: "User not found." })
     }
     user.password = req.body.password
     user = await user.save()
     if (!user) {
          return res.status(400).json({ error: "Something went wrong" })
     }
     res.status(200).json({ message: "Password reset successfully." })
}


// signin process
exports.signIn = async (req, res) => {
     const { email, password } = req.body
     // check if the email exists or not
     let user = await User.findOne({ where: { email: email } })
     if (!user) {
          return res.status(400).json({ error: "Email does not exist. Please first register" })
     }
     // check if email and password match or not
     if (!user.authenticate(password)) {
          return res.status(400).json({ error: "Provided credentials does not match." })
     }
     // check if user is verified or not
     if (!user.isVerified) {
          return res.status(400).json({ error: "User is not verified.First verify your account to continue" })
     }
     // generate jwt
     const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET)

     // send information to user, save in cookie
     res.cookie('myCookie', token, { expire: Date.now() + 86400 })
     const { username, userId, role } = user

     res.status(200).json({ token, user: { userId, username, email, role } })
}


// signout
exports.signOut = (req, res) => {
     res.clearCookie('myCookie')
     return res.status(200).json({ message: "Signed out successfully" })
}

// authorization
//if jwt token is found,verifies that user is signedIn else returns false
exports.requireSignin = expressjwt({
     secret: process.env.JWT_SECRET,
     algorithms: ['HS256']
})


// update user
exports.updateUser = async (req, res) => {
     let userinfo = {
          email: req.body.email,
          username: req.body.username,
     }
     await User.update(userinfo, { where: { userId: req.params.id } })
          .then(user => {
               if (!user) {
                    return res.status(400).json({ error: "user not found." })
               }
          })
     let user = await User.findOne({ where: { userId: req.params.id } })
     res.send(user)

}


// deleteUser
exports.deleteUser = async (req, res) => {
     await User.destroy({ where: { userId: req.params.id } })
          .then(user => {
               if (!user) {
                    return res.status(400).json({ error: "User not found." })
               }
               else {
                    return res.status(200).json({ message: "User deleted successfully." })
               }
          })
          .catch(err => res.status(400).json({ error: err }))
}


// view all users available
exports.userList = async (req, res) => {
     let users = await User.findAll({})
     if (!users) {
          return res.status(400).json({ error: "Something went wrong." })
     }
     res.send(users)
}


// view user details
exports.userDetails = async (req, res) => {
     let user = await User.findOne({ where: { userId: req.params.id } })
     if (!user) {
          return res.status(400).json({ error: "User not found.Please first register to continue. " })
     }
     res.send(user)
}