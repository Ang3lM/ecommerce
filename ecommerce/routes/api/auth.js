const express = require('express');
const router = express.Router();
const auth = require('../../controllers/api/authcontrollers');

router.post("/token", auth);

module.exports = router;