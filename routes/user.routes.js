const express = require('express')
const { getAllUser, signUp, login, getOneUser, putOneUser, deleteOneUser } = require('../controllers/user.controller')
const router = express.Router()

router.get('/', getAllUser)
router.get('/:id', getOneUser)
router.post('/signup', signUp)
router.post('/login', login)
router.put('/:id', putOneUser)
router.delete('/:id', deleteOneUser)

module.exports = router