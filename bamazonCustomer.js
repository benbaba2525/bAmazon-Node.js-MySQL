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
   var table = new Table({
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
confirmOrder();

};


//Function prompt to ask for the ID of the product they would like to buy
function confirmOrder(){
   inquirer
       .prompt([
          {
          name: "item_id",
          type: "input",
          message: "Enter the ID of the product that you would like to buy ?",
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
         message: "How many units of the product would like to buy ?",
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
       .then(function(answer){
          
          var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ? ";
          connection.query(query, { item_id: answer.item_id }, function(err, res) {
             if(err) throw err;
             var table = new Table({
               head: ["  Item ID ".magenta, "  Product Name".magenta, "  Price ".magenta, "  Qty ".magenta],
               colWidths: [15,30,15,15]
            });

            // table is an Array, so you can `push`, `unshift`, `splice` and friends
for (var i = 0; i < res.length; i++){
   table.push(
      [res[0].item_id,res[0].product_name, `$${res[0].price}`, answer.qty]
   );
};
console.log("\n\n  Your order is :  ".bold)
console.log(`\n${table.toString()}\n\n`);
if(parseInt(answer.qty)>(res[0].stock_quantity)){
   console.log("\nInsufficient inventory for your requested quantity. We have " 
   + res[0].stock_quantity + " in stock. Try again.\n")
 }else{
    console.log("Your total is :  $"+ (answer.qty * res[0].price));
 };

});
  
         
   });
};
function update(answer){
   
      
};

/*function updateStockOty(item, qty, stockQty) {
	// query with an update, set stock equal to stockqty - purchase qty
	// where the item_id equals the id the user entered
	connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stockQty - parseInt(purchaseQty)
			},
			{
				item_id: parseInt(item)
			}
		],
		// throw error if error, else run displayCost
		function(error, response) {
			if (error) throw error;
	});
}


}*/
