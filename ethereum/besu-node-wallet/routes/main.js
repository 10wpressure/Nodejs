const express = require('express');
const router = express.Router();

const { getBalance, sendEther } = require('../controllers/main');

// const authMiddleware = require('../middleware/auth');

router.route('/givemetheether').post(ether);
router.route('/balance').post(balance);

module.exports = router;
