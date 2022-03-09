const Joi = require('joi');

const producIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagsSchema = Joi.array().items(Joi.string().min(1).max(10));

const createProductSchema = Joi.object({
    name: Joi.string()
        .max(50)
        .required(),
    price: Joi.number()
        .min(1)
        .max(1000000),
    image: Joi.string().required(),
    tags:productTagsSchema
});

const updateProductSchema = Joi.object({
    name: Joi.string()
        .max(50),
    price: Joi.number()
        .min(1)
        .max(1000000),
    image: Joi.string(),
    tags: productTagsSchema
});

module.exports = {
    producIdSchema,
    productTagsSchema,
    createProductSchema,
    updateProductSchema
}