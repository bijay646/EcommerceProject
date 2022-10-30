const express = require('express')
const userController = require('../controllers/userController')
const {userRules,validate}= require('../validation/validator')
const router = express.Router()

router.post('/register',userRules,validate,userController.addUser)
router.get('/verifyUser/:token', userController.userConfirmation)
router.post('/resendconfirmation', userController.resendConfirmation)
router.post('/forgetpassword', userController.forgetpassword)
router.post('/resetpassword/:token', userController.resetPassword)
router.post('/signin', userController.signIn)
router.get('/signout', userController.signOut)
router.put('/updateuser/:id',userController.requireSignin, userController.updateUser)
router.delete('/deleteuser/:id', userController.requireSignin,userController.deleteUser)
router.get('/userlist', userController.userList)
router.get('/userdetails/:id', userController.userDetails)

module.exports = router