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
                case "Exit" :
                    exit();
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
          choices: ["Go back to the main menu","Add more", "Exit"],
          name: "restart"
        }
      ])
      .then(function(input) {
        if (input.restart === "Go back to the main menu") {
          displayMenu();
        } else if(input.restart === "Add more"){
          addToInventory();
        }else{
          connection.end();
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
            if (res.length > 0) {

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
             console.log("\n\n  All items with an inventory that have lower than five quantities :  ".red.bold);
             console.log(`\n${table.toString()}\n\n`);
         
            }else{
              console.log("\n\n  All items with inventory are more than five quantities ".green.bold);
            }
            // run function to ask manager ?
            askManager();
          });
    };
  

    function addToInventory(){
         inquirer
         .prompt([
             {
                name: "item_id",
                type: "input",
                message: "Enter the ID of the product that you would like to add on ",
          validate: function(value){
              // validate the item list is a number betweeen 1 - 12
             if(!isNaN(value) && value > 0 && value <= 12){
                return true;
             }
             console.log(" Please enter a number from 1-12 ".red);
             return false;
            }
          },
          {
            name: "qty",
            type: "input",
            message: "How many units of the product you would like to add it on ?",
            // validate the quantity is a number larger than 0
            validate: function(value) {
               if (value > 0 && isNaN(value) === false) {
                  return true;
               }
               console.log(" Oops, please enter a number greater than 0".red);
               return false;
            }
           
         }
         ])          
.then(function(addInventory){

    var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ? ";
    connection.query(query, { item_id: addInventory.item_id }, function(err, res) {
       if(err) throw err;
       var table = new Table({
         head: ["  Item ID ".magenta, "  Product Name".magenta,"  Qty ".magenta, "  Price ".magenta],
         colWidths: [15,30,15,15]
      });
  
       var stock = parseInt(addInventory.qty) +  parseInt(res[0].stock_quantity);
// Display table for customer order details
     for (var i = 0; i < res.length; i++){
     table.push(
     [res[0].item_id,res[0].product_name,stock, `$${res[0].price}`]
   );
 };
 console.log("\n\n      Your product has been added !! Please see details below  ".green.bold)
 console.log(`\n${table.toString()}\n\n`);
 //Update the product Qty
    connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stock
			},
			{
				item_id: res[0].item_id
			}
		],
		// throw error if error, else run displayCost
		function(error, res) {
         if (error) throw error;
       });
    // run function to ask manager ?
    askManager();

     });
  
    })
    
  };



  function exit() {
    console.log("\nHave a nice day!!.");
    connection.end();
  }
    





    

