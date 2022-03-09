const Boom = require('@hapi/boom');
const Sentry = require("@sentry/node");
const {config} = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');
Sentry.init({
    dsn: config.sentryDSN,
    tracesSampleRate: 1.0,
});

function withErrorStack(err,stack){
    if(config.dev){
        return {...err, stack}
    }
}

function logErrors(err, req, res, next){
    console.log(err);
    Sentry.captureException(err);
    next(err);
}

function wrapErrors(err, req, res, next){
    if(!err.isBoom){
        next(Boom.badImplementation());
    }
    next(err);
}

function clientErrorHandler(err, req, res, next){
    const {
        output: {statusCode, payload}
    }=err;
    // catch errors for Ajax request or if and error ocurrs while streaming
    if(isRequestAjaxOrApi(req) || req.headersSent){
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    }else{
        next(err);
    }
}
function errorHandler(err, req, res, next){
    const {
        output: {statusCode, payload}
    }=err;
    
    res.status(statusCode);
    res.render(withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
};