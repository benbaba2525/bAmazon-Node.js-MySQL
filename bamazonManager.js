const mysql = require("mysql");
const colors = require('colors');
const inquirer = require("inquirer");
const Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password:"ben12345",
    database:"bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("\n            **************************************************************\n".magenta);
    console.log("                          Welcome to manager menu options ".bold);
    console.log("\n            **************************************************************\n\n".magenta);

 // run the displayMenu function after the connection is made to display menu for manager to choose
 displayMenu();

});

function displayMenu(){
      inquirer
         .prompt([
             {
             name: "action",
             type: "rawlist",
             message: "\nChoose on a menu option : ",
             choices :[
                 "View Products for Sale",
                 "View Low Inventory",
                 "Add to Inventory",
                 "Add New Product"
             ]
             }
         ])
         .then(function(choose){
             switch (choose.action){
                 case "View Products for Sale" :
                     viewProductSale();
                 break;
                 case "View Low Inventory" :
                     viewLowInventory();
                 break;
                 case "Add to Inventory":
                     addToInventory();
                 break;
                 case "Add New Product":
                     addNewProduct();
                break;
             }
         });

};

function askManager(){
    inquirer
      .prompt([
        {
          type: "list",
          message: "\n\nWould you like to:",
          choices: ["Go back to the main menu", "Exit"],
          name: "restart"
        }
      ])
      .then(function(input) {
        if (input.restart === "Go back to the main menu") {
          displayMenu();
        } else {
          return;
        }
      });
  };


function viewProductSale(){
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        // instantiate
        console.log("\n\n                              Items list      ".bold);
      var table = new Table({
      head: ["  Item ID ".magenta, "  Product Name".magenta,"Quantities".magenta, "  Price ".magenta],
      colWidths: [15,30,18,15]
   });
        
   // // Display table for manager to view
   for (var i = 0; i < res.length; i++){
      table.push(
         [res[i].item_id, res[i].product_name,res[i].stock_quantity, `$${res[i].price}`]
      );
   };

   console.log(`\n${table.toString()}\n\n`);
   askManager();

    });   
};


      
    function viewLowInventory() {
        // save query term
        var query = "SELECT * FROM products WHERE stock_quantity<5";
        // run query
        connection.query(query, function(error, res) {
            // let us know if error
            if (error) throw error;

            var table = new Table({
                head: ["  Item ID ".magenta, "  Product Name".magenta, "  Quantities ".magenta, "  Price ".magenta],
                colWidths: [15,30,15,15]

            });
            // Display table for customer order details
                 for (var i = 0; i < res.length; i++){
                 table.push(
                    [res[i].item_id, res[i].product_name,res[i].stock_quantity, `$${res[i].price}`]
               );
             };
             console.log("\n\n  All items with an inventory count lower than five :  ".bold)
             console.log(`\n${table.toString()}\n\n`);
         
            // run function to ask manager ?
            askManager();
        });
    }
    

