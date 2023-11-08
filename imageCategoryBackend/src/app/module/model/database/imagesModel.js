const constant   = require(__basePath + '/app/config/constant');
const database   = require(constant.path.app + 'core/database');

class ImagesModel {

    constructor() {
        this.databaseObj = database.getInstance();
    }

    static get DB() {
        return {
            READSLAVE: 'READSLAVE',
            MASTER   : 'MASTER'
        };
    }

    insertImage(params, callback) {
        let imageData = {
            userId      : params.userId,
            image       : params.image,
            tags       : params.tags,
            createdAt   : new Date()
        };

        let query = `
            INSERT INTO 
                images (
                    userId,
                    image,
                    tags,
                    createdAt
                ) 
            VALUES (
                :userId,
                :image,
                :tags,
                :createdAt
            ) 
        `;

        this.databaseObj.query(
            ImagesModel.DB.MASTER,
            {
                sql   : query,
                values: imageData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };

    getAllImageByUser(userId, callback) {

        let query = `
            SELECT
                *
            FROM 
                images
            WHERE
                userId = ?
        `;

        this.databaseObj.query(
            ImagesModel.DB.READSLAVE,
            {
                sql   : query,
                values: [userId]
            },
            callback
        );
    };

    checkImage(userId, image, callback) {

        let query = `
            SELECT
                *
            FROM 
                images
            WHERE
                image = ?
            AND
                userId = ?
        `;

        this.databaseObj.query(
            ImagesModel.DB.READSLAVE,
            {
                sql   : query,
                values: [image, userId]
            },
            callback
        );
    };
}

module.exports = ImagesModel;
