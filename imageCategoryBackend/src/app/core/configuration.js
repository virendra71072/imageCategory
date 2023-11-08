const nconf   = require('nconf');

nconf.argv().env();
nconf.file('config', __basePath + `app/config/config.json`);
nconf.file('responseMessages', __basePath + 'app/config/responseMessages.json');

module.exports = nconf;
