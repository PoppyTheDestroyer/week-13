const connectObject = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "ice_creamDB"
};

const mySql = require("mysql");
const connection = mySql.createConnection(connectObject);

connection.connect(function(err){
    if (err) {
        throw err
    }
    console.log(`Connected as ID: ${connection.threadId}`);
    connection.end();
});