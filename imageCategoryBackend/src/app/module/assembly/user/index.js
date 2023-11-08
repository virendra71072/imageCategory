const constant  = require(__basePath + 'app/config/constant');
const router    = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const user       = require(constant.path.module + 'assembly/user/userAssembly');
const validation    = require(constant.path.module + 'assembly/user/userValidation');

/*
 * Router list
 */

router.post(
    '/checkAndCreateUser',
    validation.checkAndCreateUser,
    user.checkAndCreateUser
);

router.post(
    '/checkTokenAndCreateUser',
    validation.checkTokenAndCreateUser,
    user.checkTokenAndCreateUser
);


module.exports = {
    router: router
};
