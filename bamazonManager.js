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
             message: "\nChoose on a menu options : ",
             choices :[
                 "View Products for Sale",
                 "View Low Inventory",
                 "Add to Inventory",
                 "Add New Product",
                 "Exit"
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


function viewProductSale(){
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        // instantiate
        console.log("\n\n                              Items list      ".bold);
      var table = new Table({
      head: ["  Item ID ".magenta, "  Product Name".magenta,"Department Name".magenta,"Quantities".magenta, "  Price ".magenta],
      colWidths: [15,25,25,15,15]
   });
        
   // // Display table for manager to view
   for (var i = 0; i < res.length; i++){
      table.push(
         [res[i].item_id, res[i].product_name,res[i].department_name,res[i].stock_quantity, `$${res[i].price}`]
      );
   };

   console.log(`\n${table.toString()}\n\n`);

  //Ask to go back to the main menu or exit
  displayMenu();

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
                head: ["  Item ID ".magenta, "  Product Name".magenta,"Department Name".magenta, "  Quantities ".magenta, "  Price ".magenta],
                colWidths:  [15,25,25,15,15]

            });
           
            // Display table for customer order details
                 for (var i = 0; i < res.length; i++){
                 table.push(
                    [res[i].item_id, res[i].product_name,res[i].department_name,res[i].stock_quantity, `$${res[i].price}`]
               );
             };
             console.log("\n\n  All items in the stock that are lower than five quantities :  ".red.bold);
             console.log(`\n${table.toString()}\n\n`);
         
            }else{
              console.log("\n\n  All items in the stock that are more than five quantities ".green.bold);
            }
          // run function to ask if they want to add more item , go back to the main menu or exit 
          displayMenu();
          });
    };
  

    function addToInventory(){
      connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;

         inquirer
         .prompt([
             {
                name: "item_id",
                type: "input",
                message: "Enter the ID of the product that you would like to add on ",
          validate: function(value){
              // validate the item list 
             if(!isNaN(value) && value > 0 && value <= res.length){
                return true;
             }
             console.log(` Please enter a number from 1-${res.length}!!`.red.bold);
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

    var query = "SELECT item_id, product_name,department_name, stock_quantity, price FROM products WHERE ? ";
    connection.query(query, { item_id: addInventory.item_id }, function(err, res) {
       if(err) throw err;
       var table = new Table({
         head: ["  Item ID ".magenta, "  Product Name ".magenta,"Department Name".magenta,"  Qty ".magenta, "  Price ".magenta],
         colWidths: [15,25,25,15,15]
      });
  
       var stock = parseInt(addInventory.qty) +  parseInt(res[0].stock_quantity);
// Display table for customer order details
     for (var i = 0; i < res.length; i++){
     table.push(
        [res[i].item_id, res[i].product_name,res[i].department_name,res[i].stock_quantity, `$${res[i].price}`]
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
         addMore();
       });
    // run function to ask if they want to add more item , go back to the main menu or exit 
   

       });
  
    });
 });
 
};

  function addNewProduct(){
    inquirer.prompt([
      {
          name: 'name',
          type: 'input',
          message: 'Enter the product name:'
      },
      {
          name: 'department',
          type: 'input',
          message: 'Enter the product department:'
      },
      {
          name: 'price',
          type: 'input',
          message: 'Enter the product price:',
          validate: function(value){
              if (!isNaN(value) && value > 0) {
                  return true;
              } else {
                  console.log("=> Oops, please enter a number greater than 0".red);
                  return false;
              }
          }
      }, 
      {
          name: 'qty',
          type: 'input',
          message: 'Enter the item quantity :',
          validate: (value) => {
              if (!isNaN(value) && value > 0) {
                  return true;
              } else {
                  console.log(" => Oops, please enter a number greater than 0".red);
                  return false;
              }
          }
      }
  ]).then(function(newProduct) {
      connection.query('INSERT INTO products SET ?', {
          product_name: newProduct.name,
          department_name: newProduct.department,
          price: newProduct.price,
          stock_quantity: newProduct.qty
      }, (err, res) => {
          if (err) throw err;
          console.log("\n\tYou have successfully added a new product!!".random);
          addMoreNewProduct();
      });
  });
};

function addMore(){	
    inquirer	
      .prompt([	
        {	
          type: "list",	
          message: "\n\nWould you like to:",	
          choices: ["Add more quantity","Go back to the main menu", "Exit"],	
          name: "restart"	
        }	
      ])	
      .then(function(input) {	
        if (input.restart === "Add more quantity"){	
            addToInventory();	
        } else if(input.restart === "Go back to the main menu") {	
            displayMenu();	
        }else{	
          connection.end();	
        }	
      });	
  };

  function addMoreNewProduct(){	
    inquirer	
      .prompt([	
        {	
          type: "list",	
          message: "\n\nWould you like to:",	
          choices: ["Add more new product","Go back to the main menu", "Exit"],	
          name: "restart"	
        }	
      ])	
      .then(function(input) {	
        if (input.restart === "Add more new product"){	
            addNewProduct();
        } else if(input.restart === "Go back to the main menu") {	
            displayMenu();	
        }else{	
          connection.end();	
        }	
      });	
  };

  
  function exit() {
    console.log("\n   Have a nice day!!.\n".random);
    connection.end();
  };
    





    

