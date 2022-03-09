const Joi = require('joi');
const Boom = require('@hapi/boom');

function validatee(data, schema){
    const {id} = data;
    
    if(id){
        var {error} = schema.validate(data.id);
    }else{
        var {error} = schema.validate(data);
        
    }
    
    return error;   
}
function validationHandler(schema, check="body"){
    return function(req,res,next){
        const error = validatee(req[check], schema);
        error ? next(Boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;