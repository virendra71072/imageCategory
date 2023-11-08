const constant      = require(__basePath + '/app/config/constant');
const config        = require(constant.path.app + 'core/configuration');


module.exports = function (app) {
    //Setting dependencies
    app.set('di', {
        constant: constant,
        config  : config
    });

    //Applying Security Module
    //app.use(security.check);

    //Application Modules to load
    app.use('/api/v1/monitor', require(constant.path.module + 'assembly/monitor').router);
    app.use('/api/v1/user', require(constant.path.module + 'assembly/user').router);
    app.use('/api/v1/photo', require(constant.path.module + 'assembly/photo').router);
   
};
