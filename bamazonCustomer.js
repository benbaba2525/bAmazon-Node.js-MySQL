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
    console.log("\n **************************************************************\n".magenta);
    console.log("     Welcome to bAmazon!! Check it out what we have for you ".random);
    console.log("\n **************************************************************\n\n".magenta);
 // run the displayItems function after the connection is made to display items list in the table
   displayItems();
});

// Display items list in the table

function displayItems(){
  
  connection.query("SELECT * FROM products", function(err,res){
     if(err) throw err;
     // instantiate
     console.log("\n\n                          Items list      ".bold);
   const table = new Table({
   head: ["  Item ID ".magenta, "  Product Name".magenta, "  Price ".magenta],
   colWidths: [15,30,15]
});
     
// table is an Array, so you can `push`, `unshift`, `splice` and friends
for (var i = 0; i < res.length; i++){
   table.push(
      [res[i].item_id, res[i].product_name, `$${res[i].price}`]
   );
};

console.log(`\n${table.toString()}\n\n`);

});

//Prompt to ask for the ID of the product they would like to buy
askID();

};




//Function prompt to ask for the ID of the product they would like to buy
function askID(){
   inquirer
       .prompt([
          {
          name: "item_id",
          type: "input",
          message: "Enter the ID of the product that you would like to buy ?",
          validate: function(value){
             if(!isNaN(value) && value > 0 && value <= 12){
                return true;
             }
             console.log(" Please enter a number from 1-12 ".red);
             return false;
             
          }
        }
       ])
       .then(function(answer){
          var query = "SELECT item_id, product_name, price FROM products WHERE ? ";
          connection.query(query, { item_id: answer.item_id }, function(err, res) {
             if(err) throw err;
             console.log("The item ID is : " + res[0].product_name, res);
          });
       });
};



