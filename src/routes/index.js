const express = require('express');
const router = express.Router();

// import controllers
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { addLiterature, getLiteratures, getLiterature, updateLiterature, deleteLiterature, getLiteratureByuser, getLiteraturesByStatus } = require('../controllers/literatureController');

// import middlewares
const { uploadImage, uploadPdf } = require('../middlewares/uploadFile');
const { auth, adminOnly } = require('../middlewares/auth');
const { register, login, checkAuth } = require('../controllers/authController');
const { addCollection, getCollections, deleteCollection } = require('../controllers/collectionController');

// routes user
router.post('/profile', addUser);
router.get('/profile', getUsers);
router.get('/profile/:id', getUser);
router.patch('/profile/:id', uploadImage('avatar'), updateUser);
router.delete('/profile/:id', deleteUser);

// routes literature
router.post('/literature', auth, uploadPdf('attach'), addLiterature);
router.get('/literature', getLiteratures);
router.get('/literature/:id', getLiterature);
router.patch('/literature/:id', updateLiterature);
router.get('/literature/status/:status', getLiteraturesByStatus);
router.get('/profile/:profile_id/literature', getLiteratureByuser);
router.delete('/literature/:id', deleteLiterature);

// routes collection
router.post('/collection/:profile_id', addCollection);
router.get('/collection/:profile_id', getCollections);
router.delete('/collection/:id', deleteCollection);

// routes auth
router.post('/register', register);
router.post('/login', login);
router.get('/checkauth', auth, checkAuth);

module.exports = router;
