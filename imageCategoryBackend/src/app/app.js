const constant      = require(__basePath + 'app/config/constant');
const app           = require('express')();
const bodyParser    = require('body-parser');
const validator     = require('express-validator');
const utility       = require(constant.path.app + 'util/utility');
const config        = require(constant.path.app + 'core/configuration');
const nodeEnv       = config.get('server:index:env');

//Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Headers: X-Requested-With');
    res.header('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Accept, Origin, Authorization, stripe-signature");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator({}));

try{
    if (nodeEnv != 'development') {
        require('elastic-apm-node').start({
          serviceName: 'Billing-API',
          secretToken: '',
          serverUrl: config.get('kibana:elkUrl')
        });
    }

} catch(e) {
    console.log('Exception',e)
}


/*
 * Injecting all dependencies
 * Modules + common libs
 */
require(constant.path.app + 'config/dependency')(app);

/*
 * catch 404
 */
app.use(function (req, res) {
    return res.status(400).json({
        status : false,
        message: '404 - Page Not found'
    });
});

/*
 * catch 404 and forward to error handler
 */
app.use(function (err, req, res, next) {
    //req.app.get('di').log.logger.error(err.message);

    return res.status(err.status || 500).json({
        status  : false,
        message : err.message,
        code    : err.code,
        response: err.response
    });
});


module.exports = app;
