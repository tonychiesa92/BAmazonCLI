var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    // Logs the connection.threadId
    // console.log("connected as id " + connection.threadId);

    displayBamazonDB();
    
});

function displayBamazonDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        // console.log(res);
        startShopping();
    });
}

function startShopping() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What item ID do you want to purchase?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many units of the product would you like to purchase?"
            }])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            console.log(answer);
            connection.end();
            
        });
}