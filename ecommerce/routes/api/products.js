const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../../controllers/api/productscontrollers.js');
const validation = require('../../utils/middlewares/validationHandler');
const passport = require('passport');
const {
    producIdSchema, 
    productTagsSchema, 
    createProductSchema,
    updateProductSchema 
} = require('../../utils/shemas/products');

// Jwt strategy
require('../../utils/auth/estrategies/jwt');

router.get('/',getProducts);
router.get('/:id',getProduct);
router.post('/',validation(createProductSchema),createProduct);
router.put('/:id',
    passport.authenticate('jwt',{session:false}),
    validation(producIdSchema, "params"),
    validation(updateProductSchema),updateProduct);
router.delete('/:id',
    passport.authenticate('jwt', {session:false}),
    deleteProduct);

module.exports = router;