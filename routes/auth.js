const express = require('express');
const { addMember } = require('../controllers/addMember');
const { authenticate } = require('../controllers/authenticate');
const { boardPage } = require('../controllers/boardPage');
const { createBoard } = require('../controllers/createBoard');
const { getBoards } = require('../controllers/getBoards');
const { getMembers } = require('../controllers/getMembers');
const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');
const { signup } = require('../controllers/signup');
const { updateBoard } = require('../controllers/updateBoard');
var router = express.Router();

//Creating a new user
router.post('/signupRoute', signup)

//login for user
router.post('/loginRoute', login)

//Authenticate the Dashboard route of a user
router.get('/authenticate', authenticate)

//logout the user session
router.get('/logout', logout)

//Get all the members list
router.get('/getMembers', getMembers)

//Create a new Board 
router.post('/createBoard', createBoard)

//Find all boards associated to a user
router.get('/getBoards/:id', getBoards)

//Board Page
router.get('/boardPage/:id', boardPage)

//Update the Board's list
router.post('/updateBoard/:id', updateBoard)

//Add members to the Board's list
router.post('/addMember/:id', addMember)

module.exports = router