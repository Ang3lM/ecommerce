const express = require('express');
const router = express.Router();
const { getProducts } = require('../../controllers/views/productscontroller_v');

router.get('/',getProducts);

module.exports = router;