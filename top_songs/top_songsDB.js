const connectObject = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "top_songsDB"
};

const mySql = require("mysql");
const inquirer = require("inquirer");
const connection = mySql.createConnection(connectObject);

connection.connect(function (err) {
    if (err) {
        throw err
    }
});
function artistSongs(artist) {
    var query = "SELECT * FROM top5000 WHERE artist = '" + artist + "';";
    connection.query(query, function (err, response) {
        if (err) {
            throw err
        };
        console.log(response);
    });
};
var num = 10;
var mults = "SELECT artist FROM top5000 GROUP BY artist HAVING COUNT(*) > " + num + ";"
function multi(num) {
    connection.query(mults, function (err, response) {
        if (err) {
            throw err
        };
        console.log(response);
    })
};
//multi();

var start = 450
var end = 500
function range(begin, finsih) {
    var fromTo = "SELECT * FROM top5000 WHERE position BETWEEN " + begin + " and " + finsih + ";";
    connection.query(fromTo, function (err, response) {
        if (err) {
            throw err
        };
        console.log(response)
    })
};
//range(start, end);

function userSong(songPick) {
    var songSelect = "SELECT * FROM top5000 WHERE song = '" + songPick + "';"
    connection.query(songSelect, function (err, response) {
        if (err) {
            throw err
        };
        console.log(response)
    })
}

var startOver = inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["See songs by a specific artist", "See artists listed a certain number of times", "See a range of info from the database", "See information about a specific song", "Exit"],
            name: "action"
        }
    ])
    .then(function (inquirerResponse) {
        if (inquirerResponse.action === "See songs by a specific artist") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Which artist would you like to see songs by?",
                        name: "userArtist"
                    }
                ])
                .then(function (inquirerResponse) {
                    artistSongs(inquirerResponse.userArtist);
                    connection.end();
                })
        };
        var num = inquirerResponse.artistMulti;        
        if (inquirerResponse.action === "See artists listed a certain number of times") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Choose a minimum number of times an artist must appear",
                        name: "artistMulti"
                    }
                ])
                .then(function (inquirerResponse) {
                    multi(inquirerResponse.artistMulti);
                    connection.end();
                })
        };
        if (inquirerResponse.action === "See a range of info from the database") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What number would you like to begin the range?",
                        name: "rangeBegin"
                    },
                    {
                        type: "input",
                        message: "What number would you like to end the range?",
                        name: "rangeEnd"
                    }
                ])
                .then(function (inquirerResponse) {
                    range(inquirerResponse.rangeBegin, inquirerResponse.rangeEnd);
                    connection.end();
                })
        };
        if (inquirerResponse.action === "See information about a specific song") {
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What song would you like to search for?",
                        name: "songSearch"
                    }
                ])
                .then(function (inquirerResponse) {
                    userSong(inquirerResponse.songSearch);
                    connection.end();
                })
        };
        if (inquirerResponse.action === "Exit") {
            connection.end()
        }
    })