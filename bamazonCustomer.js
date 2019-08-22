var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');




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
    console.log("connected as id " + connection.threadId);

    displayBamazonDB();

});

function displayBamazonDB() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price"],
            colWidths: [10, 25, 25, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]
            );
        }
        console.log(displayTable.toString());

        purchasePrompt();
    });
};

function purchasePrompt() {

    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter Item ID you like to purhcase (press 0 or Enter key to exit).",
            filter: Number
        }

    ]).then(function (answers) {
       
        var IDrequested = answers.ID;
        if (IDrequested === 0) {
            console.log("Thanks for shopping with us, come back soon!");
            connection.end();
        }
        else if (IDrequested > 10) {
            console.log("Please enter a valid item ID.");
            purchasePrompt();
        }
        else {
            inquirer.prompt([
                {
                    name: "Quantity",
                    type: "input",
                    message: "How many items do you wish to purchase?",
                    filter: Number
                }
            ]).then(function (answers) {
                var quantityNeeded = answers.Quantity;
                purchaseOrder(IDrequested, quantityNeeded);
                });
            
        }

    });
};

function purchaseOrder(ID, amtNeeded) {

    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (err) throw err;

        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;
            console.log("Good news your order is in stock!");
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + " Thank you!");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + " WHERE item_id = " + ID);

        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + " to complete your order.");
        };

        displayBamazonDB();
        //connection.end();
    });
};

