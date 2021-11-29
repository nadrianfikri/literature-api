const express = require('express');
const router = express.Router();

// import controllers
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { addLiterature, getLiteratures, getLiterature, updateLiterature, deleteLiterature, getLiteratureByuser, getLiteraturesByStatus } = require('../controllers/literatureController');

// import middlewares
const { uploadImage, uploadPdf } = require('../middlewares/uploadFile');
const { auth, adminOnly } = require('../middlewares/auth');
const { register, login, checkAuth } = require('../controllers/authController');
const { addCollection, getCollections, deleteCollection, getCollection } = require('../controllers/collectionController');

// routes user
router.post('/profile', addUser);
router.get('/profile', getUsers);
router.get('/profile/:id', getUser);
router.patch('/profile/:id', auth, uploadImage('avatar'), updateUser);
router.delete('/profile/:id', auth, deleteUser);

// routes literature
router.post('/literature', auth, uploadPdf('attach', 'thumbnail'), addLiterature);
router.get('/literature', auth, adminOnly, getLiteratures);
router.get('/literature/:id', auth, getLiterature);
router.get('/literature/status/:status', auth, getLiteraturesByStatus);
router.get('/profile/:profile_id/literature', getLiteratureByuser);
router.patch('/literature/:id', auth, adminOnly, uploadPdf('attach'), updateLiterature);
router.delete('/literature/:id', auth, deleteLiterature);

// routes collection
router.post('/collection/:id', auth, addCollection);
router.get('/collection/:id', auth, getCollection);
router.get('/collection/profile/:profile_id', auth, getCollections);
router.delete('/collection/:id', auth, deleteCollection);

// routes auth
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

module.exports = router;
