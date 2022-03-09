const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: {type: String},
	price: {type:Number},
	image: {type: String},
	tags: [String]
},{
	timestamps: true
});

module.exports = model('Product',productSchema);