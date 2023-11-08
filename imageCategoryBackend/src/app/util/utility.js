const constant   = require(__basePath + 'app/config/constant');
const underscore = require('underscore');
const uuIdv4     = require('uuid/v4');
const moment     = require('moment');
const crypto     = require('crypto');

const utility = {};

/**
 * Generate a valid V4 UUID
 * @return string
 */
utility.uuid = function () {
    return uuIdv4();
};

/**
 * check string is valid or return default value
 * @param {string} value
 * @param {string} defaultValue
 *
 * @return string
 */
utility.validOrDefault = function (value, defaultValue = '') {
    return (utility.isEmpty(value) === false) ? value : defaultValue;
};

/**
 * Check any object, array, string, number, boolean is empty or not.
 *
 * @param obj
 * @return {boolean}
 */
utility.isEmpty = function (obj) {
    if (underscore.isNumber(obj) || underscore.isBoolean(obj)) {
        return false;
    }

    return underscore.isEmpty(obj);
};

/**
 * check variable is exit or not
 *
 * @return boolean
 */
utility.isset = function (params) {
    return typeof params !== 'undefined';
};

/**
 * get date different in (Years/months/days)
 *
 * @return number
 * @param date1
 * @param date2
 * @param differentFormat
 */
utility.dateDifference = function (date1, date2 = new Date(), differentFormat = 'years') {
    let startDate = moment(date1).format('YYYY-MM-DD');
    let endDate   = moment(date2).format("YYYY-MM-DD");

    return moment(endDate).diff(startDate, differentFormat);
};

/**
 * get time different in (days/hours/minutes/second)
 *
 * @return number
 * @param date1
 * @param date2
 * @param differentFormat
 */
utility.timeDifference = function (date1, date2 = new Date(), differentFormat = 'hours') {
    var startDate = moment(date1, 'YYYY-M-DD HH:mm:ss');
    var endDate = moment(date2, 'YYYY-M-DD HH:mm:ss');

    return endDate.diff(startDate, 'hours');
};

utility.encryptString = function (plaintext, secretKey, iv) {
    let padding = 16 - (plaintext.length % 16);
    plaintext   = plaintext + "_".repeat(padding);

    let cipher = crypto.createCipheriv('aes-128-cbc', secretKey, new Buffer(iv));
    return cipher.update(plaintext, 'utf8', 'base64') + cipher.final('base64');
};

utility.decryptString = function (plaintext, secretKey, iv) {

    let decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, iv);
    decipher.setAutoPadding(false);
    return decipher.update(plaintext, 'base64', 'utf8');
};


/**
 * Base 64 encode
 * @param data
 * @returns {String}
 */
utility.base64Encode = function (data) {
    if (utility.isEmpty(data) === true) {
        return data;
    }

    let buffer = new Buffer(data);
    return buffer.toString('base64');
};

/**
 * Base 64 decode
 * @param data
 * @returns {String}
 */
utility.base64Decode = function (data) {
    if (utility.isEmpty(data) === true) {
        return data;
    }

    let buffer = new Buffer(data, 'base64');
    return buffer.toString();
};

utility.isJson = function (data) {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }

    return true;
};

module.exports = utility;
