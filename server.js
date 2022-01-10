var typeorm = require("typeorm"); var EntitySchema = typeorm.EntitySchema;
const http = require('http');
const app  = require('./app');
typeorm.createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "practice",
    "synchronize": false,
    "logging": false,
    entities: [
        new EntitySchema(require("./entities/posts.json"))
    ]
}).then(function (connection) {

    const server =http.createServer(app);
    server.listen(5000);

}).catch(function (error) {
    console.log("Error: ", error)
    return;
});