const constant = require(__basePath + 'app/config/constant');
const config   = require(constant.path.app + 'core/configuration');
const response = {};

response.build = function (key, response) {
    const responseObj = config.get("APP_MESSAGES:" + key);

    return {
        status       : key === 'SUCCESS',
        statusCode   : responseObj.errorCode,
        statusMessage: responseObj.message,
        response     : response || {}
    };
};

module.exports = response;
