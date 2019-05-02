var Table = require("cli-table3");
var mysql = require("mysql");
var inquirer = require("inquirer");

var cost = 0.0;

var connection = mysql.createConnection({

    //local database
    host: "localhost",
    //Port
    port: 3306,
    //User
    user: "root",
    //Password
    password: "XLR8f45t",
    //Database for this assignment
    database: "bamazon"
});

//connect to the mysql server and database
connection.connect(function (err) {
    //check for errors
    if (err) throw err;

    //start the script
    start();
});

function start() {
    //Asks customer what and how many they'd like to buy
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "What item would you like to buy?:"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to buy?:"
        }
    ])
        .then(function (answer) {
            //Creates the query string for database call
            var query = "SELECT * FROM products WHERE ?";
            //Take answer id and pull all database lines with that data
            connection.query(query, { item_id: answer.productID }, function (err, res) {
                //Makes sure there is enough stock to purchase
                if (res[0].stock_quantity < answer.quantity) {
                    console.log("Insufficient Quantity");
                    start();
                }
                //If there is enough stock, set the cost of the purchase and call updateStock to actually change the database
                else {
                    cost = res[0].price * answer.quantity;
                    updateStock(res, answer);
                }
            })
        })
}

function updateStock(res, answer) {
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: (res[0].stock_quantity - answer.quantity)
        },
        {
            item_id: answer.productID
        }
    ],
        function (error) {
            if (error) throw error;

            console.log("Purchase made!");

            var table = new Table({
                head: ['Item ID', 'Product Name','Unit Price','Quantity','Total Purchase Price']
              , colWidths: [10, 50, 15, 10, 25]
            });
             
            // Push purchase information from the database 'result' query
            table.push(
                [res[0].item_id,res[0].product_name,"$"+res[0].price.toFixed(2),answer.quantity,"$"+cost.toFixed(2)]
            );
            console.log(table.toString());
            start();
        }
    )
}   

