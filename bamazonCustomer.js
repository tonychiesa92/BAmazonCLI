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

        var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());

        
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


            // Logs answers
            // console.log(answer);

            connection.end();
        });
}