const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const imagesModel           = require(constant.path.app + 'module/model/database/imagesModel');
const usersModel            = require(constant.path.app + 'module/model/database/usersModel');
const underscore            = require('underscore');
const moment                = require('moment'); 
const pd                    = require('paralleldots');
 
// Be sure to set your API key
pd.apiKey = constant.paralleldotsKey;

const imagesModelObj  = new imagesModel();
const usersModelObj   = new usersModel();
 
/*
 * Fetch Plan list
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.set = (req, res, next) => {
    let userId  = req.body.userId;
    let image    = req.body.image;

    //check User details
    let getUserDetails = function() {
        return new Promise((resolve, reject) => {
            usersModelObj.getUserDetails(userId, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let checkImageExiting = function() {
        return new Promise((resolve, reject) => {
            imagesModelObj.checkImage(userId, image, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let insertImage = function(tags) {
        return new Promise((resolve, reject) => {
            let params = {
                userId,
                image,
                tags
            }

            imagesModelObj.insertImage(params, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    getUserDetails().then((result) => {

        if (utility.isEmpty(result)== false) {
            return checkImageExiting();
        } else {
            return res.status(200).json(response.build('ERROR_USER_NOT_EXISTS'));
        }
    }).then((result) => {

        if (utility.isEmpty(result) == false) {
            return false;
        } else {
            return pd.objectRecognizer(image,type='url');
        }
    }).then((result) => {
        
        if (result == false) {
            return true;
        } else {
            result = (result)? JSON.parse(result): null;
            
            if (utility.isEmpty(result) == false && underscore.has(result, 'output') == true && utility.isEmpty(result.output) == false) {
                let tags = '';
                underscore.map(result.output, function(value){
                     tags +=  value.tag+',';
                })

                return insertImage(tags);
            } else {
                return insertImage('others');
            }
        }
    }).then((result) => {    
        return res.status(200).json(response.build('SUCCESS', true));
        
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    })
    
};

/*
 * fetch all images along with tags using userId
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.getImages = (req, res, next) => {
    let userId  = req.params.userId;

    //check User details
    let getUserDetails = function() {
        return new Promise((resolve, reject) => {
            usersModelObj.getUserDetails(userId, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let getImages = function() {
        return new Promise((resolve, reject) => {
            imagesModelObj.getAllImageByUser(userId, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }


    getUserDetails().then((result) => {

        if (utility.isEmpty(result)== false) {
            return getImages();
        } else {
            return res.status(200).json(response.build('ERROR_USER_NOT_EXISTS'));
        }
    }).then((result) => {
        let imagesList = {};
        if (utility.isEmpty(result) == false) {

            underscore.map(result, function(value){
                let tags = value.tags.split(",");
                underscore.map(tags, function(category){
                    category = category.trim();
                    if (utility.isEmpty(category) == false) {
                        if (underscore.has(imagesList,category) == true) {
                            imagesList[category].push(value.image);
                        } else {
                            imagesList[category] = []
                            imagesList[category].push(value.image);
                        }
                    }
                }) 
            })
        }

        return imagesList;
    }).then((result) => {    
        return res.status(200).json(response.build('SUCCESS', result));
        
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    })
    
};