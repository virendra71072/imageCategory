const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const imagesModel           = require(constant.path.app + 'module/model/database/imagesModel');
const usersModel            = require(constant.path.app + 'module/model/database/usersModel');
const baseModel            = require(constant.path.app + 'module/model/system/baseModel');
const underscore            = require('underscore');
const moment                = require('moment'); 
const Instagram             = require('node-instagram').default;
 
const usersModelObj         = new usersModel();
const baseModelObj         = new baseModel();
 
/*
 * Check & Create User
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.checkAndCreateUser = (req, res, next) => {
    let name  = req.body.name || "";
    let username    = req.body.username || "";
    let token    = req.body.token || "";
    let instagramId    = req.body.instagramId || "";

    //check User details
    let checkUserByUsername = function() {
        return new Promise((resolve, reject) => {
            usersModelObj.checkUserByUsername(username, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let insertUser = function() {
        return new Promise((resolve, reject) => {
            let params = {
                name,
                token,
                username,
                instagramId
            }
            usersModelObj.createUser(params, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    checkUserByUsername().then((result) => {
        if (utility.isEmpty(result) == true) {

            return insertUser();
        } else {
            return result;
        }
    }).then((result) => {    
        return checkUserByUsername();
    }).then((result) => {    
        
        return res.status(200).json(response.build('SUCCESS', result));
        
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    })
    
};

/*
 * Check token & Create User
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.checkTokenAndCreateUser = (req, res, next) => {
    let token  = req.body.token || "";

    let name = "";
    let username= "";
    let instagramId = "";
    let userInfo = "";

    let vaildateToken = function() {
        const instagram = new Instagram({
          clientId: constant.instagram.clientId,
          clientSecret: constant.instagram.clientSecret,
          accessToken: token
        });

        return new Promise((resolve, reject) => {
            instagram.get('users/self', (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let fetchMedia = function(instagramId) {
        const instagram = new Instagram({
          clientId: constant.instagram.clientId,
          clientSecret: constant.instagram.clientSecret,
          accessToken: token
        });

        return new Promise((resolve, reject) => {
            instagram.get('users/'+instagramId+'/media/recent', (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    //check User details
    let checkUserByUsername = function(username) {
        return new Promise((resolve, reject) => {
            usersModelObj.checkUserByUsername(username, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let insertUser = function() {
        let params = {
            name,
            token,
            username,
            instagramId
        }

        return new Promise((resolve, reject) => {
            
            usersModelObj.createUser(params, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    let updateUser = function() {
        return new Promise((resolve, reject) => {
            let params = {
                name,
                token,
                username,
                instagramId
            }
            usersModelObj.updateUser(params, (error, result) => {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });
    }

    vaildateToken().then((result) => {
        if (utility.isEmpty(result) == false) {
            name = result.data.full_name;
            username = result.data.username;
            instagramId = result.data.id;
        
            return checkUserByUsername(username);
        } else {
            return res.status(500).json(response.build('INVALID_SOURCE_TOKEN'));
        }
    }).then((result) => {    
        if (utility.isEmpty(result) == true) {
            return insertUser();
        } else {
            return updateUser();
        }
    }).then((result) => {    
        return checkUserByUsername(username);
    }).then((result) => {    
        userInfo = result[0];
        return fetchMedia(instagramId);
    }).then((result) => {    
        let userId = userInfo['id'];

        if (utility.isEmpty(result) == false) {
            underscore.map(result.data, function(images) {
                let imageUrl = images.images.standard_resolution.url;
                baseModelObj.sendRequest(
                    'POST',
                    config.get('server').index.url +'api/v1/photo/set',
                    {},
                    {
                        "userId" : userId,
                        "image" : imageUrl
                    },
                    {},
                    (error, result, body) => {

                    }
                );
            })
        }

        let output = {
            userId: userInfo['id'],
            name: userInfo['name'],
            instagramId: userInfo['instagramId'],
        }
        
        return res.status(200).json(response.build('SUCCESS', output));
        
    }).catch((error) => {
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', error));
    })
    
};
