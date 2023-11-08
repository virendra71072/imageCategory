# Backend API server for fetch all images form Instagram & idendify Object/Category/Tags of images#

### Highlights
- create User
- fetch user info from instagram using token
- fetch user images form instagram
- identify images object or category & save into database 

### Dependencies

### Setting Node Application
Add configuration in src/app/config/constant.json file
```    paralleldotsKey: "O7jOPHECjt3w8D1HtTYLdhsALHoEqpylGPXJzPwxOdI",
        instagram: {
            clientId: "9431d1bfe93a455dac84b1b8c686c8be",
            clientSecret:"3d4c39be3d9f43cd965d32b8074d9047"
        }
```

Create new file in 'src/app/config/config.json' & add below code into it.<br />

	
```
	{
    "server": {
        "index": {
            "port": 8088,
            "env": "development"
        }
    },
    "database": {
        "mysqlMaster"    : {
            "host"           : "localhost",
            "port"           : "8889",
            "user"           : "root",
            "password"       : "root",
            "database"       : "imageCategory",
            "connectionLimit": 10
        },
        "mysqlReadSlave" : {
            "host"           : "localhost",
            "port"           : "8889",
            "user"           : "root",
            "password"       : "root",
            "database"       : "imageCategory",
            "connectionLimit": 10
        }
    }
}
```

Import database file form query folder.


Postman collection link for API:
https://www.getpostman.com/collections/9cda7ec276bdd424318a

Postman Document colletion Link:
https://documenter.getpostman.com/view/1460742/S1Lzx6TQ

### Installation
npm install;


npm start

### Testing

### Known Issue
Nothing at the moment :)

## Contributors

 1. Virendra k
