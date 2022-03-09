const Product = require('../../models/Product');
const { cacheResponse } = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINITUS_IN_SECONDS } = require('../../utils/time');

const getProducts = async (req,res,next) => {
    const {tags} = req.query;
    cacheResponse(res,FIVE_MINUTES_IN_SECONDS);
    try {
        if(tags){
            const data = {tags: {$in: tags}};
            var products = await Product.find(data);
        }else{
            var products = await Product.find();
        }
        res.json({
            data: products,
            message: "Successfull Products"
        });
    } catch(err) {
        next(err);
    }
}
const getProduct = async (req,res,next) => {
    cacheResponse(res,SIXTY_MINITUS_IN_SECONDS);

    try {
        const product = await Product.findById(req.params.id);

        res.json({
            data: product,
            "message":"Successfull product"
        });
    } catch(err) {
        next(err);

    }

}
const createProduct = async (req,res,next) => {
    try {
        const {name, price, image, tags} = req.body;
        const newProduct = new Product({
            name,
            price,
            image,
            tags 
        });
        await newProduct.save();
        res.json({
            data: newProduct._id,
            message: 'Successfull registration'
        });
    } catch(err) {
        next(err);
    }
    

}
const updateProduct = async (req,res,next) => {
    try {
        const { name, price, image, tags } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id,{
            name,
            price,
            image,
            tags
        });
        res.status(200).json({
            data: product,
            message:'products update'
        });
    } catch(err) {
        next(err);

    }

}
const deleteProduct = async (req,res,next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'data':product,
            'message':'poduct removed  with success'
        });
    } catch(err) {
        next(err);
        
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}