const constant         = require(__basePath + 'app/config/constant');
const validationHelper = require(constant.path.app + 'util/validation');
const responseHelper   = require(constant.path.app + 'util/response');

exports.checkAndCreateUser = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let querySchema = {};

    let bodySchema = {
        name : {
            notEmpty: true
        },
        phone : {
            notEmpty: true
        },
        emails : {
            notEmpty: true
        },
        instagramId : {
            notEmpty: true
        }
    }

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};

exports.checkTokenAndCreateUser = function (req, res, next) {
    let headerSchema = {};

    let schema = {};

    let querySchema = {};

    let bodySchema = {
        token : {
            notEmpty: true
        }
    }

    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkQuery(querySchema);
    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {

        // Checking for validation errors
        if (false === result.isEmpty()) {
            return res.status(400).json(responseHelper.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        }

        next();
    });
};
