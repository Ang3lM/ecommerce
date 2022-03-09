const Product = require('../../models/Product');
const {config} = require('../../config');
const { cacheResponse } = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time');

const getProducts = async (req, res,next) => {
    const {tags} = req.query;
    cacheResponse(res,FIVE_MINUTES_IN_SECONDS);
    try {
        if(tags){
            const data = {tags: {$in: tags}};
            var products = await Product.find(data);
        }else{
            var products = await Product.find();
        }
        res.render('products',{products, dev:config.dev});
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getProducts
}