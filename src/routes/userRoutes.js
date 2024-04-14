const express = require('express');
const router = express.Router();
const {register,getTask, login, deleteUser, updateUser, getAllUser} = require('../controllers/user');
const { check } = require('express-validator');
const { validateField } = require('../../middlewares/validateFields');
const { validateJWT } = require('../../middlewares/validate-jtw');
const { isUserById } = require('../../helpers/validator');

const {validationResult} = require('express-validator')

router.get('/user',getTask);

router.get('/allUsers',getAllUser);

// register user
router.post('/user/register',[
    check('email','Invalid Email').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'password is required (Min 6 characters)').isLength({min:6}),
    check('role','invalid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    validateField
],register);

//login 
router.post('/user/login',[
    check('email','Invalid Email').isEmail(),
    check('password', 'password is required (Min 6 characters)').not().isEmpty(),
    validateField
],login);

// update user
router.put('/user/:id',[
    check('id','is not a valid id in MongoDB').isMongoId(),
   // check('id').custom(isUserById),
    validateField
],updateUser,);

// delete user
router.delete('/user/:id',[
    //validateJWT,
    check('id', 'The id is not valid').isMongoId(),
   // check('id').custom(isUserById),
   
    validateField
],deleteUser)

module.exports = router;
