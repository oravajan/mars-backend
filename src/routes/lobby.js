const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const verifyTokenIfPresent = require('../middleware/verifyTokenIfPresent');
const lobbyController = require('../controllers/lobbyController');

router.post('/create', auth, lobbyController.createLobby);

router.post('/join', auth, lobbyController.joinLobby);

router.get('/list', verifyTokenIfPresent, lobbyController.listLobbies);

module.exports = router;
