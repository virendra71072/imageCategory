const constant  = require(__basePath + 'app/config/constant');
const router    = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const photo       = require(constant.path.module + 'assembly/photo/photoAssembly');
const validation    = require(constant.path.module + 'assembly/photo/photoValidation');

/*
 * Router list
 */

router.post(
    '/set',
    validation.set,
    photo.set
);


router.get(
    '/getImages/:userId',
    validation.getImages,
    photo.getImages
);

module.exports = {
    router: router
};
