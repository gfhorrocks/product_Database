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
            name: "action",
            type: "list",
            message: "Menu Options:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        },
    ])
        .then(function (answer) {

            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();             //Calls viewProducts to list all products in database
                    break;

                case "View Low Inventory":
                    viewLowInventory();         //Calls viewLowInventory to list any items with inventory under 5
                    break;

                case "Add to Inventory":
                    addInventory();             //Calls addInventory to add inventory to an existing product
                    break;

                case "Add New Product":
                    addProduct();               //Calls addProduct to add a new product into the database
                    break;
            }
        })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, res) {  //Pulls in all products from database
        if (error) throw error;

        var table = new Table({
            head: ['Item ID', 'Product Name', 'Unit Price', 'Quantity'] //New table setup
            , colWidths: [10, 50, 15, 10]
        })

        for (let i = 0; i < res.length; i++) {                          //Loops through all of the database items and pushes them to table
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price.toFixed(2), res[i].stock_quantity]);
        }

        console.log(table.toString());                                  //outputs the table to the CLI

        start();                                                        //goes back to the starting menu
    })

}

function viewLowInventory() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (error, res) {
        if (error) throw error;

        var table = new Table({
            head: ['Item ID', 'Product Name', 'Unit Price', 'Quantity WARNING']
            , colWidths: [10, 50, 15, 10]
        })

        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price.toFixed(2), res[i].stock_quantity]);
        }

        if (res.length == 0) {
            console.log("NO INVENTORY ISSUES EXIST");
        } else {
            console.log(table.toString());
        }
        start();
    })
}

function addInventory() {

    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What ITEM ID would you like to Update?:"
        },
        {
            name: "quantity",
            type: "input",
            message: "Increase stock by: ",
        }
    ])
        .then(function (answer) {

            connection.query("update products set stock_quantity = stock_quantity + ? where item_id = ?", [answer.quantity, answer.item], function(err){

                if(err) throw err;

                console.log("Product Stock Updated.");

                start();
            })
        })
}

function addProduct() {
    
    inquirer.prompt([
        {
            name: "description",
            type: "input",
            message: "New product description: "
        },
        {
            name: "department",
            type: "input",
            message: "New product department: "
        },
        {
            name: "price",
            type: "input",
            message: "New product price: "
        },
        {
            name: "quantity",
            type: "input",
            message: "New product stock: "
        }
    ]).then(function(answer){

        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answer.description,     //Sets product name
              department_name: answer.department,   //Sets department
              price: answer.price,                  //Sets price
              stock_quantity: answer.quantity       //Sets stock quantity
            },
            function(err) {
              if (err) throw err;
              console.log("New Product added successfully!");
              // Logs new product added successfully 
              start();  //returns back to the main menu
            }
          );
    })
}
