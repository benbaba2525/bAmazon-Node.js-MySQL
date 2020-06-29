function backToMainMenu(){
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
        }else{
          connection.end();
        }
      });
  };

  function addProducts(){
    inquirer
      .prompt([
        {
          type: "list",
          message: "\n\nWould you like to:",
          choices: ["Go back to the main menu","Add more item into an existing product","Add more new product","Exit"],
          name: "restart"
        }
      ])
      .then(function(input) {
        if (input.restart === "Go back to the main menu") {
          displayMenu();
        } else if(input.restart === "Add more item quantity into an existing product"){
          addToInventory();
        }else if(input.restart === "Add more new product"){
          addNewProduct();
        }else{
          connection.end();
        }
      });
  };