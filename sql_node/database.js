const connectObject = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "musics"
};
var queryDb = "select * from songs;";
const mySql = require("mysql");
const connection = mySql.createConnection(connectObject);


connection.connect(function(err){
    if (err) {
        throw err
    }

    console.log(`Connected as ID: ${connection.threadId}`);
    connection.query(queryDb, function(err, response) {
        if (err) {
            throw err
        }
        console.log(response)
    });
    connection.query("select * from songs where genre = 'Best Ever';", function(err, response) {
        if (err) {
            throw err
        }
        console.log("Best Songs Ever:");
        console.log(response);
    })
});
var columnName;
function addColumn(columnName) {
    connection.query("ALTER TABLE songs ADD COLUMN " + columnName + " VARCHAR(30);")
};
addColumn("Album");
