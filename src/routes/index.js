const express = require('express');
const router = express.Router();

// import controllers
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { addLiterature, getLiteratures, getLiterature, updateLiterature, deleteLiterature } = require('../controllers/literatureController');

// import middlewares
const { uploadImage, uploadPdf } = require('../middlewares/uploadFile');
const { auth, adminOnly } = require('../middlewares/auth');
const { register, login, checkAuth } = require('../controllers/authController');

// routes user
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id', uploadImage('image'), updateUser);
router.delete('/users/:id', deleteUser);

// routes literature
router.post('/literature', uploadPdf('attach'), addLiterature);

// routes auth
router.post('/register', register);
router.post('/login', login);
router.get('/checkauth', auth, checkAuth);

module.exports = router;
