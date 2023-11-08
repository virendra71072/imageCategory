const constant   = require(__basePath + '/app/config/constant');
const database   = require(constant.path.app + 'core/database');

class UsersModel {

    constructor() {
        this.databaseObj = database.getInstance();
    }

    static get DB() {
        return {
            READSLAVE: 'READSLAVE',
            MASTER   : 'MASTER'
        };
    }

    createUser(params, callback) {
        let userData = {
            name            : params.name,
            token           : params.token,
            username        : params.username,
            instagramId     : params.instagramId,
            createdAt       : new Date()
        };

        let query = `
            INSERT INTO 
                users (
                    name,
                    token,
                    username,
                    instagramId,
                    createdAt
                ) 
            VALUES (
                :name,
                :token,
                :username,
                :instagramId,
                :createdAt
            ) 
        `;

        this.databaseObj.query(
            UsersModel.DB.MASTER,
            {
                sql   : query,
                values: userData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };

    updateUser(params, callback) {
        let userData = {
            name            : params.name,
            token           : params.token,
            username        : params.username,
            instagramId     : params.instagramId,
            createdAt       : new Date()
        };

        let query = `
            UPDATE 
                users 
            SET
                name = :name,
                token = :token,
                instagramId = :instagramId,
                createdAt = :createdAt

            WHERE (
                username = :username
            ) 
        `;

        this.databaseObj.query(
            UsersModel.DB.MASTER,
            {
                sql   : query,
                values: userData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };
    

    getUserDetails(userId, callback) {

        let query = `
            SELECT
                *
            FROM 
                users
            WHERE
                id = ?
        `;

        this.databaseObj.query(
            UsersModel.DB.READSLAVE,
            {
                sql   : query,
                values: [userId]
            },
            callback
        );
    };

    checkUserByUsername(username, callback) {

        let query = `
            SELECT
                *
            FROM 
                users
            WHERE
                username = ?
        `;

        this.databaseObj.query(
            UsersModel.DB.READSLAVE,
            {
                sql   : query,
                values: [username]
            },
            callback
        );
    };

}

module.exports = UsersModel;
