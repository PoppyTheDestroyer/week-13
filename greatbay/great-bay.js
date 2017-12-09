const connectObject = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "greatbay"
};

const mySql = require("mysql");
const inquirer = require("inquirer");
const connection = mySql.createConnection(connectObject);

connection.connect(function (err) {
    if (err) {
        throw err
    }

});

inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["POST AN ITEM", "BID ON AN ITEM"],
            name: "action"
        },
    ])
    .then(function (inquirerResponse) {
        if (inquirerResponse.action === "POST AN ITEM") {
            postItem();
        }
    })

function postItem() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What item would you like to post?",
                name: "item"
            },
            {
                type: "input",
                message: "What is the minimum asking price?",
                name: "price"
            },
            {
                type: "input",
                message: "Please enter a brief product description",
                name: "desc"
            }
        ])
        .then(function (inquirerResponse) {
            connection.query("INSERT INTO items set ?", {item: inquirerResponse.item, high_bid: inquirerResponse.price, description: inquirerResponse.desc}, function(err, response) {
                if (err) {
                    throw err
                }
                console.log("Your item info:");
                console.log(response);
            })
        })
}