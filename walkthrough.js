const connectObject = {
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "ice_creamDB"
}

const mySql = require("mysql")
const connection = mySql.createConnection(connectObject)

connnection.connect(function(error){
    if (error) {
        throw error
    }
    console.log(`Connected as ID: ${connection.threadId}`)
})