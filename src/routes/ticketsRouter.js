const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { createTicket, getTickets, getTicketById, getAllTickets } = require('../controllers/tickets');
const { validateJWT } = require('../../middlewares/validate-jtw');
const { validateField } = require('../../middlewares/validateFields');
const { isTicketById } = require('../../helpers/validator');
const { isAdminRole } = require('../../middlewares/validate-role');


//get user ticket
router.get('/ticket',[
    validateJWT,
    validateField
],getTickets);

// get all ticket
router.get('/ticket/all',[
    validateJWT,
    isAdminRole,
    validateField
],getAllTickets);

//get ticket by Id
router.get('/ticket/:id',[
check('id', 'This is not a Mongo id').isMongoId(),
check('id').custom(isTicketById),
validateField,
],getTicketById);


// create ticket
router.post('/ticket',[
    validateJWT,
    check('email','Invalid Email').isEmail(),
    check('username', 'username is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('username', 'username is required').not().isEmpty(),
    validateField
],createTicket);


/*
// update user
router.put('/user/:id',[
    check('id','is not a valid id in MongoDB').isMongoId(),
   // check('id').custom(isUserById),
    validateField
],updateUser,);

// delete user
router.delete('/user/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'The id is not valid').isMongoId(),
   // check('id').custom(isUserById),
   
    validateField
],deleteUser)*/

module.exports = router;